import axios from "axios";

const API = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export const fetchAlbums = async (page = 1, limit = 100) => {
  const res = await API.get(`/albums?_page=${page}&_limit=${limit}`);
  return res.data;
};

export const fetchAlbum = async (id) => {
  const res = await API.get(`/albums/${id}`);
  return res.data;
};

export const fetchPhotosByAlbum = async (albumId) => {
  const res = await API.get(`/photos?albumId=${albumId}`);
  return res.data;
};

export const fetchUsers = async () => {
  const res = await API.get("/users");
  return res.data;
};

export const fetchUser = async (id) => {
  const res = await API.get(`/users/${id}`);
  return res.data;
};

export const fetchAlbumsByUser = async (userId) => {
  const res = await API.get(`/albums?userId=${userId}`);
  return res.data;
};