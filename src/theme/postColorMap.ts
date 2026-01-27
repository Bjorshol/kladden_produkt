// Fargekart for sak/innholdskort og artikkelheader
// id -> { bg, text }

export const postColorMap = {
  default: {
    bg: 'transparent',
    text: '#2a2a2a',
  },
  beige: {
    bg: '#e2dbc8',
    text: '#5a574f',
  },
  blue: {
    bg: '#0e6799',
    text: '#ffffff',
  },
  gray: {
    bg: '#bcbcbd',
    text: '#2a2a2a',
  },
  yellow: {
    bg: '#ffeb58',
    text: '#2a2a2a',
  },
  black: {
    bg: '#292827',
    text: '#ffffff',
  },
} as const;

export type PostThemeColor = keyof typeof postColorMap
