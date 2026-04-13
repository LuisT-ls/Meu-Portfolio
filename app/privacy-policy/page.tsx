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
      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 min-h-screen bg-canvas">
        <div className="container mx-auto max-w-4xl">
          {/* Cabeçalho */}
          <section className="text-center mb-12 pb-8 border-b border-line">
            <h1 className="text-4xl font-bold text-brand mb-2">
              Política de Privacidade
            </h1>
            <p className="text-sm text-content-muted italic">
              Última atualização: 26 de março de 2025
            </p>
          </section>

          {/* Introdução */}
          <section className="mb-12 text-lg leading-relaxed text-content-secondary">
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
            <p className="mb-4 text-content-secondary">
              Posso coletar, usar, armazenar e transferir diferentes tipos de
              dados pessoais sobre você, incluindo:
            </p>
            <h3 className="text-lg font-semibold text-content mt-4 mb-2">
              1.1. Informações fornecidas por você
            </h3>
            <ul className="list-disc pl-8 space-y-2 text-content-secondary">
              <li>
                <strong className="font-semibold text-content">Dados de identidade:</strong>{' '}
                Inclui nome, sobrenome.
              </li>
              <li>
                <strong className="font-semibold text-content">Dados de contato:</strong>{' '}
                Inclui endereço de e-mail e número de telefone.
              </li>
              <li>
                <strong className="font-semibold text-content">Dados de comunicação:</strong>{' '}
                Inclui o conteúdo das mensagens que você envia através do
                formulário de contato.
              </li>
            </ul>
            <h3 className="text-lg font-semibold text-content mt-4 mb-2">
              1.2. Informações coletadas automaticamente
            </h3>
            <ul className="list-disc pl-8 space-y-2 text-content-secondary">
              <li>
                <strong className="font-semibold text-content">Dados técnicos:</strong>{' '}
                Endereço IP, tipo e versão do navegador, configuração de fuso
                horário, tipos e versões de plugins, sistema operacional e
                plataforma.
              </li>
              <li>
                <strong className="font-semibold text-content">Dados de uso:</strong>{' '}
                Informações sobre como você utiliza o site, incluindo páginas
                visitadas e tempo gasto em cada página.
              </li>
              <li>
                <strong className="font-semibold text-content">
                  Cookies e tecnologias similares:
                </strong>{' '}
                Para mais informações sobre como usamos cookies, consulte a seção
                específica sobre cookies abaixo.
              </li>
            </ul>
          </PolicySection>

          {/* Seção 2 */}
          <PolicySection title="2. Como usamos suas informações">
            <p className="mb-4 text-content-secondary">
              Utilizo suas informações pessoais apenas para os fins para os quais
              as coletei, a menos que considere razoavelmente que preciso usá-las
              por outro motivo compatível com o propósito original.
            </p>
            <h3 className="text-lg font-semibold text-content mt-4 mb-2">
              2.1. Propósitos para os quais usamos seus dados
            </h3>
            <ul className="list-disc pl-8 space-y-2 text-content-secondary">
              <li>
                <strong className="font-semibold text-content">
                  Para responder às suas consultas:
                </strong>{' '}
                Quando você entra em contato através do formulário de contato,
                utilizo suas informações para responder às suas perguntas ou
                solicitações.
              </li>
              <li>
                <strong className="font-semibold text-content">Para melhorar o site:</strong>{' '}
                Analiso dados de uso para entender como os visitantes interagem
                com o site, o que ajuda a melhorar sua estrutura e conteúdo.
              </li>
              <li>
                <strong className="font-semibold text-content">
                  Para fornecer conteúdo relevante:
                </strong>{' '}
                Posso usar suas informações para personalizar sua experiência e
                entregar conteúdo mais relevante para você.
              </li>
              <li>
                <strong className="font-semibold text-content">Para fins de segurança:</strong>{' '}
                Utilizo dados técnicos para manter o site seguro e protegido.
              </li>
            </ul>
          </PolicySection>

          {/* Seção 3 */}
          <PolicySection title="3. Compartilhamento de dados">
            <p className="mb-4 text-content-secondary">
              Não vendo, alugo ou compartilho seus dados pessoais com terceiros
              para fins de marketing. No entanto, posso compartilhar suas
              informações com as seguintes categorias de terceiros:
            </p>
            <ul className="list-disc pl-8 space-y-2 mb-4 text-content-secondary">
              <li>
                <strong className="font-semibold text-content">
                  Provedores de serviço:
                </strong>{' '}
                Empresas que fornecem serviços em meu nome, como hospedagem web,
                análise de dados e serviços de e-mail (por exemplo, EmailJS para
                processar formulários de contato).
              </li>
              <li>
                <strong className="font-semibold text-content">Análise de dados:</strong>{' '}
                Uso serviços de análise como Google Analytics para entender como
                o site é utilizado.
              </li>
              <li>
                <strong className="font-semibold text-content">
                  Requisitos legais:
                </strong>{' '}
                Quando necessário para cumprir uma obrigação legal ou ordem
                judicial.
              </li>
            </ul>
            <p className="text-content-secondary">
              Todos os terceiros com quem compartilho seus dados são obrigados a
              respeitar a segurança dos seus dados pessoais e a tratá-los de
              acordo com a lei.
            </p>
          </PolicySection>

          {/* Seção 4 */}
          <PolicySection title="4. Segurança de dados">
            <p className="mb-4 text-content-secondary">
              Implementei medidas de segurança apropriadas para evitar que seus
              dados pessoais sejam acidentalmente perdidos, usados ou acessados de
              maneira não autorizada, alterados ou divulgados. Além disso, limito
              o acesso aos seus dados pessoais apenas àqueles que têm uma
              necessidade comercial de conhecê-los.
            </p>
            <p className="text-content-secondary">
              Apesar das medidas implementadas, a transmissão de informações pela
              internet nunca é completamente segura. Portanto, não posso garantir
              a segurança dos dados transmitidos para o site, e qualquer
              transmissão é por sua conta e risco.
            </p>
          </PolicySection>

          {/* Seção 5 */}
          <PolicySection title="5. Retenção de dados">
            <p className="mb-4 text-content-secondary">
              Mantenho seus dados pessoais apenas pelo tempo necessário para
              cumprir os fins para os quais os coletei, inclusive para fins de
              cumprimento de quaisquer requisitos legais, contábeis ou de
              relatórios.
            </p>
            <p className="text-content-secondary">
              Para determinar o período de retenção apropriado para dados
              pessoais, considero a quantidade, natureza e sensibilidade dos dados
              pessoais, o risco potencial de danos do uso não autorizado ou
              divulgação, os fins para os quais processo seus dados pessoais e se
              posso alcançar esses fins através de outros meios.
            </p>
          </PolicySection>

          {/* Seção 6 */}
          <PolicySection title="6. Seus direitos legais">
            <p className="mb-4 text-content-secondary">
              Dependendo da sua localização, você pode ter certos direitos em
              relação aos seus dados pessoais. Estes podem incluir:
            </p>
            <ul className="list-disc pl-8 space-y-2 mb-4 text-content-secondary">
              <li>
                <strong className="font-semibold text-content">Direito de acesso:</strong>{' '}
                Você tem o direito de solicitar acesso aos seus dados pessoais.
              </li>
              <li>
                <strong className="font-semibold text-content">
                  Direito de retificação:
                </strong>{' '}
                Você tem o direito de solicitar a correção de quaisquer dados
                incompletos ou imprecisos.
              </li>
              <li>
                <strong className="font-semibold text-content">
                  Direito ao esquecimento:
                </strong>{' '}
                Em certas circunstâncias, você pode solicitar a exclusão de seus
                dados pessoais.
              </li>
              <li>
                <strong className="font-semibold text-content">
                  Direito de restrição de processamento:
                </strong>{' '}
                Em certas circunstâncias, você pode solicitar a restrição do
                processamento dos seus dados pessoais.
              </li>
              <li>
                <strong className="font-semibold text-content">
                  Direito à portabilidade de dados:
                </strong>{' '}
                Você pode solicitar a transferência dos seus dados pessoais para
                você ou para terceiros.
              </li>
              <li>
                <strong className="font-semibold text-content">
                  Direito de objeção:
                </strong>{' '}
                Você tem o direito de se opor ao processamento dos seus dados
                pessoais em certas circunstâncias.
              </li>
            </ul>
            <p className="text-content-secondary">
              Se você deseja exercer qualquer um desses direitos, entre em contato
              através do formulário de contato no site ou pelo e-mail{' '}
              <a
                href="mailto:luist_ls@outlook.pt"
                className="text-brand hover:underline"
              >
                luist_ls@outlook.pt
              </a>
              .
            </p>
          </PolicySection>

          {/* Seção 7 */}
          <PolicySection title="7. Cookies">
            <p className="mb-4 text-content-secondary">
              Este site utiliza cookies para melhorar sua experiência. Cookies são
              pequenos arquivos de texto que são armazenados no seu dispositivo
              quando você visita um site.
            </p>
            <h3 className="text-lg font-semibold text-content mt-4 mb-2">
              7.1. Tipos de cookies que usamos
            </h3>
            <ul className="list-disc pl-8 space-y-2 mb-4 text-content-secondary">
              <li>
                <strong className="font-semibold text-content">
                  Cookies estritamente necessários:
                </strong>{' '}
                Necessários para o funcionamento do site. Incluem, por exemplo,
                cookies que permitem que você faça login em áreas seguras do site.
              </li>
              <li>
                <strong className="font-semibold text-content">
                  Cookies analíticos/de desempenho:
                </strong>{' '}
                Permitem reconhecer e contar o número de visitantes e ver como os
                visitantes navegam pelo site. Isso ajuda a melhorar o
                funcionamento do site.
              </li>
              <li>
                <strong className="font-semibold text-content">
                  Cookies de funcionalidade:
                </strong>{' '}
                Reconhecem você quando retorna ao site. Isso permite personalizar
                o conteúdo para você e lembrar suas preferências (por exemplo,
                sua escolha de idioma ou região).
              </li>
            </ul>
            <h3 className="text-lg font-semibold text-content mt-4 mb-2">
              7.2. Gerenciamento de cookies
            </h3>
            <p className="text-content-secondary">
              A maioria dos navegadores permite que você controle cookies através
              das configurações. Você pode geralmente aceitar, recusar ou remover
              cookies. Se você desativar ou recusar cookies, algumas partes do
              site podem se tornar inacessíveis ou não funcionar corretamente.
            </p>
          </PolicySection>

          {/* Seção 8 */}
          <PolicySection title="8. Política para menores">
            <p className="text-content-secondary">
              Este site não é destinado a menores de 18 anos e não coleto
              intencionalmente dados relativos a crianças. Se descobrir que
              coletei dados pessoais de menores sem verificação do consentimento
              dos pais, tomarei medidas para remover esses dados.
            </p>
          </PolicySection>

          {/* Seção 9 */}
          <PolicySection title="9. Mudanças nesta política de privacidade">
            <p className="text-content-secondary">
              Posso atualizar esta política de privacidade periodicamente. A
              versão mais recente estará sempre disponível nesta página, com a
              data da última atualização no topo. Recomendo que você revise esta
              política regularmente para estar ciente de quaisquer alterações.
            </p>
          </PolicySection>

          {/* Seção 10 */}
          <PolicySection title="10. Contato" isLast>
            <p className="text-content-secondary">
              Se você tiver dúvidas sobre esta política de privacidade ou como
              seus dados são processados, entre em contato através do formulário
              de contato no site ou pelo e-mail:{' '}
              <a
                href="mailto:luist_ls@outlook.pt"
                className="text-brand hover:underline"
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
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand text-content-on-brand rounded-lg hover:bg-brand-hover transition-colors font-medium shadow-md focus-visible:ring-2 focus-visible:ring-brand/40"
            >
              <i className="fas fa-arrow-left" aria-hidden="true"></i>
              Voltar para o Portfólio
            </Link>
          </div>
        </div>
      </main>

      <footer
        role="contentinfo"
        className="bg-surface text-content-secondary py-6 border-t border-line text-center"
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
      className={`mb-10 pb-8 ${!isLast ? 'border-b border-line' : ''}`}
    >
      <h2 className="text-2xl font-bold text-content mb-4 pb-1 border-b-2 border-brand inline-block">
        {title}
      </h2>
      {children}
    </section>
  )
}
