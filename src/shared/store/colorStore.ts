import { createStore } from 'zustand/vanilla'
import {
  generateTailwindPalette,
  getColorName,
  getRandomHexColor
} from '../utils/colorUtils'
import { useStore } from 'zustand'

interface ColorStore {
  currentColor: string
  palette: Record<number, string> | null
  colorName: string | null
  setCurrentColor: (color: string) => void
}

const initialRandomColor = getRandomHexColor()
const initialPalette = generateTailwindPalette(initialRandomColor)
const initialColorName = getColorName(initialRandomColor)

const colorStore = createStore<ColorStore>(set => ({
  currentColor: initialRandomColor,
  palette: initialPalette,
  colorName: initialColorName,
  setCurrentColor: (color: string) => {
    return set({
      currentColor: color,
      palette: generateTailwindPalette(color),
      colorName: getColorName(color)
    })
  }
}))

const { getState, getInitialState, subscribe, setState } = colorStore
export { getState, getInitialState, subscribe, setState }

export function useColorStore(): ColorStore
export function useColorStore<T>(selector: (state: ColorStore) => T): T
export function useColorStore<T> (selector?: (state: ColorStore) => T) {
  return useStore(colorStore, selector!)
}
