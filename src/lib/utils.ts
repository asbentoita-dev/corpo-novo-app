import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getDayOfProtocol(startDate: string): number {
  const start = new Date(startDate)
  const today = new Date()
  const diff = Math.floor((today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
  return Math.min(Math.max(diff + 1, 1), 21)
}

export function getPhase(day: number): { phase: number; name: string; color: string } {
  if (day <= 7) return { phase: 1, name: 'O Reset', color: 'emerald' }
  if (day <= 14) return { phase: 2, name: 'A Queima', color: 'orange' }
  return { phase: 3, name: 'A Transformação', color: 'purple' }
}
