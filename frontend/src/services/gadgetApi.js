import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Get all gadgets with optional filters
export const getAllGadgets = async (filters = {}) => {
  try {
    const params = new URLSearchParams();

    if (filters.category) params.append("category", filters.category);
    if (filters.stock_status)
      params.append("stock_status", filters.stock_status);
    if (filters.featured !== undefined)
      params.append("featured", filters.featured);

    const response = await axios.get(`${API_URL}/gadgets?${params.toString()}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching gadgets:", error);
    throw error;
  }
};

// Get single gadget by ID
export const getGadgetById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/gadgets/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching gadget:", error);
    throw error;
  }
};

// Create WhatsApp link with pre-filled message
export const createWhatsAppLink = (gadgetName, customMessage = null) => {
  const phoneNumber = "2348113393564"; // Sticobytes WhatsApp Business number
  const message =
    customMessage ||
    `Hello! I'm interested in the ${gadgetName}. Is it still available?`;
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
};

// Format price in Nigerian Naira
export const formatPrice = (price) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

// Get stock status badge variant
export const getStockBadgeVariant = (stockStatus) => {
  switch (stockStatus) {
    case "in_stock":
      return "successSolid";
    case "low_stock":
      return "warningSolid";
    case "out_of_stock":
      return "errorSolid";
    default:
      return "default";
  }
};

// Get stock status label
export const getStockLabel = (stockStatus) => {
  switch (stockStatus) {
    case "in_stock":
      return "In Stock";
    case "low_stock":
      return "Low Stock";
    case "out_of_stock":
      return "Out of Stock";
    default:
      return "Unknown";
  }
};
