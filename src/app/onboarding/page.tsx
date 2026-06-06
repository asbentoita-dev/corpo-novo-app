'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { ArrowRight, ArrowLeft } from 'lucide-react'

const steps = [
  { id: 1, titulo: 'Qual é o seu nome?', campo: 'nome', tipo: 'text', placeholder: 'Como posso te chamar?', emoji: '👋' },
  { id: 2, titulo: 'Qual é o seu peso atual?', campo: 'peso_inicial', tipo: 'number', placeholder: 'Ex: 72.5', emoji: '⚖️', sufixo: 'kg' },
  { id: 3, titulo: 'Qual é o seu peso meta?', campo: 'peso_meta', tipo: 'number', placeholder: 'Ex: 65.0', emoji: '🎯', sufixo: 'kg' },
  { id: 4, titulo: 'Qual é a sua altura?', campo: 'altura_cm', tipo: 'number', placeholder: 'Ex: 165', emoji: '📏', sufixo: 'cm' },
  { id: 5, titulo: 'Qual é a sua idade?', campo: 'idade', tipo: 'number', placeholder: 'Ex: 35', emoji: '🌸', sufixo: 'anos' },
]

export default function Onboarding() {
  const [step, setStep] = useState(0)
  const [dados, setDados] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const atual = steps[step]
  const valor = dados[atual.campo] || ''
  const progresso = ((step + 1) / steps.length) * 100

  async function avancar() {
    if (step < steps.length - 1) {
      setStep(s => s + 1)
    } else {
      await salvar()
    }
  }

  async function salvar() {
    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { router.push('/login'); return }

    await supabase.from('perfis').upsert({
      id: user.id,
      nome: dados.nome,
      peso_inicial: parseFloat(dados.peso_inicial),
      peso_meta: parseFloat(dados.peso_meta),
      altura_cm: parseInt(dados.altura_cm),
      idade: parseInt(dados.idade),
      inicio_21dias: new Date().toISOString().split('T')[0],
    })

    // Salva peso inicial no check-in de hoje
    await supabase.from('check_ins').upsert({
      user_id: user.id,
      data: new Date().toISOString().split('T')[0],
      peso_kg: parseFloat(dados.peso_inicial),
    }, { onConflict: 'user_id,data' })

    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Barra de progresso */}
        <div className="mb-8">
          <div className="flex justify-between text-xs text-gray-400 mb-2">
            <span>Passo {step + 1} de {steps.length}</span>
            <span>{Math.round(progresso)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progresso}%` }} />
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8">
          <div className="text-center mb-8">
            <p className="text-5xl mb-4">{atual.emoji}</p>
            <h2 className="text-2xl font-black text-gray-900">{atual.titulo}</h2>
          </div>

          <div className="relative mb-6">
            <input
              type={atual.tipo}
              step={atual.tipo === 'number' ? '0.1' : undefined}
              placeholder={atual.placeholder}
              value={valor}
              onChange={e => setDados(d => ({ ...d, [atual.campo]: e.target.value }))}
              onKeyDown={e => e.key === 'Enter' && valor && avancar()}
              autoFocus
              className="w-full border-2 border-gray-200 rounded-2xl px-5 py-4 text-xl font-bold text-gray-900 focus:outline-none focus:border-emerald-400 transition-colors pr-16"
            />
            {atual.sufixo && (
              <span className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 font-semibold">{atual.sufixo}</span>
            )}
          </div>

          <div className="flex gap-3">
            {step > 0 && (
              <button onClick={() => setStep(s => s - 1)}
                className="flex items-center gap-1 px-5 py-4 rounded-2xl border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors font-semibold">
                <ArrowLeft size={18} />
              </button>
            )}
            <button onClick={avancar} disabled={!valor || loading}
              className="flex-1 bg-emerald-600 text-white font-bold py-4 rounded-2xl hover:bg-emerald-700 transition-colors disabled:opacity-40 flex items-center justify-center gap-2 text-lg">
              {loading ? 'Salvando...' : step === steps.length - 1 ? 'Começar minha jornada! 🚀' : <>Próximo <ArrowRight size={18} /></>}
            </button>
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          Seus dados são privados e protegidos 🔒
        </p>
      </div>
    </div>
  )
}
