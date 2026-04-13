/* ============================================================
   DESIGN SYSTEM — TAILWIND MASTER CONFIG
   Metodologia:
     • Escala tipográfica: Perfect Fourth (×1.333) com clamp()
       para fluidez entre 375px e 1440px de viewport
     • Grid de espaçamento: 8pt (base = 8px = 0.5rem)
     • Cores: extend (não override) — tokens semânticos adicionados
       ao topo da paleta Tailwind padrão. Isso mantém gray-*, red-*,
       etc. disponíveis para legado e componentes não migrados ainda.
     • Sombras: mapeadas das variáveis --shadow-*
     • Transições: curvas de Bézier semânticas
   ============================================================ */

import type { Config } from 'tailwindcss'

/* ────────────────────────────────────────────────────────────
   HELPER: referência a CSS Custom Property com suporte a alpha
   Tailwind injeta `/ <alpha-value>` para permitir bg-brand/50
   ──────────────────────────────────────────────────────────── */
const token = (variable: string) =>
  `hsl(var(${variable}) / <alpha-value>)`

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],

  theme: {
    /* ────────────────────────────────────────────────────────
       OVERRIDE COMPLETO das primitivas de escala
       (tipografia, espaçamento, radius, sombras, transições)
       Cores ficam em `extend` para não quebrar classes legadas.
    ──────────────────────────────────────────────────────── */

    /* ── TIPOGRAFIA FLUIDA — PERFECT FOURTH (×1.333) ────────
       Fórmula: clamp(min, slope·100vw + intercept, max)
       Viewport range: 375px → 1440px (Δ = 1065px)
       Linha de referência: base = 16px

       line-height: tight nos títulos = "contraste brutal"
       letter-spacing: tracking negativo proporcional ao tamanho

       Verificação:
         slope_px = (max_px - min_px) / 1065
         intercept_px = min_px - slope_px × 375
         → converter ambos para rem (÷16)
    ──────────────────────────────────────────────────────── */
    fontSize: {
      /* 2xs — 10→11px — rótulos ultrafinos, badges */
      '2xs': ['clamp(0.625rem, 0.09vw + 0.59rem, 0.6875rem)', {
        lineHeight: '1rem',
        letterSpacing: '0.03em',
      }],

      /* xs — 11→12px — captions, legendas */
      'xs': ['clamp(0.6875rem, 0.09vw + 0.65rem, 0.75rem)', {
        lineHeight: '1.125rem',
        letterSpacing: '0.02em',
      }],

      /* sm — 13→14px — texto pequeno, helper text */
      'sm': ['clamp(0.8125rem, 0.09vw + 0.77rem, 0.875rem)', {
        lineHeight: '1.375rem',
        letterSpacing: '0.01em',
      }],

      /* base — 15→17px — corpo de texto principal */
      'base': ['clamp(0.9375rem, 0.19vw + 0.87rem, 1.0625rem)', {
        lineHeight: '1.7',
        letterSpacing: '0em',
      }],

      /* lg — 18→20px — lead paragraph, corpo grande */
      'lg': ['clamp(1.125rem, 0.19vw + 1.05rem, 1.25rem)', {
        lineHeight: '1.65',
        letterSpacing: '-0.01em',
      }],

      /* xl — 20→24px — H6, subheadlines */
      'xl': ['clamp(1.25rem, 0.38vw + 1.1rem, 1.5rem)', {
        lineHeight: '1.5',
        letterSpacing: '-0.015em',
      }],

      /* 2xl — 24→30px — H5 */
      '2xl': ['clamp(1.5rem, 0.56vw + 1.29rem, 1.875rem)', {
        lineHeight: '1.4',
        letterSpacing: '-0.02em',
      }],

      /* 3xl — 28→36px — H4 */
      '3xl': ['clamp(1.75rem, 0.75vw + 1.47rem, 2.25rem)', {
        lineHeight: '1.3',
        letterSpacing: '-0.025em',
      }],

      /* 4xl — 34→48px — H3 */
      '4xl': ['clamp(2.125rem, 1.31vw + 1.63rem, 3rem)', {
        lineHeight: '1.2',
        letterSpacing: '-0.03em',
      }],

      /* 5xl — 42→64px — H2 */
      '5xl': ['clamp(2.625rem, 2.07vw + 1.85rem, 4rem)', {
        lineHeight: '1.1',
        letterSpacing: '-0.035em',
      }],

      /* 6xl — 54→80px — H1 */
      '6xl': ['clamp(3.375rem, 2.44vw + 2.46rem, 5rem)', {
        lineHeight: '1.05',
        letterSpacing: '-0.04em',
      }],

      /* 7xl — 64→112px — Display / Hero */
      '7xl': ['clamp(4rem, 4.51vw + 2.31rem, 7rem)', {
        lineHeight: '1',
        letterSpacing: '-0.045em',
      }],

      /* 8xl — 80→140px — Poster / Super Display */
      '8xl': ['clamp(5rem, 5.63vw + 2.89rem, 8.75rem)', {
        lineHeight: '0.95',
        letterSpacing: '-0.05em',
      }],
    },

    /* ── FAMÍLIAS TIPOGRÁFICAS ───────────────────────────── */
    fontFamily: {
      sans:    ['var(--font-inter)', 'system-ui', 'sans-serif'],
      display: ['var(--font-outfit)', 'var(--font-inter)', 'sans-serif'],
      mono:    ['ui-monospace', 'JetBrains Mono', 'Fira Code', 'monospace'],
    },

    /* ── FONT WEIGHT ────────────────────────────────────── */
    fontWeight: {
      thin:       '100',
      extralight: '200',
      light:      '300',
      normal:     '400',
      medium:     '500',
      semibold:   '600',
      bold:       '700',
      extrabold:  '800',
      black:      '900',
    },

    /* ── LETTER SPACING SEMÂNTICO ───────────────────────── */
    letterSpacing: {
      tighter:  '-0.05em',
      tight:    '-0.025em',
      snug:     '-0.015em',
      normal:   '0em',
      relaxed:  '0.01em',
      wide:     '0.025em',
      wider:    '0.05em',
      widest:   '0.1em',
      /* Aliases semânticos */
      display:  '-0.045em',
      heading:  '-0.03em',
      label:    '0.02em',
      caps:     '0.08em',
    },

    /* ── LINE HEIGHT SEMÂNTICO ──────────────────────────── */
    lineHeight: {
      none:     '1',
      tightest: '1.05',
      tighter:  '1.1',
      tight:    '1.2',
      snug:     '1.35',
      normal:   '1.5',
      relaxed:  '1.65',
      loose:    '1.75',
      looser:   '2',
    },

    /* ── ESPAÇAMENTO — GRID DE 8pt ──────────────────────────
       Base: 1 unit = 8px = 0.5rem
       Sub-grid de 4px para ajustes finos dentro de componentes.
       Múltiplos de 8 para espaçamento estrutural.
    ──────────────────────────────────────────────────────── */
    spacing: {
      px:    '1px',
      0:     '0px',
      0.5:   '2px',
      1:     '4px',
      1.5:   '6px',
      2:     '8px',    /* 1× grid */
      2.5:   '10px',
      3:     '12px',   /* 1.5× */
      3.5:   '14px',
      4:     '16px',   /* 2× */
      5:     '20px',   /* 2.5× */
      6:     '24px',   /* 3× */
      7:     '28px',   /* 3.5× */
      8:     '32px',   /* 4× */
      9:     '36px',
      10:    '40px',   /* 5× */
      11:    '44px',
      12:    '48px',   /* 6× */
      14:    '56px',   /* 7× */
      16:    '64px',   /* 8× */
      18:    '72px',   /* 9× */
      20:    '80px',   /* 10× */
      24:    '96px',   /* 12× */
      28:    '112px',  /* 14× */
      32:    '128px',  /* 16× */
      36:    '144px',  /* 18× */
      40:    '160px',  /* 20× */
      44:    '176px',
      48:    '192px',  /* 24× */
      52:    '208px',
      56:    '224px',
      60:    '240px',
      64:    '256px',  /* 32× */
      72:    '288px',
      80:    '320px',
      96:    '384px',  /* 48× — macro whitespace */
      112:   '448px',
      128:   '512px',  /* 64× — hero */
    },

    /* ── BORDER RADIUS ──────────────────────────────────── */
    borderRadius: {
      none:    '0px',
      '2xs':   'var(--radius-2xs)',
      xs:      'var(--radius-xs)',
      sm:      'var(--radius-sm)',
      DEFAULT: 'var(--radius)',
      md:      'var(--radius-md)',
      lg:      'var(--radius-lg)',
      xl:      'var(--radius-xl)',
      '2xl':   'var(--radius-2xl)',
      full:    'var(--radius-full)',
    },

    /* ── SOMBRAS — MAPEADAS DOS TOKENS CSS ──────────────── */
    boxShadow: {
      none:     'none',
      xs:       'var(--shadow-xs)',
      sm:       'var(--shadow-sm)',
      DEFAULT:  'var(--shadow-md)',
      md:       'var(--shadow-md)',
      lg:       'var(--shadow-lg)',
      xl:       'var(--shadow-xl)',
      '2xl':    'var(--shadow-2xl)',
      floating: 'var(--shadow-floating)',
      brand:    'var(--shadow-brand)',
      focus:    'var(--shadow-focus)',
      inset:    'var(--shadow-inset)',
    },

    /* ── TRANSIÇÕES ─────────────────────────────────────── */
    transitionTimingFunction: {
      DEFAULT:    'var(--ease-standard)',
      linear:     'linear',
      in:         'cubic-bezier(0.4, 0, 1, 1)',
      out:        'cubic-bezier(0, 0, 0.2, 1)',
      'in-out':   'cubic-bezier(0.4, 0, 0.2, 1)',
      /* Curvas premium do Design System */
      'spring':       'var(--ease-spring)',
      'out-expo':     'var(--ease-out-expo)',
      'out-quart':    'var(--ease-out-quart)',
      'in-quart':     'var(--ease-in-quart)',
      'sine':         'var(--ease-sine)',
      'standard':     'var(--ease-standard)',
      'reveal':       'var(--ease-reveal)',
    },

    transitionDuration: {
      instant: 'var(--dur-instant)',
      fast:    'var(--dur-fast)',
      DEFAULT: 'var(--dur-normal)',
      normal:  'var(--dur-normal)',
      slow:    'var(--dur-slow)',
      slower:  'var(--dur-slower)',
      lazy:    'var(--dur-lazy)',
      0:       '0ms',
      75:      '75ms',
      100:     '100ms',
      150:     '150ms',
      200:     '200ms',
      300:     '300ms',
      500:     '500ms',
      700:     '700ms',
      1000:    '1000ms',
    },

    /* ── BLUR ────────────────────────────────────────────── */
    blur: {
      none: '0',
      sm:   '4px',
      DEFAULT: '8px',
      md:   '12px',
      lg:   '16px',
      xl:   '24px',
      '2xl': '40px',
      '3xl': '64px',
    },

    /* ── BREAKPOINTS ────────────────────────────────────── */
    screens: {
      xs:    '375px',
      sm:    '640px',
      md:    '768px',
      lg:    '1024px',
      xl:    '1280px',
      '2xl': '1440px',
      '3xl': '1920px',
    },

    /* ────────────────────────────────────────────────────────
       EXTEND — adiciona tokens semânticos SEM remover os
       defaults do Tailwind (gray-*, red-*, etc. continuam
       disponíveis para componentes não migrados ainda).
    ──────────────────────────────────────────────────────── */
    extend: {
      /* ── CORES SEMÂNTICAS ──────────────────────────────── */
      colors: {
        /* Superfícies — bg-canvas, bg-surface, bg-surface-raised */
        canvas:  token('--canvas'),
        surface: {
          DEFAULT: token('--surface'),
          raised:  token('--surface-raised'),
          inset:   token('--surface-inset'),
          overlay: token('--surface-overlay'),
        },

        /* Conteúdo — text-content, text-content-secondary */
        content: {
          DEFAULT:    token('--content'),
          secondary:  token('--content-secondary'),
          muted:      token('--content-muted'),
          disabled:   token('--content-disabled'),
          inverse:    token('--content-inverse'),
          'on-brand': token('--content-on-brand'),
        },

        /* Brand — bg-brand, text-brand, border-brand */
        brand: {
          DEFAULT: token('--brand'),
          hover:   token('--brand-hover'),
          active:  token('--brand-active'),
          subtle:  token('--brand-subtle'),
          muted:   token('--brand-muted'),
        },

        /* Bordas — border-line, border-line-strong */
        line: {
          DEFAULT: token('--line'),
          strong:  token('--line-strong'),
          focus:   token('--line-focus'),
        },

        /* Estados semânticos */
        ok:   token('--ok'),
        warn: token('--warn'),
        err:  token('--err'),
        info: token('--info'),

        /* ── BACKWARD COMPAT — componentes existentes ────── */
        background: token('--canvas'),
        foreground: token('--content'),
        primary: {
          DEFAULT:    token('--brand'),
          foreground: token('--content-on-brand'),
        },
        secondary: {
          DEFAULT:    token('--surface'),
          foreground: token('--content'),
        },
        muted: {
          DEFAULT:    token('--surface'),
          foreground: token('--content-muted'),
        },
        accent: {
          DEFAULT:    token('--surface-inset'),
          foreground: token('--content'),
        },
        destructive: {
          DEFAULT:    token('--err'),
          foreground: token('--content-on-brand'),
        },
        card: {
          DEFAULT:    token('--surface'),
          foreground: token('--content'),
        },
        popover: {
          DEFAULT:    token('--surface-raised'),
          foreground: token('--content'),
        },
        border: token('--line'),
        input:  token('--line'),
        ring:   token('--brand'),
      },

      /* ── BACKGROUND IMAGES UTILITÁRIOS ──────────────────── */
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':  'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },

      /* ── ANIMAÇÕES ───────────────────────────────────────── */
      animation: {
        'fade-in':        'fadeIn var(--dur-slow) var(--ease-out-expo) both',
        'fade-up':        'fadeUp var(--dur-slow) var(--ease-out-expo) both',
        'fade-down':      'fadeDown var(--dur-slow) var(--ease-out-expo) both',
        'scale-in':       'scaleIn var(--dur-slow) var(--ease-spring) both',
        'slide-in-left':  'slideInLeft var(--dur-slow) var(--ease-out-expo) both',
        'slide-in-right': 'slideInRight var(--dur-slow) var(--ease-out-expo) both',
        'shimmer':        'shimmer 2s var(--ease-sine) infinite',
        'spin-slow':      'spin 2s linear infinite',
        'spin':           'spin 0.7s linear infinite',
        /* Legado */
        'slide-up':   'fadeUp 0.5s ease-out',
        'slide-down': 'fadeDown 0.5s ease-out',
      },

      keyframes: {
        fadeIn:       { from: { opacity: '0' }, to: { opacity: '1' } },
        fadeUp:       { from: { opacity: '0', transform: 'translateY(16px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        fadeDown:     { from: { opacity: '0', transform: 'translateY(-16px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        scaleIn:      { from: { opacity: '0', transform: 'scale(0.96)' }, to: { opacity: '1', transform: 'scale(1)' } },
        slideInLeft:  { from: { opacity: '0', transform: 'translateX(-24px)' }, to: { opacity: '1', transform: 'translateX(0)' } },
        slideInRight: { from: { opacity: '0', transform: 'translateX(24px)' }, to: { opacity: '1', transform: 'translateX(0)' } },
        shimmer:      { '0%': { transform: 'translateX(-100%)' }, '100%': { transform: 'translateX(200%)' } },
        spin:         { to: { transform: 'rotate(360deg)' } },
      },

      /* ── LARGURAS SEMÂNTICAS ──────────────────────────── */
      maxWidth: {
        'prose-xs':  '45ch',
        'prose-sm':  '55ch',
        'prose':     '68ch',
        'prose-lg':  '75ch',
        'container': '1280px',
        'wide':      '1440px',
      },

      /* ── Z-INDEX SEMÂNTICO ────────────────────────────── */
      zIndex: {
        behind:  '-1',
        base:    '0',
        raised:  '10',
        overlay: '20',
        sticky:  '30',
        fixed:   '40',
        modal:   '50',
        toast:   '60',
        tooltip: '70',
        max:     '9999',
      },

      /* ── ASPECT RATIOS ────────────────────────────────── */
      aspectRatio: {
        'video':   '16 / 9',
        'photo':   '4 / 3',
        'portrait':'3 / 4',
        'wide':    '21 / 9',
        'golden':  '1.618 / 1',
      },
    },
  },

  plugins: [],
}

export default config
