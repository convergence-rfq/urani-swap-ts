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
  const [typeSelected, setTypeSelected] = useState<
    "market" | "limit" | "dca" | "va"
  >("market");
  const [swapSelected, setSwapSelected] = useState<"auto" | "manual">("auto");
  const [autoSelected, setAutoSelected] = useState<"auto" | "manually">("auto");
  const [summery, setSummery] = useState<true | false>(false);
  // CONVERGENCE INTEGRATION: Add router state
  const [routerQuote, setRouterQuote] = useState<RouterQuote | null>(null);

  const { orderStatus, setOrderStatus, errorMessage, solscanUrl, resetAll } =
    useSwap();

  // CONVERGENCE INTEGRATION: Quote and swap functions
  const getConvergenceQuote = async (params: {
    tokenIn: string;
    tokenOut: string;
    amount: string;
  }) => {
    try {
      const response = await fetch('/api/router/quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...params,
          slippageBps: 100
        }),
      });
      
      if (!response.ok) throw new Error('Failed to get quote');
      const quoteData = await response.json();
      setRouterQuote(quoteData);
      return quoteData;
    } catch (error) {
      console.error('Failed to get quote:', error);
      return null;
    }
  };

  const executeConvergenceSwap = async (params: {
    tokenIn: string;
    tokenOut: string;
    amount: string;
  }) => {
    try {
      if (!routerQuote) {
        throw new Error('No quote available');
      }

      const response = await fetch('/api/router/swap', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...params,
          quote: routerQuote
        }),
      });
      
      if (!response.ok) throw new Error('Failed to execute swap');
      return await response.json();
    } catch (error) {
      console.error('Failed to execute swap:', error);
      setOrderStatus("ERROR");
      return null;
    }
  };

  console.log(typeSelected);
  return (
    <div
      className={`flex w-full flex-1 flex-col justify-center lg:flex-row ${typeSelected !== "market" ? "gap-4" : ""}`}
    >
      {typeSelected !== "market" && <>
        <div className={`relative flex w-full flex-col gap-y-4 overflow-hidden duration-300 ease-in-out h-auto lg:!w-[65%] lg:!max-w-[65%]`}>
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
      </>}

      <div className="flex flex-1 flex-col items-center gap-4 w-full lg:max-w-lg">
        {orderStatus === "INCOMPLETE" && (
          <WidgetTabs
            selectedTab={typeSelected}
            setSelectedTab={setTypeSelected}
          />
        )}
        {typeSelected === "market" && (
          <SwapSettings
            swapSelected={swapSelected}
            setSwapSelected={setSwapSelected}
          />
        )}
        {["INCOMPLETE", "PENDING"].includes(orderStatus) && (
          <Fragment>
            {typeSelected === "market" && (
              <SwapTradeForm 
                typeSelected={typeSelected}
                // CONVERGENCE INTEGRATION: Add router props
                onGetQuote={getConvergenceQuote}
                onExecuteSwap={executeConvergenceSwap}
                routerQuote={routerQuote}
              />
            )}
            {typeSelected === "limit" && <LimitForm typeSelected={typeSelected}/>}
            {typeSelected === "dca" && <DcaForm typeSelected={typeSelected}/>}
            {typeSelected === "va" && (
              <VaForm
                autoSelected={autoSelected}
                setAutoSelected={setAutoSelected}
                typeSelected={typeSelected}
              />
            )}
          </Fragment>
        )}

        {orderStatus === "SUBMITED" && (
          <TransactionMessage
            type="success"
            icon="task_alt"
            mainMessage="Transaction submitted"
            solscanUrl={solscanUrl}
            buttonText="See your limit orders"
            linkTo="/list-orders"
            buttonAction={() => {
              setOrderStatus("INCOMPLETE");
            }}
          />
        )}

        {orderStatus === "ERROR" && (
          <TransactionMessage
            type="error"
            icon="report"
            mainMessage={errorMessage ?? "Transaction was not submitted."}
            buttonText="Dismiss"
            buttonAction={() => {
              resetAll();
              setOrderStatus("INCOMPLETE");
            }}
          />
        )}

        {typeSelected !== "market" && (
          <>
            <div className="w-full">
              <div className="mb-4 mt-3 flex items-center justify-center">
                <button
                  onClick={() => setSummery(!summery)}
                  className="flex group cursor-pointer items-center space-x-2 text-white/25 hover:text-[#c7f284]"
                >
                  <div className="flex h-4 w-4 items-center fill-current">
                    <span className="group-hover:text-[#c7f284] material-symbols-rounded ml-auto mt-1  font-sm text-[#e8f9ff40]">
                      keyboard_arrow_down
                    </span>
                  </div>
                  <span>
                    {typeSelected === "limit" && "Limit Order Summary"}
                    {typeSelected === "dca" && "DCA Summary"}
                    {typeSelected === "va" && "VA Summary"}
                  </span>
                </button>
              </div>
              {summery && <>
                <div className="mt-3 w-full rounded-lg border border-[#e8f9ff1a]/10 p-5 text-xs">
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-white/50">Max budget</span>
                      <span className="text-white/[.75]">
                        <span>100</span> USDC
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/50">To buy</span>
                      <span className="text-white/[.75]">SOL</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/50">
                        To increase portfolio value by
                      </span>
                      <span className="text-white/[.75]">
                        <span>50</span> USD
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/50">Every</span>
                      <span className="text-white/[.75]">1 day</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/50">Start date</span>
                      <span className="text-white/[.75]">Now</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/50">Platform fee</span>
                      <span className="font-bold text-[#c7f284]">0.1%</span>
                    </div>
                    <div className="bg-black/15 mt-3 rounded-lg border border-white/[.15] px-4 py-3 text-xs text-white/75">
                      You will receive exactly what you have specified, minus
                      platform fees.
                      <a
                        className="ml-1 cursor-pointer underline"
                        href="https://station.jup.ag/guides/va/how-va-work"
                        target="_blank"
                      >
                        Learn more
                      </a>
                    </div>
                  </div>
                </div>
              </>}
            </div>
          </>
        )}
      </div>
    </div>
  );
}