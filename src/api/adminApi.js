import axiosInstance from "./axiosInstance";
import {fetchStatus} from "../api/fileApi";


export const API_BASE = 'http://localhost:8000/api';
export const File_BASE = 'http://localhost:8000';


export const fetchRoles = async () => {
  const res = await axiosInstance.get(`${API_BASE}/get-roles`);
  console.log(res);
  return res.data.roles;
};

export const fetchUserById = async (id) => {
  const res = await axiosInstance.get(`${API_BASE}/get-user/${id}`);
  return res.data.user;
};

export const createOrUpdateUser = async (formData) => {
  const res = await axiosInstance.post(`${API_BASE}/create-or-update-user`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
};

export const deleteUser = async (id) => {
  try {
    const res = await axiosInstance.get(`${API_BASE}/delete-user/${id}`);
    return res.data; 
  } catch (error) {
    console.error('Delete error:', error);
    return { status: 500 };
  }
};

export const fetchUsers = async (page = 1, search = "") => {
  const res = await axiosInstance.get(`${API_BASE}/users?page=${page}&search=${search}`);
  if (!res.ok) throw new Error("Failed to fetch users");
  console.log(res.data);

  return await res.json();
};

export const statusChange = async (newStatus ,appId ,setApplicants , setStatusCounts) => {
 try {
    const res = await axiosInstance.get(`${API_BASE}/status-update/${newStatus}/${appId}`);

     setApplicants(prevApplicants =>
      prevApplicants.map(app => {
        if (app.id === appId) {
          return { ...app, status: newStatus };
        }

        if (app.sub_applicants && app.sub_applicants.length > 0) {
          return {
            ...app,
            sub_applicants: app.sub_applicants.map(sub =>
              sub.id === appId ? { ...sub, status: newStatus } : sub
            ),
          };
        }

        return app; 
      })
    );

    fetchStatus()
      .then(setStatusCounts)
      .catch(console.error);

   // return res.data; 
  } catch (error) {
    console.error("Status update error:", error);
    return { status: 500 };
  }
}

export const assignessChange = async (newAssigness ,appId ,setApplicants) => {
 try {
    const res = await axiosInstance.get(`${API_BASE}/assigness-update/${newAssigness}/${appId}`);

    setApplicants(prevApplicants =>
  prevApplicants.map(app =>
    app.id === appId
      ? {
          ...app,
          assign_to_user: {
            ...app.assign_to_user, 
            first_name: res.data, 
          },
        }
      : app
  )
);


   // return res.data; 
  } catch (error) {
    console.error("Status update error:", error);
    return { status: 500 };
  }
}

