/**
 * THE source of truth for every design decision in the ØAE Portal.
 *
 * Re-skinning the whole app to a real design system means editing this folder
 * and nothing else. Rules:
 *  - Only semantic names here (color.status.certified, not green500).
 *  - Leaves are raw values (hex, px, ms). At most one hop from a local
 *    primitive to a semantic slot — never a chain of token-to-token refs.
 *  - No hex, font-family, px, or shadow lives anywhere else in the codebase.
 *
 * The MUI adapter in ./index.ts is the only file allowed to read this shape
 * and turn it into a component-library theme.
 */

export interface TypeStyle {
  fontSize: string
  lineHeight: number
  fontWeight: number
  letterSpacing: string
}

export interface DesignTokens {
  color: {
    brand: {
      primary: string
      primaryStrong: string
      onPrimary: string
      accent: string
      accentStrong: string
      accentSoft: string
    }
    surface: {
      base: string
      raised: string
      sunken: string
      inverse: string
      onInverse: string
    }
    text: {
      primary: string
      secondary: string
      disabled: string
      onAccent: string
    }
    action: {
      primary: string
      primaryHover: string
      secondary: string
      secondaryHover: string
    }
    status: {
      certified: string
      certifiedSurface: string
      sandbox: string
      sandboxSurface: string
      deprecated: string
      deprecatedSurface: string
      pending: string
      pendingSurface: string
      danger: string
      dangerSurface: string
      info: string
      infoSurface: string
    }
    border: {
      subtle: string
      strong: string
      focus: string
    }
  }
  typography: {
    fontFamily: {
      base: string
      mono: string
    }
    weight: {
      regular: number
      medium: number
      semibold: number
      bold: number
    }
    scale: {
      displayLarge: TypeStyle
      headline: TypeStyle
      titleLarge: TypeStyle
      title: TypeStyle
      body: TypeStyle
      bodySmall: TypeStyle
      label: TypeStyle
      caption: TypeStyle
    }
  }
  spacing: {
    unit: number
  }
  radii: {
    sm: number
    md: number
    lg: number
    xl: number
    pill: number
  }
  elevation: {
    level0: string
    level1: string
    level2: string
    level3: string
  }
  motion: {
    duration: {
      short: number
      medium: number
      long: number
      flow: number
    }
    easing: {
      standard: string
      emphasized: string
    }
  }
}

const raw = {
  navy: '#0A2540',
  navyStrong: '#071B30',
  ink: '#10233A',
  slate: '#566374',
  mist: '#9AA6B2',
  blue: '#3663F5',
  blueStrong: '#2A50D6',
  blueSoft: '#EAF0FF',
  white: '#FFFFFF',
  pageGray: '#F5F8FC',
  cloudGray: '#EEF2F7',
  lineGray: '#E1E7EF',
  steelGray: '#C6D0DC',
  green: '#2E7D57',
  greenSoft: '#E4F2EB',
  amber: '#B26A00',
  amberSoft: '#FBEEDC',
  gray: '#6B7785',
  graySoft: '#EEF1F4',
  red: '#B3261E',
  redSoft: '#FBE9E7',
} as const

export const tokens: DesignTokens = {
  color: {
    brand: {
      primary: raw.navy,
      primaryStrong: raw.navyStrong,
      onPrimary: raw.white,
      accent: raw.blue,
      accentStrong: raw.blueStrong,
      accentSoft: raw.blueSoft,
    },
    surface: {
      base: raw.pageGray,
      raised: raw.white,
      sunken: raw.cloudGray,
      inverse: raw.navy,
      onInverse: raw.white,
    },
    text: {
      primary: raw.ink,
      secondary: raw.slate,
      disabled: raw.mist,
      onAccent: raw.white,
    },
    action: {
      primary: raw.blue,
      primaryHover: raw.blueStrong,
      secondary: raw.navy,
      secondaryHover: raw.navyStrong,
    },
    status: {
      certified: raw.green,
      certifiedSurface: raw.greenSoft,
      sandbox: raw.amber,
      sandboxSurface: raw.amberSoft,
      deprecated: raw.gray,
      deprecatedSurface: raw.graySoft,
      pending: raw.amber,
      pendingSurface: raw.amberSoft,
      danger: raw.red,
      dangerSurface: raw.redSoft,
      info: raw.blue,
      infoSurface: raw.blueSoft,
    },
    border: {
      subtle: raw.lineGray,
      strong: raw.steelGray,
      focus: raw.blue,
    },
  },
  typography: {
    fontFamily: {
      base: '"Segoe UI", Roboto, Inter, system-ui, -apple-system, Helvetica, Arial, sans-serif',
      mono: 'ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace',
    },
    weight: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    scale: {
      displayLarge: {
        fontSize: '3rem',
        lineHeight: 1.15,
        fontWeight: 700,
        letterSpacing: '-0.02em',
      },
      headline: {
        fontSize: '2rem',
        lineHeight: 1.2,
        fontWeight: 700,
        letterSpacing: '-0.01em',
      },
      titleLarge: {
        fontSize: '1.375rem',
        lineHeight: 1.3,
        fontWeight: 600,
        letterSpacing: '0em',
      },
      title: {
        fontSize: '1.125rem',
        lineHeight: 1.4,
        fontWeight: 600,
        letterSpacing: '0em',
      },
      body: {
        fontSize: '1rem',
        lineHeight: 1.5,
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
        letterSpacing: '0.01em',
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
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    pill: 999,
  },
  elevation: {
    level0: 'none',
    level1: '0 1px 2px rgba(10, 37, 64, 0.08), 0 1px 3px rgba(10, 37, 64, 0.06)',
    level2:
      '0 4px 12px rgba(10, 37, 64, 0.10), 0 2px 4px rgba(10, 37, 64, 0.06)',
    level3:
      '0 12px 28px rgba(10, 37, 64, 0.14), 0 6px 12px rgba(10, 37, 64, 0.08)',
  },
  motion: {
    duration: {
      short: 120,
      medium: 220,
      long: 360,
      flow: 4000,
    },
    easing: {
      standard: 'cubic-bezier(0.2, 0, 0, 1)',
      emphasized: 'cubic-bezier(0.2, 0, 0, 1.2)',
    },
  },
}
