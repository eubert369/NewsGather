import React from "react";
import Image from "next/image";
import { articleObject, responseObject } from "@/pages";

interface props {
  title: string;
  time: string;
  imgSrc: string;
  displayModal: (value: boolean) => void;
  selectItem: (value: articleObject) => void;
  getArticle: responseObject;
}

function BlogItem({
  title,
  time,
  imgSrc,
  displayModal,
  selectItem,
  getArticle,
}: props) {
  const handleClick = (): void => {
    selectItem({
      title: title,
      description: getArticle.excerpt,
      url: getArticle.url,
      imgUrl: getArticle.thumbnail,
      date: getArticle.date,
    });
    displayModal(true);
  };

  return (
    <button
      onClick={handleClick}
      className="flex flex-col items-start gap-[10px] w-[280px] h-fit relative shadow-lg hover:shadow-black rounded-lg"
    >
      <div className="w-full h-96 max-h-96 bg-[#979797] relative rounded-lg">
        <Image
          fill
          sizes="100%"
          priority
          src={imgSrc}
          alt="No image"
          className="rounded-lg"
        />
      </div>
      <div className="w-full absolute bottom-0 bg-[#000000a6] text-start p-3 rounded-b-lg">
        <h4 className="text-white font-semibold text-xl text-start">{title}</h4>
        <p className="text-[#ebe9e9] text-sm">{time}</p>
      </div>
    </button>
  );
}

export default BlogItem;
