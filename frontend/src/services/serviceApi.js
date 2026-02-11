import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Get all services
export const getAllServices = async (category = null, featured = null) => {
  try {
    let url = `${API_URL}/services`;
    const params = {};

    if (category) params.category = category;
    if (featured !== null) params.featured = featured;

    const response = await axios.get(url, { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching services:", error);
    throw error;
  }
};

// Get single service by ID
export const getServiceById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/services/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching service:", error);
    throw error;
  }
};

// Create WhatsApp link with pre-filled message
export const createWhatsAppLink = (message, phone = "2348113393564") => {
  // Replace with your actual WhatsApp business number
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phone}?text=${encodedMessage}`;
};

export default {
  getAllServices,
  getServiceById,
  createWhatsAppLink,
};
