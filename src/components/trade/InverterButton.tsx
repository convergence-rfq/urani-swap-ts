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
    <div className="text-center -my-6 text-xs flex justify-center items-center">
      <button
        className="shadow-lg rounded-[50%] text-3xl text-cyan  bg-[#191C1E] hover:text-black hover:bg-cyan hover:border-black transition-all h-[50px] w-[50px] flex items-center justify-center z-10"
        onClick={onInvert}
      >
        {isLoading ? (
          <Image
            className="block spinning"
            width={35}
            height={35}
            src="/assets/logos/space/space_logo_tiny.png"
            alt="Loading..."
          />
        ) : (
          <span className="material-symbols-rounded text-3xl block p-2">
            {icon}
          </span>
        )}
      </button>
    </div>
  );
}
