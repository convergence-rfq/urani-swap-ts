import Image from "next/image";

interface InverterButtonProps {
  onInvert: () => void;
  icon?: string;
  isLoading?: boolean;
}

export default function InverterButton({
  onInvert,
  icon = "swap_vert",
  isLoading,
}: InverterButtonProps) {
  return (
    <div className="text-center -my-2 text-xs flex justify-center items-center relative">
      <hr className="absolute top-[calc(50%-1px)] -z-0 w-full border-[#131b2480]"></hr>
      <div className="z-10 inline-block">
      <button
        className="group/flip flex h-8 w-8 items-center cursor-pointer flex-col justify-center rounded-full border-[3px] border-[#131b24] bg-[#1c2936] text-v2-lily/50 hover:border-[#c7f284] hover:shadow-swap-input-dark"
        onClick={onInvert}
      >
        {isLoading ? (
          <Image
            className="block spinning"
            width={30}
            height={30}
            src="/assets/logos/space/icon.png"
            alt="Loading..."
          />
        ) : (
          <span className="material-symbols-rounded text-sm block text-[#e8f9ff80] group/flip hover:text-[#c7f284]">
            {icon}
          </span>
        )}
      </button>
      </div>
      
    </div>
  );
}
