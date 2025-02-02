import { createStore } from 'zustand/vanilla'
import { generateTailwindPalette, getRandomHexColor } from '../utils/colorUtils'
import { useStore } from 'zustand'

interface ColorStore {
  currentColor: string
  palette: Record<number, string> | null
  setCurrentColor: (color: string) => void
}

const initialRandomColor = getRandomHexColor()
const initialPalette = generateTailwindPalette(initialRandomColor)

const colorStore = createStore<ColorStore>(set => ({
  currentColor: initialRandomColor,
  palette: initialPalette,
  setCurrentColor: (color: string) => {
    console.log('setting color', color)
    return set({ currentColor: color, palette: generateTailwindPalette(color) })
  }
}))

const { getState, getInitialState, subscribe, setState } = colorStore
export { getState, getInitialState, subscribe, setState }

export function useColorStore(): ColorStore
export function useColorStore<T>(selector: (state: ColorStore) => T): T
export function useColorStore<T> (selector?: (state: ColorStore) => T) {
  return useStore(colorStore, selector!)
}
