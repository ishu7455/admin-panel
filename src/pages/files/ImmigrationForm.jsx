import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { submitImmigrationForm as submitImmigrationFormAPI, fetchFileById , getCategories, fetchUsers, fetchDocByCategory , fetchDocByCustom, handleFileChange , handleFileCustomChange , handleDeleteCustomDoc , fetchChecklistByCustom} from "../../api/fileApi";
import {File_BASE} from "../../api/adminApi";
import axios from "axios";

const currentLoginUser = JSON.parse(localStorage.getItem("user"));



// Accordion Section UI
const Section = ({ title, children }) => {
  const [open, setOpen] = useState(true);
  const showToggle = !["Check List", "Upload Document"].includes(title);

  return (
    <div className="col-lg-12 mb-3">
      <div className="d-flex justify-content-between align-items-center">
        <h5 className="text-primary mb-3">{title}</h5>
        {showToggle && (
          <button
            type="button"
            className="btn btn-sm btn-outline-secondary"
            onClick={() => setOpen(!open)}
          >
            {open ? "−" : "+"}
          </button>
        )}
      </div>
      {open && <div className="row">{children}</div>}
    </div>
  );
};


// Input handler
const InputField = ({ label, name, value, onChange , categories = [] , users = [] }) => {
  const lower = label.toLowerCase();

  if (label === "Given Name") {
    return (
      <select className="form-select h-55" name={name} value={value} onChange={onChange}>
        <option>Select Title</option>
        <option>Mr</option>
        <option>Mrs</option>
        <option>Miss</option>
        <option>Ms</option>
      </select>
    );
  } else if (label === "Assign To") {
    return (
      <select className="form-select h-55" name={name} value={value} onChange={onChange}>
        <option>Select User</option>
        {users.map((user) => (
        <option key={user.id} value={user.id}>
          {user.first_name}
        </option>
        ))}

      </select>
    );
  } else if (label === "Gender") {
    return (
      <select className="form-select h-55" name={name} value={value} onChange={onChange}>
        <option>Select Gender</option>
        <option>Male</option>
        <option>Female</option>
        <option>Other</option>
      </select>
    );
  } else if (label.includes("refusal") || label.includes("relatives or close friends")) {
    return (
      <select className="form-select h-55" name={name} value={value} onChange={onChange}>
        <option value={1}>Yes</option>
        <option value={0}>No</option>
      </select>
    );
    } else if (label === "Program Interested") {
  return (
    <select className="form-select h-55" name={name} value={value} onChange={onChange}>
      <option value="">Select Program</option>
      {categories.map((cat) => (
        <option key={cat.id} value={cat.id}>
          {cat.name}
        </option>
      ))}
    </select>
  );

  } else if (["Marital Status", "Status"].includes(label)) {
    return (
      <select className="form-select h-55" name={name} value={value} onChange={onChange}>
        <option>Select</option>
        <option>Single</option>
        <option>Married</option>
        <option>Divorced</option>
        <option>Widowed</option>
        {label === "Status" && (
          <>
            <option>New</option>
            <option>On Hold</option>
            <option>In Process</option>
            <option>Final Review</option>
            <option>Completed</option>
            <option>Pending Document Request</option>
          </>
        )}
      </select>
    );
  } else if (lower.includes("date")) {
    return <input type="date" className="form-control h-55" name={name} value={value} onChange={onChange} />;
  } else if (lower.includes("email")) {
    return <input type="email" className="form-control h-55" name={name} value={value} onChange={onChange} />;
  } else if (lower.includes("phone")) {
    return <input type="tel" className="form-control h-55" name={name} value={value} onChange={onChange} />;
  } else if (lower.includes("number of applicants")) {
    return (
      <select className="form-select h-55" name={name} value={value} onChange={onChange}>
        <option>Select</option>
        {[...Array(10)].map((_, i) => (
          <option key={i + 1}>{i + 1}</option>
        ))}
      </select>
    );
  } else if (["listening", "reading", "writing", "speaking"].some(v => lower.includes(v))) {
    return <input type="number" className="form-control h-55" name={name} value={value} onChange={onChange} />;
  }

  return <input type="text" className="form-control h-55" name={name} value={value} onChange={onChange} />;
};

// Section Field Definitions
const sectionFields = {
  "Section 1: Personal Details": [
    { label: "Family Name (Surname)", name: "family_name" },
    { label: "Given Name", name: "given_name" },
    { label: "Phone Number", name: "phone_number" },
    { label: "Email ID", name: "email_id" },
    { label: "Date of Birth", name: "date_of_birth" },
    { label: "Gender", name: "gender" },
    { label: "Marital Status", name: "marital_status" },
    { label: "Address (Full)", name: "address" },
    { label: "Number of Applicants (Including You)", name: "number_of_applicants" },
    { label: "Country of Residence", name: "country_of_residence" },
    { label: "Country of Citizenship", name: "country_of_citizenship" },
    { label: "Status", name: "status" },

    
    
  ],
  "Section 2: Family Information": [
    { label: "If Married, Spouse Name", name: "spouse_name" },
    { label: "Spouse Date of Birth", name: "spouse_dob" },
    { label: "Do you have children?", name: "have_children" },
    { label: "(If yes, specify number and ages)", name: "children_details" }
  ],
  "Section 3: Immigration History": [
    { label: "Have you previously applied for a visa to Canada?", name: "applied_canada_visa" },
    { label: "Please provide details of your Canada visa application (if any)", name: "applied_canada_visa_details" },
    { label: "Have you ever received a refusal for a Canadian visa?", name: "refused_canada_visa" },
    { label: "Please provide details of the Canadian visa refusal", name: "refused_canada_visa_details" },
    { label: "Have you ever received a refusal for a U.S. visa?", name: "refused_us_visa" },
    { label: "Please provide details of the U.S. visa refusal", name: "refused_us_visa_details" }
  ],
  "Section 4: Program(s) Interested In": [
    { label: "Program Interested", name: "interested_program" }
  ],
  "Section 5: Educational History": [
    { label: "Date Started", name: "edu_start_date" },
    { label: "Date Ended", name: "edu_end_date" },
    { label: "Degree/Diploma/Certificate", name: "edu_degree" },
    { label: "Field of Study", name: "edu_field" }
  ],
  "Section 6: Employment History": [
    { label: "From Date", name: "emp_start_date" },
    { label: "To Date", name: "emp_end_date" },
    { label: "Designation", name: "designation" },
    { label: "City/Town & Country", name: "emp_location" },
    { label: "Company Name", name: "company_name" }
  ],
  "Section 7: Financial Information": [
    { label: "Net Worth (Bank, Stocks, Real Estate)", name: "net_worth" },
    { label: "Source of Income", name: "income_source" },
    { label: "Property Value", name: "property_value" }
  ],
  "Section 8: Language Test Score": [
    { label: "Listening", name: "listening_score" },
    { label: "Reading", name: "reading_score" },
    { label: "Writing", name: "writing_score" },
    { label: "Speaking", name: "speaking_score" },
    { label: "Test Type", name: "test_type" },
    { label: "Test Date", name: "test_date" }
  ],
  "Section 9: Educational History(if spouse)": [
    { label: "Date Started", name: "spouse_edu_start_date" },
    { label: "Date Ended", name: "spouse_edu_end_date" },
    { label: "Degree/Diploma/Certificate", name: "spouse_edu_degree" },
    { label: "Field of Study", name: "spouse_edu_field" }
  ],
  "Section 10: Employment History(if spouse)": [
    { label: "From Date", name: "spouse_emp_start_date" },
    { label: "To Date", name: "spouse_emp_end_date" },
    { label: "Designation", name: "spouse_designation" },
    { label: "City/Town & Country", name: "spouse_location" },
    { label: "Company Name", name: "spouse_company" }
  ],
  "Section 11: Financial Information(if spouse)": [
    { label: "Net Worth", name: "spouse_net_worth" },
    { label: "Source of Income", name: "spouse_income_source" },
    { label: "Property Value", name: "spouse_property_value" }
  ],
  "Section 12: Language Test Score(if spouse)": [
    { label: "Listening", name: "spouse_listening_score" },
    { label: "Reading", name: "spouse_reading_score" },
    { label: "Writing", name: "spouse_writing_score" },
    { label: "Speaking", name: "spouse_speaking_score" },
    { label: "Test Type", name: "spouse_test_type" },
    { label: "Test Date", name: "spouse_test_date" }
  ],
  "Section 13: Canadian Connections": [
    { label: "Do you have any relatives or close friends in Canada?", name: "have_connections" },
    { label: "Friends (Names & Relationship)", name: "friends_details" },
    { label: "Family (Names & Relationship)", name: "family_details" }
  ],
  ...( [1, 2].includes(currentLoginUser.role_id) && {
    "Section 14: Assign": [
      { label: "Assign To", name: "assign_to" }
    ]
  }),

};

// 🧩 MAIN COMPONENT
const ImmigrationForm = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState([{}]);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [activeSubTab, setActiveSubTab] = useState("Main Page");
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);

  const [doclists, setDoclists] = useState([]);
  const [customDoclists, setCustomDoclists] = useState([]);
  const [customChecklists, setCustomChecklists] = useState([]);


const [costumlists, setCostumlists] = useState({ doc_list: [] });
const [showChecklistForm, setShowChecklistForm] = useState(false);
const [checklistForm, setChecklistForm] = useState([{ title: '', file: null }]);
const token = localStorage.getItem("token");
  const currentTabData = formData[activeTabIndex];
  const categoryId = currentTabData?.interested_program;
  const applicantId = currentTabData?.id; 





 useEffect(() => {
   const loadCategories = async () => {
    try {
      const data = await getCategories(id); 
      setCategories(data || []);
    } catch (err) {
      console.error("Failed to load categories:", err);
    }
  };

   const loadUsers = async () => {
    try {
      const dataUser = await fetchUsers(id); // Assuming this is imported from api
      setUsers(dataUser || []);
    } catch (err) {
      console.error("Failed to load users:", err);
    }
  };
  if (id) {
    const fetchData = async () => {
      try {
        const response = await fetchFileById(id);
        console.log(response.applicant);
         setCostumlists(response.applicant); 
        setFormData(response.applicant); // ✅ Use combined here

      } catch (err) {
        console.error("Failed to fetch immigration data:", err);
      }
    };
    fetchData();
  }
  loadCategories();
    loadUsers();


}, [id]);


useEffect(() => {


  if (categoryId) {
    fetchDocByCategory(categoryId, applicantId)
      .then(setDoclists)
      .catch(console.error);
  }

  fetchDocByCustom(applicantId)
      .then(setCustomDoclists)
      .catch(console.error);
  console.log(setCustomDoclists);
  fetchChecklistByCustom(applicantId)
      .then(setCustomChecklists)
      .catch(console.error);
  
}, [formData[activeTabIndex]?.interested_program, formData[activeTabIndex]?.id]);



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = [...prev];
      updated[activeTabIndex] = { ...updated[activeTabIndex], [name]: value };
      return updated;
    });
  };
const uploadChecklistFile = async (e, checklistId) => {
  const file = e.target.files[0];
  if (!file) return;

  try {
    const updatedDoc = await uploadChecklistFile(file, checklistId);

    // ✅ Update state here
    setDoclists((prev) =>
      prev.map((item) =>
        item.id === checklistId ? { ...item, ...updatedDoc } : item
      )
    );
  } catch (error) {
    console.error("Upload failed:", error);
    alert("Upload failed");
  }
};
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitImmigrationFormAPI(formData);
      alert("Form submitted successfully!");
    } catch (err) {
      console.error("Submission failed", err);
      alert("Failed to submit form");
    }
  };

  const addSubApplicant = () => {
    setFormData([...formData, {}]);
    setActiveTabIndex(formData.length);
    setActiveSubTab("Main Page");
  };

  const removeSubApplicant = (index) => {
    const updated = [...formData];
    updated.splice(index, 1);
    setFormData(updated);
    setActiveTabIndex(0);
  };


  const addChecklistItem = () => {
  setChecklistForm([...checklistForm, { title: '', file: null }]);
};

const removeChecklistItem = (index) => {
  const updated = [...checklistForm];
  updated.splice(index, 1);
  setChecklistForm(updated);
};

const updateChecklistField = (index, field, value) => {
  const updated = [...checklistForm];
  updated[index][field] = value;
  setChecklistForm(updated);
};


 const handleChecklistSubmit = async (e ) => {
  e.preventDefault();
  const formDataFile = new FormData();
  checklistForm.forEach((item, i) => {
    formDataFile.append(`items[${i}][title]`, item.title);
    formDataFile.append(`applicant_id`, formData[activeTabIndex]?.id);

    console.log(formData[activeTabIndex]?.id);
    if (item.file) formDataFile.append(`items[${i}][file]`, item.file);

  });

  try {
    const response = await axios.post('http://localhost:8000/api/checklists/add-multiple', formDataFile, {
      headers: { 'Content-Type': 'multipart/form-data',
         Authorization: `Bearer ${token}`,  
       },
    });

    if (response.status === 200) {
      setChecklistForm([{ title: '', file: null }]);
      setShowChecklistForm(false);
      setCustomDoclists(response.data.updatedChecklists); // assuming updated list returned
    }
  } catch (error) {
    console.log(error);
  //  toast.error("Failed to add checklist items");
  }
};

  const renderSections = () =>
    Object.entries(sectionFields).map(([title, fields], idx) => (
      <Section key={idx} title={title}>
        {fields.map(({ label, name }, i) => (
          <div className="col-lg-6" key={i}>
            <div className="form-group mb-4">
              <label className="text-secondary">{label}</label>
              <InputField
  label={label}
  name={name}
  value={formData[activeTabIndex]?.[name] || ""}
  onChange={handleChange}
  categories={categories}
  users={users}

/>

            </div>
          </div>
        ))}
      </Section>
    ));

  return (
    <div className="container py-4">
      {/* Applicant Tabs */}
      <div className="mb-4 d-flex align-items-center flex-wrap">
        {formData.map((_, index) => (
          <div
            key={index}
            className={`badge me-2 px-3 py-2 mt-3 ${activeTabIndex === index ? "bg-primary text-white" : "bg-light text-dark"}`}
            style={{ borderRadius: "20px", cursor: "pointer" }}
            onClick={() => {
              setActiveTabIndex(index);
              setActiveSubTab("Main Page");
            }}
          >
            {index === 0 ? "Applicant" : `Sub Applicant #${index}`}
            {index !== 0 && (
              <button
                type="button"
                className="btn-close btn-close-white btn-sm ms-2"
                style={{ fontSize: "0.6rem" }}
                onClick={(e) => {
                  e.stopPropagation();
                  removeSubApplicant(index);
                }}
              ></button>
            )}
          </div>
        ))}
        <button className="btn btn-sm btn-outline-primary px-3 mt-3" onClick={addSubApplicant}>
          + Add Sub Applicant
        </button>
      </div>

      {/* Sub Tabs */}
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="card bg-white border-0 rounded-3 mb-4 shadow">
            <div className="card-body p-4">
              <div className="mb-4 d-flex gap-2 justify-content-end">
                {["Main Page", "Upload Document", "Check List"].map((tab) => (
                  <div
                    key={tab}
                    className={`px-3 py-2 rounded-pill ${activeSubTab === tab ? "bg-primary text-white" : "bg-light text-dark"}`}
                    style={{ cursor: "pointer" }}
                    onClick={() => setActiveSubTab(tab)}
                  >
                    {tab}
                  </div>
                ))}
              </div>
{activeSubTab === "Main Page" && (
              <form onSubmit={handleFormSubmit}>
                <div className="row">
                  {activeSubTab === "Main Page" && renderSections()}
                     <input
      type="hidden"
      name="id"
      value={formData.map(app => app?.id).filter(Boolean).join(",")}
    />
 <div className="col-lg-12 mt-3">
        <button type="submit" className="btn btn-primary px-4 py-2">
          Submit All
        </button>
      </div>
    </div>
  </form>
)}
                 
                  {activeSubTab === "Upload Document" && (
 <Section title="Upload Document">
  <button className="btn btn-primary mb-3" onClick={() => setShowChecklistForm(!showChecklistForm)}>
    {showChecklistForm ? "Hide Checklist Form" : "Add Checklist"}
  </button>

  {/* Form to Add Checklist Items */}
  {showChecklistForm && (
    <form onSubmit={handleChecklistSubmit} className="mb-4 p-3 border rounded shadow-sm bg-light">
      {checklistForm.map((item, index) => (
        <div className="row mb-2" key={index}>
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Checklist Title"
              value={item.title}
              onChange={(e) => updateChecklistField(index, 'title', e.target.value)}
              required
            />
          </div>
          <div className="col-md-3">
            <input
              type="file"
              className="form-control"
              onChange={(e) => updateChecklistField(index, 'file', e.target.files[0])}
            />
          </div>
          <div className="col-md-3 d-flex align-items-center">
            {index > 0 && (
              <button
                type="button"
                className="btn btn-danger ms-2"
                onClick={() => removeChecklistItem(index)}
              >
                Remove
              </button>
            )}
          </div>
        </div>
      ))}
      <div className="d-flex gap-2">
        <button type="button" className="btn btn-secondary" onClick={addChecklistItem}>
          Add More
        </button>
        <button type="submit" className="btn btn-success">
          Submit
        </button>
      </div>
    </form>
  )}
 {customDoclists.length > 0 ? (
    <div className="table-responsive">
      <table className="table table-bordered table-striped align-middle">
        <thead className="table-light">
          <tr>
            <th style={{ width: "25%" }}>Title</th>
            <th style={{ width: "20%" }}>Preview</th>
            <th style={{ width: "25%" }}>Download</th>
            <th style={{ width: "30%" }}>Upload New File</th>
            <th style={{ width: "30%" }}>Delete</th>

          </tr>
        </thead>
        <tbody>
          {customDoclists.map((item) => (
            <tr key={item.id}>
              <td><strong>{item.title}</strong></td>
              <td>
                {item.upload_path && /\.(jpeg|jpg|png|gif)$/i.test(item.upload_path) ? (
                  <img
                    src={`${File_BASE}/storage/${item.upload_path}?v=${Date.now()}`} // Force refresh
                    alt="Uploaded Preview"
                    className="img-thumbnail"
                    style={{ maxHeight: "80px", objectFit: "contain" }}
                  />
                ) : (
                  <span className="text-muted">No preview</span>
                )}
              </td>
              <td>
                {item.upload_path ? (
                  <a
                    href={`/api/checklists/download/${item.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm btn-outline-success"
                  >
                    Download
                  </a>
                ) : (
                  <span className="text-muted">Not uploaded</span>
                )}
              </td>
              <td>
                <input
                  type="file"
                  name={`file_${item.id}`}
                  accept="image/*,.pdf,.doc,.docx"
                  onChange={(e) => handleFileCustomChange(e, item.id, setCustomDoclists)}
                  className="form-control"
                />
              </td>
              <td>
                <button
    className="btn btn-sm btn-outline-danger"
    onClick={() => handleDeleteCustomDoc(item.id , setCustomDoclists)}
  >
    Delete
  </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <p>No checklist found for selected program.</p>
  )}
  {/* Uploaded Checklist Table */}
  {doclists.length > 0 ? (
    <div className="table-responsive">
      <table className="table table-bordered table-striped align-middle">
        <thead className="table-light">
          <tr>
            <th style={{ width: "25%" }}>Title</th>
            <th style={{ width: "20%" }}>Preview</th>
            <th style={{ width: "25%" }}>Download</th>
            <th style={{ width: "30%" }}>Upload New File</th>
          </tr>
        </thead>
        <tbody>
          {doclists.map((item) => (
            <tr key={item.id}>
              <td><strong>{item.title}</strong></td>
              <td>
  {item.docs.length > 0 ? (
    item.docs.map((doc, index) => (
      <img
        key={index}
        src={`${File_BASE}/storage/${doc.upload_path}?v=${Date.now()}`}
        alt={`Uploaded ${index + 1}`}
        className="img-thumbnail me-2"
        style={{ maxHeight: "80px", objectFit: "contain" }}
      />
    ))
  ) : (
    <span className="text-muted">No preview</span>
  )}


              </td>
              <td>
                  {item.docs.length > 0 ? (
    item.docs.map((doc, index) => (
                  <a
                    href={`/api/checklists/download/${doc.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm btn-outline-success"
                  >
                    Download
                  </a>
                 ))
  ) : (
                  <span className="text-muted">Not uploaded</span>
                )}
              </td>
              <td>
                <input
                  type="file"
                  name={`file_${item.id}`}
                  accept="image/*,.pdf,.doc,.docx"
                  onChange={(e) => handleFileChange(e, item.id, setDoclists , applicantId)}
                  className="form-control"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <p>No checklist found for selected program.</p>
  )}


  
</Section>

)}

                  {activeSubTab === "Check List" && (
                    <Section title="Check List">
                       <ul className="col-lg-12 ps-4">
      {/* Render dynamic checklist items if available */}
      {customChecklists && customChecklists.length > 0 ? (
        customChecklists.map((item, index) => (
          <li key={index}>{item?.document?.title || "Untitled Document"}</li>
        ))
      ) : (
        <p>No checklist found for selected program.</p>
      )}

    </ul>
                    </Section>
                  )}
                 

              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImmigrationForm;
