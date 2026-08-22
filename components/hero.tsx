'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { revealItem, staggerContainer } from '@/lib/animations'

type HeroIntentId = 'contract' | 'projects' | 'recruiter'

type HeroIntent = {
  id: HeroIntentId
  label: string
  eyebrow: string
  highlight: string
  description: string
  primaryLabel: string
  primaryHref: string
  secondaryLabel: string
  secondaryHref: string
  panelLabel: string
  panelTitle: string
  panelDescription: string
  panelSteps: Array<{ label: string; value: string }>
}

const heroIntents: [HeroIntent, HeroIntent, HeroIntent] = [
  {
    id: 'contract',
    label: 'Quero contratar',
    eyebrow: 'Do briefing ao produto',
    highlight: 'que resolve de verdade.',
    description:
      'Junto contexto, experiência e engenharia para transformar uma ideia importante em uma entrega clara, segura e pronta para evoluir.',
    primaryLabel: 'Falar sobre um projeto',
    primaryHref: '#contato',
    secondaryLabel: 'Como eu trabalho',
    secondaryHref: '#sobre',
    panelLabel: 'PERSPECTIVA DE PRODUTO',
    panelTitle: 'Clareza antes de complexidade.',
    panelDescription:
      'Cada decisão conecta o que a pessoa precisa ao que o produto precisa sustentar.',
    panelSteps: [
      { label: 'Contexto', value: 'entender' },
      { label: 'Direção', value: 'simplificar' },
      { label: 'Entrega', value: 'evoluir' },
    ],
  },
  {
    id: 'projects',
    label: 'Quero conhecer os projetos',
    eyebrow: 'Cases com contexto',
    highlight: 'que contam uma boa história.',
    description:
      'Explore projetos com o raciocínio por trás da interface, as decisões de arquitetura e os aprendizados que ficaram.',
    primaryLabel: 'Explorar projetos',
    primaryHref: '#projetos',
    secondaryLabel: 'Ver minha trajetória',
    secondaryHref: '#experiencia',
    panelLabel: 'CASES EM DESTAQUE',
    panelTitle: 'Código é parte da história.',
    panelDescription:
      'Um bom case mostra o problema, as escolhas e o impacto, não apenas a tela final.',
    panelSteps: [
      { label: 'Problema', value: 'enquadrar' },
      { label: 'Decisões', value: 'explicar' },
      { label: 'Aprendizado', value: 'compartilhar' },
    ],
  },
  {
    id: 'recruiter',
    label: 'Sou recrutador',
    eyebrow: 'Visão ponta a ponta',
    highlight: 'que aguenta crescer.',
    description:
      'Uma visão de engenharia de produto que combina autonomia, colaboração e cuidado com a base técnica.',
    primaryLabel: 'Ver experiência',
    primaryHref: '#experiencia',
    secondaryLabel: 'Baixar currículo',
    secondaryHref: '/Data/Curr%C3%ADculo-Lu%C3%ADs%20Teixeira.pdf',
    panelLabel: 'ENGENHARIA FULL-STACK',
    panelTitle: 'Visão ampla, execução cuidadosa.',
    panelDescription:
      'Do primeiro componente ao fluxo em produção, com decisões que permanecem compreensíveis.',
    panelSteps: [
      { label: 'Produto', value: 'priorizar' },
      { label: 'Código', value: 'construir' },
      { label: 'Time', value: 'colaborar' },
    ],
  },
]

const intentIcons: Record<HeroIntentId, string> = {
  contract: 'fa-comments',
  projects: 'fa-layer-group',
  recruiter: 'fa-compass',
}

function getNextIntentId(currentId: HeroIntentId): HeroIntentId {
  const currentIndex = heroIntents.findIndex((intent) => intent.id === currentId)
  const nextIndex = (currentIndex + 1) % heroIntents.length
  return heroIntents[nextIndex]?.id ?? heroIntents[0].id
}

function StudioCanvas({ intent, reduceMotion }: { intent: HeroIntent; reduceMotion: boolean }) {
  return (
    <div className="relative mx-auto w-full max-w-xl">
      <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-brand/10 blur-3xl" aria-hidden="true" />

      <div className="rounded-[2rem] border border-line bg-surface/90 p-3 shadow-2xl backdrop-blur-xl">
        <div className="overflow-hidden rounded-[1.5rem] border border-line bg-surface-inset">
          <div className="flex items-center justify-between border-b border-line px-5 py-4 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-content-muted">
            <span>Luís / Product studio</span>
            <span className="flex items-center gap-2 text-ok">
              <span className="h-1.5 w-1.5 rounded-full bg-ok" aria-hidden="true" />
              disponível
            </span>
          </div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={intent.id}
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -10 }}
              transition={{ duration: reduceMotion ? 0 : 0.24, ease: 'easeOut' }}
              className="p-5 sm:p-7"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-brand">
                  {intent.panelLabel}
                </span>
                <span className="font-mono text-xs text-content-muted">0{heroIntents.indexOf(intent) + 1} / 03</span>
              </div>

              <div className="mt-8 max-w-sm">
                <p className="text-2xl font-bold leading-tight tracking-tight text-content sm:text-3xl">
                  {intent.panelTitle}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-content-secondary">
                  {intent.panelDescription}
                </p>
              </div>

              <div className="mt-8 grid grid-cols-3 gap-2 border-t border-line pt-4">
                {intent.panelSteps.map((step, index) => (
                  <div key={step.label} className="relative pr-2">
                    {index < intent.panelSteps.length - 1 && (
                      <span className="absolute right-1 top-1.5 h-px w-2 bg-line-strong" aria-hidden="true" />
                    )}
                    <span className="block text-[0.65rem] font-bold uppercase tracking-wider text-content-muted">
                      {step.label}
                    </span>
                    <span className="mt-1 block text-sm font-semibold text-content">{step.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-between gap-4 px-3 pb-1 pt-4 text-xs text-content-muted">
          <span>Interação, performance e escala</span>
          <span className="font-mono text-brand">/01</span>
        </div>

        <div className="mx-3 mt-3 h-0.5 overflow-hidden rounded-full bg-line" aria-hidden="true">
          <motion.div
            key={intent.id}
            initial={reduceMotion ? false : { scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: reduceMotion ? 0 : 4, ease: 'linear' }}
            className="h-full origin-left rounded-full bg-brand/70"
          />
        </div>
      </div>
    </div>
  )
}

export function Hero() {
  const [activeIntentId, setActiveIntentId] = useState<HeroIntentId>('contract')
  const reduceMotion = useReducedMotion() ?? false
  const activeIntent = heroIntents.find((intent) => intent.id === activeIntentId) ?? heroIntents[0]

  useEffect(() => {
    if (reduceMotion) return

    const intervalId = window.setInterval(() => {
      setActiveIntentId((currentId) => getNextIntentId(currentId))
    }, 4000)

    return () => window.clearInterval(intervalId)
  }, [reduceMotion])

  return (
    <section
      id="inicio"
      className="relative flex min-h-[min(780px,100svh)] items-center overflow-hidden px-4 pb-12 pt-24 sm:px-6 lg:px-8"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-20 opacity-40 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]"
        style={{
          backgroundImage:
            'linear-gradient(to right, hsl(var(--line) / 0.28) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--line) / 0.28) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-96 w-96 -translate-x-1/2 rounded-full bg-brand/10 blur-[140px]" aria-hidden="true" />

      <div className="container mx-auto w-full max-w-7xl">
        <motion.div
          variants={staggerContainer}
          initial={reduceMotion ? false : 'initial'}
          animate="animate"
          className="grid items-start gap-10 xl:grid-cols-2 xl:gap-14"
        >
          <div className="max-w-3xl text-center xl:text-left">
            <motion.div variants={revealItem} className="flex items-center justify-center gap-3 text-sm font-semibold text-content-secondary xl:justify-start">
              <span className="flex items-center gap-2 text-ok">
                <span className="h-2 w-2 rounded-full bg-ok shadow-[0_0_0_4px_hsl(var(--ok)/0.12)]" aria-hidden="true" />
                Disponível para novos desafios
              </span>
              <span className="hidden text-content-muted sm:inline" aria-hidden="true">/</span>
              <span className="hidden font-mono text-xs text-content-muted sm:inline">LUÍS TEIXEIRA</span>
            </motion.div>

            <motion.h1 variants={revealItem} className="mt-6 max-w-2xl text-4xl font-bold leading-[1.05] tracking-display text-content sm:text-5xl lg:text-6xl">
              Transformo problemas complexos em produtos digitais{' '}
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={activeIntent.id}
                  initial={reduceMotion ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={reduceMotion ? undefined : { opacity: 0 }}
                  transition={{ duration: reduceMotion ? 0 : 0.24, ease: 'easeOut' }}
                  className="text-gradient"
                >
                  {activeIntent.highlight}
                </motion.span>
              </AnimatePresence>
            </motion.h1>

            <motion.p variants={revealItem} className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-content-secondary sm:text-lg xl:mx-0">
              {activeIntent.description}
            </motion.p>

            <motion.div variants={revealItem} className="mt-8">
              <p className="mb-3 text-xs font-bold uppercase tracking-caps text-content-muted">Comece por aqui</p>
              <div className="grid gap-2 sm:grid-cols-3 lg:max-w-2xl">
                {heroIntents.map((intent, index) => {
                  const isActive = intent.id === activeIntent.id

                  return (
                    <button
                      key={intent.id}
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => setActiveIntentId(intent.id)}
                      className={`group rounded-2xl border p-4 text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas ${
                        isActive
                          ? 'border-brand/50 bg-brand/10 shadow-[0_0_0_1px_hsl(var(--brand)/0.12)]'
                          : 'border-line bg-surface/60 hover:border-line-strong hover:bg-surface'
                      }`}
                    >
                      <span className={`flex items-center justify-between text-xs font-bold ${isActive ? 'text-brand' : 'text-content-muted'}`}>
                        <span>0{index + 1}</span>
                        <i className={`fas ${intentIcons[intent.id]} transition-transform duration-200 group-hover:translate-x-0.5`} aria-hidden="true" />
                      </span>
                      <span className={`mt-4 block text-sm font-semibold leading-snug ${isActive ? 'text-content' : 'text-content-secondary'}`}>
                        {intent.label}
                      </span>
                    </button>
                  )
                })}
              </div>
            </motion.div>

            <motion.div variants={revealItem} className="mt-6 flex flex-col justify-center gap-3 sm:flex-row xl:justify-start">
              <Link
                href={activeIntent.primaryHref}
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3.5 font-bold text-content-on-brand transition-all hover:bg-brand-hover hover:shadow-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
              >
                {activeIntent.primaryLabel}
                <i className="fas fa-arrow-right transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
              <Link
                href={activeIntent.secondaryHref}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-line bg-surface/70 px-6 py-3.5 font-bold text-content transition-all hover:border-brand/40 hover:bg-surface hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
              >
                {activeIntent.secondaryLabel}
              </Link>
            </motion.div>

            <motion.div variants={revealItem} className="mt-8 flex items-center justify-center gap-3 text-sm text-content-muted xl:justify-start">
              <Link href="#projetos" className="group inline-flex items-center gap-2 transition-colors hover:text-content">
                Explorar portfólio
                <i className="fas fa-arrow-down text-xs transition-transform group-hover:translate-y-1" aria-hidden="true" />
              </Link>
              <span aria-hidden="true">·</span>
              <span>{activeIntent.eyebrow}</span>
            </motion.div>
          </div>

          <motion.div variants={revealItem} className="xl:justify-self-end xl:pt-56">
            <StudioCanvas intent={activeIntent} reduceMotion={reduceMotion} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
