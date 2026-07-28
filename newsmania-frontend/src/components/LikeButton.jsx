import { useEffect, useState } from "react";
import {
  likeNews,
  unlikeNews,
  getLikeCount,
  hasLiked,
} from "../services/likeService";

function LikeButton({ newsId }) {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    loadLikes();
  }, [newsId]);

  const loadLikes = async () => {
    try {
      const totalLikes = await getLikeCount(newsId);
      const userLiked = await hasLiked(newsId);

      setCount(totalLikes);
      setLiked(userLiked);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLike = async () => {
    try {
      if (liked) {
        await unlikeNews(newsId);
      } else {
        await likeNews(newsId);
      }

      loadLikes();
    } catch (error) {
      console.error(error);
      alert("Failed to update like");
    }
  };

  return (
    <div className="mt-6 flex items-center gap-4">
      <button
        onClick={handleLike}
        className={`px-4 py-2 rounded text-white ${
          liked ? "bg-red-500" : "bg-blue-600"
        }`}
      >
        {liked ? "❤️ Liked" : "🤍 Like"}
      </button>

      <span className="text-lg font-semibold">
        {count} Likes
      </span>
    </div>
  );
}

export default LikeButton;