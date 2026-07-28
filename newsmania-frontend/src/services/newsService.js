import api from "./api";

export const getAllNews = async (page = 0, size = 9) => {
  const response = await api.get("/news", {
    params: {
      page,
      size,
    },
  });

  return response.data;
};

export const getNewsById = async (id) => {
  const response = await api.get(`/news/${id}`);
  return response.data;
};

export const searchNews = async (keyword, page = 0, size = 9) => {
  const response = await api.get("/news/search", {
    params: {
      keyword,
      page,
      size,
    },
  });

  return response.data;
};

export const getNewsByCategory = async (
  category,
  page = 0,
  size = 9
) => {
  const response = await api.get(`/news/category/${category}`, {
    params: {
      page,
      size,
    },
  });

  return response.data;
};