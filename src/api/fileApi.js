// src/api/fileApi.js
import axios from "axios";

const API_BASE = "http://localhost:8000/api";

export const submitImmigrationForm = async (formData) => {
  try {
    alert('hi');
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
