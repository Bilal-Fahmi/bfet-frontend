import axios from "axios";

export const apiInstance = axios.create({
  baseURL: "https://bfet-server.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});
