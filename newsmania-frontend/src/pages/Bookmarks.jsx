import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getBookmarks } from "../services/bookmarkService";
import dayjs from "dayjs";

function Bookmarks() {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    loadBookmarks();
  }, []);

  const loadBookmarks = async () => {
    try {
      const data = await getBookmarks();
      setBookmarks(data);
    } catch (error) {
      console.error(error);
      alert("Failed to load bookmarks");
    }
  };

  if (bookmarks.length === 0) {
    return (
      <div className="text-center mt-10">
        <h2 className="text-3xl font-bold mb-4">
          My Bookmarks
        </h2>

        <p>No bookmarks found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-8">
        ⭐ My Bookmarks
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookmarks.map((bookmark) => (
          <div
            key={bookmark.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={bookmark.news.imageUrl || "https://picsum.photos/400/250"}
              alt={bookmark.news.title}
              className="w-full h-52 object-cover"
            />

            <div className="p-4">
              <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm">
                {bookmark.news.category}
              </span>

              <h3 className="text-xl font-bold mt-3 mb-2">
                {bookmark.news.title}
              </h3>

              <p className="text-gray-600 text-sm mb-3">
                {dayjs(bookmark.news.publishedAt).format("DD MMM YYYY")}
              </p>

              <Link
                to={`/news/${bookmark.news.id}`}
                className="text-blue-600 font-semibold"
              >
                Read More →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Bookmarks;