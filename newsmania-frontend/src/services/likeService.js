import api from "./api";

export const likeNews = async (newsId) => {
  const response = await api.post(`/likes/${newsId}`);
  return response.data;
};

export const unlikeNews = async (newsId) => {
  const response = await api.delete(`/likes/${newsId}`);
  return response.data;
};

export const getLikeCount = async (newsId) => {
  const response = await api.get(`/likes/count/${newsId}`);
  return response.data;
};

export const hasLiked = async (newsId) => {
  const response = await api.get(`/likes/check/${newsId}`);
  return response.data;
};