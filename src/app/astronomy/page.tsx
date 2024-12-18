"use client";

import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import { architype_bayer } from "../fonts/config";

export default function Astronomy() {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <Header />

      <main className="flex items-center justify-center w-full p-5">
        <div className="w-full max-w-screen-xl min-h-[70vh] p-8  border-solid border-[1px] border-[#202629] backdrop-blur-md rounded-lg shadow-lg flex flex-col justify-center items-center">
          {" "}
          {/* Aligns with Header's container */}
          <h2
            className={`${architype_bayer.className} text-white p-4 text-xl md:text-4xl text-center`}
          >
            What if we could leverage the power of the stars?
          </h2>
        </div>
      </main>

      <Footer />
    </div>
  );
}
