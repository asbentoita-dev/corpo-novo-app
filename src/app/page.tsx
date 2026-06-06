import Link from 'next/link'
import { CheckCircle, Zap, Heart, Star, ArrowRight, Clock } from 'lucide-react'

const testimonials = [
  { name: 'Ana C., 34 anos', text: 'Perdi 8 kg em 21 dias e o melhor: não voltei a engordar. Esse método mudou minha vida!', kg: '8kg' },
  { name: 'Fernanda M., 42 anos', text: 'Na terceira semana já usava uma calça que estava guardada há 2 anos. Não acreditei!', kg: '6kg' },
  { name: 'Sandra L., 51 anos', text: 'Perdi 6 kg, reduzi 11cm de cintura e meu colesterol caiu. Meu médico ficou impressionado.', kg: '6kg' },
  { name: 'Marcia T., 29 anos', text: 'Além de emagrecer, parei de tomar café à tarde porque a energia voltou naturalmente.', kg: '5kg' },
]

const features = [
  { icon: '📊', title: 'Acompanhamento Diário', desc: 'Registre peso, medidas e fotos. Veja sua transformação acontecendo em tempo real.' },
  { icon: '🥗', title: 'Cardápios Personalizados', desc: 'Gerados automaticamente de acordo com seus objetivos e preferências alimentares.' },
  { icon: '⚡', title: 'Alertas Inteligentes', desc: 'Lembretes de hidratação, refeições e exercícios na hora certa.' },
  { icon: '🧘', title: 'Módulo Anti-Compulsão', desc: 'Técnicas de respiração e mindfulness para os momentos de fraqueza.' },
  { icon: '🏆', title: 'Desafios Gamificados', desc: 'Conquistas, streaks e recompensas que mantêm sua motivação em alta.' },
  { icon: '👭', title: 'Comunidade Exclusiva', desc: 'Conecte-se com milhares de mulheres na mesma jornada.' },
]

const phases = [
  { days: 'Dias 1–7', name: 'O Reset', color: 'bg-emerald-100 border-emerald-400 text-emerald-800', desc: 'Limpar, desinflamar e preparar o corpo. Elimine alimentos sabotadores e reduza até 3kg já nos primeiros dias.' },
  { days: 'Dias 8–14', name: 'A Queima', color: 'bg-orange-100 border-orange-400 text-orange-800', desc: 'Ativar a queima de gordura em alta velocidade com alimentos termogênicos e exercícios de 15 minutos.' },
  { days: 'Dias 15–21', name: 'A Transformação', color: 'bg-purple-100 border-purple-400 text-purple-800', desc: 'Consolidar os resultados e criar o novo estilo de vida. Aprenda o Modo Manutenção definitivo.' },
]

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-emerald-600 via-emerald-500 to-teal-400 text-white px-4 py-16 text-center">
        <p className="text-emerald-100 text-sm font-semibold tracking-widest uppercase mb-3">Método Comprovado</p>
        <h1 className="text-4xl md:text-6xl font-black mb-4 leading-tight">
          Corpo Novo<br />em 21 Dias
        </h1>
        <p className="text-xl md:text-2xl text-emerald-50 mb-2">Emagrecimento inteligente. Sem sofrimento. Com saúde.</p>
        <p className="text-emerald-100 mb-10 max-w-md mx-auto">O método que já transformou milhares de vidas — agora no seu bolso, 24h por dia.</p>
        <Link href="/cadastro"
          className="inline-flex items-center gap-2 bg-white text-emerald-700 font-bold text-lg px-8 py-4 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all">
          Começar 7 Dias Grátis <ArrowRight size={20} />
        </Link>
        <p className="mt-4 text-emerald-100 text-sm">✓ Sem cartão de crédito &nbsp;·&nbsp; ✓ Sem compromisso &nbsp;·&nbsp; ✓ Cancele quando quiser</p>
        <div className="flex justify-center gap-8 mt-12 text-center">
          <div><p className="text-4xl font-black">8kg</p><p className="text-emerald-100 text-sm">perda média</p></div>
          <div><p className="text-4xl font-black">21</p><p className="text-emerald-100 text-sm">dias de método</p></div>
          <div><p className="text-4xl font-black">2.5x</p><p className="text-emerald-100 text-sm">mais rápido</p></div>
        </div>
      </section>

      {/* Identificação */}
      <section className="px-4 py-16 max-w-3xl mx-auto">
        <h2 className="text-3xl font-black text-center text-gray-900 mb-3">Você Se Identifica Com Isso?</h2>
        <p className="text-center text-gray-500 mb-10">Se você já tentou dieta atrás de dieta sem conseguir manter o resultado — este método foi feito <strong>para você.</strong></p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {['Tentei várias dietas e não consegui manter o peso', 'Sinto que não tenho disposição para as coisas do dia a dia', 'Olho no espelho e não me reconheço mais', 'Quero usar aquela roupa guardada no armário há anos'].map(item => (
            <div key={item} className="flex items-start gap-3 bg-red-50 border border-red-100 rounded-xl p-4">
              <span className="text-red-400 mt-0.5">✗</span>
              <p className="text-gray-700 text-sm">{item}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3 Fases */}
      <section className="bg-gray-50 px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-black text-center text-gray-900 mb-3">As 3 Fases dos 21 Dias</h2>
          <p className="text-center text-gray-500 mb-10">Cada fase prepara e potencializa a próxima, criando uma transformação completa e duradoura.</p>
          <div className="space-y-4">
            {phases.map(p => (
              <div key={p.name} className={`border-l-4 rounded-xl p-5 ${p.color}`}>
                <p className="text-xs font-bold uppercase tracking-widest mb-1">{p.days}</p>
                <h3 className="text-xl font-black mb-2">{p.name}</h3>
                <p className="text-sm opacity-80">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Funcionalidades */}
      <section className="px-4 py-16 max-w-4xl mx-auto">
        <h2 className="text-3xl font-black text-center text-gray-900 mb-3">Tudo no Seu Bolso, 24h por Dia</h2>
        <p className="text-center text-gray-500 mb-10">Seu personal trainer + nutricionista + coach de hábitos em um só app.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {features.map(f => (
            <div key={f.title} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
              <p className="text-3xl mb-3">{f.icon}</p>
              <h3 className="font-bold text-gray-900 mb-1">{f.title}</h3>
              <p className="text-sm text-gray-500">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Depoimentos */}
      <section className="bg-emerald-50 px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-black text-center text-gray-900 mb-3">Resultados Reais</h2>
          <p className="text-center text-gray-500 mb-10">Elas também duvidaram. Hoje são a prova viva de que funciona.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {testimonials.map(t => (
              <div key={t.name} className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex gap-1 mb-3">{[...Array(5)].map((_, i) => <Star key={i} size={14} fill="#10b981" className="text-emerald-500" />)}</div>
                <p className="text-gray-700 text-sm italic mb-4">"{t.text}"</p>
                <div className="flex items-center justify-between">
                  <p className="font-bold text-gray-900 text-sm">{t.name}</p>
                  <span className="bg-emerald-100 text-emerald-700 font-bold text-sm px-3 py-1 rounded-full">-{t.kg}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Preços */}
      <section className="px-4 py-16 max-w-2xl mx-auto text-center">
        <h2 className="text-3xl font-black text-gray-900 mb-3">Oferta Exclusiva</h2>
        <p className="text-gray-500 mb-10">Experimente grátis por 7 dias. Sem cartão, sem compromisso.</p>

        <div className="bg-emerald-600 text-white rounded-3xl p-8 mb-5 shadow-xl">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Clock size={20} />
            <p className="font-bold">7 DIAS GRÁTIS</p>
          </div>
          <p className="text-emerald-100 text-sm mb-6">Acesso COMPLETO a todas as funcionalidades</p>
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-white/10 rounded-2xl p-4">
              <p className="text-2xl font-black">R$ 29,90</p>
              <p className="text-emerald-100 text-xs">por mês</p>
              <p className="text-emerald-200 text-xs mt-1">menos de R$ 1/dia</p>
            </div>
            <div className="bg-white rounded-2xl p-4 text-emerald-700 relative">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full">MAIS POPULAR</span>
              <p className="text-2xl font-black">R$ 197</p>
              <p className="text-emerald-500 text-xs">por ano</p>
              <p className="text-emerald-600 text-xs font-bold mt-1">ECONOMIZE 45%</p>
            </div>
          </div>
          <div className="space-y-2 text-sm text-emerald-100 mb-8">
            {['Acesso completo a todas as funcionalidades', 'Cancele quando quiser, sem burocracia', 'Sincronizado com o protocolo dos 21 dias', 'Suporte via comunidade exclusiva'].map(item => (
              <div key={item} className="flex items-center gap-2 justify-center">
                <CheckCircle size={16} className="text-emerald-300" />
                <span>{item}</span>
              </div>
            ))}
          </div>
          <Link href="/cadastro"
            className="block w-full bg-white text-emerald-700 font-black text-lg py-4 rounded-2xl hover:bg-emerald-50 transition-colors">
            Começar Agora — Grátis por 7 Dias
          </Link>
        </div>
        <p className="text-gray-400 text-xs">©2025 ASBento · Corpo Novo em 21 Dias. Todos os direitos reservados.</p>
      </section>
    </main>
  )
}
