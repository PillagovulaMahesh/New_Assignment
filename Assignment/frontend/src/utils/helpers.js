// frontend/src/utils/helpers.js

// Save user & token in localStorage
export const saveAuthData = (user, token) => {
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("token", token);
};

// Get stored user
export const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

// Get stored token
export const getToken = () => {
  return localStorage.getItem("token");
};

// Clear all auth data
export const clearAuthData = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};

// Format date (Enrollment Date, etc.)
export const formatDate = (dateStr) => {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

// Simple email validator
export const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// Capitalize first letter
export const capitalize = (str) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};
