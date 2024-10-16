import React from "react";
import Image from "next/image";

function SearchResultItem({
  imgSrc,
  title,
  date,
}: {
  imgSrc: string;
  title: string;
  date: string;
}) {
  return (
    <button className="w-full h-fit flex p-[10px] gap-[10px]">
      <div className="w-[104px] min-h-[70px] h-full relative">
        <Image fill sizes="100%" src={imgSrc} alt="image" />
      </div>
      <div className="w-full h-fit flex flex-col text-start">
        <p className="text-lg font-semibold text-black">{title}</p>
        <p className="text-[14px] text-[#5A5A5A]">Published {date}</p>
      </div>
    </button>
  );
}

export default SearchResultItem;
