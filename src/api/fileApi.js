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
  console.log(res.data.doclists);
  return res.data.doclists;
};
export const fetchCheckByCategory = async (categoryId, applicantId = null) => {
  let url = `/checklists/${categoryId}`;
  if (applicantId) url += `?applicant_id=${applicantId}`;
  const res = await axiosInstance.get(url);
  console.log(res.data.doclists);
   const doclists = res.data.doclists;
  const cat = res.data.cat;

  return { doclists, cat };
};

export const fetchDocByCustom = async (applicantId) => {
  let url = `/custom-doc-checklists/${applicantId}`;
  const res = await axiosInstance.get(url);
  console.log(res.data.doclists);
  return res.data.doclists;
};

export const fetchChecklistByCustom = async (applicantId) => {
  let url = `/custom-checklists/${applicantId}`;
  const res = await axiosInstance.get(url);
  console.log(res.data.doclists);
  return res.data.doclists;
};


export const handleFileChange = async (e, docChecklistId, setDoclists ,applicantId) => {
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
  formData.append("applicantId", applicantId);


  try {
    const response = await axios.post(
      "http://localhost:8000/api/checklists/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`, 
        },
      }
    );

   const updatedDoc = response.data.doc;

setDoclists((prev) =>
  prev.map((item) =>
    item.id === docChecklistId
      ? {
          ...item,
          docs: [{ upload_path: updatedDoc.file_url  , id:updatedDoc.id}] 
        }
      : item
  )
);


  } catch (err) {
    console.error("Upload failed", err);
    alert("Upload failed");
  }
};

export const handleFileCustomChange = async (e, docChecklistId, setCustomDoclists) => {
  const file = e.target.files[0];
  if (!file) return;

  const previewURL = URL.createObjectURL(file);
  setCustomDoclists((prev) =>
    prev.map((item) =>
      item.id === docChecklistId ? { ...item, upload_path: previewURL } : item
    )
  );

  const formData = new FormData();
  formData.append("file", file);
  formData.append("id", docChecklistId);


  try {
    const response = await axios.post(
      "http://localhost:8000/api/checklists/update-custom",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`, 
        },
      }
    );

   const updatedDoc = response.data.doc;
console.log(updatedDoc);
  setCustomDoclists((prev) =>
      prev.map((item) =>
        item.id === docChecklistId ? { ...item, upload_path: updatedDoc.file_url } : item
      )
    );

  } catch (err) {
    console.error("Upload failed", err);
    alert("Upload failed");
  }
};

export const fetchApplicants = async (page = 1, search = '') => {
  const response = await axiosInstance.get(`/get-applicants?page=${page}&search=${search}`);
  return response.data;
};


export const handleDeleteCustomDoc = async (id , setCustomDoclists) => {
  if (!window.confirm("Are you sure you want to delete this document?")) return;

  try {
    const res = await axiosInstance.delete(`/checklists/custom-delete/${id}`);

    if (res.status === 200) {
      setCustomDoclists((prev) => prev.filter((item) => item.id !== id));
    } else {
      alert("Delete failed");
    }
  } catch (err) {
    console.error("Delete Error:", err);
    alert("Something went wrong");
  }
};

export const handleDeleteCustomCheckList = async (id , setCustomChecklists) => {
  if (!window.confirm("Are you sure you want to delete this document?")) return;

  try {
    const res = await axiosInstance.delete(`/checklists/custom-list-delete/${id}`);

    if (res.status === 200) {
      setCustomChecklists((prev) => prev.filter((item) => item.id !== id));
    } else {
      alert("Delete failed");
    }
  } catch (err) {
    console.error("Delete Error:", err);
    alert("Something went wrong");
  }
};



export const handleToggleStatus = async (id, currentStatus ,setCustomChecklists) => {
  const newStatus = currentStatus === 'active' ? 'inactive' : 'active';

  try {
    const res = await axiosInstance.post(`/checklists/custom-toggle-status/${id}`, { status: newStatus });

    if (res.status === 200) {
      setCustomChecklists((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, status: newStatus } : item
        )
      );
    }
  } catch (err) {
    console.error("Failed to toggle status", err);
    alert("Something went wrong while updating status.");
  }
};

export const handleChecklistStatus = async (id, currentStatus , setChecklists , applicantId,calculatePercentage) => {

  const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
  try {
    const res = await axiosInstance.post(`/checklists/toggle-status`, { status: newStatus , applicantId: applicantId , id: id});

    if (res.status === 200) {
     setChecklists((prev) =>
        prev.map((item) => {
          // If it's a checklist doc toggle
          if (item.docs?.some((doc) => doc.id === id)) {
            const updatedDocs = item.docs.map((doc) =>
              doc.id === id ? { ...doc, status: newStatus } : doc
            );
            calculatePercentage(updatedDocs);
            return { ...item, docs: updatedDocs };
          }

          // If it's a checklist item toggle (not inside docs array)
          if (item.id === id) {
            return { ...item, status: newStatus };
          }

          return item;
        })
      );
    }
  } catch (err) {
    console.error("Failed to toggle status", err);
    alert("Something went wrong while updating status.");
  }
};

export const fetchStatus = async () => {
  const response = await axiosInstance.get(`/applicant-status`);
  return response.data;
};