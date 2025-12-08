'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from '@/hooks/use-in-view'

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
      className={`stat-item p-6 rounded-lg bg-white dark:bg-gray-800 shadow-md text-center ${
        highlight ? 'ring-2 ring-primary' : ''
      }`}
      role="figure"
    >
      <div className="stat-icon text-3xl text-primary mb-4">
        <i className={icon}></i>
      </div>
      <span className="stat-number text-3xl font-bold text-gray-900 dark:text-white block mb-2">
        {formatNumber(displayCount)}{plus}
      </span>
      <span className="stat-label text-gray-600 dark:text-gray-400">
        {label}
      </span>
    </div>
  )
}

export function StatsCounter() {
  const stats = [
    { icon: 'fas fa-clock', count: 2, label: 'Anos de Experiência' },
    { icon: 'fas fa-project-diagram', count: 10, label: 'Projetos Completados' },
    { icon: 'fas fa-certificate', count: 5, label: 'Certificações Técnicas' },
    { icon: 'fas fa-code', count: 6, label: 'Tecnologias Dominadas' },
    { icon: 'fas fa-users', count: 20, label: 'Clientes Atendidos', highlight: true },
    { icon: 'fas fa-headset', count: 1500, label: 'Horas de Suporte', highlight: true },
  ]

  return (
    <div className="stats-grid grid grid-cols-2 md:grid-cols-3 gap-4">
      {stats.map((stat, index) => (
        <StatItem
          key={index}
          icon={stat.icon}
          count={stat.count}
          label={stat.label}
          highlight={stat.highlight}
          delay={index * 200}
        />
      ))}
    </div>
  )
}

