import axios from "axios";

export const apiInstance = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_bdId,
  headers: {
    "Content-Type": "application/json",
  },
});
