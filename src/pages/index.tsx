import React, { useCallback, useEffect, useState } from "react";
import type { InferGetStaticPropsType, GetStaticProps } from "next";
import Navbar from "@/components/Navbar";
import BlogItem from "@/components/BlogItem";
import ViewBlog from "@/components/ViewBlog";
import SearchModal from "@/components/SearchModal";
import moment from "moment";

export interface articleObject {
  title: string;
  description: string;
  url: string;
  imgUrl: string;
  date: string;
}

export interface responseObject {
  title: string;
  excerpt: string;
  url: string;
  thumbnail: string;
  date: string;
}

export const getStaticProps = (async () => {
  const request = await fetch(
    "https://news-api14.p.rapidapi.com/v2/trendings?topic=General&language=en&country=ph",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-rapidapi-key": "c669122751msh09833f2d21d4c96p158155jsn20321158a9c2",
        "x-rapidapi-host": "news-api14.p.rapidapi.com",
      },
    }
  );

  const response = await request.json();

  return { props: { response } };
}) satisfies GetStaticProps<{ response: responseObject[] }>;

export default function Home({
  response,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [displaySearch, setDisplaySearch] = useState<boolean>(false);
  const [displayViewModal, setDisplayViewModal] = useState<boolean>(false);
  // const [articles, setArticles] = useState<responseObject[]>(response.data);
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
      <Navbar openModal={setDisplaySearch} />
      <div className="flex flex-col bg-white px-8 pt-8 gap-[20px] h-full overflow-auto">
        <h3 className="text-black font-bold text-[31px]">Trending News</h3>
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
