'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowRight, Eye, EyeOff } from 'lucide-react'

export default function Cadastro() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nome, setNome] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const supabase = createClient()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { nome } },
    })
    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push('/onboarding')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-gray-900">Corpo Novo em 21 Dias</h1>
          <p className="text-gray-500 mt-2">Crie sua conta — 7 dias grátis, sem cartão</p>
        </div>
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Seu nome</label>
              <input
                type="text" value={nome} onChange={e => setNome(e.target.value)} required
                placeholder="Como posso te chamar?"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">E-mail</label>
              <input
                type="email" value={email} onChange={e => setEmail(e.target.value)} required
                placeholder="seu@email.com"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Senha</label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} required
                  placeholder="Mínimo 6 caracteres"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-gray-900"
                />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            {error && <p className="text-red-500 text-sm bg-red-50 rounded-xl p-3">{error}</p>}
            <button type="submit" disabled={loading}
              className="w-full bg-emerald-600 text-white font-bold py-4 rounded-2xl hover:bg-emerald-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
              {loading ? 'Criando conta...' : <><span>Começar Grátis por 7 Dias</span><ArrowRight size={18} /></>}
            </button>
          </form>
          <p className="text-center text-sm text-gray-500 mt-6">
            Já tem conta?{' '}
            <Link href="/login" className="text-emerald-600 font-semibold hover:underline">Entrar</Link>
          </p>
        </div>
        <p className="text-center text-xs text-gray-400 mt-6">✓ Sem cartão de crédito &nbsp;·&nbsp; ✓ Cancele quando quiser</p>
      </div>
    </div>
  )
}
