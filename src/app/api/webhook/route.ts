import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { createHmac } from 'crypto'

function getSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

function verificarAssinatura(body: string, signature: string, secret: string): boolean {
  const hmac = createHmac('sha1', secret)
  hmac.update(body)
  const expected = hmac.digest('hex')
  return signature === expected
}

export async function POST(req: NextRequest) {
  const supabaseAdmin = getSupabaseAdmin()
  const body = await req.text()
  const signature = req.headers.get('x-kiwify-signature') || ''

  const secret = process.env.KIWIFY_WEBHOOK_SECRET
  if (secret) {
    const valido = verificarAssinatura(body, signature, secret)
    if (!valido) {
      return NextResponse.json({ error: 'Assinatura inválida' }, { status: 400 })
    }
  }

  let payload: Record<string, unknown>
  try {
    payload = JSON.parse(body)
  } catch {
    return NextResponse.json({ error: 'Payload inválido' }, { status: 400 })
  }

  const evento = payload.webhook_event_type as string
  const order = payload.order as Record<string, unknown> | undefined
  const subscription = payload.Subscription as Record<string, unknown> | undefined

  const customerId = (payload.Customer as Record<string, unknown>)?.id as string | undefined
  const customerEmail = (payload.Customer as Record<string, unknown>)?.email as string | undefined

  // Identifica o user pelo email
  let userId: string | null = null
  if (customerEmail) {
    const { data } = await supabaseAdmin.auth.admin.listUsers()
    const user = data?.users?.find(u => u.email === customerEmail)
    if (user) userId = user.id
  }

  if (!userId) {
    // Não encontrou usuário — registra mas não falha
    console.warn('[kiwify webhook] usuário não encontrado para email:', customerEmail)
    return NextResponse.json({ received: true })
  }

  switch (evento) {
    case 'order_approved': {
      const plano = (order?.product_id === process.env.KIWIFY_PRODUCT_ANNUAL) ? 'anual' : 'mensal'
      await supabaseAdmin.from('assinaturas').upsert({
        user_id: userId,
        kiwify_order_id: order?.id,
        kiwify_subscription_id: subscription?.id,
        plano,
        status: 'ativo',
        atualizado_em: new Date().toISOString(),
      }, { onConflict: 'user_id' })
      break
    }

    case 'subscription_status': {
      const subStatus = subscription?.status as string
      const status = subStatus === 'active' ? 'ativo'
        : subStatus === 'cancelled' ? 'cancelado'
        : subStatus === 'suspended' ? 'suspenso'
        : 'inativo'

      await supabaseAdmin.from('assinaturas').update({
        status,
        atualizado_em: new Date().toISOString(),
      }).eq('kiwify_subscription_id', subscription?.id)
      break
    }

    case 'order_refunded':
    case 'subscription_cancelled': {
      await supabaseAdmin.from('assinaturas').update({
        status: 'cancelado',
        atualizado_em: new Date().toISOString(),
      }).eq('user_id', userId)
      break
    }
  }

  return NextResponse.json({ received: true })
}
