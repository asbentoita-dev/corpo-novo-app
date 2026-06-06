import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { createClient } from '@supabase/supabase-js'
import Stripe from 'stripe'

// Cliente Supabase com service_role para escrever sem RLS
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')!

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch {
    return NextResponse.json({ error: 'Webhook inválido' }, { status: 400 })
  }

  const session = event.data.object as Stripe.Checkout.Session
  const subscription = event.data.object as Stripe.Subscription

  switch (event.type) {
    case 'checkout.session.completed': {
      const sub = await stripe.subscriptions.retrieve(session.subscription as string)
      const userId = session.metadata?.user_id
      if (!userId) break

      await supabaseAdmin.from('assinaturas').upsert({
        user_id: userId,
        stripe_customer_id: session.customer as string,
        stripe_subscription_id: sub.id,
        plano: sub.items.data[0].price.recurring?.interval === 'year' ? 'anual' : 'mensal',
        status: sub.status,
        trial_fim: sub.trial_end ? new Date(sub.trial_end * 1000).toISOString() : null,
        proximo_pagamento: sub.current_period_end ? new Date(sub.current_period_end * 1000).toISOString() : null,
        atualizado_em: new Date().toISOString(),
      }, { onConflict: 'user_id' })
      break
    }

    case 'customer.subscription.updated': {
      await supabaseAdmin.from('assinaturas').update({
        status: subscription.status,
        plano: subscription.items.data[0].price.recurring?.interval === 'year' ? 'anual' : 'mensal',
        trial_fim: subscription.trial_end ? new Date(subscription.trial_end * 1000).toISOString() : null,
        proximo_pagamento: subscription.current_period_end ? new Date(subscription.current_period_end * 1000).toISOString() : null,
        atualizado_em: new Date().toISOString(),
      }).eq('stripe_subscription_id', subscription.id)
      break
    }

    case 'customer.subscription.deleted': {
      await supabaseAdmin.from('assinaturas').update({
        status: 'cancelado',
        atualizado_em: new Date().toISOString(),
      }).eq('stripe_subscription_id', subscription.id)
      break
    }
  }

  return NextResponse.json({ received: true })
}
