import React, { useCallback, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface props {
  title: string;
  description: string;
  link: string;
  imgSrc: string;
  time: string;
  closeModal: (value: boolean) => void;
}

function ViewBlog({
  title,
  description,
  link,
  imgSrc,
  time,
  closeModal,
}: props) {
  const handleEscape = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal(false);
      }
    },
    [closeModal]
  );

  useEffect(() => {
    document.addEventListener("keyup", handleEscape);
  }, [handleEscape]);

  return (
    <div className="z-30 absolute w-full h-full bg-[#000000a4] flex justify-center items-center">
      <div className="bg-white w-[836px] h-fit p-[25px] rounded-[25px] flex justify-between">
        <div className="w-3/4 flex flex-col gap-3 text-black">
          <h4 className="font-semibold text-4xl">{title}</h4>
          <div className="pl-4 border-l-4 border-[#282A2D]">
            <p className="text-lg">{description}</p>
          </div>
          <p>
            Read full article:{" "}
            <Link
              className="font-semibold hover:underline"
              href={link}
              target="_blank"
            >
              {link}
            </Link>
          </p>
          <div className="w-full h-60 relative">
            <Image fill src={imgSrc} alt="image" />
          </div>
          <p className="text-base text-[#5A5A5A]">Published {time}</p>
        </div>
        <button
          onClick={(): void => closeModal(false)}
          className="text-[#646464] text-base border border-[#646464] px-[10px] py-[5px] h-fit w-fit rounded-[10px] hover:border-black hover:text-black hover:font-semibold"
        >
          Esc
        </button>
      </div>
    </div>
  );
}

export default ViewBlog;
