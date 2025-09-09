// frontend/src/api/api.js
import axios from 'axios';

// Base API URL (from .env or default localhost)
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

// Add token automatically to requests if available
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// ---------- AUTH ----------
export const signup = (data) => API.post("/auth/signup", data);
export const login = (data) => API.post("/auth/login", data);
export const verifyEmail = (token) => API.get(`/auth/verify/${token}`);
export const forgotPassword = (email) => API.post("/auth/forgot-password", { email });
export const resetPassword = (token, password) => API.post(`/auth/reset-password/${token}`, { password });

// ---------- STUDENTS ----------
export const getMyProfile = () => API.get("/students/me");
export const updateMyProfile = (data) => API.put("/students/me", data);

// ---------- ADMIN ----------
export const getAllStudents = () => API.get("/admin/students");
export const addStudent = (data) => API.post("/admin/students", data);
export const updateStudent = (id, data) => API.put(`/admin/students/${id}`, data);
export const deleteStudent = (id) => API.delete(`/admin/students/${id}`);
