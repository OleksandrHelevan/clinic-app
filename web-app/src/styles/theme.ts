export const theme = {
  colors: {
    medCyan: '#07b6b8',
    medBlue: '#3b82f6',
    medPurple: '#7256a1',
    textDark: '#1f2937',
    textGray: '#4b5563',
    textMuted: '#6b7280',
    textInverse: '#ffffff',
    danger: '#ef4444',
    dangerBg: 'rgba(254, 242, 242, 0.8)',
    dangerBorder: '#fecaca',
  },
  glass: {
    bg: 'rgba(255, 255, 255, 0.6)',
    bgStrong: 'rgba(255, 255, 255, 0.75)',
    border: 'rgba(255, 255, 255, 0.8)',
    shadow: '0 8px 32px 0 rgba(31, 38, 135, 0.1)',
  },
  gradients: {
    primary: 'linear-gradient(135deg, #07b6b8 0%, #3b82f6 50%, #7256a1 100%)',
    primaryHover: 'linear-gradient(135deg, #7256a1 0%, #3b82f6 50%, #07b6b8 100%)',
    background: 'linear-gradient(120deg, #07b6b8, #3b82f6, #7256a1, #07b6b8)',
  },
  shadows: {
    blue: 'rgba(59, 130, 246, 0.25)',
    blueHover: 'rgba(7, 182, 184, 0.35)',
  },
} as const;

export type AppTheme = typeof theme;
