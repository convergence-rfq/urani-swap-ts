import Image from "next/image";

export default function WidgetTitle() {
  return (
    <div className="flex relative">
      <div className="text-white font-bold flex items-center text-3xl mb-3 md:mb-6 select-none">
        Convergence
        <Image
          src="/assets/logos/space/icon.png"
          className="w-12 h-12 mx-4 spin"
          alt=""
          width={48}
          height={48}
        />
        Swap
      </div>
    </div>
  );
}
