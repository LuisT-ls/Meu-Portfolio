'use client'

import { useEffect, useState } from 'react'
import { useInView } from '@/hooks/use-in-view'
import { cn } from '@/lib/utils'

interface StatItemProps {
  icon: string
  count: number
  label: string
  highlight?: boolean
  delay?: number
}

function StatItem({ icon, count, label, highlight, delay = 0 }: StatItemProps) {
  const [displayCount, setDisplayCount] = useState(0)
  const [ref, isInView] = useInView<HTMLDivElement>({ once: true, rootMargin: '-100px' })

  useEffect(() => {
    if (!isInView) return

    const duration = 2000
    const frameDuration = 1000 / 60
    const increment = count / (duration / frameDuration)
    let current = 0

    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        current += increment
        if (current >= count) {
          setDisplayCount(count)
          clearInterval(interval)
        } else {
          setDisplayCount(Math.floor(current))
        }
      }, frameDuration)

      return () => clearInterval(interval)
    }, delay)

    return () => {
      clearTimeout(timer)
    }
  }, [isInView, count, delay])

  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  }

  const plus = count >= 100 ? '+' : ''

  return (
    <div
      ref={ref}
      className={cn(
        'stat-item p-6 rounded-lg bg-surface shadow-md text-center',
        highlight ? 'ring-2 ring-brand' : ''
      )}
      role="figure"
    >
      <div className="stat-icon text-3xl text-brand mb-4">
        <i className={icon}></i>
      </div>
      <span className="stat-number text-3xl font-bold text-content block mb-2">
        {formatNumber(displayCount)}{plus}
      </span>
      <span className="stat-label text-content-secondary">
        {label}
      </span>
    </div>
  )
}

export function StatsCounter() {
  const stats = [
    { icon: 'fas fa-clock', count: 4, label: 'Anos de Experiência' },
    { icon: 'fab fa-github', count: 35, label: 'Repositórios no GitHub' },
    { icon: 'fas fa-certificate', count: 4, label: 'Certificações Técnicas' },
    { icon: 'fas fa-code', count: 20, label: 'Tecnologias Utilizadas' },
  ]

  return (
    <div className="stats-grid grid grid-cols-2 gap-4">
      {stats.map((stat, index) => (
        <StatItem
          key={index}
          icon={stat.icon}
          count={stat.count}
          label={stat.label}

          delay={index * 200}
        />
      ))}
    </div>
  )
}

