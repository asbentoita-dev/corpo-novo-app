import { ExternalLink, Mail, BookOpen, Languages, Lightbulb, Smartphone } from 'lucide-react'

const servicos = [
  {
    icon: BookOpen,
    titulo: 'Editor',
    desc: 'Revisão, edição e preparação de textos, livros, ebooks e conteúdo digital com qualidade e atenção aos detalhes.',
    cor: 'bg-blue-50 border-blue-200 text-blue-700',
    iconCor: 'text-blue-500',
  },
  {
    icon: Languages,
    titulo: 'Tradutor',
    desc: 'Tradução técnica e literária Português ↔ Inglês ↔ Espanhol. Fidelidade ao texto original com naturalidade na língua de destino.',
    cor: 'bg-purple-50 border-purple-200 text-purple-700',
    iconCor: 'text-purple-500',
  },
  {
    icon: Lightbulb,
    titulo: 'Consultor',
    desc: 'Consultoria em estratégia digital, criação de produtos info, automação e presença online para empreendedores.',
    cor: 'bg-orange-50 border-orange-200 text-orange-700',
    iconCor: 'text-orange-500',
  },
  {
    icon: Smartphone,
    titulo: 'Apps & Produtos Digitais',
    desc: 'Criação de apps, ebooks, cursos e plataformas digitais. Do conceito ao lançamento com tecnologia moderna.',
    cor: 'bg-emerald-50 border-emerald-200 text-emerald-700',
    iconCor: 'text-emerald-500',
  },
]

const projetos = [
  {
    nome: 'Corpo Novo em 21 Dias',
    desc: 'App de emagrecimento com protocolo de 21 dias, acompanhamento diário e planos de assinatura.',
    url: 'https://asbento.com.br',
    tag: 'App Web + PWA',
    cor: 'bg-emerald-600',
  },
  {
    nome: 'Corpo Novo Express',
    desc: 'Página de vendas do ebook Corpo Novo em 21 Dias com checkout integrado Kiwify.',
    url: 'https://dias-vida-nova.lovable.app',
    tag: 'Landing Page',
    cor: 'bg-teal-600',
  },
]

export default function Sobre() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white px-4 py-20 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="w-20 h-20 bg-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl font-black text-white shadow-xl">
            AS
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4">ASBento</h1>
          <p className="text-xl text-gray-300 mb-2">Editor · Tradutor · Consultor · Criador Digital</p>
          <p className="text-gray-400 max-w-md mx-auto mb-8">
            Transformo ideias em produtos digitais reais — ebooks, apps, páginas de venda e estratégias que funcionam.
          </p>
          <a href="mailto:asbento.ita@gmail.com"
            className="inline-flex items-center gap-2 bg-emerald-500 text-white font-bold px-8 py-4 rounded-full hover:bg-emerald-400 transition-colors">
            <Mail size={18} /> Entrar em contato
          </a>
        </div>
      </section>

      {/* Serviços */}
      <section className="px-4 py-16 max-w-4xl mx-auto">
        <h2 className="text-3xl font-black text-center text-gray-900 mb-3">O que faço</h2>
        <p className="text-center text-gray-500 mb-10">Serviços profissionais para quem quer resultado de verdade.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {servicos.map(s => (
            <div key={s.titulo} className={`border-2 rounded-2xl p-6 ${s.cor}`}>
              <s.icon size={28} className={`mb-3 ${s.iconCor}`} />
              <h3 className="font-black text-gray-900 text-lg mb-2">{s.titulo}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Projetos */}
      <section className="bg-gray-50 px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-black text-center text-gray-900 mb-3">Projetos</h2>
          <p className="text-center text-gray-500 mb-10">Produtos digitais criados e no ar.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {projetos.map(p => (
              <div key={p.nome} className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <div className={`${p.cor} h-3`} />
                <div className="p-6">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{p.tag}</span>
                  <h3 className="font-black text-gray-900 text-lg mt-1 mb-2">{p.nome}</h3>
                  <p className="text-gray-500 text-sm mb-4">{p.desc}</p>
                  <a href={p.url} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-emerald-600 font-bold text-sm hover:text-emerald-700">
                    Visitar <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contato */}
      <section className="px-4 py-16 max-w-xl mx-auto text-center">
        <h2 className="text-3xl font-black text-gray-900 mb-3">Vamos trabalhar juntos?</h2>
        <p className="text-gray-500 mb-8">Se você tem um projeto, ideia ou precisa de algum dos meus serviços, me manda uma mensagem.</p>
        <a href="mailto:asbento.ita@gmail.com"
          className="inline-flex items-center gap-2 bg-gray-900 text-white font-bold px-8 py-4 rounded-full hover:bg-gray-700 transition-colors">
          <Mail size={18} /> asbento.ita@gmail.com
        </a>
        <p className="text-gray-400 text-xs mt-8">© 2025 ASBento · asbento.com.br</p>
      </section>
    </main>
  )
}
