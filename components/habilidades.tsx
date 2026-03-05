'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { revealItem, staggerContainer } from '@/lib/animations'

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
}: {
  categoria: SkillCategory
}) {
  return (
    <motion.div
      variants={revealItem}
      className="hab-categoria"
    >
      <h3
        className="text-2xl font-bold mb-8 flex items-center gap-3"
      >
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
          <i className={categoria.icon}></i>
        </div>
        {categoria.title}
      </h3>
      <div className="skills-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {categoria.skills.map((skill, skillIndex) => (
          <SkillItem
            key={skillIndex}
            skill={skill}
          />
        ))}
      </div>
    </motion.div>
  )
}

function SkillItem({ skill }: { skill: Skill }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      variants={revealItem}
      whileHover={{ y: -5 }}
      className="glass-panel p-5 rounded-2xl group transition-all duration-300 border border-white/5 hover:border-primary/30"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="relative w-10 h-10 transition-transform duration-300 group-hover:scale-110">
          <Image
            src={skill.icon}
            alt={skill.name}
            fill
            className="object-contain"
          />
        </div>
        <span className="font-bold text-foreground transition-colors group-hover:text-primary">
          {skill.name}
        </span>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-xs font-bold text-muted-foreground uppercase tracking-widest">
          <span>Proficiência</span>
          <span>{skill.level}%</span>
        </div>
        <div className="h-1.5 w-full bg-secondary/50 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${skill.level}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="h-full bg-primary relative"
          >
            {isHovered && (
              <motion.div
                layoutId="shimmer"
                className="absolute inset-0 bg-white/20"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export function Habilidades() {
  const categorias: SkillCategory[] = [
    {
      title: 'Desenvolvimento Web',
      icon: 'fas fa-code',
      skills: [
        { name: 'HTML5', icon: '/assets/img/icon/html5-svgrepo-com.svg', level: 90 },
        { name: 'CSS3', icon: '/assets/img/icon/css-3-svgrepo-com.svg', level: 85 },
        { name: 'JavaScript', icon: '/assets/img/icon/javascript-svgrepo-com.svg', level: 80 },
        { name: 'TypeScript', icon: '/assets/img/icon/typescript-svgrepo-com.svg', level: 75 },
        { name: 'React', icon: '/assets/img/icon/react-svgrepo-com.svg', level: 75 },
        { name: 'Next.js', icon: '/assets/img/icon/next-js-svgrepo-com.svg', level: 75 },
        { name: 'Astro', icon: '/assets/img/icon/astro-svgrepo-com.svg', level: 70 },
        { name: 'Tailwind CSS', icon: '/assets/img/icon/tailwindcss-svgrepo-com.svg', level: 80 },
      ],
    },
    {
      title: 'Backend & Mobile',
      icon: 'fas fa-server',
      skills: [
        { name: 'Node.js', icon: '/assets/img/icon/node-js-svgrepo-com.svg', level: 70 },
        { name: 'Python', icon: '/assets/img/icon/python-svgrepo-com.svg', level: 70 },
        { name: 'PostgreSQL', icon: '/assets/img/icon/postgresql-svgrepo-com.svg', level: 65 },
        { name: 'Firebase', icon: '/assets/img/icon/firebase-svgrepo-com.svg', level: 75 },
        { name: 'React Native', icon: '/assets/img/icon/react-svgrepo-com.svg', level: 60 },
        { name: 'Docker', icon: '/assets/img/icon/docker-svgrepo-com.svg', level: 55 },
      ],
    },
    {
      title: 'Sistemas & Infraestrutura',
      icon: 'fas fa-network-wired',
      skills: [
        { name: 'Linux', icon: '/assets/img/icon/linux-tux-svgrepo-com.svg', level: 85 },
        { name: 'Redes', icon: '/assets/img/icon/server_technology_network_computer_connection_icon_175929.svg', level: 90 },
        { name: 'Git', icon: '/assets/img/icon/git-svgrepo-com.svg', level: 80 },
        { name: 'Windows Server', icon: '/assets/img/icon/windows-applications-svgrepo-com.svg', level: 80 },
        { name: 'PowerShell', icon: '/assets/img/icon/powershell-psm-svgrepo-com.svg', level: 70 },
      ],
    },
    {
      title: 'Inteligência Artificial',
      icon: 'fas fa-brain',
      skills: [
        { name: 'Engenharia de Prompt', icon: '/assets/img/icon/ai-brain-svgrepo-com.svg', level: 85 },
        { name: 'Machine Learning', icon: '/assets/img/icon/neural-network-svgrepo-com.svg', level: 70 },
        { name: 'APIs de IA', icon: '/assets/img/icon/api-svgrepo-com.svg', level: 72 },
        { name: 'Análise de Dados', icon: '/assets/img/icon/data-analysis-svgrepo-com.svg', level: 75 },
      ],
    },
  ]

  return (
    <section
      id="habilidades"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-transparent overflow-hidden"
    >
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">Habilidades & Tecnologias</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Minha caixa de ferramentas tecnológica. Sempre explorando novas stack e aprimorando as existentes.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="space-y-20"
        >
          {categorias.map((categoria) => (
            <CategorySection
              key={categoria.title}
              categoria={categoria}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

