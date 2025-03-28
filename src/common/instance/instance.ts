import axios from "axios"

const token = "714ecac0-93f5-4e06-92d8-4a78b2b2eb89"
const apiKey = "5a84ec24-5118-4689-a393-1705bd1d41e8"

export const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1",
  headers: {
    Authorization: `Bearer ${token}`,
    "API-KEY": apiKey,
  },
})
