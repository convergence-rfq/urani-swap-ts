interface WidgetTabsProps {
  selectedTab: string;
  setSelectedTab: (tab: "market" | "limit" | "dca" | "va") => void;
}

export default function WidgetTabs({
  selectedTab,
  setSelectedTab,
}: WidgetTabsProps) {
  return (
    <>
    <div className="flex w-full font-medium cursor-pointer text-xl mb-4 justify-between">
      <div className="flex rounded-[60px] border-solid border-[1px] border-[#202629] w-[100%]">
        {/* custom bg gradient */}
        <div className="hidden w-full items-center space-x-1 lg:flex lg:space-x-2 justify-between">
          <div className={`flex w-full items-center justify-center space-x-1 overflow-hidden rounded-full bg-[#131B24]/50 p-1 min-h-[30px] ${selectedTab === "market" && 'lg:w-auto'}`}>
            <div
              className={` flex w-auto items-center justify-center rounded-full px-1 py-2 text-center text-sm font-semibold lg:min-w-[70px] lg:px-4 lg:py-3   ${
                selectedTab === "market"
                  ? "text-[#c7f284] bg-[#c7f2821a]"
                  : "text-[rgba(232,249,255,.5)]"
              }
              ${
                selectedTab !== "market" && 'flex-1'
              }
              `}
              onClick={() => setSelectedTab("market")}
            >
              Market
            </div>
            <div
              className={` flex w-auto items-center justify-center rounded-full px-1 py-2 text-center text-sm font-semibold lg:min-w-[70px] lg:px-4 lg:py-3  ${
                selectedTab === "limit"
                  ? "text-[#c7f284] bg-[#c7f2821a]"
                  : "text-[rgba(232,249,255,.5)]"
              }  ${
                selectedTab !== "market" && 'flex-1'
              }`
            }
              onClick={() => setSelectedTab("limit")}
            >
              Limit
            </div>
            <div
              className={` flex w-auto items-center justify-center rounded-full px-1 py-2 text-center text-sm font-semibold lg:min-w-[70px] lg:px-4 lg:py-3  ${
                selectedTab === "dca"
                  ? "text-[#c7f284] bg-[#c7f2821a]"
                  : "text-[rgba(232,249,255,.5)]"
              }  ${
                selectedTab !== "market" && 'flex-1'
              }`}
              onClick={() => setSelectedTab("dca")}
            >
              DCA
            </div>
            <div
              className={` flex w-auto items-center justify-center rounded-full px-1 py-2 text-center text-sm font-semibold lg:min-w-[70px] lg:px-4 lg:py-3  ${
                selectedTab === "va"
                  ? "text-[#c7f284] bg-[#c7f2821a]"
                  : "text-[rgba(232,249,255,.5)]"
              }  ${
                selectedTab !== "market" && 'flex-1'
              }`}
              onClick={() => setSelectedTab("va")}
            >
              VA
            </div>
          </div>
          {
            selectedTab === "market" && <>
          <div className="flex space-x-2">
            <button className="flex h-9 w-9 !cursor-pointer items-center justify-center rounded-full p-2 lg:h-11 lg:w-11 bg-[rgba(232,249,255,.1)] text-[#e8f9ff]">
              <span className="hidden lg:block">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M12 6V12L16 14M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </span>
              <span className="block lg:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M12 6V12L16 14M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </span>
            </button>
          </div>
            </>
          }
          
        </div>
      </div>
    </div>
    </>

  );
}
