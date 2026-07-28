import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import NewsCard from "../components/NewsCard";
import LoadingSpinner from "../components/LoadingSpinner";
import {
  getAllNews,
  searchNews,
  getNewsByCategory,
} from "../services/newsService";

function Home() {
  const [news, setNews] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const size = 9;

  useEffect(() => {
    loadNews();
  }, [page, keyword, selectedCategory]);

  const loadNews = async () => {
    try {
      setLoading(true);

      let data;

      if (keyword.trim() !== "") {
        data = await searchNews(keyword, page, size);
      } else if (selectedCategory !== "All") {
        data = await getNewsByCategory(selectedCategory, page, size);
      } else {
        data = await getAllNews(page, size);
      }

      setNews(data.content || []);
      setTotalPages(data.totalPages || 0);
    } catch (error) {
      console.error(error);
      setNews([]);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    "All",
    "Technology",
    "Business",
    "Sports",
    "Health",
  ];

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-6 py-10">

        <h1 className="text-4xl font-bold mb-6">
          Latest News
        </h1>

        <input
          type="text"
          placeholder="🔍 Search news..."
          value={keyword}
          onChange={(e) => {
            setKeyword(e.target.value);
            setPage(0);
          }}
          className="w-full p-3 mb-6 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex flex-wrap gap-3 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setKeyword("");
                setSelectedCategory(category);
                setPage(0);
              }}
              className={`px-4 py-2 rounded-full ${
                selectedCategory === category
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : news.length === 0 ? (
          <div className="text-center text-xl text-gray-500 py-10">
            No news found.
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {news.map((item) => (
                <NewsCard
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  content={item.content}
                  imageUrl={item.imageUrl}
                  author={item.author}
                  category={item.category}
                  publishedAt={item.publishedAt}
                />
              ))}
            </div>

            <div className="flex justify-center items-center gap-4 mt-10">

              <button
                disabled={page === 0}
                onClick={() => setPage((prev) => prev - 1)}
                className="bg-blue-600 text-white px-5 py-2 rounded disabled:bg-gray-400"
              >
                Previous
              </button>

              <span className="font-semibold">
                Page {page + 1} of {totalPages}
              </span>

              <button
                disabled={page + 1 >= totalPages}
                onClick={() => setPage((prev) => prev + 1)}
                className="bg-blue-600 text-white px-5 py-2 rounded disabled:bg-gray-400"
              >
                Next
              </button>

            </div>
          </>
        )}

      </div>
    </MainLayout>
  );
}

export default Home;