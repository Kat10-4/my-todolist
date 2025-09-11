import axios from "axios";


export const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: false,
  headers: {
        Authorization: `Basic ${btoa(`${process.env.REACT_APP_WP_USER}:${process.env.REACT_APP_WP_APP_PASSWORD}`)}`,
        "Content-Type": "application/json",
  },
})

