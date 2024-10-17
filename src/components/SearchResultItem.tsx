import React from "react";
import Image from "next/image";
import { responseObject, articleObject } from "@/pages";

interface props {
  imgSrc: string;
  title: string;
  date: string;
  getArticle: responseObject;
  selectItem: (value: articleObject) => void;
  closeSearch: (value: boolean) => void;
  openBlogItem: (value: boolean) => void;
}

function SearchResultItem({
  imgSrc,
  title,
  date,
  getArticle,
  selectItem,
  closeSearch,
  openBlogItem,
}: props) {
  const handleClick = () => {
    selectItem({
      title: title,
      description: getArticle.excerpt,
      url: getArticle.url,
      imgUrl: getArticle.thumbnail,
      date: getArticle.date,
    });
    closeSearch(true);
    openBlogItem(true);
  };

  return (
    <button
      onClick={handleClick}
      className="w-full h-fit flex p-[10px] gap-[10px] hover:bg-gray-300 rounded-md"
    >
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
