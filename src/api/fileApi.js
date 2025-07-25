import axiosInstance from "./axiosInstance";
import axios from 'axios';


export const submitImmigrationForm = async (formData) => {
  const response = await axiosInstance.post("/file", formData);
  return response.data;
};

export const fetchFileById = async (id) => {
  const res = await axiosInstance.get(`/get-file/${id}`);
  return res.data;
};

export const fetchUsers = async () => {
  const res = await axiosInstance.get(`/get-files-users`);
  console.log(res.data.users);
  return res.data.users;
};

export const getCategories = async () => {
  const res = await axiosInstance.get(`/get-categories`);
    console.log(res.data.categories);

  return res.data.categories;
};

export const fetchDocByCategory = async (categoryId, applicantId = null) => {
  let url = `/doc-checklists/${categoryId}`;
  if (applicantId) url += `?applicant_id=${applicantId}`;
  const res = await axiosInstance.get(url);
  return res.data.doclists;
};

export const fetchDocByCustom = async (applicantId) => {
  let url = `/custom-doc-checklists/${applicantId}`;
  const res = await axiosInstance.get(url);
  console.log(res.data.doclists);
  return res.data.doclists;
};

export const handleFileChange = async (e, docChecklistId, setDoclists) => {
  const file = e.target.files[0];
  if (!file) return;

  const previewURL = URL.createObjectURL(file);
  setDoclists((prev) =>
    prev.map((item) =>
      item.id === docChecklistId ? { ...item, upload_path: previewURL } : item
    )
  );

  const formData = new FormData();
  formData.append("file", file);
  formData.append("id", docChecklistId);

  try {
    const response = await axios.post(
      "http://localhost:8000/api/checklists/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // manually added here since axiosInstance is JSON only
        },
      }
    );

    const updatedDoc = response.data.doc;
    setDoclists((prev) =>
      prev.map((item) =>
        item.id === docChecklistId ? { ...item, upload_path: updatedDoc.file_url } : item
      )
    );
  } catch (err) {
    console.error("Upload failed", err);
    alert("Upload failed");
  }
};

export const fetchApplicants = async () => {
  const response = await axiosInstance.get("/get-applicants");
  return response.data;
};
