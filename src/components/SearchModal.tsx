import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import SearchResultItem from "./SearchResultItem";
import moment from "moment";
import { responseObject } from "@/pages";

function SearchModal({
  closeModal,
}: {
  closeModal: (vallue: boolean) => void;
}) {
  const [searchResult, setSearchResult] = useState<responseObject[]>([]);

  const handleSearchInput = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      if (event.target.value.length > 0) {
        const request = await fetch(
          `https://news-api14.p.rapidapi.com/v2/search/articles?query=${event.target.value}&language=en`,
          {
            method: "GET",
            headers: {
              "x-rapidapi-key":
                "c669122751msh09833f2d21d4c96p158155jsn20321158a9c2",
              "x-rapidapi-host": "news-api14.p.rapidapi.com",
            },
          }
        );

        const response = await request.json();
        setSearchResult(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

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
      <div className="bg-white w-2/5 h-fit rounded-[25px] flex flex-col">
        <div className="flex justify-between px-[25px] pt-[25px] pb-[15px] border-b border-[#8A8A8A]">
          <div className="w-full flex gap-[10px]">
            <div className="w-[25px] h-[25px] relative">
              <Image
                fill
                sizes="100%"
                src={"/assets/search-icon.svg"}
                alt="image"
              />
            </div>
            <input
              onChange={handleSearchInput}
              className="w-full outline-none text-black"
              placeholder="Search news, articles, and etc."
            />
          </div>
          <button
            onClick={(): void => closeModal(false)}
            className="text-[#646464] text-sm border border-[#646464] px-[10px] py-[5px] h-fit w-fit rounded-[10px] hover:border-black hover:text-black hover:font-semibold"
          >
            Esc
          </button>
        </div>
        <div className="w-full h-full flex flex-col gap-[10px] px-[25px] py-[10px]">
          <h5 className="font-semibold text-xl text-[#8A8A8A]">
            Search Result
          </h5>
          <div className="w-full min-h-40 max-h-72 flex flex-col gap-1 p-[10px] overflow-auto">
            {searchResult.map((data, id) => {
              return (
                <SearchResultItem
                  key={id}
                  imgSrc={data.thumbnail}
                  title={data.title}
                  date={moment(data.date).fromNow()}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchModal;
