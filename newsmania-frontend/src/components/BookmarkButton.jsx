import { useEffect, useState } from "react";
import {
  addBookmark,
  removeBookmark,
  isBookmarked,
} from "../services/bookmarkService";

function BookmarkButton({ newsId }) {
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    loadBookmarkStatus();
  }, [newsId]);

  const loadBookmarkStatus = async () => {
    try {
      const status = await isBookmarked(newsId);
      setBookmarked(status);
    } catch (error) {
      console.error(error);
    }
  };

  const handleBookmark = async () => {
    try {
      if (bookmarked) {
        await removeBookmark(newsId);
        setBookmarked(false);
      } else {
        await addBookmark(newsId);
        setBookmarked(true);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to update bookmark");
    }
  };

  return (
    <div className="mt-4">
      <button
        onClick={handleBookmark}
        className={`px-4 py-2 rounded text-white ${
          bookmarked ? "bg-green-600" : "bg-gray-600"
        }`}
      >
        {bookmarked ? "⭐ Bookmarked" : "☆ Bookmark"}
      </button>
    </div>
  );
}

export default BookmarkButton;