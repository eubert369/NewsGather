import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

function Navbar({ openModal }: { openModal: (value: boolean) => void }) {
  const router = useRouter();

  return (
    <div className="flex px-8 py-4 gap-[100px] items-center bg-[#282A2D]">
      <Link className="font-sans font-bold text-2xl" href="/">
        NewsViewer
      </Link>
      <div className="w-full flex justify-between items-center px-[10px] py-[5px]">
        <div className="flex gap-[15px]">
          <Link
            className={`text-xl ${
              router.pathname == "/" ? "font-bold" : "hover:underline "
            }`}
            href="/"
          >
            News
          </Link>
          <Link
            className={`text-xl ${
              router.pathname == "/Entertainment"
                ? "font-bold"
                : "hover:underline "
            }`}
            href="/Entertainment"
          >
            Entertainment
          </Link>
          <Link
            className={`text-xl ${
              router.pathname == "/Lifestyle" ? "font-bold" : "hover:underline "
            }`}
            href="/Lifestyle"
          >
            Lifestyle
          </Link>
          <Link
            className={`text-xl ${
              router.pathname == "/Sports" ? "font-bold" : "hover:underline "
            }`}
            href="/Sports"
          >
            Sports
          </Link>
          <Link
            className={`text-xl ${
              router.pathname == "/Business" ? "font-bold" : "hover:underline "
            }`}
            href="/Business"
          >
            Business
          </Link>
          <Link
            className={`text-xl ${
              router.pathname == "/Politics" ? "font-bold" : "hover:underline "
            }`}
            href="/Politics"
          >
            Politics
          </Link>
        </div>
        <div className="flex w-[285px] px-[12px] gap-[10px] py-2 bg-white rounded-lg cursor-text">
          <Image
            width={15}
            height={15}
            src={"/assets/search-icon.svg"}
            alt="icon"
          />
          <button
            onClick={(): void => openModal(true)}
            className="flex w-full justify-between items-center cursor-text"
          >
            <p className="text-md text-[#9D9D9D]">Search</p>
            <p className="text-sm font-bold text-[#9D9D9D]">Ctrl K</p>
          </button>
          {/* <input
            className="outline-none text-black w-full text-base"
            placeholder="Search"
          /> */}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
