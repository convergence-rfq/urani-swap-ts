"use client";

import { useCallback, useEffect, useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

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
import { useDisclosure } from "@mantine/hooks";
import RoutingModal from "../routing-modal/RoutingModal";
interface DataPoint {
  name: string;
  uv: number;
}
interface CustomTooltipProps {
  active?: boolean;
  payload?: { payload: { uv: number } }[];
  label?: string;
}
interface SwapTradeFormProps {
  typeSelected: string; // Expected prop: 'typeSelected' of type string
}

const data: DataPoint[] = [
  { name: "10:00 AM", uv: 0 },
  { name: "10:00 AM", uv: 3 },
  { name: "10:00 AM", uv: 2 },
  { name: "10:00 AM", uv: 4 },
  { name: "10:00 AM", uv: 5 },
  { name: "10:00 AM", uv: 6 },
  { name: "10:00 AM", uv: 7 },
  { name: "10:00 AM", uv: 4 },
  { name: "10:00 AM", uv: 3 },
  { name: "10:00 AM", uv: 2 },
  { name: "10:00 AM", uv: 8 },
  { name: "10:00 AM", uv: 9 },
  { name: "10:00 AM", uv: 8 },
  { name: "10:00 AM", uv: 5 },
  { name: "10:00 AM", uv: 4 },
  { name: "10:00 AM", uv: 3 },
  { name: "10:00 AM", uv: 2 },
  { name: "10:00 AM", uv: 8 },
  { name: "10:00 AM", uv: 3 },
  { name: "10:00 AM", uv: 6 },
  { name: "10:00 AM", uv: 9 },
  { name: "10:00 AM", uv: 4 },
  { name: "10:00 AM", uv: 3 },
  { name: "10:00 AM", uv: 2 },
  { name: "10:00 AM", uv: 3 },
  { name: "10:00 AM", uv: 7 },
  { name: "10:00 AM", uv: 7 },
  { name: "10:00 AM", uv: 5 },
];

// Custom Tooltip Component
function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    const { uv } = payload[0].payload; // Extracting values from the payload

    return (
      <div
        style={{
          backgroundColor: "#000",
          padding: "5px 4px",
          borderRadius: "5px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          fontSize: "13px",
          color: "#fff",
        }}
      >
        <div>{label}</div>
        <div>
          <strong>$</strong> {uv}
        </div>
      </div>
    );
  }

  return null;
}

export default function SwapTradeForm({ typeSelected }: SwapTradeFormProps) {
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

  const [moreInfo, setMoreInfo] = useState<true | false>(false);
  const [opened, { open, close }] = useDisclosure(false);
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
    <>
    <div className="w-full h-full flex flex-col gap-4">
      <WarningMev />
      <TradeSelectors isLoading={isLoading} typeSelected={typeSelected} />
      <AdditionalInfo slippage={0.5} />
      <div className="mt-2 flex gap-x-1">
        <div>
          <button
            type="button"
            onClick={open}
            className="group relative flex w-full items-center space-x-1 overflow-hidden transition-all h-[22px] opacity-100"
          >
            <div className="rounded-full border border-[#c7f284] group-hover:from-[#c7f284]/25 group-hover:to-[#c7f284]/25">
              <span className="flex items-center space-x-1 rounded-[100px] bg-[rgba(199,242,132,0.1)] text-xxs group-hover:bg-[#3a474f]">
                <span className="flex items-center whitespace-nowrap px-2 py-0.5 text-xs text-[#c7f284] font-semibold group-hover:text-[#c7f284]">
                  <svg
                    className="mb-px text-[#c7f284] group-hover:text-[#c7f284]"
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.11894 6.99859H6.79173C7.96242 6.99859 8.92699 6.04958 8.94255 4.89521C8.94255 3.72452 7.97798 2.79183 6.79173 2.79183L4.75212 2.79109C4.54675 2.33215 4.08781 2 3.5503 2C2.82298 2 2.23725 2.60129 2.23725 3.31305C2.23725 4.0248 2.83854 4.62609 3.5503 4.62609C4.10414 4.62609 4.56232 4.29394 4.75212 3.835H6.79248C7.40934 3.835 7.91573 4.34139 7.91573 4.91079C7.91573 5.4802 7.40934 5.98659 6.79248 5.98659H4.15083C2.98013 5.98659 2.01556 6.93559 2 8.08997C2 9.27622 2.96457 10.1933 4.15083 10.1933H6.34911C6.55447 10.6523 7.01341 11 7.55093 11C8.27825 11 8.86398 10.3987 8.86398 9.68695C8.86398 8.95964 8.26269 8.37391 7.55093 8.37391C6.99709 8.37391 6.53891 8.70606 6.34911 9.165L4.13527 9.16574C3.51841 9.16574 3.01202 8.65935 3.01202 8.08995C3.01202 7.50498 3.50209 7.01415 4.11894 6.99859Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                  3 Markets
                </span>
              </span>
            </div>
            <div className="flex w-full items-center justify-between space-x-2">
              <span className="max-w-[120px] truncate text-white/75 text-left text-xs group-hover:text-[#c7f284] md:max-w-[200px]">
                via Raydium, Stabble Stable Swap
              </span>
              <svg
                className="ml-auto text-white/75 group-hover:text-[#c7f284]"
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.10201 1.28172L8.80544 5.75191C8.94178 5.88275 8.94178 6.1008 8.80544 6.23164L4.10201 10.7018C3.96568 10.8327 3.73846 10.8327 3.60213 10.7018L3.10225 10.2221C2.96592 10.0913 2.96592 9.87321 3.10225 9.74237L6.80592 6.23164C6.94225 6.1008 6.94225 5.88275 6.80592 5.75191L3.12497 2.24118C2.98864 2.11034 2.98864 1.89229 3.12497 1.76145L3.62485 1.28172C3.76118 1.17269 3.96568 1.17269 4.10201 1.28172Z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
          </button>
        </div>
      </div>
      <div className="">
        <SubmitButton
          sellAmount={sellAmount}
          sellToken={sellSelectedToken}
          onSubmit={onSubmit}
          isLoading={isLoading}
        />
      </div>
      <div className="flex justify-between">
        <span className="flex flex-col">
          <div className="align-center flex cursor-pointer text-white/50 text-white-35  text-xs font-medium hover:text-[#c7f284]">
            <span className="flex max-w-full items-start whitespace-nowrap">
              <div className="flex h-4 space-x-1  hover:text-[#c7f284]">
                <span>1 UBC ≈</span>
                <span>0.045797</span>
                <span>USDS</span>
              </div>
            </span>
            <div className="ml-2 fill-current">
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
            </div>
          </div>
        </span>
        <button
          type="button"
          onClick={()=>setMoreInfo(!moreInfo)}
          className="flex cursor-pointer items-start space-x-2 text-white/25 hover:text-[#c7f284]"
        >
          <div className="flex h-4 w-4 items-center fill-current">
            <svg
              className=""
              width="10"
              height="6"
              viewBox="0 0 10 6"
              fill="inherit"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M0.292893 0.292893C0.683416 -0.097631 1.31658 -0.097631 1.7071 0.292893L4.99999 3.58579L8.29288 0.292893C8.6834 -0.0976311 9.31657 -0.0976311 9.70709 0.292893C10.0976 0.683417 10.0976 1.31658 9.70709 1.70711L5.7071 5.70711C5.31657 6.09763 4.68341 6.09763 4.29289 5.70711L0.292893 1.70711C-0.0976309 1.31658 -0.0976309 0.683417 0.292893 0.292893Z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
          <span className="text-xs font-medium">{moreInfo ? "Show":"Hide"} more info</span>
        </button>
      </div>
      {
        moreInfo && <div className="mt-3 w-full rounded-lg border border-[#e8f9ff1a]/10 p-5 text-xs">
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs">
            <div className="text-white/50">Minimum Received</div>
            <div className="text-white/50">54.893453 USDS</div>
          </div>
          <div className="flex items-center justify-between text-xs">
            <div className="flex w-1/2 text-white/50">
              Max Transaction Fee
              <div className="">
                <span className="ml-1 cursor-pointer">[?]</span>
              </div>
              <div className="pointer-events-none fixed left-0 top-0 z-[-1] h-full w-full opacity-0 transition-all"></div>
            </div>
            <div className="text-white/50">0.004005 SOL</div>
          </div>
          <div className="flex items-center justify-between text-xs">
            <div className="text-white/50">Price Impact</div>
            <div className="text-white/50">~ 0.1877%</div>
          </div>
          <div className="flex items-start justify-between text-xs">
            <div className="justify-start text-white/50">
              Price Difference
            </div>
            <div className="flex flex-col text-xs">
              <div className="flex w-full flex-row justify-end">
                <span className="!text-[#24ae8f] text-end">
                  &lt; 0.1% cheaper
                </span>
                <div className="fill-current !text-[#24ae8f]"></div>
              </div>
            </div>
          </div>
          <div className="flex items-start justify-between text-xs">
            <div className="flex w-1/2 text-white/50">
              Price Confidence
              <div className="">
                <span className="ml-1 cursor-pointer">[?]</span>
              </div>
              <div className="pointer-events-none fixed left-0 top-0 z-[-1] h-full w-full opacity-0 transition-all"></div>
            </div>
            <div className="flex flex-row text-xs">
              <div className="flex w-full flex-row justify-end">
                <span className="pr-1 text-end text-white/50">UBC:</span>
                <span className="fill-current !text-[#24ae8f]">
                  HIGH
                </span>
              </div>
              <div className="flex w-full flex-row justify-end pl-1">
                <span className="pr-1 text-end text-white/50">USDS:</span>
                <span className="fill-current !text-[#24ae8f]">
                  HIGH
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      }
      
      <div className="mx- lg:mx-0">
        <div className="mt-2 flex w-full flex-col space-y-2">
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
                  <span className="text-sm font-semibold text-white/75">
                    SOL
                  </span>
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
                      right: 0, // Adjust as needed
                      bottom: 0, // Adjust as needed
                      left: 0, // Adjust as needed
                    }}
                  >
                    <defs>
                      <linearGradient
                        id="gradient1"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop offset="0%" stopColor="#E4BA21" stopOpacity={1} />
                        <stop
                          offset="100%"
                          stopColor="#4FB4DE"
                          stopOpacity={1}
                        />
                      </linearGradient>
                    </defs>
                    {/* <CartesianGrid strokeDasharray="3 3" /> */}
                    <XAxis dataKey="name" tick={false} axisLine={false} />
                    <YAxis tick={false} axisLine={false} />
                    <Tooltip
                      content={<CustomTooltip />}
                      position={{ x: 240, y: 0 }}
                      cursor={false}
                    />
                    {/* <Legend /> */}
                    <Line
                      type="monotone"
                      dataKey="uv"
                      stroke="url(#gradient1)"
                      strokeWidth={2}
                      dot={false}
                    />
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
                  <span className="text-sm font-semibold text-white/75">
                    SOL
                  </span>
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
                    width={256}
                    height={30}
                    data={data}
                    margin={{
                      top: 10,
                      right: 10, // Adjust as needed
                      bottom: 0, // Adjust as needed
                      left: 10, // Adjust as needed
                    }}
                  >
                    <defs>
                      <linearGradient
                        id="gradient2"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop offset="0%" stopColor="#E4BA21" stopOpacity={1} />
                        <stop
                          offset="100%"
                          stopColor="#4FB4DE"
                          stopOpacity={1}
                        />
                      </linearGradient>
                    </defs>
                    {/* <CartesianGrid strokeDasharray="3 3" /> */}
                    <XAxis dataKey="name" tick={false} axisLine={false} />
                    <YAxis tick={false} axisLine={false} />
                    <Tooltip
                      content={<CustomTooltip />}
                      position={{ x: 240, y: 0 }}
                      cursor={false}
                    />
                    {/* <Legend /> */}
                    <Line
                      type="monotone"
                      dataKey="uv"
                      strokeWidth={2}
                      stroke="url(#gradient2)"
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
   
    <RoutingModal opened={opened}
        open={open}
        close={close}/>
    
    </>
  );
}
