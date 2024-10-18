import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

function SidePanel({ openPanel }: { openPanel: ( value: boolean ) => void }) {
  const router = useRouter();
  return (
    <div className="absolute bg-[#000000a4] h-screen w-full z-30 flex justify-end xl:hidden">
      <div className="w-2/3 bg-[#282A2D] p-7 flex flex-col">
        <div className="flex justify-end">
          <button onClick={() => openPanel(false)}>
            <Image
              width={20}
              height={20}
              src={"/assets/close-icon.svg"}
              alt="icon"
            />
          </button>
        </div>
        <div className="flex flex-col gap-4">
          <Link
            className={`text-2xl ${
              router.pathname == "/" ? "font-bold" : "hover:underline "
            }`}
            href="/"
          >
            News
          </Link>
          <Link
            className={`text-2xl ${
              router.pathname == "/Entertainment"
                ? "font-bold"
                : "hover:underline "
            }`}
            href="/Entertainment"
          >
            Entertainment
          </Link>
          <Link
            className={`text-2xl ${
              router.pathname == "/Lifestyle" ? "font-bold" : "hover:underline "
            }`}
            href="/Lifestyle"
          >
            Lifestyle
          </Link>
          <Link
            className={`text-2xl ${
              router.pathname == "/Sports" ? "font-bold" : "hover:underline "
            }`}
            href="/Sports"
          >
            Sports
          </Link>
          <Link
            className={`text-2xl ${
              router.pathname == "/Business" ? "font-bold" : "hover:underline "
            }`}
            href="/Business"
          >
            Business
          </Link>
          <Link
            className={`text-2xl ${
              router.pathname == "/Politics" ? "font-bold" : "hover:underline "
            }`}
            href="/Politics"
          >
            Politics
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SidePanel;
