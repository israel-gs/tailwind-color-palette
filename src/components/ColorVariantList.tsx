import { useColorStore } from '../shared/store/colorStore';
import ColorVariantItem from './ColorVariantItem';

function ColorVariantList() {
  const palette = useColorStore((state) => state.palette)

  return (
    <div
      className="relative flex md:flex-row flex-col md:space-x-1 space-y-1 md:space-y-0 rounded-xl overflow-hidden color-family-outline"
    >
      {palette && Object.entries(palette).map(([key, hexColor]) => (
        <div
          key={key}
          className="flex-1"
        >
          <ColorVariantItem hexColor={hexColor} step={key} />
        </div>
      ))}
    </div>
  )
}

export default ColorVariantList