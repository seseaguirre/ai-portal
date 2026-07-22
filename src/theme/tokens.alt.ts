/**
 * Proof-of-portability alternate theme.
 *
 * Deliberately different from the default: warm "Terracotta" palette, a
 * different font family, rounder shapes, softer shadows. It exists only to
 * prove the re-skin seam works — the dev toggle `?theme=alt` swaps to it and
 * the entire app must render cleanly with zero visual breakage.
 *
 * When Ørsted's real design system arrives, this is the file a designer copies
 * and fills in with real brand values. Same shape, different values.
 */

import type { DesignTokens } from './tokens'

const raw = {
  espresso: '#3A2A22',
  espressoStrong: '#271A14',
  clay: '#5A4034',
  stone: '#7C6A5E',
  fog: '#A99B8F',
  terracotta: '#DB6A3C',
  terracottaStrong: '#B9522A',
  terracottaSoft: '#FBEADF',
  white: '#FFFFFF',
  sand: '#FBF6EF',
  linen: '#F1E8DD',
  parchment: '#EFE4D6',
  hairline: '#E7DBCC',
  border: '#D6C6B4',
  moss: '#4B7B4B',
  mossSoft: '#E4EFE0',
  ochre: '#C0851C',
  ochreSoft: '#F8ECD3',
  taupe: '#8A7F73',
  taupeSoft: '#EEE7DE',
  rust: '#B23A2A',
  rustSoft: '#F8E2DC',
} as const

export const altTokens: DesignTokens = {
  color: {
    brand: {
      primary: raw.espresso,
      primaryStrong: raw.espressoStrong,
      onPrimary: raw.white,
      accent: raw.terracotta,
      accentStrong: raw.terracottaStrong,
      accentSoft: raw.terracottaSoft,
    },
    surface: {
      base: raw.sand,
      raised: raw.white,
      sunken: raw.linen,
      inverse: raw.espresso,
      onInverse: raw.white,
    },
    text: {
      primary: raw.espresso,
      secondary: raw.stone,
      disabled: raw.fog,
      onAccent: raw.white,
    },
    action: {
      primary: raw.terracotta,
      primaryHover: raw.terracottaStrong,
      secondary: raw.clay,
      secondaryHover: raw.espressoStrong,
    },
    status: {
      certified: raw.moss,
      certifiedSurface: raw.mossSoft,
      sandbox: raw.ochre,
      sandboxSurface: raw.ochreSoft,
      deprecated: raw.taupe,
      deprecatedSurface: raw.taupeSoft,
      pending: raw.ochre,
      pendingSurface: raw.ochreSoft,
      danger: raw.rust,
      dangerSurface: raw.rustSoft,
      info: raw.terracotta,
      infoSurface: raw.terracottaSoft,
    },
    border: {
      subtle: raw.hairline,
      strong: raw.border,
      focus: raw.terracotta,
    },
  },
  typography: {
    fontFamily: {
      base: '"Trebuchet MS", "Segoe UI", Verdana, system-ui, sans-serif',
      mono: 'ui-monospace, "Courier New", Consolas, monospace',
    },
    weight: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    scale: {
      displayLarge: {
        fontSize: '3.25rem',
        lineHeight: 1.1,
        fontWeight: 700,
        letterSpacing: '-0.01em',
      },
      headline: {
        fontSize: '2.125rem',
        lineHeight: 1.2,
        fontWeight: 700,
        letterSpacing: '0em',
      },
      titleLarge: {
        fontSize: '1.5rem',
        lineHeight: 1.3,
        fontWeight: 600,
        letterSpacing: '0em',
      },
      title: {
        fontSize: '1.1875rem',
        lineHeight: 1.4,
        fontWeight: 600,
        letterSpacing: '0em',
      },
      body: {
        fontSize: '1rem',
        lineHeight: 1.55,
        fontWeight: 400,
        letterSpacing: '0em',
      },
      bodySmall: {
        fontSize: '0.875rem',
        lineHeight: 1.5,
        fontWeight: 400,
        letterSpacing: '0em',
      },
      label: {
        fontSize: '0.8125rem',
        lineHeight: 1.4,
        fontWeight: 600,
        letterSpacing: '0.02em',
      },
      caption: {
        fontSize: '0.75rem',
        lineHeight: 1.4,
        fontWeight: 400,
        letterSpacing: '0.01em',
      },
    },
  },
  spacing: {
    unit: 8,
  },
  radii: {
    sm: 10,
    md: 16,
    lg: 22,
    xl: 30,
    pill: 999,
  },
  elevation: {
    level0: 'none',
    level1: '0 1px 2px rgba(58, 42, 34, 0.10), 0 1px 3px rgba(58, 42, 34, 0.07)',
    level2:
      '0 4px 14px rgba(58, 42, 34, 0.12), 0 2px 4px rgba(58, 42, 34, 0.07)',
    level3:
      '0 14px 30px rgba(58, 42, 34, 0.16), 0 6px 12px rgba(58, 42, 34, 0.10)',
  },
  motion: {
    duration: {
      short: 140,
      medium: 240,
      long: 380,
      flow: 4600,
    },
    easing: {
      standard: 'cubic-bezier(0.3, 0, 0, 1)',
      emphasized: 'cubic-bezier(0.3, 0, 0, 1.3)',
    },
  },
}
