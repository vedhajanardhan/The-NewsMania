import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { addBookmark } from "../services/bookmarkService";

function NewsCard({
  id,
  title,
  content,
  imageUrl,
  author,
  category,
  publishedAt,
}) {
  const navigate = useNavigate();

  const handleBookmark = async () => {
    try {
      const message = await addBookmark(id);
      alert(message);
    } catch (error) {
      console.error(error);

      if (error.response) {
        alert(error.response.data);
      } else {
        alert("Failed to bookmark news.");
      }
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300">

      <img
        src={imageUrl || "https://picsum.photos/600/350"}
        alt={title}
        className="w-full h-56 object-cover"
      />

      <div className="p-5">

        <div className="flex justify-between items-center mb-3">
          <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
            {category}
          </span>

          <span className="text-sm text-gray-500">
            {dayjs(publishedAt).format("DD MMM YYYY")}
          </span>
        </div>

        <h2 className="text-2xl font-bold mb-3 line-clamp-2">
          {title}
        </h2>

        <p className="text-gray-600 mb-4 line-clamp-3">
          {content}
        </p>

        <p className="text-sm text-gray-500 mb-4">
          ✍️ {author}
        </p>

        <div className="flex gap-3">

          <button
            onClick={() => navigate(`/news/${id}`)}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Read More →
          </button>

          <button
            onClick={handleBookmark}
            className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition"
          >
            ❤️ Bookmark
          </button>

        </div>

      </div>

    </div>
  );
}

export default NewsCard;