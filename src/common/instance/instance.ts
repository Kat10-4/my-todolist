import axios from "axios"
import type { RootState } from "../../app/store"
import type { Store } from "@reduxjs/toolkit"

let store: Store<RootState> // ✅ Use Redux Toolkit's Store type

export const injectStore = (_store: Store<RootState>) => {
  store = _store
}


export const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
  },
})

instance.interceptors.request.use((config) => {
  if (!store) return config
  
  const state = store.getState()
  const token = state.auth?.token
  
  if (token && !config.url?.includes('/jwt-auth/')) {
    // ✅ User is LOGGED IN - use THEIR JWT token for data endpoints
    config.headers.Authorization = `Bearer ${token}`
  } 
  
  return config
})

