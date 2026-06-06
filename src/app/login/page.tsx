'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const supabase = createClient()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError('E-mail ou senha incorretos.')
      setLoading(false)
    } else {
      router.push('/dashboard')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-gray-900">Corpo Novo em 21 Dias</h1>
          <p className="text-gray-500 mt-2">Bem-vinda de volta 💚</p>
        </div>
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
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
              <input
                type="password" value={password} onChange={e => setPassword(e.target.value)} required
                placeholder="Sua senha"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-gray-900"
              />
            </div>
            {error && <p className="text-red-500 text-sm bg-red-50 rounded-xl p-3">{error}</p>}
            <button type="submit" disabled={loading}
              className="w-full bg-emerald-600 text-white font-bold py-4 rounded-2xl hover:bg-emerald-700 transition-colors disabled:opacity-50">
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>
          <p className="text-center text-sm text-gray-500 mt-6">
            Não tem conta?{' '}
            <Link href="/cadastro" className="text-emerald-600 font-semibold hover:underline">Criar grátis</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
