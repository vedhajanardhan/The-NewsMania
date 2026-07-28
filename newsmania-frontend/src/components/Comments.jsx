import { useEffect, useState } from "react";
import {
  getComments,
  addComment,
  updateComment,
  deleteComment,
} from "../services/commentService";

function Comments({ newsId }) {
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editContent, setEditContent] = useState("");

  useEffect(() => {
    loadComments();
  }, [newsId]);

  const loadComments = async () => {
    try {
      const data = await getComments(newsId);
      setComments(data);
    } catch (error) {
      console.error(error);
      alert("Failed to load comments");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (content.trim() === "") {
      alert("Please enter a comment");
      return;
    }

    try {
      await addComment({
        newsId,
        content,
      });

      setContent("");
      loadComments();
    } catch (error) {
      console.error(error);
      alert("Failed to add comment");
    }
  };

  const handleUpdate = async (id) => {
    try {
      await updateComment(id, {
        content: editContent,
      });

      setEditingId(null);
      setEditContent("");
      loadComments();
    } catch (error) {
      console.error(error);
      alert("Failed to update comment");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this comment?")) return;

    try {
      await deleteComment(id);
      loadComments();
    } catch (error) {
      console.error(error);
      alert("Failed to delete comment");
    }
  };

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold mb-4">
        💬 Comments
      </h2>

      <form onSubmit={handleSubmit} className="mb-6">
        <textarea
          className="w-full border rounded-lg p-3"
          rows="4"
          placeholder="Write your comment..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button
          type="submit"
          className="mt-3 bg-blue-600 text-white px-5 py-2 rounded"
        >
          Post Comment
        </button>
      </form>

      {comments.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        comments.map((comment) => (
          <div
            key={comment.id}
            className="bg-gray-100 rounded-lg p-4 mb-4"
          >
            <h3 className="font-semibold">
              {comment.user?.fullName}
            </h3>

            {editingId === comment.id ? (
              <>
                <textarea
                  className="w-full border rounded p-2 mt-2"
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                />

                <button
                  onClick={() => handleUpdate(comment.id)}
                  className="bg-green-600 text-white px-4 py-2 rounded mt-2 mr-2"
                >
                  Save
                </button>

                <button
                  onClick={() => {
                    setEditingId(null);
                    setEditContent("");
                  }}
                  className="bg-gray-500 text-white px-4 py-2 rounded mt-2"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <p className="mt-2">
                  {comment.content}
                </p>

                <button
                  onClick={() => {
                    setEditingId(comment.id);
                    setEditContent(comment.content);
                  }}
                  className="bg-yellow-500 text-white px-3 py-1 rounded mt-3 mr-2"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(comment.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded mt-3"
                >
                  Delete
                </button>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default Comments;