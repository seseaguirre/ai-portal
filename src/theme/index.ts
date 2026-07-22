/**
 * The ONE MUI-aware theme file. Tokens are the source; MUI is the consumer.
 *
 * Swapping to a different component library means rewriting this adapter only —
 * the rest of the app talks to semantic tokens through `theme.tokens` and the
 * standard MUI theme keys mapped below. Nothing else imports MUI theme
 * internals or raw values.
 */

import { createTheme, type Theme } from '@mui/material/styles'
import { tokens, type DesignTokens, type TypeStyle } from './tokens'
import { altTokens } from './tokens.alt'

export type ThemeVariant = 'default' | 'alt'

declare module '@mui/material/styles' {
  interface Theme {
    tokens: DesignTokens
  }
  interface ThemeOptions {
    tokens?: DesignTokens
  }
}

const toVariant = (t: TypeStyle) => ({
  fontSize: t.fontSize,
  lineHeight: t.lineHeight,
  fontWeight: t.fontWeight,
  letterSpacing: t.letterSpacing,
})

const buildShadows = (t: DesignTokens): Theme['shadows'] => {
  const { level0, level1, level2, level3 } = t.elevation
  const shadows = Array.from({ length: 25 }, (_, i) => {
    if (i === 0) return level0
    if (i <= 3) return level1
    if (i <= 8) return level2
    return level3
  })
  return shadows as Theme['shadows']
}

const getTokens = (variant: ThemeVariant): DesignTokens =>
  variant === 'alt' ? altTokens : tokens

export const buildAppTheme = (variant: ThemeVariant): Theme => {
  const t = getTokens(variant)
  const { color, typography, radii } = t

  return createTheme({
    tokens: t,
    spacing: t.spacing.unit,
    shape: { borderRadius: radii.md },
    shadows: buildShadows(t),
    palette: {
      mode: 'light',
      primary: {
        main: color.action.primary,
        dark: color.action.primaryHover,
        contrastText: color.text.onAccent,
      },
      secondary: {
        main: color.brand.primary,
        dark: color.brand.primaryStrong,
        contrastText: color.brand.onPrimary,
      },
      success: {
        main: color.status.certified,
        contrastText: color.text.onAccent,
      },
      warning: {
        main: color.status.pending,
        contrastText: color.text.onAccent,
      },
      error: { main: color.status.danger, contrastText: color.text.onAccent },
      info: { main: color.status.info, contrastText: color.text.onAccent },
      background: { default: color.surface.base, paper: color.surface.raised },
      text: {
        primary: color.text.primary,
        secondary: color.text.secondary,
        disabled: color.text.disabled,
      },
      divider: color.border.subtle,
    },
    typography: {
      fontFamily: typography.fontFamily.base,
      fontWeightRegular: typography.weight.regular,
      fontWeightMedium: typography.weight.medium,
      fontWeightBold: typography.weight.bold,
      h1: toVariant(typography.scale.displayLarge),
      h2: toVariant(typography.scale.headline),
      h3: toVariant(typography.scale.titleLarge),
      h4: toVariant(typography.scale.title),
      h5: toVariant(typography.scale.title),
      h6: toVariant(typography.scale.label),
      subtitle1: toVariant(typography.scale.body),
      subtitle2: toVariant(typography.scale.label),
      body1: toVariant(typography.scale.body),
      body2: toVariant(typography.scale.bodySmall),
      button: { ...toVariant(typography.scale.label), textTransform: 'none' },
      caption: toVariant(typography.scale.caption),
      overline: {
        ...toVariant(typography.scale.caption),
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: { backgroundColor: color.surface.base },
          'code, pre, kbd, samp': {
            fontFamily: typography.fontFamily.mono,
          },
          '*:focus-visible': {
            outline: `2px solid ${color.border.focus}`,
            outlineOffset: '2px',
          },
        },
      },
      MuiButton: {
        defaultProps: { disableElevation: true },
        styleOverrides: {
          root: {
            borderRadius: radii.pill,
            fontWeight: typography.weight.semibold,
            paddingInline: t.spacing.unit * 2.25,
          },
        },
      },
      MuiPaper: {
        styleOverrides: { rounded: { borderRadius: radii.lg } },
      },
      MuiCard: {
        defaultProps: { elevation: 0 },
        styleOverrides: {
          root: {
            borderRadius: radii.lg,
            border: `1px solid ${color.border.subtle}`,
            backgroundColor: color.surface.raised,
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: { borderRadius: radii.sm, fontWeight: typography.weight.medium },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: { root: { borderRadius: radii.md } },
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            backgroundColor: color.surface.inverse,
            color: color.surface.onInverse,
            fontSize: typography.scale.caption.fontSize,
            borderRadius: radii.sm,
            paddingInline: t.spacing.unit,
            paddingBlock: t.spacing.unit * 0.75,
          },
        },
      },
    },
  })
}
