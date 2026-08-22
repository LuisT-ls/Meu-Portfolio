export type ProjectCategory = 'web' | 'mobile' | 'tools' | 'data'

export interface Project {
  slug: string
  title: string
  description: string
  role: string
  focus: string
  tags: string[]
  github: string
  demo?: string
  category: ProjectCategory
  categoryLabel: string
  caseStudy: {
    challenge: string
    approach: string
    architecture: string[]
    learnings: string
  }
}

export const projects: Project[] = [
  {
    slug: 'delivery-saas',
    title: 'Delivery SaaS',
    description: 'Solução SaaS para delivery com dashboard administrativo, gestão de pedidos em tempo real e integração de pagamentos.',
    role: 'Full-stack',
    focus: 'Operação em tempo real e pagamentos',
    tags: ['Next.js', 'TypeScript', 'Firebase'],
    github: 'https://github.com/LuisT-ls/delivery-saas',
    category: 'web',
    categoryLabel: 'Web',
    caseStudy: {
      challenge: 'Organizar a operação de um delivery em um único fluxo, conectando pedidos, gestão administrativa e pagamento.',
      approach: 'A solução foi estruturada como uma aplicação web com áreas distintas para operação e acompanhamento dos pedidos, priorizando atualização rápida do estado do pedido.',
      architecture: ['Interface web com Next.js', 'Tipagem compartilhada com TypeScript', 'Persistência e atualização de dados com Firebase', 'Integração de pagamentos como parte do fluxo de pedido'],
      learnings: 'O projeto reforçou a importância de modelar estados de pedido com clareza e de manter o fluxo operacional simples para quem precisa tomar decisões rapidamente.',
    },
  },
  {
    slug: 'sistema-venda-ingressos',
    title: 'Sistema de Venda de Ingressos',
    description: 'Plataforma para venda e gerenciamento de ingressos com carrinho de compras, validação de assentos e processamento de pedidos.',
    role: 'Frontend',
    focus: 'Fluxo de compra e validação de assentos',
    tags: ['JavaScript', 'HTML5', 'CSS3'],
    github: 'https://github.com/LuisT-ls/ticket-sales-system',
    category: 'web',
    categoryLabel: 'Web',
    caseStudy: {
      challenge: 'Criar uma jornada de compra compreensível, evitando conflitos de assentos e reduzindo dúvidas durante a seleção do ingresso.',
      approach: 'O fluxo foi dividido em seleção, carrinho e processamento do pedido, com validações no momento em que o usuário toma cada decisão.',
      architecture: ['Interface construída com HTML, CSS e JavaScript', 'Estado do carrinho controlado no cliente', 'Validação de assentos antes do fechamento do pedido', 'Separação visual entre descoberta, seleção e confirmação'],
      learnings: 'A experiência mostrou como feedback imediato e hierarquia visual são essenciais em fluxos de compra com escolhas irreversíveis.',
    },
  },
  {
    slug: 'meu-orcamento',
    title: 'Meu Orçamento',
    description: 'Aplicativo de controle financeiro pessoal com categorização de gastos, gráficos interativos e exportação de relatórios.',
    role: 'Frontend',
    focus: 'Visualização de gastos e relatórios',
    tags: ['JavaScript', 'Chart.js', 'LocalStorage'],
    github: 'https://github.com/LuisT-ls/meu-orcamento',
    category: 'web',
    categoryLabel: 'Web',
    caseStudy: {
      challenge: 'Transformar lançamentos financeiros em uma visão simples para acompanhar categorias de gastos e tomar decisões melhores.',
      approach: 'A aplicação combina entrada de dados, categorização, gráficos e exportação em uma experiência concentrada no navegador.',
      architecture: ['Interface responsiva em JavaScript', 'Persistência local com LocalStorage', 'Gráficos interativos com Chart.js', 'Exportação de relatórios para consulta posterior'],
      learnings: 'O projeto evidenciou que dashboards úteis dependem mais de boas perguntas e agrupamentos claros do que de uma grande quantidade de gráficos.',
    },
  },
  {
    slug: 'quartil',
    title: 'QUARTIL',
    description: 'Ferramenta estatística para análise de dados com cálculo de quartis, mediana, média e visualização de boxplots.',
    role: 'Produto de dados',
    focus: 'Cálculos estatísticos no navegador',
    tags: ['JavaScript', 'Estatística', 'Visualização'],
    github: 'https://github.com/LuisT-ls/QUARTIL',
    category: 'data',
    categoryLabel: 'Dados',
    caseStudy: {
      challenge: 'Permitir que uma pessoa explore um conjunto de dados e compreenda medidas estatísticas sem depender de uma ferramenta especializada.',
      approach: 'O produto recebe os dados no navegador, calcula medidas centrais e apresenta a distribuição por meio de uma visualização de boxplot.',
      architecture: ['Processamento client-side', 'Funções separadas para medidas estatísticas', 'Visualização de distribuição e dispersão', 'Interface orientada a entrada e interpretação'],
      learnings: 'Ferramentas de dados precisam explicar o resultado, não apenas calculá-lo. A visualização e os rótulos são parte da funcionalidade.',
    },
  },
  {
    slug: 'conversor-de-imagens',
    title: 'Conversor de Imagens',
    description: 'Conversor de imagens client-side com suporte a múltiplos formatos (PNG, JPEG, WebP, SVG) e redimensionamento.',
    role: 'Ferramenta web',
    focus: 'Conversão client-side sem upload',
    tags: ['JavaScript', 'Canvas API', 'HTML5'],
    github: 'https://github.com/LuisT-ls/Conversor-Imagens',
    category: 'tools',
    categoryLabel: 'Ferramentas',
    caseStudy: {
      challenge: 'Oferecer uma transformação rápida de imagens sem exigir que o arquivo seja enviado para um servidor.',
      approach: 'A ferramenta usa APIs nativas do navegador para ler, redimensionar, converter e disponibilizar o resultado ao usuário.',
      architecture: ['Leitura de arquivos no navegador', 'Canvas API para transformação', 'Suporte a PNG, JPEG, WebP e SVG', 'Download do resultado sem persistência no servidor'],
      learnings: 'Processar arquivos localmente pode melhorar privacidade e percepção de velocidade quando a tarefa não exige colaboração ou armazenamento remoto.',
    },
  },
  {
    slug: 'historico-universitario',
    title: 'Histórico Universitário',
    description: 'Sistema para acompanhamento do histórico acadêmico com visualização de disciplinas, notas e cálculo de coeficiente de rendimento.',
    role: 'Full-stack',
    focus: 'Acompanhamento acadêmico e indicadores',
    tags: ['JavaScript', 'React', 'Firebase'],
    github: 'https://github.com/LuisT-ls/Historico-Universitario',
    category: 'tools',
    categoryLabel: 'Ferramentas',
    caseStudy: {
      challenge: 'Tornar o histórico acadêmico mais fácil de consultar, acompanhando disciplinas, notas e evolução do rendimento.',
      approach: 'O sistema organiza informações acadêmicas em uma interface de consulta e usa cálculos para transformar notas em indicadores compreensíveis.',
      architecture: ['Interface construída com React', 'Dados persistidos com Firebase', 'Cálculo de coeficiente de rendimento', 'Visualização agrupada por disciplinas e períodos'],
      learnings: 'Quando o dado já existe, uma boa experiência nasce de reduzir o esforço de leitura e destacar o indicador que orienta a próxima decisão.',
    },
  },
]

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug)
}
