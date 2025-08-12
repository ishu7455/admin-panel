import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { submitImmigrationForm as submitImmigrationFormAPI, fetchFileById , getCategories, fetchUsers, fetchDocByCategory , fetchDocByCustom, handleFileChange , handleFileCustomChange , handleDeleteCustomDoc , fetchChecklistByCustom , handleToggleStatus , handleDeleteCustomCheckList , fetchCheckByCategory , handleChecklistStatus} from "../../api/fileApi";
import {File_BASE} from "../../api/adminApi";
import axios from "axios";

const currentLoginUser = JSON.parse(localStorage.getItem("user"));



// Accordion Section UI
const Section = ({ title, children }) => {
  const [open, setOpen] = useState(true);
  const showToggle = !["Check List", "Upload Document","Notes","History"].includes(title);

  return (
    <div className="col-lg-12 mb-3">
      <div className="d-flex justify-content-between align-items-center">
        {showToggle && (
           <>
        <h5 className="text-primary mb-3">{title}</h5>
          <button
            type="button"
            className="btn btn-sm btn-outline-secondary"
            onClick={() => setOpen(!open)}
          >
            {open ? "−" : "+"}
          </button>
           </>
        )}
      </div>
      {open && <div className="row">{children}</div>}
    </div>
  );
};


// Input handler
const InputField = ({ label, name, value, onChange , categories = [] , users = [] ,  interestedProgram,
  setInterestedProgram , handleChange }) => {
  const lower = label.toLowerCase();

  if (label === "Given Name") {
    return (
      <select className="form-select h-55" name={name} value={value} onChange={onChange}>
        <option value="">Select Title</option>
        <option value="Mr">Mr</option>
        <option value="Mrs">Mrs</option>
        <option value="Miss">Miss</option>
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
        <option value="">Select Gender</option>
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
    <>
      <select
  className="form-select h-55"
  name={name}
  value={interestedProgram || value}
  onChange={(e) => {
    setInterestedProgram(e.target.value);
    onChange(e);                              
  }}
>

        <option value="">Select Program</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>

      {/* Conditional Fields Directly Below */}
      {(interestedProgram === "2" || value === "2") && (
  <div className="row mt-3">
    <div className="col-lg-6 mb-3">
      <label className="form-label">Program Subtype</label>
      <input
        type="text"
        name="program_subtype"
        className="form-control h-55"
        onChange={onChange}
        value={value}
      />
    </div>
    <div className="col-lg-6 mb-3">
      <label className="form-label">Location Preference</label>
      <input
        type="text"
        name="location_preference"
        className="form-control h-55"
        onChange={onChange}
      />
    </div>
  </div>
)}

    </>
  );
}

   else if (["Marital Status", "Status"].includes(label)) {
    return (
      <select className="form-select h-55" name={name} value={value} onChange={onChange}>
        <option value="">Select</option>
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
    { label: "Family Name (Surname)", name: "family_name" , required: true  },
    { label: "Given Name", name: "given_name" , required: true  },
    { label: "Phone Number", name: "phone_number", required: true },
    { label: "Email ID", name: "email_id" ,required: true  },
    { label: "Date of Birth", name: "date_of_birth",required: true   },
    { label: "Gender", name: "gender" ,required: true  },
    { label: "Marital Status", name: "marital_status",required: true   },
    { label: "Address (Full)", name: "address",required: true   },
    { label: "Number of Applicants (Including You)", name: "number_of_applicants",required: true   },
    { label: "Country of Residence", name: "country_of_residence",required: true   },
    { label: "Country of Citizenship", name: "country_of_citizenship",required: true   },
    { label: "Status", name: "status" ,required: true  },

    
    
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
 ...( [1, 2].includes(currentLoginUser?.role_id) && {
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
  const [Checklists, setChecklists] = useState([]);
  const [checklistPercentage, setChecklistPercentage] = useState(0);
  const [customChecklistProgress, setCustomChecklistProgress] = useState(0);


  const [catName, setCategoryName] = useState([]);




const [costumlists, setCostumlists] = useState({ doc_list: [] });
const [showChecklistForm, setShowChecklistForm] = useState(false);
const [showlistForm, setShowlistForm] = useState(false);

const [checklistForm, setChecklistForm] = useState([{ title: '', file: null }]);
const [listForm, setlistForm] = useState([{ title: '', file: null }]);
const [previewDocs, setPreviewDocs] = useState([]);
const [showPreviewModal, setShowPreviewModal] = useState(false);


const token = localStorage.getItem("token");
  const currentTabData = formData[activeTabIndex];
  const categoryId = currentTabData?.interested_program;
  const applicantId = currentTabData?.id; 
const [notes, setNotes] = useState([""]);
const [savedNotes, setSavedNotes] = useState([]); 
const [editSavedNoteId, setEditSavedNoteId] = useState(null);
const [editNoteValue, setEditNoteValue] = useState("");
const [history, setHistory] = useState([]); 
const [interestedProgram, setInterestedProgram] = useState('');





    
   const handleNoteChange = (index, value) => {
    const updatedNotes = [...notes];
    updatedNotes[index] = value;
    setNotes(updatedNotes);
  };

  const addNote = () => {
    setNotes([...notes, ""]);
  };

  const removeNote = (index) => {
    const updatedNotes = [...notes];
    updatedNotes.splice(index, 1);
    setNotes(updatedNotes.length > 0 ? updatedNotes : [""]);
  };

 useEffect(() => {
  if (activeSubTab === "Notes") {
    fetchSavedNotes();
  }
}, [activeSubTab]);

useEffect(() => {
  if (activeSubTab === "History") {
    fetchHistory();
  }
}, [activeSubTab]);

const fetchSavedNotes = async () => {
  try {
    const response = await axios.get(`http://localhost:8000/api/notes?applicant_id=${applicantId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setSavedNotes(response.data.notes || []);
  } catch (error) {
    console.error("Error fetching notes:", error);
  }
};

const fetchHistory = async () => {
  try {
    const response = await axios.get(`http://localhost:8000/api/history?applicant_id=${applicantId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setHistory(response.data.history || []);
  } catch (error) {
    console.error("Error fetching notes:", error);
  }
};

const handleEditClick = (note) => {
  setEditSavedNoteId(note.id);
  setEditNoteValue(note.text); // or whatever field holds the text
};

const handleEditSave = async () => {
  try {
    await axios.put(
      `http://localhost:8000/api/notes/${editSavedNoteId}`,
      { note: editNoteValue },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setEditSavedNoteId(null);
    setEditNoteValue("");
    await fetchSavedNotes();
  } catch (error) {
    console.error("Error updating note:", error);
  }
};

const deleteNote = async (id) => {
  if (!window.confirm("Are you sure you want to delete this note?")) return;

  try {
    await axios.delete(`http://localhost:8000/api/notes/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    await fetchSavedNotes();
  } catch (error) {
    console.error("Error deleting note:", error);
  }
};



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
  
  fetchCheckByCategory(categoryId, applicantId)
  .then(({ doclists, cat }) => {
    setChecklists(doclists);
    setCategoryName(cat); // optional
  })
  .catch(console.error);


  fetchDocByCustom(applicantId)
      .then(setCustomDoclists)
      .catch(console.error);
  console.log(setCustomDoclists);
  fetchChecklistByCustom(applicantId)
      .then(setCustomChecklists)
      .catch(console.error);
       console.log(customChecklists);

       
  
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
      const currentFormData = formData[activeTabIndex];
  let hasError = false;

  Object.entries(sectionFields).forEach(([_, fields]) => {
  fields.forEach(({ name, required }) => {
    const value = currentFormData?.[name];
    
    if (required) {
      // If it's a string, check trimmed; otherwise, check if it's nullish or empty
      const isEmpty = typeof value === 'string' ? value.trim() === '' : value == null || value === '';

      if (isEmpty) {
        hasError = true;
      }
    }
  });
});



  if (hasError) {
    alert("Please fill all required fields.");
    return;
  }
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
 const addlistItem = () => {
  setlistForm([...listForm, { title: '', file: null }]);
};

const removeChecklistItem = (index) => {
  const updated = [...checklistForm];
  updated.splice(index, 1);
  setChecklistForm(updated);
};

const removelistItem = (index) => {
  const updated = [...listForm];
  updated.splice(index, 1);
  setlistForm(updated);
};

const updateChecklistField = (index, field, value) => {
  const updated = [...checklistForm];
  updated[index][field] = value;
  setlistForm(updated);
};

const updatelistField = (index, field, value) => {
  const updated = [...listForm];
  updated[index][field] = value;
  setlistForm(updated);
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
      setCustomDoclists(prev => [
    ...response.data.updatedChecklists,
    ...prev,
  ]); // assuming updated list returned
    }
  } catch (error) {
    console.log(error);
  //  toast.error("Failed to add checklist items");
  }
};

const handlelistSubmit = async (e ) => {
  e.preventDefault();
  const formDataFile = new FormData();
  listForm.forEach((item, i) => {
    formDataFile.append(`items[${i}][title]`, item.title);
    formDataFile.append(`applicant_id`, formData[activeTabIndex]?.id);

    console.log(formData[activeTabIndex]?.id);
   
  });

  try {
    const response = await axios.post('http://localhost:8000/api/checklists/add-multiple-checklist', formDataFile, {
      headers: { 'Content-Type': 'multipart/form-data',
         Authorization: `Bearer ${token}`,  
       },
    });

    if (response.status === 200) {
      setChecklistForm([{ title: '', file: null }]);
      setShowlistForm(false);
      setCustomChecklists(prev => [
    ...response.data.updatedChecklists,
    ...prev,
  ]);
    }
  } catch (error) {
    console.log(error);
  //  toast.error("Failed to add checklist items");
  }
};

const SubmitNotes = async (e) => {
  e.preventDefault();

  const filteredNotes = notes.filter((note) => note.trim() !== "");
  if (filteredNotes.length === 0) return;

  const formData = new FormData();
  filteredNotes.forEach((note, index) => {
    formData.append(`notes[${index}]`, note);
  });

  formData.append("applicant_id", applicantId);

  try {
    const response = await axios.post(
      "http://localhost:8000/api/notes/add-multiple-notes",
      formData,
      {
        headers: {
          // "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      console.log("Notes submitted successfully!");
      const newSavedNotes = response.data.updatedChecklists || filteredNotes.map((text, i) => ({
        id: `temp-${Date.now()}-${i}`,
        text,
      }));

      setSavedNotes(prev => [...newSavedNotes, ...prev]);

      setNotes([""]); // Reset form

    }
  } catch (error) {
    console.error("Error submitting notes:", error);
  }
};
const calculatePercentage = (items) => {
  const total = items.length;
  const completed = items.filter(item => {
    // If the checklist has docs, check if any doc is active
    if (item.docs && item.docs.length > 0) {
      return item.docs.some(doc => doc.status === 'active');
    }
    // Else check the item status
    return item.status === 'active';
  }).length;

  const percent = total ? Math.round((completed / total) * 100) : 0;
  setChecklistPercentage(percent);
};

const calculateCustomProgress = (list) => {
  const total = list.length;
  const completed = list.filter(item => item.status === 'active').length;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  setCustomChecklistProgress(percentage);
};

useEffect(() => {
  calculateCustomProgress(customChecklists);
}, [customChecklists]);


useEffect(() => {
  calculatePercentage(Checklists);
}, [Checklists]);

const groupedByHeading = {};

doclists.forEach(item => {
  // If item has no headings
  if (!item.headings || item.headings.length === 0) {
    if (!groupedByHeading[""]) {
      groupedByHeading[""] = [];
    }
    groupedByHeading[""].push(item);
  } else {
    // For each heading in item
    item.headings.forEach(heading => {
      if (!groupedByHeading[heading.title]) {
        groupedByHeading[heading.title] = [];
      }
      groupedByHeading[heading.title].push(item);
    });
  }
});


const groupedByHeadingForCheckList = {};

Checklists.forEach(item => {
  if (!item.headings || item.headings.length === 0) {
    if (!groupedByHeadingForCheckList[""]) {
      groupedByHeadingForCheckList[""] = [];
    }
    groupedByHeadingForCheckList[""].push(item);
  } else {
    // For each heading in item
    item.headings.forEach(heading => {
      if (!groupedByHeadingForCheckList[heading.title]) {
        groupedByHeadingForCheckList[heading.title] = [];
      }
      groupedByHeadingForCheckList[heading.title].push(item);
    });
  }
});


    const renderSections = () =>
    Object.entries(sectionFields).map(([title, fields], idx) => (
      <Section key={idx} title={title}>
        {fields.map(({ label, name, required }, i) => (
          <div className="col-lg-6" key={i}>
            <div className="form-group mb-4">
              <label className="text-secondary">
                {label}
                {required && <span className="text-danger ms-1">*</span>}
              </label>
              <InputField
                label={label}
                name={name}
                value={formData[activeTabIndex]?.[name] || ""}
                required={required ?? false}
                onChange={handleChange}
                 interestedProgram={interestedProgram} // <-- add this
  setInterestedProgram={setInterestedProgram} // <-- and this
                categories={categories}
                users={users}
                  // for nested fields
              />
            </div>
          </div>
        ))}
      </Section>
    ));

  return (
    <div className="container py-4">
      {/* Applicant Tabs */}
      <div className="mb-4 d-flex align-items-center flex-wrap" style={{minWidth:"1120px"}}>
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
              <div className="mb-4 d-flex gap-2 justify-content-end pb-4">
                {["Main Page", "Upload Document", "Check List", "Notes" , "History"].map((tab) => (
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
                 
                  {activeSubTab === "Upload Document" &&  catName && (
 <Section title="Upload Document">
   <>
  <h3 className="text-primary m-0">Documents For {catName}</h3>

  {Object.entries(groupedByHeading).map(([heading, items]) => (
    <div className="card-body p-4" key={heading}>
      {heading && <h5 className="text-secondary mb-3">{heading}</h5>}

      <div className="card-body p-4">
        <div className="default-table-area all-products" style={{ width: "100%" }}>
          <div className="table-responsive">
            <table className="table table-bordered table-striped align-middle">
              <thead className="table align-middle">
                <tr>
                  <th>Title</th>
                  <th>Preview</th>
                  <th>Download</th>
                  <th>Upload New File</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id}>
                    <td><strong>{item.title}</strong></td>

                    <td>
                      {item.docs.length > 0 ? (
                        <button
                          className="btn btn-sm btn-primary"
                          onClick={() => {
                            setPreviewDocs(item.docs);
                            setShowPreviewModal(true);
                          }}
                        >
                          Preview
                        </button>
                      ) : (
                        <span className="text-muted">No preview</span>
                      )}
                    </td>

                    <td>
                      {item.docs.length > 0 ? (
                        item.docs.map((doc, index) => (
                          <a
                            key={doc.id || index}
                            href={`http://127.0.0.1:8000/api/doc-by-cat/download/${doc.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ps-0 border-0 bg-transparent lh-1"
                          >
                            <i className="material-symbols-outlined fs-16 text-danger">download</i>
                          </a>
                        ))
                      ) : (
                        <span>No documents available</span>
                      )}
                    </td>

                    <td>
                      <input
                        type="file"
                        name={`file_${item.id}`}
                        accept="image/*,.pdf,.doc,.docx"
                        onChange={(e) => handleFileChange(e, item.id, setDoclists, applicantId)}
                        className="form-control"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  ))}
</>


 

  {showPreviewModal && (
  <>
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      role="dialog"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Document Preview</h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => setShowPreviewModal(false)}
            />
          </div>
          <div className="modal-body d-flex flex-wrap gap-2">
            {previewDocs.map((doc, index) => (
              <img
                key={index}
                src={`${File_BASE}/storage/${doc.upload_path}?v=${Date.now()}`}
                alt={`Uploaded ${index + 1}`}
                className="img-thumbnail"
                style={{ Height: "150px", width:"150", objectFit: "contain" }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  </>
)}


 <div className="d-flex justify-content-between align-items-center mb-3">
  <h3 className="text-primary m-0">Custom Document CheckList</h3>
  <button className="btn btn-primary" onClick={() => setShowChecklistForm(!showChecklistForm)}>
    {showChecklistForm ? "Hide Checklist Form" : "Add Checklist"}
  </button> 
</div>


  {/* Form to Add Checklist Items */}
  {showChecklistForm && (
    
    <div className="card-body p-4">
    <form onSubmit={handleChecklistSubmit} className="mb-4 p-3 border rounded shadow-sm">
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
                className="ps-0 border-0 bg-transparent lh-1 position-relative top-2"
                onClick={() => removeChecklistItem(index)}
              >
                <i className="material-symbols-outlined">close</i>
              </button>
            )}
          </div>
        </div>
      ))}
      <div className="d-flex gap-2">
        <button type="button" className="btn btn-secondary fw-medium text-white py-2 px-4" onClick={addChecklistItem}>
          Add More
        </button>
        <button type="submit" className="btn btn-success fw-medium text-white py-2 px-4">
          Submit
        </button>
      </div>
    </form>
    </div>
  )}
 {customDoclists.length > 0 ? (
  <div className="card-body p-4">
  <div className="default-table-area all-products" style={{width:"100%"}}>
    <div className="table-responsive">
      <table className="table table-bordered table-striped align-middle">
        <thead className="table align-middle">
          <tr>
            <th className="text-body">Title</th>
            <th className="text-body">Preview</th>
            <th className="text-body">Upload New File</th>
            <th className="text-body">Action</th>

          </tr>
        </thead>
        <tbody>
          {customDoclists.map((item) => (
            <tr key={item.id}>
              <td><strong>{item.title}</strong></td>
            <td>
  {item.upload_path && /\.(jpeg|jpg|png|gif)$/i.test(item.upload_path) ? (
    <button
      className="btn btn-sm btn-primary"
      onClick={() => {
        setPreviewDocs([
          {
            upload_path: item.upload_path
          }
        ]);
        setShowPreviewModal(true);
      }}
    >
      Preview
    </button>
  ) : (
    <span className="text-muted">No preview</span>
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
                 {item.upload_path ? (
                  <a
                    href={`http://127.0.0.1:8000/api/doc/download/${item.id}`}
                    rel="noopener noreferrer"
                    className="ps-0 border-0 bg-transparent lh-1"
                  >
                    <i className="material-symbols-outlined fs-16 text-danger">download</i>
                  </a>
                ) : (
                  ''
                )}
                <button
                className="ps-0 border-0 bg-transparent lh-1"
    onClick={() => handleDeleteCustomDoc(item.id , setCustomDoclists)}
  >
                               <i className="material-symbols-outlined fs-16 text-danger">delete</i>

  </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
        </div>
</div>
  ) : (
    <p>No checklist found for selected program.</p>
  )}
 
  
</Section>

)}

                  {activeSubTab === "Check List" &&  catName && (
                    <Section title="Check List">
                      
                    

                       {Checklists && Checklists.length > 0 ? (<>
                       <h3 className="text-primary mb-2">CheckList For {catName}</h3>

                         <div className="mb-3">
  <div className="d-flex justify-content-between">
    <span className="fw-bold">Progress</span>
    <span className="text-muted">{checklistPercentage}% Complete</span>
  </div>
  <div className="progress" style={{ height: '20px' }}>
    <div
      className="progress-bar bg-success"
      role="progressbar"
      style={{ width: `${checklistPercentage}%` }}
      aria-valuenow={checklistPercentage}
      aria-valuemin="0"
      aria-valuemax="100"
    >
      {checklistPercentage}%
    </div>
  </div>
</div>
 {Object.entries(groupedByHeadingForCheckList).map(([heading, items]) => (
    <div className="card-body p-4" key={heading}>
      {heading && <h5 className="text-secondary mb-3">{heading}</h5>}

  <div className="default-table-area all-products" style={{width:"100%"}}>
    <div className="table-responsive">
      <table className="table table-bordered table-striped align-middle">
        <thead className="table align-middle">
          <tr>
            <th>#</th>
            <th>Title</th>
            {/* <th>Status</th> */}
            <th>Toggle</th>
          </tr>
        </thead>
        <tbody>
         {items.map((item, index) => {
  const isStrictActive = item.docs.length > 0
    ? item.docs.some((doc) => doc.status === 'active')
    : item.status === 'active';

  return (
    <tr
      key={item.id}
      style={{
        textDecoration: isStrictActive ? 'line-through' : 'none',
        opacity: isStrictActive ? 0.6 : 1,
        pointerEvents: isStrictActive ? 'none' : 'auto',
      }}
    >
      <td>{index + 1}</td>
      <td>{item.title || 'Untitled Document'}</td>
      {/* <td>
        {item.docs.length > 0 ? (
          item.docs.map((doc, index) => (
            <span
              key={index}
              className={`badge ${
                doc.status === 'active' ? 'bg-success' : 'bg-secondary'
              }`}
            >
              {doc.status === 'active' ? 'Active' : 'Inactive'}
            </span>
          ))
        ) : (
          <span
            className={`badge ${
              item.status === 'active' ? 'bg-success' : 'bg-secondary'
            }`}
          >
            {item.status === 'active' ? 'Active' : 'Inactive'}
          </span>
        )}
      </td> */}

      <td>
        {item.docs.length > 0 ? (
          item.docs.map((doc, index) => (
            <input
              key={index}
              type="checkbox"
              checked={doc.status === 'active'}
              disabled={doc.status === 'active'}
              onChange={() =>
                handleChecklistStatus(doc.id, doc.status, setChecklists, applicantId)
              }
            />
          ))
        ) : (
          <input
            type="checkbox"
            checked={item.status === 'active'}
            disabled={item.status === 'active'}
            onChange={() =>
              handleChecklistStatus(item.id, item.status, setChecklists, applicantId)
            }
          />
        )}
      </td>
    </tr>
  );
})}

        </tbody>
      </table>
    </div>
    </div>
    </div>
    ))}

</>

  ) : ( 
    ''
  )}
  
   <div className="d-flex justify-content-between align-items-center mb-3">
    
  <h3 className="text-primary m-0">Custom CheckList</h3>
                       <button className="btn btn-primary mb-3" onClick={() => setShowlistForm(!showlistForm)}>
    {showlistForm ? "Hide Checklist Form" : "Add Checklist"}
  </button>
  </div>

  {/* Form to Add Checklist Items */}
  {showlistForm && (
    
    <div className="card-body p-4">
    <form onSubmit={handlelistSubmit} className="mb-4 p-3 border rounded shadow-sm">
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
          
          <div className="col-md-3 d-flex align-items-center">
            {index > 0 && (
              <button
                type="button"
                className="ps-0 border-0 bg-transparent lh-1 position-relative top-2"
                onClick={() => removeChecklistItem(index)}
              >
                <i className="material-symbols-outlined">close</i>
              </button>
            )}
          </div>
        </div>
      ))}
      <div className="d-flex gap-2">
        <button type="button" className="btn btn-secondary fw-medium text-white py-2 px-4" onClick={addChecklistItem}>
          Add More
        </button>
        <button type="submit" className="btn btn-success fw-medium text-white py-2 px-4">
          Submit
        </button>
      </div>
    </form>
    </div>
  )}
  {customChecklists && customChecklists.length > 0 ? (
    
     <div className="card-body p-4">
  <div className="mb-3">
    <div className="d-flex justify-content-between">
      <span className="fw-bold">Progress</span>
      <span className="text-muted">{customChecklistProgress}% Complete</span>
    </div>
    <div className="progress" style={{ height: '20px' }}>
      <div
        className="progress-bar bg-success"
        role="progressbar"
        style={{ width: `${customChecklistProgress}%` }}
        aria-valuenow={customChecklistProgress}
        aria-valuemin="0"
        aria-valuemax="100"
      >
        {customChecklistProgress}%
      </div>
    </div>
  </div>

  <div className="default-table-area all-products" style={{width:"100%"}}>
    <div className="table-responsive">
      <table className="table table-bordered table-striped align-middle">
        <thead className="table align-middle">
          <tr>
            <th>#</th>
            <th>Title</th>
            {/* <th>Status</th> */}
            <th>Toggle</th>
            <th>Action</th>
          </tr>
        </thead>
       <tbody>
  {customChecklists.map((item, index) => (
    <tr
      key={item.id}
      style={{
        textDecoration: item.status === 'active' ? 'line-through' : 'none',
        opacity: item.status === 'active' ? 0.6 : 1,
        pointerEvents: item.status === 'active' ? 'none' : 'auto'
      }}
    >
      <td>{index + 1}</td>

      <td>{item.title || 'Untitled Document'}</td>

      {/* <td>
        <span className={`badge ${item.status === 'active' ? 'bg-success' : 'bg-secondary'}`}>
          {item.status === 'active' ? 'Active' : 'Inactive'}
        </span>
      </td> */}

      <td>
        <input
          type="checkbox"
          checked={item.status === 'active'}
          disabled={item.status === 'active'} // lock after activation
          onChange={() =>
            handleToggleStatus(item.id, item.status, setCustomChecklists)
          }
        />
      </td>

      <td>
        <button
          className="ps-0 border-0 bg-transparent lh-1"
          onClick={() => handleDeleteCustomCheckList(item.id, setCustomChecklists)}
          disabled={item.status === 'active'} // disable delete
        >
          <i className="material-symbols-outlined fs-16 text-danger">delete</i>
        </button>
      </td>
    </tr>
  ))}
</tbody>

      </table>
    </div>
    </div>
        </div>

  ) : (
    <p>No checklist found for selected program.</p>
  )}


</Section>


                  )}
  
{activeSubTab === "Notes" && (
  <Section title="Notes">
    <h3 className="text-primary m-0" >Notes</h3>
    <form onSubmit={SubmitNotes}>
      <div className="p-3">
        <label className="form-label fw-bold">Add Notes</label>
        {notes.map((note, index) => (
          <div key={index} className="mb-2 d-flex align-items-start gap-2">
            <textarea
              className="form-control"
              rows={2}
              value={note}
              onChange={(e) => handleNoteChange(index, e.target.value)}
              placeholder={`Note ${index + 1}`}
            />
            <div className="d-flex flex-column">
              {index === notes.length - 1 && (
                <button
                  type="button"
                  onClick={addNote}
                  className="ps-0 border-0 bg-transparent lh-1"
                  title="Add Note"
                >
                 <i className="material-symbols-outlined  text-success">add_circle</i>
                </button>
              )}
              {notes.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeNote(index)}
                  className="ps-0 border-0 bg-transparent lh-1"
                  title="Remove Note"
                >
                <i className="material-symbols-outlined  text-danger">cancel</i>
                </button>
              )}
            </div>
          </div>
        ))}

        <button type="submit" className="btn btn-primary mt-2">
          Submit Notes
        </button>
      </div>
    </form>

    {/* Saved Notes List */}
    <div className="p-3 border-top mt-3">
      <h6 className="fw-bold">Saved Notes</h6>
      {savedNotes.length === 0 ? (
        <p className="text-muted">No notes available.</p>
      ) : (
        savedNotes.map((note) => (
          <div key={note.id} className="d-flex align-items-start mb-2 gap-2">
            {editSavedNoteId === note.id ? (
              <textarea
                className="form-control"
                value={editNoteValue}
                onChange={(e) => setEditNoteValue(e.target.value)}
              />
            ) : (
              <>
             <div className="border p-2 rounded flex-grow-1 bg-light">
  <div className="card-body">
    <p className="card-text mb-2 note-preview">
      {note.text}
    </p>
    <div className="text-muted small text-end">
      {new Date(note.created_at).toLocaleString()}
    </div>
    <div className="text-muted small text-end">
      {note.users?.first_name}
    </div>
  </div>
</div>



              </>
            )}

            <div className="d-flex flex-column">
              {editSavedNoteId === note.id ? (
                <>
                  <button
                    className="btn btn-sm btn-success mb-1"
                    onClick={handleEditSave}
                  >
                    Save
                  </button>
                  <button
                    className="btn btn-sm btn-secondary"
                    onClick={() => setEditSavedNoteId(null)}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="ps-0 border-0 bg-transparent lh-1 position-relative top-2"
                    onClick={() => handleEditClick(note)}
                  >
                    <i className="material-symbols-outlined fs-16 text-success">edit</i>
                  </button>
                  <button
                    className="ps-0 border-0 bg-transparent lh-1 position-relative top-2"
                    onClick={() => deleteNote(note.id)}
                  >
                    <i className="material-symbols-outlined fs-16 text-danger">delete</i>
                  </button>
                </>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  </Section>
)}
 {activeSubTab === "History" && (
 <Section title="History">
 <div className="card bg-white border-0 rounded-3 mb-4" style={{width:"90%"}}>
                        <div className="card-body p-4">
                            <div className="mb-4">
                                <h3 className="text-primary m-0">Basic Timeline</h3>
                            </div>
                    {history.map((his, index) => (
  <div key={index} className="position-relative timeline-item">
    <span className="time-line-date">{his.in_days}</span>

    <div className="border-style-for-timeline dot-2 ms-5">
      {his.old && his.new ? (
        <>
         {his.message} {Object.entries(JSON.parse(his.old)).map(([key, oldValue]) => {
            const newValue = JSON.parse(his.new)[key];
            if (oldValue !== newValue) {
              return (
                <p key={key} className="fs-13">
                  <strong>{key.replaceAll('_', ' ')}</strong> changed from{" "}
                  <strong>{oldValue}</strong> to{" "}
                  <strong>{newValue}</strong> at {his.time}
                </p>
              );
            }
            return null;
          })}
        </>
      ) : (
        <p className="fs-13">
         <div
  dangerouslySetInnerHTML={{ __html: his.message ?? 'No Description' }}
/>
<span>
  on {his.created_at ?? 'N/A'} at {his.time}
</span>

          {/* {his.new1 && (
            <>
              <br />
              Name Of The Checklist Is <strong>{his.new1}</strong>
            </>
          )} */}
        </p>
      )}

      <p className="fs-13">
        By: <span className="text-primary">{his.changed_by}</span>
      </p>
    </div>
  </div>
))}

 

                        </div>
                    </div>

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
