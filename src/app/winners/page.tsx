'use client'

import { useTranslations } from 'next-intl'
import { WinnersHistory } from '@/components/game/WinnersHistory'
import { Trophy } from 'lucide-react'

export default function WinnersPage() {
  const t = useTranslations('winners')

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <Trophy className="h-16 w-16 mx-auto mb-4 text-amber-500" />
        <h1 className="text-3xl font-bold text-white mb-2">{t('title')}</h1>
        <p className="text-slate-400">
          Celebrating our lucky winners from past games
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <WinnersHistory />
      </div>
    </div>
  )
}
