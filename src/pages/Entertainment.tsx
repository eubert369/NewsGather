import React, { useCallback, useEffect, useState } from "react";
import type { InferGetStaticPropsType, GetStaticProps } from "next";
import SearchModal from "@/components/SearchModal";
import Navbar from "@/components/Navbar";
import BlogItem from "@/components/BlogItem";
import ViewBlog from "@/components/ViewBlog";
import SidePanel from "@/components/SidePanel";
import moment from "moment";
import { articleObject, responseObject } from ".";

export const getStaticProps = (async () => {
  const request = await fetch(
    "https://news-api14.p.rapidapi.com/v2/trendings?topic=Entertainment&language=en&country=ph",
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

  return { props: { response } };
}) satisfies GetStaticProps<{ response: responseObject[] }>;

function Entertainment({
  response,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [displaySearch, setDisplaySearch] = useState<boolean>(false);
  const [displayViewModal, setDisplayViewModal] = useState<boolean>(false);
  const [openSidePanel, setOpenSidePanel] = useState<boolean>(false);
  const articles: responseObject[] = response.data;
  const [selectedArticle, setSelectedArticle] = useState<articleObject>({
    title: "",
    description: "",
    url: "",
    imgUrl: "",
    date: "",
  });

  const handleShortcutKey = useCallback((event: KeyboardEvent) => {
    if (event.ctrlKey && event.key === "k") {
      event.preventDefault();
      setDisplaySearch(true);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleShortcutKey);
  }, [handleShortcutKey]);

  return (
    <div className="h-screen overflow-hidden">
      {openSidePanel && <SidePanel openPanel={setOpenSidePanel} />}
      {displaySearch && (
        <SearchModal
          closeModal={setDisplaySearch}
          selectItem={setSelectedArticle}
          openBlogItem={setDisplayViewModal}
        />
      )}
      {displayViewModal && (
        <ViewBlog
          title={selectedArticle.title}
          description={selectedArticle.description}
          link={selectedArticle.url}
          imgSrc={selectedArticle.imgUrl}
          time={moment(selectedArticle.date).fromNow()}
          closeModal={setDisplayViewModal}
        />
      )}
      <Navbar openModal={setDisplaySearch} openSidePane={setOpenSidePanel} />
      <div className="flex flex-col bg-white px-8 pt-8 gap-[20px] h-full overflow-auto">
        <h3 className="text-black font-bold text-[31px]">Entertainment</h3>
        <div className="flex flex-wrap justify-start gap-[30px] px-[10px] pt-[10px] pb-32 w-full h-fit">
          {articles.map((data, id) => (
            <BlogItem
              key={id}
              title={data.title}
              imgSrc={data.thumbnail}
              time={moment(data.date).fromNow()}
              displayModal={setDisplayViewModal}
              selectItem={setSelectedArticle}
              getArticle={data}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Entertainment;
