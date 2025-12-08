'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useInView } from '@/hooks/use-in-view'
import { cn } from '@/lib/utils'

interface Skill {
  name: string
  icon: string
  level: number
}

interface SkillCategory {
  title: string
  icon: string
  skills: Skill[]
}

function CategorySection({
  categoria,
  catIndex,
}: {
  categoria: SkillCategory
  catIndex: number
}) {
  const [catRef, catInView] = useInView<HTMLDivElement>({
    once: true,
    rootMargin: '-100px',
  })

  return (
    <div
      ref={catRef}
      className={cn(
        'hab-categoria transition-all duration-700 ease-out',
        catInView
          ? 'opacity-100 translate-x-0'
          : 'opacity-0 -translate-x-8'
      )}
      style={{
        transitionDelay: catInView ? `${catIndex * 200}ms` : '0ms',
      }}
    >
      <h3
        className={cn(
          'text-2xl font-semibold mb-6 text-gray-900 dark:text-white flex items-center gap-3',
          'transition-all duration-500'
        )}
      >
        <i
          className={cn(
            categoria.icon,
            'text-primary transition-transform duration-300'
          )}
          style={{
            animation: catInView
              ? 'bounce 1s ease-in-out 0.5s'
              : 'none',
          }}
        ></i>
        {categoria.title}
      </h3>
      <div className="skills-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {categoria.skills.map((skill, skillIndex) => (
          <SkillItem
            key={skillIndex}
            skill={skill}
            delay={catIndex * 150 + skillIndex * 75}
          />
        ))}
      </div>
    </div>
  )
}

function SkillItem({ skill, delay = 0 }: { skill: Skill; delay?: number }) {
  const [width, setWidth] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [ref, isInView] = useInView<HTMLDivElement>({ once: true, rootMargin: '-100px' })

  useEffect(() => {
    if (!isInView) return

    const timer = setTimeout(() => {
      setIsAnimating(true)
      setWidth(skill.level)
    }, delay)

    return () => clearTimeout(timer)
  }, [isInView, skill.level, delay])

  return (
    <div
      ref={ref}
      className={cn(
        'skill-item p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md',
        'transition-all duration-300 ease-out',
        'hover:shadow-xl hover:scale-105 hover:-translate-y-1',
        'border border-transparent hover:border-primary/20',
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      )}
      data-skill={skill.name}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transitionDelay: isInView ? `${delay}ms` : '0ms',
      }}
    >
      <div className="skill-header flex items-center gap-3 mb-3">
        <div
          className={cn(
            'transition-transform duration-300',
            isHovered && 'scale-110 rotate-3'
          )}
        >
          <Image
            src={skill.icon}
            alt={`${skill.name} icon`}
            width={32}
            height={32}
            sizes="32px"
            className="w-8 h-8"
            loading="lazy"
            quality={85}
          />
        </div>
        <span className="font-medium text-gray-900 dark:text-white transition-colors">
          {skill.name}
        </span>
      </div>
      <div className="skill-level relative h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          className={cn(
            'progress-bar h-full bg-gradient-to-r from-primary to-primary/80',
            'transition-all duration-1000 ease-out',
            'relative overflow-hidden',
            isAnimating && width === skill.level && 'animate-pulse'
          )}
          style={{ width: `${width}%` }}
        >
          <div
            className={cn(
              'absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent',
              'animate-shimmer',
              isAnimating && 'opacity-100'
            )}
            style={{
              animation: isAnimating
                ? 'shimmer 2s infinite'
                : 'none',
            }}
          ></div>
        </div>
        {isAnimating && (
          <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-semibold text-primary">
            {width}%
          </span>
        )}
      </div>
    </div>
  )
}

export function Habilidades() {
  const categorias: SkillCategory[] = [
    {
      title: 'Desenvolvimento Web',
      icon: 'fas fa-code',
      skills: [
        { name: 'HTML5', icon: '/assets/img/icon/html-templates-svgrepo-com.svg', level: 85 },
        { name: 'CSS3', icon: '/assets/img/icon/css-3-svgrepo-com.svg', level: 80 },
        { name: 'JavaScript', icon: '/assets/img/icon/javascript-svgrepo-com.svg', level: 75 },
        { name: 'React', icon: '/assets/img/icon/react-svgrepo-com.svg', level: 72 },
        { name: 'Next.js', icon: '/assets/img/icon/next-js-svgrepo-com.svg', level: 70 },
        { name: 'TypeScript', icon: '/assets/img/icon/typescript-svgrepo-com.svg', level: 68 },
        { name: 'Mobile-first', icon: '/assets/img/icon/responsive-design-svgrepo-com.svg', level: 78 },
        { name: 'Node.js', icon: '/assets/img/icon/node-js-svgrepo-com.svg', level: 70 },
      ],
    },
    {
      title: 'Sistemas e Infraestrutura',
      icon: 'fas fa-server',
      skills: [
        { name: 'Linux', icon: '/assets/img/icon/linux-tux-svgrepo-com.svg', level: 85 },
        { name: 'Windows Server', icon: '/assets/img/icon/windows-applications-svgrepo-com.svg', level: 80 },
        { name: 'Redes', icon: '/assets/img/icon/server_technology_network_computer_connection_icon_175929.svg', level: 90 },
        { name: 'Virtualização', icon: '/assets/img/icon/vmware-svgrepo-com.svg', level: 80 },
      ],
    },
    {
      title: 'Ferramentas e Tecnologias',
      icon: 'fas fa-tools',
      skills: [
        { name: 'Git', icon: '/assets/img/icon/git-svgrepo-com.svg', level: 80 },
        { name: 'PowerShell', icon: '/assets/img/icon/powershell-psm-svgrepo-com.svg', level: 70 },
        { name: 'SQL', icon: '/assets/img/icon/sql-svgrepo-com.svg', level: 70 },
        { name: 'Firebase', icon: '/assets/img/icon/firebase-svgrepo-com.svg', level: 75 },
        { name: 'Google Analytics', icon: '/assets/img/icon/google-analytics-svgrepo-com.svg', level: 65 },
      ],
    },
    {
      title: 'Inteligência Artificial',
      icon: 'fas fa-brain',
      skills: [
        { name: 'Engenharia de Prompt', icon: '/assets/img/icon/ai-brain-svgrepo-com.svg', level: 85 },
        { name: 'Machine Learning', icon: '/assets/img/icon/neural-network-svgrepo-com.svg', level: 70 },
        { name: 'ChatGPT', icon: '/assets/img/icon/chatbot-svgrepo-com.svg', level: 80 },
        { name: 'Análise de Dados', icon: '/assets/img/icon/data-analysis-svgrepo-com.svg', level: 75 },
        { name: 'Automação com IA', icon: '/assets/img/icon/automation-svgrepo-com.svg', level: 72 },
        { name: 'APIs de IA', icon: '/assets/img/icon/api-svgrepo-com.svg', level: 68 },
      ],
    },
  ]

  const [sectionRef, sectionInView] = useInView<HTMLElement>({ once: true, rootMargin: '-50px' })

  return (
    <section
      id="habilidades"
      ref={sectionRef}
      className="section-habilidades section-padding py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900"
    >
      <div className="container mx-auto">
        <h2
          className={cn(
            'section-title text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white',
            'transition-all duration-700 ease-out',
            sectionInView
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 -translate-y-8'
          )}
        >
          Habilidades e Competências
        </h2>
        <div className="hab-categorias space-y-12">
          {categorias.map((categoria, catIndex) => (
            <CategorySection
              key={catIndex}
              categoria={categoria}
              catIndex={catIndex}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

