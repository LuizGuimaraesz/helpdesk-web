import axios from "axios";

export const API_URL =
  import.meta.env.VITE_API_URL ?? "http://192.168.1.3:3333";

export const api = axios.create({ baseURL: API_URL });
