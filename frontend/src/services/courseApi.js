import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// Register for a course
export const registerForCourse = async (formData) => {
  const response = await axios.post(`${API_URL}/courses/register`, formData);
  return response.data;
};

// Get all registrations (admin)
export const getAllRegistrations = async (token) => {
  const response = await axios.get(`${API_URL}/courses/registrations`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Update payment status (admin)
export const updatePaymentStatus = async (id, status, token) => {
  const response = await axios.put(
    `${API_URL}/courses/registrations/${id}`,
    { payment_status: status },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
};
