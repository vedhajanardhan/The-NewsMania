import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import { getNewsById } from "../services/newsService";
import LikeButton from "../components/LikeButton";
import BookmarkButton from "../components/BookmarkButton";
import Comments from "../components/Comments";
import LoadingSpinner from "../components/LoadingSpinner";

function NewsDetails() {
  const { id } = useParams();

  const [news, setNews] = useState(null);

  useEffect(() => {
    fetchNews();
  }, [id]);

  const fetchNews = async () => {
    try {
      const data = await getNewsById(id);
      setNews(data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!news) {
    return <LoadingSpinner />;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <img
        src={news.imageUrl || "https://picsum.photos/900/450"}
        alt={news.title}
        className="w-full rounded-lg mb-6"
      />

      <div className="flex justify-between items-center mb-4">
        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
          {news.category}
        </span>

        <span className="text-gray-500">
          {dayjs(news.publishedAt).format("DD MMM YYYY")}
        </span>
      </div>

      <h1 className="text-4xl font-bold mb-4">{news.title}</h1>

      <p className="text-gray-500 mb-6">✍️ {news.author}</p>

      <p className="text-gray-700 leading-8 mb-6">{news.content}</p>

      <div className="flex gap-4 mb-8">
        <LikeButton newsId={id} />
        <BookmarkButton newsId={id} />
      </div>

      <Comments newsId={id} />
    </div>
  );
}

export default NewsDetails;