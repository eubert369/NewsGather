import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import BlogItem from "@/components/BlogItem";
import ViewBlog from "@/components/ViewBlog";
import moment from "moment";
import { articleObject, responseObject } from ".";

function Business() {
  const [displayViewModal, setDisplayViewModal] = useState<boolean>(false);
  const [articles, setArticles] = useState<articleObject[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<articleObject>({
    title: "",
    description: "",
    url: "",
    imgUrl: "",
    date: "",
  });

  const fetchArticle = async () => {
    try {
      const request = await fetch(
        "https://news-api14.p.rapidapi.com/v2/trendings?topic=Business&language=en&country=ph",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-rapidapi-key":
              "c669122751msh09833f2d21d4c96p158155jsn20321158a9c2",
            "x-rapidapi-host": "news-api14.p.rapidapi.com",
          },
        }
      );

      const response = await request.json();
      const data: articleObject[] = response.data.map(
        (item: responseObject) => ({
          title: item.title,
          description: item.excerpt,
          url: item.url,
          imgUrl: item.thumbnail,
          date: item.date,
        })
      );
      setArticles(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchArticle();
  }, []);

  return (
    <div className="h-screen overflow-hidden">
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
      <Navbar />
      <div className="flex flex-col bg-white px-8 pt-8 gap-[20px] h-full overflow-auto">
        <h3 className="text-black font-bold text-[31px]">Business</h3>
        <div className="flex flex-wrap justify-start gap-[30px] px-[10px] pt-[10px] pb-32 w-full h-fit">
          {articles.map((data, id) => (
            <BlogItem
              key={id}
              title={data.title}
              imgSrc={data.imgUrl}
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

export default Business;
