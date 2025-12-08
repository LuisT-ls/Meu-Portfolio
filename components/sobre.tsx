import { StatsCounter } from './stats-counter'

export function Sobre() {
  return (
    <section
      id="sobre"
      className="section-sobre py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900"
    >
      <div className="container mx-auto">
        <h2 className="section-title text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          Sobre Mim
        </h2>
        <div className="sobre-grid grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <div className="sobre-content space-y-6">
            <div className="sobre-texto space-y-4">
              <p className="sobre-intro text-lg text-gray-700 dark:text-gray-300">
                Sou um estudante dedicado do curso de graduação Interdisciplinar
                em Ciência, Tecnologia e Inovação na Universidade Federal da
                Bahia, apaixonado por tecnologia e inovação. Com mais de 2 anos
                de experiência prática de suporte técnico em sistemas, busco
                constantemente aprender e aplicar novos conhecimentos em projetos
                desafiadores.
              </p>
              <p className="sobre-details text-lg text-gray-700 dark:text-gray-300">
                Minha jornada na tecnologia começou com suporte técnico e no
                momento se encontra em desenvolvimento web. Tenho experiência em
                tecnologias como JavaScript, React, e sistemas Linux, além de
                conhecimentos em redes e segurança da informação.
              </p>
              <p className="sobre-goals text-lg text-gray-700 dark:text-gray-300">
                Atualmente, foco meus estudos em desenvolvimento web moderno,
                arquitetura de software e DevOps, além de aprofundar meus
                conhecimentos em inteligência artificial, incluindo engenharia
                de prompt, machine learning e aplicações práticas de IA. Sempre
                busco criar soluções eficientes, escaláveis e inovadoras que
                façam a diferença, combinando tecnologias web com as
                possibilidades da inteligência artificial.
              </p>
            </div>
            <div className="sobre-highlights bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                Destaques
              </h3>
              <ul className="highlights-list space-y-3">
                <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  <i className="fas fa-graduation-cap text-primary"></i>
                  Graduando em CTI na UFBA
                </li>
                <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  <i className="fas fa-laptop-code text-primary"></i>
                  Desenvolvedor Web
                </li>
                <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  <i className="fas fa-tools text-primary"></i>
                  Analista em Suporte Técnico
                </li>
                <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  <i className="fas fa-chart-line text-primary"></i>
                  Média Acadêmica 8.2
                </li>
                <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  <i className="fas fa-book text-primary"></i>
                  Aprendizado Contínuo
                </li>
              </ul>
            </div>
          </div>
          <div className="sobre-stats" aria-label="Estatísticas profissionais">
            <StatsCounter />
          </div>
        </div>
      </div>
    </section>
  )
}

