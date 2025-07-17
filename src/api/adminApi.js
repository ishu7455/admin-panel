import axios from 'axios';

export const API_BASE = 'http://localhost:8000/api';
export const File_BASE = 'http://localhost:8000';


export const fetchRoles = async () => {
  const res = await axios.get(`${API_BASE}/get-roles`);
  console.log(res);
  return res.data.roles;
};

export const fetchUserById = async (id) => {
  const res = await axios.get(`${API_BASE}/get-user/${id}`);
  return res.data.user;
};

export const createOrUpdateUser = async (formData) => {
  const res = await axios.post(`${API_BASE}/create-or-update-user`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
};

export const deleteUser = async (id) => {
  try {
    const res = await axios.get(`${API_BASE}/delete-user/${id}`);
    return res.data; 
  } catch (error) {
    console.error('Delete error:', error);
    return { status: 500 };
  }
};

export const fetchUsers = async (page = 1, search = "") => {
  const res = await fetch(`${API_BASE}/users?page=${page}&search=${search}`);
  if (!res.ok) throw new Error("Failed to fetch users");
  console.log(res.data);

  return await res.json();
};
