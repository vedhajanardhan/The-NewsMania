import api from "./api";

export const getUserById = async () => {
  const userId = localStorage.getItem("userId");

  const response = await api.get(`/users/${userId}`);

  return response.data;
};

export const updateUser = async (userData) => {
  const userId = localStorage.getItem("userId");

  const response = await api.put(`/users/${userId}`, userData);

  return response.data;
};