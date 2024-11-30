"use client";

import { Fragment, useState } from "react";

import LimitForm from "../trade/limit/LimitForm";
import SwapTradeForm from "../trade/swap/SwapTradeForm";
import TransactionMessage from "../utils/TransactionMessage";
import WidgetTabs from "../trade/WidgetTabs";
import { useSwap } from "../trade/swap/SwapProvider";
import SwapSettings from "../trade/SwapSettings";
import OpenOrder from "../trade/OpenOrder";
import DcaForm from "../trade/dca/DcaForm";
import VaForm from "../trade/va/VaForm";

export default function SwapWidget() {
  const [typeSelected, setTypeSelected] = useState<
    "market" | "limit" | "dca" | "va"
  >("market");
  const [swapSelected, setSwapSelected] = useState<"auto" | "manual">("auto");
  const [autoSelected, setAutoSelected] = useState<"auto" | "manually">("auto");
  const [summery, setSummery] = useState<true | false>(false);

  const { orderStatus, setOrderStatus, errorMessage, solscanUrl, resetAll } =
    useSwap();
  console.log(typeSelected);
  return (
    <div
      className={`flex w-full flex-1 flex-col justify-center lg:flex-row ${typeSelected !== "market" ? "gap-4" : ""}`}
    >
      {typeSelected !== "market" && <OpenOrder />}

      <div className="flex flex-1 flex-col items-center gap-4 w-full lg:max-w-lg">
        {/* <WidgetTitle /> */}
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
            {typeSelected === "market" && <SwapTradeForm typeSelected={typeSelected}/>}
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
              {
                summery && <>
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
                </>
              }
            </div>
          </>
        )}
      </div>
    </div>
  );
}
