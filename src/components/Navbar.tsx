import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

function Navbar({
  openModal,
  openSidePane,
}: {
  openModal: (value: boolean) => void;
  openSidePane: (value: boolean) => void;
}) {
  const router = useRouter();

  return (
    <div className="flex justify-between xl:justify-start px-8 py-4 gap-[100px] items-center bg-[#282A2D]">
      <Link className="font-serif font-bold text-lg text-white xl:text-3xl" href="/">
        NewsGather
      </Link>
      <div className="w-full hidden xl:flex justify-between items-center px-[10px] py-[5px]">
        <div className="flex gap-[15px] text-white">
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
        <div className="flex w-[285px] px-[12px] gap-[10px] py-2 bg-white rounded-lg cursor-text items-center">
          <div className="min-w-[15px] min-h-[15px] w-[15px] h-[15px] relative">
            <Image
              fill
              sizes="100%"
              priority
              src={"/assets/search-icon.svg"}
              alt="icon"
            />
          </div>
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
      <div className="flex items-center gap-2 xl:hidden">
        <button onClick={(): void => openModal(true)}>
          <Image
            width={20}
            height={20}
            src={"/assets/search-icon-white.svg"}
            alt="icon"
          />
        </button>
        <button onClick={() => openSidePane(true)}>
          <Image
            width={32}
            height={32}
            src={"/assets/menu-icon.svg"}
            alt="icon"
          />
        </button>
      </div>
    </div>
  );
}

export default Navbar;
