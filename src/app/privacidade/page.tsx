export default function Privacidade() {
  return (
    <main className="min-h-screen bg-white px-4 py-16">
      <div className="max-w-2xl mx-auto prose prose-gray">
        <h1 className="text-3xl font-black text-gray-900 mb-2">Política de Privacidade</h1>
        <p className="text-gray-500 text-sm mb-8">Última atualização: junho de 2025</p>

        <div className="space-y-8 text-gray-700">
          <section>
            <h2 className="text-xl font-black text-gray-900 mb-3">1. Informações que coletamos</h2>
            <p className="text-sm leading-relaxed">Coletamos as informações que você nos fornece ao criar sua conta: nome, e-mail, peso, altura, idade e peso meta. Esses dados são usados exclusivamente para personalizar sua experiência no app.</p>
          </section>

          <section>
            <h2 className="text-xl font-black text-gray-900 mb-3">2. Como usamos suas informações</h2>
            <ul className="text-sm leading-relaxed space-y-2 list-disc pl-5">
              <li>Personalizar cardápios e recomendações do protocolo de 21 dias</li>
              <li>Acompanhar seu progresso de peso e hidratação</li>
              <li>Enviar lembretes e alertas relacionados ao método</li>
              <li>Processar pagamentos de assinatura via Kiwify</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-black text-gray-900 mb-3">3. Compartilhamento de dados</h2>
            <p className="text-sm leading-relaxed">Não vendemos nem compartilhamos seus dados pessoais com terceiros, exceto com os provedores de serviço necessários para o funcionamento do app (Supabase para banco de dados, Kiwify para pagamentos).</p>
          </section>

          <section>
            <h2 className="text-xl font-black text-gray-900 mb-3">4. Segurança</h2>
            <p className="text-sm leading-relaxed">Seus dados são armazenados com criptografia e proteção por Row Level Security (RLS), garantindo que apenas você acesse suas informações.</p>
          </section>

          <section>
            <h2 className="text-xl font-black text-gray-900 mb-3">5. Seus direitos</h2>
            <p className="text-sm leading-relaxed">Você pode solicitar a exclusão dos seus dados a qualquer momento entrando em contato pelo e-mail abaixo. Também pode cancelar sua assinatura quando quiser, sem burocracia.</p>
          </section>

          <section>
            <h2 className="text-xl font-black text-gray-900 mb-3">6. Contato</h2>
            <p className="text-sm leading-relaxed">Para dúvidas sobre privacidade: <a href="mailto:asbento.ita@gmail.com" className="text-emerald-600 font-semibold">asbento.ita@gmail.com</a></p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-100">
          <p className="text-xs text-gray-400 text-center">© 2025 ASBento · Corpo Novo em 21 Dias · <a href="/" className="text-emerald-600">Voltar ao app</a></p>
        </div>
      </div>
    </main>
  )
}
