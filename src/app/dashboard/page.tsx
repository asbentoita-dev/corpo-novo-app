'use client'
import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { getDayOfProtocol, getPhase } from '@/lib/utils'
import { Droplets, Scale, Utensils, Trophy, LogOut, CheckCircle, TrendingDown, Loader2 } from 'lucide-react'

const cardapio = [
  { refeicao: 'Café da Manhã', icon: '☀️', sugestao: 'Shot detox (água morna + limão + gengibre) + 2 ovos mexidos com cúrcuma + 1 fatia de pão integral' },
  { refeicao: 'Almoço', icon: '🍽️', sugestao: 'Frango grelhado + arroz integral (4 colheres) + salada verde à vontade + azeite e limão' },
  { refeicao: 'Jantar', icon: '🌙', sugestao: 'Sopa de legumes com frango desfiado + chá de camomila' },
  { refeicao: 'Lanche', icon: '🍎', sugestao: 'Iogurte natural com frutas vermelhas + 1 colher de mel' },
]

const dicas = [
  { icon: '💧', titulo: 'Hidratação', desc: 'Beba no mínimo 2 litros de água hoje' },
  { icon: '😴', titulo: 'Sono', desc: 'Durma pelo menos 7 horas esta noite' },
  { icon: '🌞', titulo: 'Sol da Manhã', desc: '10 minutos de sol regulam o cortisol' },
  { icon: '🧘', titulo: 'Estresse', desc: 'Medite 5 minutos para reduzir o cortisol' },
]

const phaseColors: Record<string, string> = { emerald: 'bg-emerald-500', orange: 'bg-orange-500', purple: 'bg-purple-500' }
const phaseBg: Record<string, string> = { emerald: 'bg-emerald-50 border-emerald-200', orange: 'bg-orange-50 border-orange-200', purple: 'bg-purple-50 border-purple-200' }
const phaseText: Record<string, string> = { emerald: 'text-emerald-700', orange: 'text-orange-700', purple: 'text-purple-700' }

type Perfil = { inicio_21dias: string; peso_inicial: number | null; nome: string | null }
type CheckIn = { peso_kg: number | null; agua_ml: number | null }

export default function Dashboard() {
  const [userId, setUserId] = useState<string | null>(null)
  const [nome, setNome] = useState('Bem-vinda')
  const [perfil, setPerfil] = useState<Perfil | null>(null)
  const [checkin, setCheckin] = useState<CheckIn>({ peso_kg: null, agua_ml: 0 })
  const [pesoInput, setPesoInput] = useState('')
  const [salvando, setSalvando] = useState(false)
  const [savedMsg, setSavedMsg] = useState('')
  const [loading, setLoading] = useState(true)
  const [historico, setHistorico] = useState<{ data: string; peso_kg: number }[]>([])
  const router = useRouter()
  const supabase = createClient()

  const hoje = new Date().toISOString().split('T')[0]

  const carregarDados = useCallback(async (uid: string) => {
    const [{ data: p }, { data: c }, { data: h }] = await Promise.all([
      supabase.from('perfis').select('inicio_21dias, peso_inicial, nome').eq('id', uid).single(),
      supabase.from('check_ins').select('peso_kg, agua_ml').eq('user_id', uid).eq('data', hoje).maybeSingle(),
      supabase.from('check_ins').select('data, peso_kg').eq('user_id', uid).not('peso_kg', 'is', null).order('data', { ascending: false }).limit(7),
    ])
    if (p) setPerfil(p)
    if (c) { setCheckin(c); if (c.peso_kg) setPesoInput(String(c.peso_kg)) }
    if (h) setHistorico(h)
  }, [hoje])

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) { router.push('/login'); return }
      setUserId(data.user.id)
      const n = data.user.user_metadata?.nome || data.user.email?.split('@')[0] || 'Bem-vinda'
      setNome(n)
      await carregarDados(data.user.id)
      setLoading(false)
    })
  }, [])

  async function salvarAgua(copos: number) {
    if (!userId) return
    const agua_ml = copos * 250
    setCheckin(c => ({ ...c, agua_ml }))
    await supabase.from('check_ins').upsert({ user_id: userId, data: hoje, agua_ml }, { onConflict: 'user_id,data' })
  }

  async function salvarPeso() {
    if (!userId || !pesoInput) return
    setSalvando(true)
    const peso_kg = parseFloat(pesoInput)
    await supabase.from('check_ins').upsert({ user_id: userId, data: hoje, peso_kg }, { onConflict: 'user_id,data' })
    setCheckin(c => ({ ...c, peso_kg }))
    await carregarDados(userId)
    setSalvando(false)
    setSavedMsg('Peso salvo! ✓')
    setTimeout(() => setSavedMsg(''), 3000)
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <Loader2 className="w-10 h-10 animate-spin text-emerald-500 mx-auto mb-3" />
        <p className="text-gray-500 text-sm">Carregando...</p>
      </div>
    </div>
  )

  const startDate = perfil?.inicio_21dias || hoje
  const diaAtual = getDayOfProtocol(startDate)
  const fase = getPhase(diaAtual)
  const coposAgua = Math.round((checkin.agua_ml || 0) / 250)

  const pesoInicial = perfil?.peso_inicial || historico[historico.length - 1]?.peso_kg
  const pesoAtual = checkin.peso_kg || historico[0]?.peso_kg
  const perdido = pesoInicial && pesoAtual ? (pesoInicial - pesoAtual).toFixed(1) : null

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-4 py-4 sticky top-0 z-10 shadow-sm">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400 font-medium">Olá,</p>
            <h1 className="font-black text-gray-900 text-lg leading-tight">{nome} 💚</h1>
          </div>
          <button onClick={async () => { await supabase.auth.signOut(); router.push('/') }}
            className="flex items-center gap-1 text-gray-400 hover:text-gray-600 text-sm transition-colors">
            <LogOut size={16} /> Sair
          </button>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-5">

        {/* Progresso 21 dias */}
        <div className={`rounded-2xl border p-5 ${phaseBg[fase.color]}`}>
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className={`text-xs font-bold uppercase tracking-widest ${phaseText[fase.color]}`}>
                Fase {fase.phase} — {fase.name}
              </p>
              <p className="text-2xl font-black text-gray-900">Dia {diaAtual} de 21</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">Progresso</p>
              <p className={`text-2xl font-black ${phaseText[fase.color]}`}>{Math.round((diaAtual / 21) * 100)}%</p>
            </div>
          </div>
          <div className="w-full bg-white rounded-full h-3">
            <div className={`h-3 rounded-full transition-all duration-700 ${phaseColors[fase.color]}`}
              style={{ width: `${(diaAtual / 21) * 100}%` }} />
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-400">
            <span>Início</span><span>Dia 7</span><span>Dia 14</span><span>Dia 21</span>
          </div>
        </div>

        {/* Cards de resumo */}
        {(perdido || pesoAtual) && (
          <div className="grid grid-cols-2 gap-3">
            {pesoAtual && (
              <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
                <Scale size={18} className="text-emerald-500 mb-2" />
                <p className="text-2xl font-black text-gray-900">{pesoAtual} kg</p>
                <p className="text-xs text-gray-500">Peso atual</p>
              </div>
            )}
            {perdido && Number(perdido) > 0 && (
              <div className="bg-emerald-50 rounded-2xl border border-emerald-200 p-4">
                <TrendingDown size={18} className="text-emerald-600 mb-2" />
                <p className="text-2xl font-black text-emerald-700">-{perdido} kg</p>
                <p className="text-xs text-emerald-600">Já perdidos 🎉</p>
              </div>
            )}
          </div>
        )}

        {/* Check-in do dia */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
          <h2 className="font-black text-gray-900 mb-4 flex items-center gap-2">
            <CheckCircle size={20} className="text-emerald-500" /> Check-in de Hoje
          </h2>

          {/* Água */}
          <div className="mb-5">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Droplets size={16} className="text-blue-400" /> Água bebida
              </label>
              <span className="text-sm font-bold text-blue-600">{coposAgua * 250}ml / 2000ml</span>
            </div>
            <div className="flex gap-1.5">
              {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                <button key={n} onClick={() => salvarAgua(n)}
                  className={`flex-1 h-9 rounded-xl text-lg transition-all active:scale-95 ${n <= coposAgua ? 'bg-blue-400 shadow-sm' : 'bg-blue-50'}`}>
                  💧
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-1.5">Toque nos copos para registrar — salva automaticamente</p>
          </div>

          {/* Peso */}
          <div>
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-2">
              <Scale size={16} className="text-emerald-500" /> Peso de hoje (kg)
            </label>
            <div className="flex gap-3">
              <input type="number" step="0.1" placeholder="Ex: 68.5"
                value={pesoInput} onChange={e => setPesoInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && salvarPeso()}
                className="flex-1 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-gray-900 text-lg font-bold"
              />
              <button onClick={salvarPeso} disabled={salvando || !pesoInput}
                className="bg-emerald-500 text-white font-bold px-5 rounded-xl hover:bg-emerald-600 transition-colors disabled:opacity-50 flex items-center gap-2">
                {salvando ? <Loader2 size={16} className="animate-spin" /> : 'Salvar'}
              </button>
            </div>
            {savedMsg && <p className="text-emerald-600 text-sm font-semibold mt-2">{savedMsg}</p>}
          </div>
        </div>

        {/* Histórico de peso */}
        {historico.length > 1 && (
          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <h2 className="font-black text-gray-900 mb-3 flex items-center gap-2">
              <TrendingDown size={20} className="text-emerald-500" /> Últimos registros
            </h2>
            <div className="space-y-2">
              {historico.slice(0, 5).map((r, i) => (
                <div key={r.data} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                  <span className="text-sm text-gray-500">{new Date(r.data + 'T12:00:00').toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit', month: 'short' })}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-900">{r.peso_kg} kg</span>
                    {i < historico.length - 1 && historico[i + 1]?.peso_kg && (
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${r.peso_kg < historico[i + 1].peso_kg ? 'bg-emerald-100 text-emerald-700' : r.peso_kg > historico[i + 1].peso_kg ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-500'}`}>
                        {r.peso_kg < historico[i + 1].peso_kg ? '↓' : r.peso_kg > historico[i + 1].peso_kg ? '↑' : '='} {Math.abs(r.peso_kg - historico[i + 1].peso_kg).toFixed(1)}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Cardápio do dia */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
          <h2 className="font-black text-gray-900 mb-4 flex items-center gap-2">
            <Utensils size={20} className="text-orange-400" /> Cardápio de Hoje
          </h2>
          <div className="space-y-3">
            {cardapio.map(item => (
              <div key={item.refeicao} className="flex gap-3 p-3 bg-gray-50 rounded-xl">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <p className="font-bold text-gray-800 text-sm">{item.refeicao}</p>
                  <p className="text-gray-500 text-xs mt-0.5 leading-relaxed">{item.sugestao}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Receita do dia */}
        <div className="bg-gradient-to-br from-emerald-500 to-teal-400 rounded-2xl p-5 text-white">
          <h2 className="font-black mb-3">🌿 Receita do Dia — Shot Detox</h2>
          <div className="space-y-1 text-emerald-50 text-sm">
            <p>• 1 copo de água morna</p>
            <p>• Suco de 1 limão</p>
            <p>• 1 colher de chá de gengibre ralado</p>
            <p>• 1 pitada de canela</p>
            <p>• 1 colher de cúrcuma (opcional)</p>
          </div>
          <p className="mt-3 text-xs text-emerald-100 font-semibold">Tome em jejum. Fígado limpo, metabolismo ativado.</p>
        </div>

        {/* Dicas */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
          <h2 className="font-black text-gray-900 mb-4 flex items-center gap-2">
            <Trophy size={20} className="text-yellow-500" /> Dicas de Ouro
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {dicas.map(d => (
              <div key={d.titulo} className="bg-amber-50 rounded-xl p-3">
                <p className="text-xl mb-1">{d.icon}</p>
                <p className="font-bold text-gray-800 text-sm">{d.titulo}</p>
                <p className="text-xs text-gray-500 mt-0.5">{d.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 pb-4">©2025 ASBento · Corpo Novo em 21 Dias</p>
      </div>
    </div>
  )
}
