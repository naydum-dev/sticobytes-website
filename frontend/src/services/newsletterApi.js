import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const subscribe = async (email) => {
  const response = await axios.post(`${API_URL}/newsletter/subscribe`, {
    email,
  });
  return response.data;
};

export { subscribe };
