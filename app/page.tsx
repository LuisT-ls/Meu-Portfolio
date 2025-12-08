import dynamic from 'next/dynamic'
import { Header } from '@/components/header'
import { Hero } from '@/components/hero'
import { Sobre } from '@/components/sobre'
import { Skeleton, SkeletonCard, SkeletonForm, SkeletonText } from '@/components/skeleton'

// Code splitting: componentes abaixo da dobra são carregados sob demanda
const Experiencia = dynamic(() => import('@/components/experiencia').then((mod) => ({ default: mod.Experiencia })), {
  loading: () => (
    <section className="section-experiencia section-padding py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
      <div className="container mx-auto">
        <SkeletonText lines={1} />
        <div className="space-y-4 mt-8">
          <Skeleton variant="rectangular" height={96} />
          <Skeleton variant="rectangular" height={96} />
        </div>
      </div>
    </section>
  ),
})

const Certificacoes = dynamic(() => import('@/components/certificacoes').then((mod) => ({ default: mod.Certificacoes })), {
  loading: () => (
    <section className="section-certificacoes section-padding py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto">
        <Skeleton variant="text" height={32} width="33%" className="mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    </section>
  ),
})

const Habilidades = dynamic(() => import('@/components/habilidades').then((mod) => ({ default: mod.Habilidades })), {
  loading: () => (
    <section className="section-habilidades section-padding py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
      <div className="container mx-auto">
        <Skeleton variant="text" height={32} width="33%" className="mb-8" />
        <div className="space-y-4">
          <Skeleton variant="rectangular" height={64} />
          <Skeleton variant="rectangular" height={64} />
        </div>
      </div>
    </section>
  ),
})

const Contato = dynamic(() => import('@/components/contato').then((mod) => ({ default: mod.Contato })), {
  loading: () => (
    <section className="section-contato section-padding py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto">
        <Skeleton variant="text" height={32} width="33%" className="mb-8" />
        <SkeletonForm />
      </div>
    </section>
  ),
})

const Footer = dynamic(() => import('@/components/footer').then((mod) => ({ default: mod.Footer })), {
  loading: () => (
    <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="animate-pulse">
          <div className="h-32 bg-gray-800 rounded"></div>
        </div>
      </div>
    </footer>
  ),
})

const BackToTop = dynamic(() => import('@/components/back-to-top').then((mod) => ({ default: mod.BackToTop })))

export default function Home() {
  return (
    <>
      <Header />
      <main id="main-content" role="main">
        <Hero />
        <Sobre />
        <Experiencia />
        <Certificacoes />
        <Habilidades />
        <Contato />
      </main>
      <Footer />
      <BackToTop />
    </>
  )
}

