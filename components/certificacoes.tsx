'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useInView } from '@/hooks/use-in-view'
import { cn } from '@/lib/utils'

function CertificacaoCard({
  cert,
  index,
}: {
  cert: {
    logo: string
    alt: string
    titulo: string
    data: string
    descricao: string
    skills: string[]
    link: string
    external?: boolean
  }
  index: number
}) {
  const [isHovered, setIsHovered] = useState(false)
  const [ref, isInView] = useInView<HTMLElement>({ once: true, rootMargin: '-100px' })

  return (
    <article
      ref={ref}
      className={cn(
        'certificacao bg-surface p-6 rounded-lg shadow-md',
        'transition-all duration-500 ease-out',
        'hover:shadow-xl hover:scale-105 hover:-translate-y-2',
        'border border-transparent hover:border-brand/20',
        isInView
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-8'
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transitionDelay: isInView ? `${index * 150}ms` : '0ms',
      }}
    >
      <div className="cert-logo mb-4 flex justify-center">
        <div
          className={cn(
            'transition-all duration-300',
            isHovered && 'scale-110 rotate-6'
          )}
        >
          <Image
            src={cert.logo}
            alt={cert.alt}
            width={80}
            height={80}
            sizes="80px"
            className="w-20 h-20 object-contain"
            loading="lazy"
            quality={85}
          />
        </div>
      </div>
      <div className="cert-info">
        <h3
          className={cn(
            'text-xl font-semibold mb-2 text-content',
            'transition-colors duration-300',
            isHovered && 'text-brand'
          )}
        >
          {cert.titulo}
        </h3>
        <time className="text-sm text-content-secondary block mb-2">
          {cert.data}
        </time>
        <p className="text-content-secondary mb-4">
          {cert.descricao}
        </p>
        <div className="cert-skills flex flex-wrap gap-2 mb-4">
          {cert.skills.map((skill, i) => (
            <span
              key={i}
              className={cn(
                'px-3 py-1 bg-brand/10 text-brand rounded-full text-sm',
                'transition-all duration-300',
                isHovered && 'bg-brand/20 scale-105'
              )}
              style={{
                transitionDelay: isHovered ? `${i * 50}ms` : '0ms',
              }}
            >
              {skill}
            </span>
          ))}
        </div>
        <a
          href={cert.link}
          target={cert.external ? '_blank' : undefined}
          rel={cert.external ? 'noopener noreferrer' : undefined}
          className={cn(
            'cert-link inline-flex items-center gap-2 text-brand',
            'transition-all duration-300',
            'hover:text-brand/80 hover:gap-3',
            isHovered && 'font-semibold'
          )}
        >
          <i className="fas fa-external-link-alt"></i>
          {cert.external ? 'Verificar Credencial' : 'Verificar Certificado'}
        </a>
      </div>
    </article>
  )
}

export function Certificacoes() {
  const certificacoes = [
    {
      logo: '/assets/img/icon/cisco-svgrepo-com.svg',
      alt: 'Cisco Logo',
      titulo: 'CCNA - Cisco Certified Network Associate',
      data: 'Novembro 2019',
      descricao:
        'Certificação em redes de computadores, incluindo roteamento, switching e segurança.',
      skills: ['Redes', 'Segurança', 'Routing'],
      link: '/Data/Certificado Introduction to Cybersecurity.pdf',
    },
    {
      logo: '/assets/img/icon/rocketseat.svg',
      alt: 'Rocketseat Logo',
      titulo: 'Rocketseat School',
      data: 'Dezembro 2024',
      descricao:
        'Estudos para formação e aprimoramento de técnicas e tecnologias para full-stack.',
      skills: ['Front-end', 'Back-end'],
      link: 'https://app.rocketseat.com.br/certificates/c2c69bcb-9be2-4b09-a3a8-92862b65052c',
      external: true,
    },
    {
      logo: '/assets/img/SENAI.png',
      alt: 'SENAI CIMATEC Logo',
      titulo: 'Redes de Computadores',
      data: 'Julho 2018',
      descricao:
        'Curso técnico em redes de computadores com foco em infraestrutura, protocolos de comunicação e administração de sistemas de rede.',
      skills: ['Redes', 'Infraestrutura', 'Protocolos'],
      link: '/Data/Certificado Curso Técnico.pdf',
    },
  ]

  const [sectionRef, sectionInView] = useInView<HTMLElement>({ once: true, rootMargin: '-50px' })

  return (
    <section
      id="certificacoes"
      ref={sectionRef}
      className="section-certificacoes section-padding py-20 px-4 sm:px-6 lg:px-8 bg-surface"
    >
      <div className="container mx-auto">
        <h2
          className={cn(
            'section-title text-3xl sm:text-4xl font-bold text-center mb-12 text-content',
            'transition-all duration-700 ease-out',
            sectionInView
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 -translate-y-8'
          )}
        >
          Certificações
        </h2>
        <div className="cert-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificacoes.map((cert, index) => (
            <CertificacaoCard key={index} cert={cert} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

