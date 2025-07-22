import axios from "axios";

const API_BASE = "http://localhost:8000/api";

export const submitImmigrationForm = async (formData) => {
  try {
    console.log(formData);
    const response = await axios.post(`${API_BASE}/file`, formData, {
      headers: {
        "Content-Type": "application/json",
        // Include auth token if needed:
        // Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error submitting form:", error);
    throw error.response?.data || error;
  }
};

export const fetchFileById = async (id) => {
  const res = await axios.get(`${API_BASE}/get-file/${id}`);
  return res.data.applicant;
};

export const fetchUsers = async (id) => {
  const res = await axios.get(`${API_BASE}/get-users`);
  return res.data.users;
};

export const getCategories = async (id) => {
  const res = await axios.get(`${API_BASE}/get-categories`);
  return res.data.categories;
};


