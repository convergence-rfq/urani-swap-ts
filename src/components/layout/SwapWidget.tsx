"use client";

import { Fragment, useState } from "react";
import Image from "next/image";
import LimitForm from "../trade/limit/LimitForm";
import SwapTradeForm from "../trade/swap/SwapTradeForm";
import TransactionMessage from "../utils/TransactionMessage";
import WidgetTabs from "../trade/WidgetTabs";
import { useSwap } from "../trade/swap/SwapProvider";
import SwapSettings from "../trade/SwapSettings";
import DcaForm from "../trade/dca/DcaForm";
import VaForm from "../trade/va/VaForm";
import dynamic from "next/dynamic";

// CONVERGENCE INTEGRATION: Router types
interface RouterQuote {
  pool: {
    address: string;
    ammName: string;
    liquidity: string;
    sqrtPrice: string;
    currentTickIndex: number;
    fee: string;
    protocolFee: string;
  };
  expectedPrice: number;
  priceImpact: number;
  totalFee: number;
  amountIn: number;
  amountOut: number;
}

const TredingChart = dynamic(() => import("../trade/TredingChart"), {
  ssr: false,
});

export default function SwapWidget() {
  const [typeSelected, setTypeSelected] = useState("market");

  return (
    <div className="w-full max-w-[480px] mx-auto">
      <div className="flex items-center gap-2 mb-4">
        <button
          onClick={() => setTypeSelected("market")}
          className={`px-4 py-2 rounded-lg ${
            typeSelected === "market"
              ? "bg-[rgba(199,242,132,0.1)] text-[#c7f284]"
              : "text-white/50"
          }`}
        >
          Market
        </button>
        <button
          onClick={() => setTypeSelected("limit")}
          className={`px-4 py-2 rounded-lg ${
            typeSelected === "limit"
              ? "bg-[rgba(199,242,132,0.1)] text-[#c7f284]"
              : "text-white/50"
          }`}
        >
          <span className="material-symbols-rounded text-sm">schedule</span>
        </button>
      </div>

      <SwapTradeForm typeSelected={typeSelected} />
    </div>
  );
}