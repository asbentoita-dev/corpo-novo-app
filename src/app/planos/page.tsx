'use client'
import { CheckCircle, Star, Zap } from 'lucide-react'

const KIWIFY_MENSAL = 'https://pay.kiwify.com.br/6exL8f1'
const KIWIFY_ANUAL = 'https://pay.kiwify.com.br/iamPPSK'

const beneficios = [
  'Acompanhamento diário de peso e medidas',
  'Cardápios personalizados por fase',
  'Alertas de hidratação e refeições',
  'Módulo Anti-Compulsão (respiração + mindfulness)',
  'Desafios gamificados com conquistas',
  'Comunidade exclusiva de mulheres',
  'Sincronizado com o protocolo dos 21 dias',
  'Acesso a todas as receitas do método',
]

export default function Planos() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 px-4 py-16">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-emerald-600 font-bold text-sm uppercase tracking-widest mb-2">Oferta Exclusiva</p>
          <h1 className="text-4xl font-black text-gray-900 mb-3">Escolha seu Plano</h1>
          <p className="text-gray-500 text-lg">7 dias grátis — sem cartão de crédito, sem compromisso</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
          {/* Mensal */}
          <div className="bg-white rounded-3xl border-2 border-gray-200 p-7 shadow-sm hover:shadow-md transition-shadow">
            <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-3">Plano Mensal</p>
            <div className="mb-1">
              <span className="text-4xl font-black text-gray-900">R$ 29</span>
              <span className="text-2xl font-black text-gray-900">,90</span>
              <span className="text-gray-400 text-sm">/mês</span>
            </div>
            <p className="text-emerald-600 text-sm font-semibold mb-6">menos de R$ 1 por dia</p>
            <a href={KIWIFY_MENSAL} target="_blank" rel="noopener noreferrer"
              className="block w-full text-center border-2 border-emerald-500 text-emerald-600 font-bold py-3 rounded-2xl hover:bg-emerald-50 transition-colors">
              Começar Grátis
            </a>
          </div>

          {/* Anual */}
          <div className="bg-emerald-600 rounded-3xl border-2 border-emerald-600 p-7 shadow-xl relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-yellow-900 text-xs font-black px-4 py-1.5 rounded-full flex items-center gap-1">
              <Star size={12} fill="currentColor" /> MAIS POPULAR
            </div>
            <p className="text-sm font-bold text-emerald-200 uppercase tracking-widest mb-3">Plano Anual</p>
            <div className="mb-1">
              <span className="text-4xl font-black text-white">R$ 197</span>
              <span className="text-white text-sm">/ano</span>
            </div>
            <p className="text-emerald-200 text-sm font-semibold mb-1">equivale a R$ 16,42/mês</p>
            <div className="bg-yellow-400 text-yellow-900 text-xs font-black px-3 py-1 rounded-full inline-flex items-center gap-1 mb-6">
              <Zap size={11} fill="currentColor" /> ECONOMIZE 45%
            </div>
            <a href={KIWIFY_ANUAL} target="_blank" rel="noopener noreferrer"
              className="block w-full text-center bg-white text-emerald-700 font-black py-3 rounded-2xl hover:bg-emerald-50 transition-colors">
              Quero Economizar 45%
            </a>
          </div>
        </div>

        {/* Benefícios */}
        <div className="bg-white rounded-3xl p-7 shadow-sm mb-6">
          <h2 className="font-black text-gray-900 mb-5 text-center">Incluído nos dois planos</h2>
          <div className="space-y-3">
            {beneficios.map(b => (
              <div key={b} className="flex items-start gap-3">
                <CheckCircle size={18} className="text-emerald-500 mt-0.5 shrink-0" />
                <span className="text-gray-700 text-sm">{b}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-center text-xs text-gray-400">
          ✓ Cancele quando quiser &nbsp;·&nbsp; ✓ Sem burocracia &nbsp;·&nbsp; ✓ Pagamento seguro via Kiwify<br />
          ©2025 ASBento · Corpo Novo em 21 Dias
        </p>
      </div>
    </div>
  )
}
