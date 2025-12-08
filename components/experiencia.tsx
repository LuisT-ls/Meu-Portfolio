export function Experiencia() {
  const experiencias = [
    {
      titulo: 'Estagiário de Suporte Técnico',
      empresa: 'Instituto Recôncavo de Tecnologia',
      periodo: 'Nov/2021 - Nov/2023',
      responsabilidades: [
        'Implementação e manutenção de infraestrutura de rede',
        'Suporte técnico N1 e N2 para mais de 50 usuários',
        'Administração de sistemas Windows Server e Linux',
        'Desenvolvimento de scripts de automação (PowerShell e Bash)',
        'Gestão de backups e recuperação de dados',
        'Documentação técnica e procedimentos operacionais',
      ],
      conquistas: [
        'Redução de 40% no tempo de resolução de chamados',
        'Implementação de sistema de monitoramento proativo',
        'Desenvolvimento de documentação técnica padronizada',
      ],
    },
    {
      titulo: 'Instalador de Redes e CFTV IP',
      empresa: 'Luís Antonio Souza Teixeira (CNPJ)',
      periodo: 'Out/2019 - Mar/2020',
      responsabilidades: [
        'Projeto e implementação de sistemas CFTV IP',
        'Configuração avançada de redes para vigilância',
        'Instalação de infraestrutura de rede estruturada',
        'Manutenção preventiva e corretiva de equipamentos',
        'Treinamento de usuários em sistemas de segurança',
      ],
      conquistas: [
        'Implementação de mais de 50 sistemas de CFTV',
        'Desenvolvimento de soluções personalizadas',
        'Taxa de satisfação do cliente de 95%',
      ],
    },
    {
      titulo: 'Técnico em Instalações',
      empresa: 'ELITE SERVIÇOS',
      periodo: '2020 - 2021',
      responsabilidades: [
        'Instalações elétricas residenciais e comerciais',
        'Implementação de sistemas de segurança',
        'Configuração de redes e telefonia',
        'Manutenção preventiva e corretiva',
      ],
      conquistas: [
        'Mais de 100 instalações bem-sucedidas',
        'Zero acidentes de trabalho',
        'Implementação de checklist de segurança',
      ],
    },
  ]

  return (
    <section
      id="experiencia"
      className="section-padding py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900"
    >
      <div className="container mx-auto">
        <h2 className="section-title text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          Experiência Profissional
        </h2>
        <div className="timeline relative">
          {experiencias.map((exp, index) => (
            <div key={index} className="timeline-item relative mb-8 pl-8 border-l-2 border-primary">
              <div className="timeline-marker absolute -left-2 top-0 w-4 h-4 bg-primary rounded-full"></div>
              <div className="timeline-content bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <div className="exp-header mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {exp.titulo}
                  </h3>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <span className="empresa font-medium">{exp.empresa}</span>
                    <span className="periodo">{exp.periodo}</span>
                  </div>
                </div>
                <ul className="exp-responsibilities list-disc list-inside space-y-2 mb-4 text-gray-700 dark:text-gray-300">
                  {exp.responsabilidades.map((resp, i) => (
                    <li key={i}>{resp}</li>
                  ))}
                </ul>
                <div className="exp-achievements bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">
                    Principais Conquistas:
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                    {exp.conquistas.map((conq, i) => (
                      <li key={i}>{conq}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

