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
  return res.data;
};

export const fetchUsers = async (id) => {
  const res = await axios.get(`${API_BASE}/get-users`);
  return res.data.users;
};

export const getCategories = async (id) => {
  const res = await axios.get(`${API_BASE}/get-categories`);
  return res.data.categories;
};

export const fetchDocByCategory = async (categoryId, applicantId = null) => {
  let url = `${API_BASE}/doc-checklists/${categoryId}`;
  
  // Add ?applicant_id=XYZ if applicantId is provided
  if (applicantId) {
    url += `?applicant_id=${applicantId}`;
  }

  const res = await axios.get(url);
  return res.data.doclists;
};

export const handleFileChange = async (e, docChecklistId, setDoclists) => {
  const file = e.target.files[0];
  if (!file) return;

  const previewURL = URL.createObjectURL(file); // Show temporary preview before upload
console.log(previewURL);
  // Set temp preview
  setDoclists((prev) =>
    prev.map((item) =>
      item.id === docChecklistId ? { ...item, upload_path: previewURL } : item
    )
  );

  const formData = new FormData();
  formData.append("file", file);
  formData.append("id", docChecklistId);

  try {
    const response = await axios.post(`${API_BASE}/checklists/upload`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    const updatedDoc = response.data.doc;

    // Set file to actual uploaded URL after upload
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
  const response = await axios.get(`${API_BASE}/get-applicants`);
  return response.data;
};

