import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import SearchResultItem from "./SearchResultItem";
import moment from "moment";
import { responseObject, articleObject } from "@/pages";

function SearchModal({
  closeModal,
  selectItem,
  openBlogItem,
}: {
  closeModal: (value: boolean) => void;
  selectItem: (value: articleObject) => void;
  openBlogItem: (value: boolean) => void;
}) {
  const [searchResult, setSearchResult] = useState<responseObject[]>([]);
  const [searched, setSearched] = useState<boolean>(false);
  const [searchTxt, setSearchTxt] = useState<string>("");

  const handleSearchInput = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    try {
      if (event.key == "Enter" && event.currentTarget.value.trim().length > 0) {
        setSearched(true);
        const request = await fetch(
          `https://news-api14.p.rapidapi.com/v2/search/articles?query=${encodeURIComponent(
            event.currentTarget.value.trim()
          )}&language=en`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "x-rapidapi-key": `${process.env.NEXT_PUBLIC_API_KEY}`,
              "x-rapidapi-host": `${process.env.NEXT_PUBLIC_API_HOST}`,
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

  useEffect(() => {
    if (searchTxt.length == 0) {
      setSearched(false);
      setSearchResult([]);
    }
  }, [searchTxt]);

  return (
    <div className="z-30 absolute w-full h-full bg-[#000000a4] flex justify-center items-center">
      <div className="bg-white w-[90%] sm:w-3/5 lg:w-2/5 h-fit rounded-[25px] flex flex-col">
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
              onKeyUp={handleSearchInput}
              onChange={(e) => setSearchTxt(e.target.value)}
              className="w-full outline-none text-black"
              placeholder="Search news, articles, and etc."
            />
          </div>
          <button
            onClick={(): void => closeModal(false)}
            className="text-[#646464] text-xs border border-[#646464] px-2 py-1 h-fit w-fit rounded-[10px] hover:border-black hover:text-black hover:font-semibold"
          >
            Esc
          </button>
        </div>
        <div className="w-full h-full flex flex-col gap-[10px] px-[25px] py-[10px]">
          <p className="text-[#8A8A8A]">
            Type a keyword and hit &quot;Enter&quot; to find articles.
          </p>
          <h5 className="font-semibold text-sm text-[#8A8A8A]">
            {searched
              ? searchResult.length > 0
                ? "Search Result"
                : "Searching ..."
              : "No current searches."}
          </h5>
          <div className="w-full min-h-40 max-h-72 flex flex-col p-[10px] overflow-auto">
            {searchResult.map((data, id) => {
              return (
                <SearchResultItem
                  key={id}
                  imgSrc={data.thumbnail}
                  title={data.title}
                  date={moment(data.date).fromNow()}
                  getArticle={data}
                  selectItem={selectItem}
                  closeSearch={closeModal}
                  openBlogItem={openBlogItem}
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
