import { converter } from 'culori'

function hexToOklch (hex: string) {
  const toOklch = converter('oklch')
  return toOklch(hex)
}

function getContrastingColor (hex: string): string {
  const color = hexToOklch(hex)
  if (!color) return '#000000'

  return color.l > 0.5 ? '#000000' : '#FFFFFF'
}

export { getContrastingColor }