import api from "./api";

export const addBookmark = async (newsId) => {
  const response = await api.post(`/bookmarks/${newsId}`);
  return response.data;
};

export const removeBookmark = async (newsId) => {
  const response = await api.delete(`/bookmarks/${newsId}`);
  return response.data;
};

export const getBookmarks = async () => {
  const userId = localStorage.getItem("userId");
  const response = await api.get(`/bookmarks/${userId}`);
  return response.data;
};

export const isBookmarked = async (newsId) => {
  const userId = localStorage.getItem("userId");
  const response = await api.get(`/bookmarks/check/${userId}/${newsId}`);
  return response.data;
};