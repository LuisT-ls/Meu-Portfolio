import { Header } from '@/components/header'
import { Hero } from '@/components/hero'
import { Sobre } from '@/components/sobre'
import { Experiencia } from '@/components/experiencia'
import { Certificacoes } from '@/components/certificacoes'
import { Habilidades } from '@/components/habilidades'
import { Contato } from '@/components/contato'
import { Footer } from '@/components/footer'
import { BackToTop } from '@/components/back-to-top'

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

