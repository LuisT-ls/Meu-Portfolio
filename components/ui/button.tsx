/* ============================================================
   PRIMITIVO: Button
   ============================================================
   Arquitetura de Componentização do Design System
   ──────────────────────────────────────────────────────────
   PRIMITIVOS (este nível):
     Encapsulam apenas aparência e estados de interação.
     Recebem props de variant, size e estado — sem semântica
     de negócio. São compostos por outros componentes.
     Ex: Button, Input, Badge, Card, Avatar.

   SEMÂNTICOS (próximo nível):
     Usam primitivos + lógica de domínio.
     Ex: SubmitButton (Button + loading state via form action),
         HeroSection (usa primitivos para montar um padrão
         de layout específico).

   REGRA DE OURO: Primitivos NÃO importam dados, hooks de
   domínio ou estado global. São funções puras de UI.
   ============================================================ */

'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

/* ────────────────────────────────────────────────────────────
   TIPOS
   ──────────────────────────────────────────────────────────── */

type ButtonVariant =
  | 'primary'     /* Ação principal — preenche com brand color        */
  | 'secondary'   /* Ação secundária — surface com borda              */
  | 'outline'     /* Apenas borda — mais leve que secondary           */
  | 'ghost'       /* Sem background visível — para nav e ações inline */
  | 'destructive' /* Ações irreversíveis — usa --err color            */
  | 'link'        /* Parece um link, comporta como botão              */

type ButtonSize =
  | 'xs'   /* 28px altura — para tabelas, badges interativos         */
  | 'sm'   /* 32px altura — secundário, contextual                   */
  | 'md'   /* 40px altura — padrão (default)                         */
  | 'lg'   /* 48px altura — CTA principal, hero                      */
  | 'xl'   /* 56px altura — CTA hero de alto impacto                 */
  | 'icon' /* Quadrado proporcional ao tamanho md — para ações solo  */

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:      ButtonVariant
  size?:         ButtonSize
  loading?:      boolean
  icon?:         React.ReactNode   /* Ícone à esquerda do label              */
  iconRight?:    React.ReactNode   /* Ícone à direita (ex: seta, chevron)    */
  fullWidth?:    boolean
  /* Permite renderizar como <a> passando href via asChild pattern
     ou simplesmente como wrapper sem CVA */
  asChild?:      boolean
}

/* ────────────────────────────────────────────────────────────
   VARIANTES — registro de classes por variant/size
   Implementação manual sem CVA para evitar dependência extra.
   Mesmo padrão de performance, mais controle.
   ──────────────────────────────────────────────────────────── */

const VARIANT_CLASSES: Record<ButtonVariant, string> = {

  primary: cn(
    /* Background e texto */
    'bg-brand text-content-on-brand',
    /* Borda (1px transparente mantém tamanho consistente) */
    'border border-transparent',
    /* Hover — darkens no light mode, lightens no dark mode */
    'hover:bg-brand-hover',
    /* Active / pressed */
    'active:bg-brand-active active:scale-[0.98]',
    /* Focus ring com offset branco para separação visual */
    'focus-visible:ring-2 focus-visible:ring-brand/70 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas',
    /* Sombra de profundidade + glow sutil */
    'shadow-sm hover:shadow-brand',
  ),

  secondary: cn(
    'bg-surface text-content',
    'border border-line hover:border-line-strong',
    'hover:bg-surface-raised',
    'active:bg-surface-inset active:scale-[0.98]',
    'focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas',
    'shadow-xs hover:shadow-sm',
  ),

  outline: cn(
    'bg-transparent text-content',
    'border border-line hover:border-brand/50',
    'hover:bg-brand-subtle hover:text-brand',
    'active:bg-brand-subtle active:scale-[0.98]',
    'focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas',
  ),

  ghost: cn(
    'bg-transparent text-content-secondary',
    'border border-transparent',
    'hover:bg-surface hover:text-content',
    'active:bg-surface-inset active:scale-[0.98]',
    'focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas',
  ),

  destructive: cn(
    'bg-err text-content-on-brand',
    'border border-transparent',
    'hover:bg-err/90',
    'active:bg-err/80 active:scale-[0.98]',
    'focus-visible:ring-2 focus-visible:ring-err/70 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas',
    'shadow-sm',
  ),

  link: cn(
    'bg-transparent text-brand underline-offset-4',
    'border border-transparent',
    'hover:underline hover:text-brand-hover',
    'active:text-brand-active',
    'focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:ring-offset-1 focus-visible:ring-offset-canvas',
    /* Links não têm padding horizontal por padrão */
    '!px-0 !shadow-none h-auto',
  ),
}

const SIZE_CLASSES: Record<ButtonSize, string> = {
  xs:   'h-7  px-2.5 text-xs  gap-1   rounded-sm',
  sm:   'h-8  px-3   text-sm  gap-1.5 rounded',
  md:   'h-10 px-4   text-sm  gap-2   rounded',
  lg:   'h-12 px-6   text-base gap-2   rounded-md',
  xl:   'h-14 px-8   text-lg  gap-2.5 rounded-md',
  icon: 'h-10 w-10   text-sm  rounded',
}

/* ────────────────────────────────────────────────────────────
   BASE STYLES — compartilhados entre todas as variantes
   ──────────────────────────────────────────────────────────── */
const BASE_CLASSES = cn(
  /* Layout */
  'relative inline-flex items-center justify-center',
  'shrink-0 select-none cursor-pointer',
  /* Tipografia */
  'font-medium leading-none tracking-snug',
  'whitespace-nowrap',
  /* Overflow para possíveis efeitos internos */
  'overflow-hidden',
  /* Transições suaves com curvas premium definidas no globals.css
     duration-normal = 180ms, ease-out-expo = cubic-bezier(0.16,1,0.3,1) */
  'transition-all duration-normal ease-out-expo',
  /* Compositing hint para GPU — previne jank no transform hover */
  'will-change-transform',
  /* Focus reset — o ring é definido por variant */
  'outline-none',
  /* Disabled */
  'disabled:pointer-events-none disabled:opacity-40 disabled:cursor-not-allowed',
  /*
     Efeito magnético no hover: translate sutil + shadow elevation
     cria ilusão de que o botão "levita" em direção ao cursor.
     O combinado de -translate-y-px + shadow maior = profundidade real.
  */
  'hover:-translate-y-px',
)

/* ────────────────────────────────────────────────────────────
   SPINNER — componente interno de loading
   ──────────────────────────────────────────────────────────── */
function Spinner({ className }: { className?: string }) {
  return (
    <svg
      className={cn('animate-spin shrink-0', className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12" cy="12" r="10"
        stroke="currentColor"
        strokeWidth="3"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  )
}

const SPINNER_SIZES: Record<ButtonSize, string> = {
  xs:   'size-3',
  sm:   'size-3.5',
  md:   'size-4',
  lg:   'size-4',
  xl:   'size-5',
  icon: 'size-4',
}

/* ────────────────────────────────────────────────────────────
   COMPONENTE PRINCIPAL
   ──────────────────────────────────────────────────────────── */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant  = 'primary',
      size     = 'md',
      loading  = false,
      disabled,
      icon,
      iconRight,
      fullWidth = false,
      children,
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || loading

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        aria-busy={loading || undefined}
        className={cn(
          BASE_CLASSES,
          VARIANT_CLASSES[variant],
          SIZE_CLASSES[size],
          fullWidth && 'w-full',
          className,
        )}
        {...props}
      >
        {/*
          Camada de shimmer opcional — comentada por padrão.
          Descomentar para botões de alto impacto (ex: CTA hero).

          <span
            aria-hidden
            className={cn(
              'pointer-events-none absolute inset-0 -translate-x-full',
              'bg-gradient-to-r from-transparent via-white/10 to-transparent',
              'group-hover:animate-shimmer'
            )}
          />
        */}

        {/* Spinner ou ícone esquerdo */}
        {loading ? (
          <Spinner className={SPINNER_SIZES[size]} aria-hidden />
        ) : icon ? (
          <span className="shrink-0" aria-hidden>
            {icon}
          </span>
        ) : null}

        {/* Label — oculto visualmente durante loading para manter largura */}
        {children && (
          <span className={cn(loading && 'opacity-0 select-none')}>
            {children}
          </span>
        )}

        {/* Ícone direito (seta, chevron, external link, etc.) */}
        {!loading && iconRight && (
          <span
            className={cn(
              'shrink-0 transition-transform duration-fast ease-out-expo',
              'group-hover:translate-x-0.5',
            )}
            aria-hidden
          >
            {iconRight}
          </span>
        )}

        {/* Loading label para screen readers */}
        {loading && (
          <span className="sr-only">Carregando...</span>
        )}
      </button>
    )
  },
)

Button.displayName = 'Button'

export { Button }

/*
  ══════════════════════════════════════════════════════════════
  USO — EXEMPLOS DE REFERÊNCIA
  ══════════════════════════════════════════════════════════════

  // Variantes
  <Button variant="primary">Criar projeto</Button>
  <Button variant="secondary">Cancelar</Button>
  <Button variant="outline">Ver mais</Button>
  <Button variant="ghost">Editar</Button>
  <Button variant="destructive">Excluir conta</Button>
  <Button variant="link">Esqueci minha senha</Button>

  // Tamanhos
  <Button size="xs">Mini</Button>
  <Button size="sm">Pequeno</Button>
  <Button size="md">Médio (padrão)</Button>
  <Button size="lg">Grande</Button>
  <Button size="xl">Hero CTA</Button>

  // Com ícones
  <Button icon={<PlusIcon className="size-4" />}>
    Adicionar
  </Button>

  <Button
    iconRight={<ArrowRightIcon className="size-4" />}
    variant="outline"
  >
    Ver todos os projetos
  </Button>

  // Loading state
  <Button loading>Enviando...</Button>

  // Full width (formulários)
  <Button fullWidth size="lg">Entrar</Button>

  // Botão ícone solo (sem label)
  <Button size="icon" variant="ghost" aria-label="Configurações">
    <GearIcon className="size-4" />
  </Button>

  // Renderizado como link <a> (Next.js Link)
  import Link from 'next/link'
  <Button asChild>
    <Link href="/contato">Falar comigo</Link>
  </Button>

  ══════════════════════════════════════════════════════════════
  PADRÃO DE COMPONENTIZAÇÃO SEMÂNTICA (EXEMPLO)
  ══════════════════════════════════════════════════════════════

  // ✅ CORRETO — componente semântico usa primitivo
  function ContactFormSubmit({ isSubmitting }: { isSubmitting: boolean }) {
    return (
      <Button
        type="submit"
        variant="primary"
        size="lg"
        fullWidth
        loading={isSubmitting}
        icon={<SendIcon className="size-4" />}
      >
        Enviar mensagem
      </Button>
    )
  }

  // ❌ ERRADO — lógica de negócio dentro do primitivo
  function Button() {
    const { submit } = useFormContext() // ← não fazer isso
    ...
  }
*/
