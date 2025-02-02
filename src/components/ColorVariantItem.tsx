import { formatHex } from 'culori';
import { getContrastingColor } from '../shared/utils/colorUtils';
import { toast } from 'sonner';

type Props = {
  hexColor: string;
  step: string;
};

function ColorVariantItem({ hexColor, step }: Props) {

  const formattedHex: string = formatHex(hexColor) ?? "#000000";
  const contrastingColor = getContrastingColor(formattedHex);

  function copyToClipboard(hex: string) {
    navigator.clipboard.writeText(hex);
    toast.success(`${hex} copied to clipboard`);
  }

  return (
    <div
      onClick={() => copyToClipboard(formattedHex)}
      data-clipboard-text={formattedHex}
      className="relative flex flex-col justify-center border-[0.5px] hover:border-gray-200 md:py-4 p-2 border-transparent rounded-xl w-full h-14 md:h-24 transition-all cursor-pointer"
      style={{ backgroundColor: formattedHex }}
    >
      <div
        className="md:block flex justify-between items-center md:mt-auto px-4 md:px-0 cursor-pointer"
      >
        <div style={{ color: contrastingColor }} >
          <div className="font-medium text-center text-sm">{step}</div>
          <div className="opacity-90 text-center text-xs uppercase">
            {formattedHex}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ColorVariantItem