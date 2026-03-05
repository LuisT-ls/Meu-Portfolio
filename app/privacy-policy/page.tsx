import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/header'

export const metadata: Metadata = {
  title: 'Política de Privacidade | Luís Teixeira',
  description:
    'Política de Privacidade do site de Luís Teixeira, explicando como seus dados são coletados, usados e protegidos.',
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: 'https://luistls.vercel.app/privacy-policy',
  },
}

export default function PrivacyPolicy() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 min-h-screen bg-white dark:bg-gray-900">
        <div className="container mx-auto max-w-4xl">
          {/* Cabeçalho */}
          <section className="text-center mb-12 pb-8 border-b border-gray-200 dark:border-gray-700">
            <h1 className="text-4xl font-bold text-primary dark:text-blue-400 mb-2">
              Política de Privacidade
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 italic">
              Última atualização: 26 de março de 2025
            </p>
          </section>

          {/* Introdução */}
          <section className="mb-12 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
            <p className="mb-4">
              Bem-vindo à Política de Privacidade do portfólio de Luís Teixeira.
              Respeito sua privacidade e estou comprometido em proteger seus dados
              pessoais. Esta política de privacidade informará como seus dados são
              tratados quando você visita este site e informa sobre seus direitos
              de privacidade.
            </p>
            <p>
              Por favor, leia atentamente para entender minhas práticas em relação
              a seus dados pessoais. Ao utilizar este site, você concorda com a
              coleta e uso de informações de acordo com esta política.
            </p>
          </section>

          {/* Seção 1 */}
          <PolicySection title="1. Informações que coletamos">
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              Posso coletar, usar, armazenar e transferir diferentes tipos de
              dados pessoais sobre você, incluindo:
            </p>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mt-4 mb-2">
              1.1. Informações fornecidas por você
            </h3>
            <ul className="list-disc pl-8 space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                <strong className="font-semibold text-gray-800 dark:text-gray-200">Dados de identidade:</strong>{' '}
                Inclui nome, sobrenome.
              </li>
              <li>
                <strong className="font-semibold text-gray-800 dark:text-gray-200">Dados de contato:</strong>{' '}
                Inclui endereço de e-mail e número de telefone.
              </li>
              <li>
                <strong className="font-semibold text-gray-800 dark:text-gray-200">Dados de comunicação:</strong>{' '}
                Inclui o conteúdo das mensagens que você envia através do
                formulário de contato.
              </li>
            </ul>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mt-4 mb-2">
              1.2. Informações coletadas automaticamente
            </h3>
            <ul className="list-disc pl-8 space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                <strong className="font-semibold text-gray-800 dark:text-gray-200">Dados técnicos:</strong>{' '}
                Endereço IP, tipo e versão do navegador, configuração de fuso
                horário, tipos e versões de plugins, sistema operacional e
                plataforma.
              </li>
              <li>
                <strong className="font-semibold text-gray-800 dark:text-gray-200">Dados de uso:</strong>{' '}
                Informações sobre como você utiliza o site, incluindo páginas
                visitadas e tempo gasto em cada página.
              </li>
              <li>
                <strong className="font-semibold text-gray-800 dark:text-gray-200">
                  Cookies e tecnologias similares:
                </strong>{' '}
                Para mais informações sobre como usamos cookies, consulte a seção
                específica sobre cookies abaixo.
              </li>
            </ul>
          </PolicySection>

          {/* Seção 2 */}
          <PolicySection title="2. Como usamos suas informações">
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              Utilizo suas informações pessoais apenas para os fins para os quais
              as coletei, a menos que considere razoavelmente que preciso usá-las
              por outro motivo compatível com o propósito original.
            </p>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mt-4 mb-2">
              2.1. Propósitos para os quais usamos seus dados
            </h3>
            <ul className="list-disc pl-8 space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                <strong className="font-semibold text-gray-800 dark:text-gray-200">
                  Para responder às suas consultas:
                </strong>{' '}
                Quando você entra em contato através do formulário de contato,
                utilizo suas informações para responder às suas perguntas ou
                solicitações.
              </li>
              <li>
                <strong className="font-semibold text-gray-800 dark:text-gray-200">Para melhorar o site:</strong>{' '}
                Analiso dados de uso para entender como os visitantes interagem
                com o site, o que ajuda a melhorar sua estrutura e conteúdo.
              </li>
              <li>
                <strong className="font-semibold text-gray-800 dark:text-gray-200">
                  Para fornecer conteúdo relevante:
                </strong>{' '}
                Posso usar suas informações para personalizar sua experiência e
                entregar conteúdo mais relevante para você.
              </li>
              <li>
                <strong className="font-semibold text-gray-800 dark:text-gray-200">Para fins de segurança:</strong>{' '}
                Utilizo dados técnicos para manter o site seguro e protegido.
              </li>
            </ul>
          </PolicySection>

          {/* Seção 3 */}
          <PolicySection title="3. Compartilhamento de dados">
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              Não vendo, alugo ou compartilho seus dados pessoais com terceiros
              para fins de marketing. No entanto, posso compartilhar suas
              informações com as seguintes categorias de terceiros:
            </p>
            <ul className="list-disc pl-8 space-y-2 mb-4 text-gray-700 dark:text-gray-300">
              <li>
                <strong className="font-semibold text-gray-800 dark:text-gray-200">
                  Provedores de serviço:
                </strong>{' '}
                Empresas que fornecem serviços em meu nome, como hospedagem web,
                análise de dados e serviços de e-mail (por exemplo, EmailJS para
                processar formulários de contato).
              </li>
              <li>
                <strong className="font-semibold text-gray-800 dark:text-gray-200">Análise de dados:</strong>{' '}
                Uso serviços de análise como Google Analytics para entender como
                o site é utilizado.
              </li>
              <li>
                <strong className="font-semibold text-gray-800 dark:text-gray-200">
                  Requisitos legais:
                </strong>{' '}
                Quando necessário para cumprir uma obrigação legal ou ordem
                judicial.
              </li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300">
              Todos os terceiros com quem compartilho seus dados são obrigados a
              respeitar a segurança dos seus dados pessoais e a tratá-los de
              acordo com a lei.
            </p>
          </PolicySection>

          {/* Seção 4 */}
          <PolicySection title="4. Segurança de dados">
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              Implementei medidas de segurança apropriadas para evitar que seus
              dados pessoais sejam acidentalmente perdidos, usados ou acessados de
              maneira não autorizada, alterados ou divulgados. Além disso, limito
              o acesso aos seus dados pessoais apenas àqueles que têm uma
              necessidade comercial de conhecê-los.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              Apesar das medidas implementadas, a transmissão de informações pela
              internet nunca é completamente segura. Portanto, não posso garantir
              a segurança dos dados transmitidos para o site, e qualquer
              transmissão é por sua conta e risco.
            </p>
          </PolicySection>

          {/* Seção 5 */}
          <PolicySection title="5. Retenção de dados">
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              Mantenho seus dados pessoais apenas pelo tempo necessário para
              cumprir os fins para os quais os coletei, inclusive para fins de
              cumprimento de quaisquer requisitos legais, contábeis ou de
              relatórios.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              Para determinar o período de retenção apropriado para dados
              pessoais, considero a quantidade, natureza e sensibilidade dos dados
              pessoais, o risco potencial de danos do uso não autorizado ou
              divulgação, os fins para os quais processo seus dados pessoais e se
              posso alcançar esses fins através de outros meios.
            </p>
          </PolicySection>

          {/* Seção 6 */}
          <PolicySection title="6. Seus direitos legais">
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              Dependendo da sua localização, você pode ter certos direitos em
              relação aos seus dados pessoais. Estes podem incluir:
            </p>
            <ul className="list-disc pl-8 space-y-2 mb-4 text-gray-700 dark:text-gray-300">
              <li>
                <strong className="font-semibold text-gray-800 dark:text-gray-200">Direito de acesso:</strong>{' '}
                Você tem o direito de solicitar acesso aos seus dados pessoais.
              </li>
              <li>
                <strong className="font-semibold text-gray-800 dark:text-gray-200">
                  Direito de retificação:
                </strong>{' '}
                Você tem o direito de solicitar a correção de quaisquer dados
                incompletos ou imprecisos.
              </li>
              <li>
                <strong className="font-semibold text-gray-800 dark:text-gray-200">
                  Direito ao esquecimento:
                </strong>{' '}
                Em certas circunstâncias, você pode solicitar a exclusão de seus
                dados pessoais.
              </li>
              <li>
                <strong className="font-semibold text-gray-800 dark:text-gray-200">
                  Direito de restrição de processamento:
                </strong>{' '}
                Em certas circunstâncias, você pode solicitar a restrição do
                processamento dos seus dados pessoais.
              </li>
              <li>
                <strong className="font-semibold text-gray-800 dark:text-gray-200">
                  Direito à portabilidade de dados:
                </strong>{' '}
                Você pode solicitar a transferência dos seus dados pessoais para
                você ou para terceiros.
              </li>
              <li>
                <strong className="font-semibold text-gray-800 dark:text-gray-200">
                  Direito de objeção:
                </strong>{' '}
                Você tem o direito de se opor ao processamento dos seus dados
                pessoais em certas circunstâncias.
              </li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300">
              Se você deseja exercer qualquer um desses direitos, entre em contato
              através do formulário de contato no site ou pelo e-mail{' '}
              <a
                href="mailto:luist_ls@outlook.pt"
                className="text-primary dark:text-blue-400 hover:underline"
              >
                luist_ls@outlook.pt
              </a>
              .
            </p>
          </PolicySection>

          {/* Seção 7 */}
          <PolicySection title="7. Cookies">
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              Este site utiliza cookies para melhorar sua experiência. Cookies são
              pequenos arquivos de texto que são armazenados no seu dispositivo
              quando você visita um site.
            </p>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mt-4 mb-2">
              7.1. Tipos de cookies que usamos
            </h3>
            <ul className="list-disc pl-8 space-y-2 mb-4 text-gray-700 dark:text-gray-300">
              <li>
                <strong className="font-semibold text-gray-800 dark:text-gray-200">
                  Cookies estritamente necessários:
                </strong>{' '}
                Necessários para o funcionamento do site. Incluem, por exemplo,
                cookies que permitem que você faça login em áreas seguras do site.
              </li>
              <li>
                <strong className="font-semibold text-gray-800 dark:text-gray-200">
                  Cookies analíticos/de desempenho:
                </strong>{' '}
                Permitem reconhecer e contar o número de visitantes e ver como os
                visitantes navegam pelo site. Isso ajuda a melhorar o
                funcionamento do site.
              </li>
              <li>
                <strong className="font-semibold text-gray-800 dark:text-gray-200">
                  Cookies de funcionalidade:
                </strong>{' '}
                Reconhecem você quando retorna ao site. Isso permite personalizar
                o conteúdo para você e lembrar suas preferências (por exemplo,
                sua escolha de idioma ou região).
              </li>
            </ul>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mt-4 mb-2">
              7.2. Gerenciamento de cookies
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              A maioria dos navegadores permite que você controle cookies através
              das configurações. Você pode geralmente aceitar, recusar ou remover
              cookies. Se você desativar ou recusar cookies, algumas partes do
              site podem se tornar inacessíveis ou não funcionar corretamente.
            </p>
          </PolicySection>

          {/* Seção 8 */}
          <PolicySection title="8. Política para menores">
            <p className="text-gray-700 dark:text-gray-300">
              Este site não é destinado a menores de 18 anos e não coleto
              intencionalmente dados relativos a crianças. Se descobrir que
              coletei dados pessoais de menores sem verificação do consentimento
              dos pais, tomarei medidas para remover esses dados.
            </p>
          </PolicySection>

          {/* Seção 9 */}
          <PolicySection title="9. Mudanças nesta política de privacidade">
            <p className="text-gray-700 dark:text-gray-300">
              Posso atualizar esta política de privacidade periodicamente. A
              versão mais recente estará sempre disponível nesta página, com a
              data da última atualização no topo. Recomendo que você revise esta
              política regularmente para estar ciente de quaisquer alterações.
            </p>
          </PolicySection>

          {/* Seção 10 */}
          <PolicySection title="10. Contato" isLast>
            <p className="text-gray-700 dark:text-gray-300">
              Se você tiver dúvidas sobre esta política de privacidade ou como
              seus dados são processados, entre em contato através do formulário
              de contato no site ou pelo e-mail:{' '}
              <a
                href="mailto:luist_ls@outlook.pt"
                className="text-primary dark:text-blue-400 hover:underline"
              >
                luist_ls@outlook.pt
              </a>
              .
            </p>
          </PolicySection>

          {/* Botão voltar */}
          <div className="mt-12 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium shadow-md"
            >
              <i className="fas fa-arrow-left"></i>
              Voltar para o Portfólio
            </Link>
          </div>
        </div>
      </main>

      <footer
        role="contentinfo"
        className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 py-6 border-t border-gray-200 dark:border-gray-700 text-center"
      >
        <div className="container mx-auto px-4">
          <p>&copy; 2026 Luís Teixeira. Todos os direitos reservados.</p>
        </div>
      </footer>
    </>
  )
}

function PolicySection({
  title,
  children,
  isLast = false,
}: {
  title: string
  children: React.ReactNode
  isLast?: boolean
}) {
  return (
    <section
      className={`mb-10 pb-8 ${!isLast ? 'border-b border-gray-200 dark:border-gray-700' : ''}`}
    >
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 pb-1 border-b-2 border-primary dark:border-blue-400 inline-block">
        {title}
      </h2>
      {children}
    </section>
  )
}
