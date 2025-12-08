'use client'

import Image from 'next/image'
import Link from 'next/link'

export function Hero() {
  return (
    <section className="hero min-h-screen flex items-center pt-20 pb-12 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="text-center lg:text-left animate-fade-in">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-gray-900 dark:text-white">
              Olá, eu sou{' '}
              <span className="text-primary">Luís Teixeira</span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-8">
              Desenvolvedor Web & Especialista em Tecnologia
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="https://github.com/LuisT-ls?tab=repositories"
                target="_blank"
                rel="noopener"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                <i className="fab fa-github"></i>
                Ver Projetos
              </Link>
              <Link
                href="#contato"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                <i className="fas fa-envelope"></i>
                Contato
              </Link>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end animate-slide-up">
            <div className="relative w-full max-w-md">
              <Image
                src="/assets/img/web_development_maintenance_construction_teamwork_icon_192840.webp"
                alt="Ilustração representando desenvolvimento web"
                width={500}
                height={500}
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 500px"
                className="w-full h-auto"
                quality={90}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

