"use client";

import { TransitionWrapper } from "@/app/components/TransitionWrapper";
import Link from "next/link";

export default function Page() {
  return (
    <main className="max-w-6xl mx-auto px-8 flex py-24 flex-col items-center">
      <TransitionWrapper>
        <h1 className="[word-spacing:-15px] uppercase text-white text-5xl md:text-7xl tracking-wide">
          Tech in <span className="font-mattone-bold">Malaysia</span>
        </h1>
        <p className="md:text-xl mt-6 tracking-wide">
          Tech in Malaysia is a dynamic community dedicated to empowering and
          connecting Malaysian professionals in the technology sector.
        </p>
        <h2 className="w-fit uppercase mt-24 text-4xl md:text-5xl text-white tracking-wider">
          Official Partners
          <div className="bg-main-orange h-1 w-3/4 mt-1.5" />
        </h2>
        <div className="grid mt-10 items-center">
          <Link href="https://devtalk.club">
            <img src="./devtalk.svg" className="w-60" />
          </Link>
        </div>
      </TransitionWrapper>
    </main>
  );
}
