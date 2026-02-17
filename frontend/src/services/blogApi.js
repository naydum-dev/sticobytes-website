import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// Get all published blog posts with optional filters
export const getAllPosts = async ({
  page = 1,
  limit = 9,
  category = "",
} = {}) => {
  const params = new URLSearchParams();
  params.append("page", page);
  params.append("limit", limit);
  if (category) params.append("category", category);

  const response = await axios.get(`${API_URL}/blog?${params.toString()}`);
  return response.data;
};

// Get single post by slug
export const getPostBySlug = async (slug) => {
  const response = await axios.get(`${API_URL}/blog/${slug}`);
  return response.data;
};

// Get all categories
export const getCategories = async () => {
  const response = await axios.get(`${API_URL}/blog/categories`);
  return response.data;
};

// Format date nicely: "February 17, 2026"
export const formatDate = (dateString) => {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// Format view count: 1200 → "1.2k"
export const formatViews = (views) => {
  if (!views) return "0";
  if (views >= 1000) return `${(views / 1000).toFixed(1)}k`;
  return views.toString();
};
