"use client";

import Image from "next/image";
// import TredingChart from "./TredingChart";
import dynamic from "next/dynamic";
const TredingChart = dynamic(() => import("./TredingChart"), {
  ssr: false,
});

export default function OpenOrder() {
  return (
    <>
      <div className="relative flex w-full flex-col gap-y-4 overflow-hidden duration-300 ease-in-out h-auto lg:!w-[65%] lg:!max-w-[65%]">
        <div className="relative">
          <div className="flex h-[400px] w-full flex-col overflow-hidden rounded-2xl bg-[#131b24] lg:h-[500px] transition-all ease-linear opacity-100">
            <div className="flex w-full items-center justify-between space-x-4 border-b border-[#e8f9ff0d] px-4 py-2">
              <div className="flex items-center gap-x-2">
                <div className="hidden -space-x-3 md:flex">
                  <span className="relative">
                    <Image
                      className="rounded-full object-cover"
                      src="/assets/solana-bg-black.webp"
                      width={28}
                      height={28}
                      style={{ maxWidth: "28px", maxHeight: "28px" }}
                      alt=""
                    />
                  </span>
                  <span className="relative">
                    <Image
                      className="rounded-full object-cover"
                      src="/assets/solana-bg-black.webp"
                      width={28}
                      height={28}
                      style={{ maxWidth: "28px", maxHeight: "28px" }}
                      alt=""
                    />
                  </span>
                </div>
                <div className="flex -space-x-3 md:hidden">
                  <span className="relative">
                    <Image
                      className="rounded-full object-cover"
                      src="/assets/solana-bg-black.webp"
                      width={28}
                      height={28}
                      style={{ maxWidth: "28px", maxHeight: "28px" }}
                      alt=""
                    />
                  </span>
                  <span className="relative">
                    <Image
                      className="rounded-full object-cover"
                      src="/assets/solana-bg-black.webp"
                      width={28}
                      height={28}
                      style={{ maxWidth: "28px", maxHeight: "28px" }}
                      alt=""
                    />
                  </span>
                </div>
                <div className="flex gap-x-1">
                  <span className="font-semibold text-[#e8f9ff]">SOL</span>
                  <span className="font-semibold text-[#e8f9ff]/30">/</span>
                  <span className="font-semibold text-[#e8f9ff]">USDC</span>
                </div>
                <button className="fill-current text-[#e8f9ff4d]">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="inherit"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.8573 8.18429L13.6323 5.95933L10.8573 3.73438V5.31937H3.32735V6.59937H10.8573V8.18429ZM5.14223 7.81429L2.36719 10.0393L5.14223 12.2642V10.6792H12.6722V9.39922H5.14223V7.81429Z"
                      fill="inherit"
                    ></path>
                  </svg>
                </button>
              </div>
              <div className="flex gap-x-1 text-xl font-semibold text-[#e8f9ff]">
                <span>229</span>USDC
              </div>
            </div>
            <div className="flex items-center justify-between gap-x-4 border-b border-[#e8f9ff]/5 p-2 px-4 lg:gap-x-9">
              <div className="hideScrollbar flex gap-x-4 overflow-x-auto overflow-y-hidden w-full">
                <div className="flex flex-col gap-y-1 whitespace-nowrap">
                  <p className="min-w-[80px] text-xs font-normal text-[#e8f9ff]/30">
                    24h Change
                  </p>
                  <p className="flex text-sm font-semibold !leading-none text-orange-600">
                    <span>-</span>3.99%
                  </p>
                </div>
                <div className="flex flex-col gap-y-1 whitespace-nowrap">
                  <p className="min-w-[80px] text-xs font-normal text-[#e8f9ff]/30">
                    24h High
                  </p>
                  <p className="flex h-[14px] text-sm font-semibold !leading-none text-[#e8f9ff]/50">
                    <span>239.8</span>
                  </p>
                </div>
                <div className="flex flex-col gap-y-1 whitespace-nowrap">
                  <p className="min-w-[80px] text-xs font-normal text-[#e8f9ff]/30">
                    24h Low
                  </p>
                  <p className="flex h-[14px] items-center text-sm font-semibold !leading-none text-[#e8f9ff]/50">
                    <span>221.8</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="relative flex-1 overflow-hidden transition-all">
              <TredingChart />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
