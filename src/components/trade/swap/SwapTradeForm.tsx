"use client";

import { useCallback, useEffect } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

import AdditionalInfo from "./AdditionalInfo";
import SubmitButton from "./SubmitButton";
import TradeSelectors from "./TradeSelectors";
import TransactionMessage from "@/components/utils/TransactionMessage";
import { VersionedTransaction } from "@solana/web3.js";
import WarningMev from "@/components/utils/WarningMev";
import useDebounce from "@/hooks/useDebounce";
import useJupiterQuotes from "@/hooks/useJupiterQuotes";
import { useSwap } from "./SwapProvider";
import Image from "next/image";
interface DataPoint {
  name: string;
  uv: number;
};
interface CustomTooltipProps {
  active?: boolean;
  payload?: { payload: { uv: number } }[];
  label?: string;
}
interface SwapTradeFormProps {
  typeSelected: string;  // Expected prop: 'typeSelected' of type string
}

const data: DataPoint[] = [
  { name: '10:00 AM', uv: 0 },
  { name: '10:00 AM', uv: 3 },
  { name: '10:00 AM', uv: 2 },
  { name: '10:00 AM', uv: 4 },
  { name: '10:00 AM', uv: 5 },
  { name: '10:00 AM', uv: 6 },
  { name: '10:00 AM', uv: 7 },
  { name: '10:00 AM', uv: 4 },
  { name: '10:00 AM', uv: 3 },
  { name: '10:00 AM', uv: 2 },
  { name: '10:00 AM', uv: 8 },
  { name: '10:00 AM', uv: 9 },
  { name: '10:00 AM', uv: 8 },
  { name: '10:00 AM', uv: 5 },
  { name: '10:00 AM', uv: 4 },
  { name: '10:00 AM', uv: 3 },
  { name: '10:00 AM', uv: 2 },
  { name: '10:00 AM', uv: 8 },
  { name: '10:00 AM', uv: 3 },
  { name: '10:00 AM', uv: 6 },
  { name: '10:00 AM', uv: 9 },
  { name: '10:00 AM', uv: 4 },
  { name: '10:00 AM', uv: 3 },
  { name: '10:00 AM', uv: 2 },
  { name: '10:00 AM', uv: 3 },
  { name: '10:00 AM', uv: 7 },
  { name: '10:00 AM', uv: 7 },
  { name: '10:00 AM', uv: 5 },
];

// Custom Tooltip Component
function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    const { uv } = payload[0].payload; // Extracting values from the payload

    return (
      <div
        style={{
          backgroundColor: '#000',
          padding: '5px 4px',
          borderRadius: '5px',
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
          fontSize: '13px',
          color: '#fff',
        }}
      >
        <div>{label}</div>
        <div><strong>$</strong> {uv}</div>
      </div>
    );
  }

  return null;
};

export default function SwapTradeForm({typeSelected}:SwapTradeFormProps) {
  const {
    sellAmount,
    setBuyAmount,
    sellSelectedToken,
    buySelectedToken,
    orderStatus,
    setOrderStatus,
    setSolscanUrl,
    setErrorMessage,
  } = useSwap();

  const wallet = useWallet();
  const { connection } = useConnection();

  const throttledAmount = useDebounce(sellAmount, 1000);

  const { quote, outputAmount, isLoading } = useJupiterQuotes(
    setErrorMessage,
    setOrderStatus,
    sellSelectedToken,
    buySelectedToken,
    Number(throttledAmount),
  );

  useEffect(() => {
    if (outputAmount) {
      setBuyAmount(outputAmount);
    }
  }, [outputAmount, setBuyAmount]);

  const onSubmit = useCallback(async () => {
    if (!wallet.connected || !wallet.signTransaction) {
      console.error(
        "Wallet is not connected or does not support signing transactions",
      );
      return;
    }

    const { swapTransaction } = await (
      await fetch("https://quote-api.jup.ag/v6/swap", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quoteResponse: quote,
          userPublicKey: wallet.publicKey?.toString(),
          wrapAndUnwrapSol: true,
          // feeAccount is optional. Use if you want to charge a fee.  feeBps must have been passed in /quote API.
          // feeAccount: "fee_account_public_key"
        }),
      })
    ).json();

    setOrderStatus("PENDING");

    try {
      const swapTransactionBuf = Buffer.from(swapTransaction, "base64");
      const transaction = VersionedTransaction.deserialize(swapTransactionBuf);
      const signedTransaction = await wallet.signTransaction(transaction);

      const rawTransaction = signedTransaction.serialize();
      const txid = await connection.sendRawTransaction(rawTransaction, {
        skipPreflight: true,
        maxRetries: 2,
      });

      setSolscanUrl(`https://solscan.io/tx/${txid}`);

      const latestBlockHash = await connection.getLatestBlockhash();

      await connection.confirmTransaction(
        {
          blockhash: latestBlockHash.blockhash,
          lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
          signature: txid,
        },
        "confirmed",
      );
      setOrderStatus("SUBMITED");
    } catch (error) {
      const { message } = error as { message: string };
      console.error("Error signing or sending the transaction:", error);
      setErrorMessage(message ?? "");
      setOrderStatus("ERROR");
    }
  }, [
    wallet,
    connection,
    quote,
    setOrderStatus,
    setSolscanUrl,
    setErrorMessage,
  ]);

  // if (error && orderStatus === "ERROR") {
  //   return (
  //     <TransactionMessage
  //       type="error"
  //       icon="report"
  //       mainMessage={error ?? "Error trying to get quote."}
  //       buttonText="Dismiss"
  //       buttonAction={() => {
  //         resetAll();
  //         setOrderStatus("INCOMPLETE");
  //       }}
  //     />
  //   );
  // }
  return orderStatus === "PENDING" ? (
    <TransactionMessage
      type="pending"
      icon="progress_activity"
      mainMessage="Your order is being sent"
    />
  ) : (
    <div className="w-full h-full flex flex-col gap-4">
      <WarningMev />
      <TradeSelectors isLoading={isLoading} typeSelected={typeSelected}/>
      <AdditionalInfo slippage={0.5} />
      <div className="mt-6">
        <SubmitButton
          sellAmount={sellAmount}
          sellToken={sellSelectedToken}
          onSubmit={onSubmit}
          isLoading={isLoading}
        />
      </div>
      <div className="mx- lg:mx-0 lg:my-5">
        <div className="mt-2 flex w-full flex-col space-y-2 sm:mt-4">
          <div className="flex justify-between text-white">
            <div className="flex w-full max-w-[60%] items-center space-x-3 text-ellipsis md:max-w-[35%]">
              <span
                className="relative w-[24px] h-[24px]"
                style={{ flex: "0 0 auto" }}
              >
                <Image
                  src="/assets/solana-bg-black.webp"
                  alt="SOL"
                  width={24}
                  height={24}
                />
              </span>
              <div className="flex flex-col">
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-semibold text-white/75">SOL</span>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    className="flex cursor-pointer items-center space-x-1 rounded bg-black/25 px-2 py-0.5 text-white/75"
                    href="https://ape.pro/solana/So11111111111111111111111111111111111111112"
                  >
                    <div className="text-[9px]">So111...11112</div>
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <line
                        x1="10.8492"
                        y1="13.0606"
                        x2="19.435"
                        y2="4.47485"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></line>
                      <path
                        d="M19.7886 4.12134L20.1421 8.01042"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M19.7886 4.12134L15.8995 3.76778"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M18 13.1465V17.6465C18 19.3033 16.6569 20.6465 15 20.6465H6C4.34315 20.6465 3 19.3033 3 17.6465V8.64648C3 6.98963 4.34315 5.64648 6 5.64648H10.5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  </a>
                </div>
                <span className="text-ellipsis text-xs text-white/50">
                  Wrapped SOL
                </span>
              </div>
            </div>
            <div className="w-full max-w-[50%]">
              <div className="flex w-full items-center">
                <span className="mr-2.5 w-3/5 text-ellipsis text-[14px] font-semibold">
                  223.649673317
                </span>
                <span className="mr-2.5 w-2/5 text-ellipsis text-[14px] font-semibold text-[#FF0000]">
                  -11.08%
                </span>
              </div>
              <div className="w-full items-center relative">
                <ResponsiveContainer width={256} height={50}>
                  <LineChart
                   data={data}
                    margin={{
                      top: 10,
                      right: 0,   // Adjust as needed
                      bottom: 0,   // Adjust as needed
                      left: 0,    // Adjust as needed
                    }}
                  >
                     <defs>
                      <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#E4BA21" stopOpacity={1} />
                        <stop offset="100%" stopColor="#4FB4DE" stopOpacity={1} />
                      </linearGradient>
                    </defs>
                    {/* <CartesianGrid strokeDasharray="3 3" /> */}   
                    <XAxis dataKey="name" tick={false} axisLine={false}/>
                    <YAxis tick={false} axisLine={false}/>
                    <Tooltip content={<CustomTooltip />} position={{ x: 240, y: 0 }} cursor={false}/>
                    {/* <Legend /> */}
                    <Line type="monotone" dataKey="uv" stroke="url(#gradient1)"  strokeWidth={2} dot={false}/>
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          <div className="flex justify-between text-white">
            <div className="flex w-full max-w-[60%] items-center space-x-3 text-ellipsis md:max-w-[35%]">
              <span
                className="relative w-[24px] h-[24px]"
                style={{ flex: "0 0 auto" }}
              >
                <Image
                  src="/assets/solana-bg-black.webp"
                  alt="SOL"
                  width={24}
                  height={24}
                />
              </span>
              <div className="flex flex-col">
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-semibold text-white/75">SOL</span>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    className="flex cursor-pointer items-center space-x-1 rounded bg-black/25 px-2 py-0.5 text-white/75"
                    href="https://ape.pro/solana/So11111111111111111111111111111111111111112"
                  >
                    <div className="text-[9px]">So111...11112</div>
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <line
                        x1="10.8492"
                        y1="13.0606"
                        x2="19.435"
                        y2="4.47485"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></line>
                      <path
                        d="M19.7886 4.12134L20.1421 8.01042"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M19.7886 4.12134L15.8995 3.76778"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M18 13.1465V17.6465C18 19.3033 16.6569 20.6465 15 20.6465H6C4.34315 20.6465 3 19.3033 3 17.6465V8.64648C3 6.98963 4.34315 5.64648 6 5.64648H10.5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  </a>
                </div>
                <span className="text-ellipsis text-xs text-white/50">
                  Wrapped SOL
                </span>
              </div>
            </div>
            <div className="w-full max-w-[50%]">
              <div className="flex w-full items-center">
                <span className="mr-2.5 w-3/5 text-ellipsis text-[14px] font-semibold">
                  223.649673317
                </span>
                <span className="mr-2.5 w-2/5 text-ellipsis text-[14px] font-semibold text-[#24ae8f]">
                  11.08%
                </span>
              </div>
              <div className="flex w-full items-center relative">
                <ResponsiveContainer width={256} height={50}>
                  <LineChart
                    width={256} height={30} data={data}
                    margin={{
                      top: 10,
                      right: 10,   // Adjust as needed
                      bottom: 0,   // Adjust as needed
                      left: 10,    // Adjust as needed
                    }}
                  >
                    <defs>
                      <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#E4BA21" stopOpacity={1} />
                        <stop offset="100%" stopColor="#4FB4DE" stopOpacity={1} />
                      </linearGradient>
                    </defs>
                    {/* <CartesianGrid strokeDasharray="3 3" /> */}   
                    <XAxis dataKey="name" tick={false} axisLine={false}/>
                    <YAxis tick={false} axisLine={false}/>
                    <Tooltip content={<CustomTooltip />} position={{ x: 240, y: 0 }} cursor={false}/>
                    {/* <Legend /> */}
                    <Line type="monotone" dataKey="uv"  strokeWidth={2} stroke="url(#gradient2)" dot={false}/>
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
