import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-05-27.dahlia',
})

export const PLANS = {
  monthly: {
    priceId: process.env.STRIPE_PRICE_MONTHLY!,
    name: 'Plano Mensal',
    price: 'R$ 29,90/mês',
    description: 'menos de R$ 1 por dia',
  },
  annual: {
    priceId: process.env.STRIPE_PRICE_ANNUAL!,
    name: 'Plano Anual',
    price: 'R$ 197/ano',
    description: 'ECONOMIZE 45%',
    badge: 'mais popular!',
  },
}
