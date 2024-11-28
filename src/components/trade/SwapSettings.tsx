import React from "react";
interface SwapSetting {
  swapSelected: string;
  setSwapSelected: (tab: "auto" | "manual") => void;
}
export default function SwapSettings({
  swapSelected,
  setSwapSelected,
}: SwapSetting) {
  return (
    <div className="mb-2 flex justify-between w-full">
      <div className="flex w-full flex-row items-center justify-between">
        <div className="flex items-center">
          <div className="flex h-[32px] w-[120px] items-center justify-between rounded-full bg-[rgba(19,27,36,.5)] p-1">
            <button
              type="button"
              onClick={() => setSwapSelected("auto")}
              className={`lg:h-full lg:w-20 px-0.5 py-0.5 w-full flex flex-1 justify-center items-center font-semibold space-x-2 text-white fill-current border border-transparent h-full hover:text-labs/50 rounded-full ${swapSelected === "auto" ? "bg-[rgba(0,188,240,.1)] text-[#00bcf0]" : ""}`}
            >
              <span
                className={`text-xxs md:text-xs font-semibold whitespace-nowrap ${swapSelected === 'auto ? "text-[#00bcf0]":""'}`}
              >
                Auto
              </span>
            </button>
            <button
              type="button"
              onClick={() => setSwapSelected("manual")}
              className={`lg:h-full lg:w-20 px-0.5 py-0.5 w-full flex flex-1 justify-center items-center font-semibold space-x-2 text-white fill-current border border-transparent h-full hover:text-labs/50 rounded-full !bg-labs/10 ${swapSelected === "manual" ? "bg-[rgba(0,188,240,.1)] text-[#00bcf0]" : ""}`}
            >
              <span
                className={`text-xxs md:text-xs font-semibold whitespace-nowrap text-labs ${swapSelected === 'manual ? "text-[#00bcf0]":""'}`}
              >
                Manual
              </span>
            </button>
          </div>
          <div
            id="swap-settings-button"
            className="ml-2 flex cursor-pointer items-center rounded-full bg-[#18222d] p-2 text-[rgba(232,249,255,.5)] md:hover:border-v2-primary md:hover:border-v2-primary/10 md:hover:border-v2-primary/50"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_9115_125084)">
                <path
                  d="M4.85713 0L4.58481 1.50002C4.32029 1.58317 4.06361 1.69086 3.8214 1.81699L2.56246 0.950911L0.94644 2.56693L1.81699 3.8214C1.69032 4.06415 1.58373 4.31918 1.50002 4.58481L0 4.85713V7.14287L1.50002 7.41519C1.58372 7.68138 1.69422 7.93528 1.82145 8.1786L0.94644 9.43307L2.56246 11.0491L3.81693 10.183C4.06023 10.3102 4.31861 10.4163 4.5848 10.5L4.85711 12H7.14286L7.41517 10.5C7.68081 10.4163 7.93582 10.3097 8.17858 10.183L9.43305 11.0491L11.0491 9.43307L10.1785 8.1786C10.3046 7.93641 10.4123 7.68418 10.4955 7.41966L11.9999 7.14287V4.85713L10.4955 4.58481C10.4123 4.32085 10.3086 4.06751 10.183 3.82587L11.0491 2.56693L9.43305 0.950911L8.17858 1.81699C7.93584 1.69032 7.68081 1.58373 7.41517 1.50002L7.14286 0H4.85713ZM6 3.28575C7.49887 3.28575 8.71432 4.50117 8.71432 6.00007C8.71432 7.49898 7.4989 8.71439 6 8.71439C4.5011 8.71439 3.28568 7.49898 3.28568 6.00007C3.28568 4.50117 4.5011 3.28575 6 3.28575Z"
                  fill="currentColor"
                ></path>
              </g>
              <defs>
                <clipPath id="clip0_9115_125084">
                  <rect width="12" height="12" fill="white"></rect>
                </clipPath>
              </defs>
            </svg>
          </div>
          <div className="ml-2 text-xxs text-[rgba(232,249,255,.5)]">
            <div className="flex flex-row gap-x-1 md:flex-row items-center">
              {swapSelected === "auto" && (
                <div className="text-[12px] ">Jito Only: Off</div>
              )}
              {swapSelected === "manual" && (
                <>
                  <div className="flex flex-row">
                    <div className="flex items-center gap-x-1">
                      <span className="text-[12px]">Dynamic</span>
                    </div>
                    ,
                  </div>
                  <div className="text-[12px] ">Jito Only: Off</div>
                </>
              )}
            </div>
          </div>
        </div>
        <button className="h-fit cursor-pointer select-none border rounded-full p-[calc(0.5rem-1px)] border-transparent bg-[#18222d] fill-current text-[rgba(232,249,255,.5)] hover:border focus:outline-1 md:hover:border-v2-primary/50 md:hover:text-v2-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M1.3335 6.66667C1.3335 6.66667 2.67015 4.84548 3.75605 3.75883C4.84196 2.67218 6.34256 2 8.00016 2C11.3139 2 14.0002 4.68629 14.0002 8C14.0002 11.3137 11.3139 14 8.00016 14C5.26477 14 2.9569 12.1695 2.23467 9.66667M1.3335 6.66667V2.66667M1.3335 6.66667H5.3335"
              stroke="currentColor"
              strokeOpacity="0.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
}
