interface WidgetTabsProps {
  selectedTab: string;
  setSelectedTab: (tab: "market" | "limit") => void;
}

export default function WidgetTabs({
  selectedTab,
  setSelectedTab,
}: WidgetTabsProps) {
  return (
    <div className="flex w-full font-medium cursor-pointer text-xl mb-4 justify-between">
      <div className="flex px-4 py-2 rounded-[60px] border-solid border-[1px] border-[#202629] w-[100%]">
        {/* custom bg gradient */}

        <div
          className={` text-base mr-4 flex items-center  rounded-3xl px-6 py-2 h-auto   ${
            selectedTab === "market"
              ? "text-[#080C0E]  bg-cyan"
              : "bg-[#202629] text-[#AEB9B8]"
          }`}
          onClick={() => setSelectedTab("market")}
        >
          Market Order
        </div>
        <div
          className={` text-base mr-4  rounded-3xl px-6 py-2 h-auto   ${
            selectedTab === "limit"
              ? "text-[#080C0E]  bg-cyan"
              : "bg-[#202629] text-[#AEB9B8]"
          }`}
          onClick={() => setSelectedTab("limit")}
        >
          Limit Order
        </div>
      </div>
    </div>
  );
}
