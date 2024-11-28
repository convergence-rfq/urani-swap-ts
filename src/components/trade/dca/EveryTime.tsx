import { useSwap } from "../swap/SwapProvider";
import DcaTimeSelect from "./DcaTimeSelect";

export default function EveryTime() {
    const {
        expireTime,
        setExpireTime,
      } = useSwap();
    return(
        <div className="flex space-x-2">
            <div className="flex basis-1/2 flex-col space-y-2 rounded-xl border border-transparent bg-[#131b24] p-4 focus-within:border-[#c7f28280]/50 focus-within:shadow-swap-input-dark">
                <label className="text-xs font-medium text-[#e8f9ff80]">Every</label>
                <div className="flex w-full items-center justify-between">
                    <input className="!w-full !bg-transparent border-none p-0 text-white focus:ring-0 !text-sm !font-semibold !text-v2-lily !outline-none" type="text" value="1"/>
                    <div className="flex items-center justify-end">
                        <div className="!w-full">
                            <DcaTimeSelect setExpireTime={setExpireTime} expireTime={expireTime}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex basis-1/2 flex-col space-y-2 rounded-xl border border-transparent bg-[#131b24] p-4 focus-within:border-[#c7f28280]/50 focus-within:shadow-swap-input-dark">
                <label className="text-xs font-medium text-[#e8f9ff80]">Over</label>
                <div className="flex w-full items-center justify-between">
                    <input className="!w-full !bg-transparent border-none p-0 text-white focus:ring-0 !text-sm !font-semibold !outline-none" type="text" value="2"/>
                    <span className="text-sm font-semibold text-[#e8f9ff]">orders</span>
                </div>
            </div>
        </div>
    )
}