import { converter, formatHex, type Color, random } from 'culori'

function hexToOklch (hex: string) {
  const toOklch = converter('oklch')
  return toOklch(hex)
}

function oklchToHex (oklchColor: Color): string {
  const toRgb = converter('rgb')
  const rgbColor = toRgb(oklchColor)
  const hexColor = formatHex(rgbColor)
  return hexColor
}

function getContrastingColor (hex: string): string {
  const color = hexToOklch(hex)
  if (!color) return '#000000'

  return color.l > 0.5 ? '#000000' : '#FFFFFF'
}

function getRandomHexColor (): string {
  return formatHex(random())
}

function generateTailwindPalette (hex: string): Record<number, string> | null {
  const baseColor = hexToOklch(hex)
  if (!baseColor) return null

  const lightnessMap = {
    50: 0.95,
    100: 0.89,
    200: 0.78,
    300: 0.67,
    400: 0.56,
    500: baseColor.l,
    600: 0.42,
    700: 0.33,
    800: 0.25,
    900: 0.15,
    950: 0.07
  }

  const palette: Record<number, string> = {}

  for (const [key, lightness] of Object.entries(lightnessMap)) {
    const modifiedColor = { ...baseColor, l: lightness }
    palette[parseInt(key)] = oklchToHex(modifiedColor)
  }

  return palette
}

export { getContrastingColor, generateTailwindPalette, getRandomHexColor }
