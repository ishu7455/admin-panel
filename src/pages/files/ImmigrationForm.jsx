import React, { useState } from "react";

import { submitImmigrationForm as submitImmigrationFormAPI } from "../../api/fileApi"; // ✅ rename import

const handleFormSubmit = async (e, formData) => {
  e.preventDefault();
  try {
    const response = await submitImmigrationFormAPI(formData); // ✅ use renamed import
    alert("Form submitted successfully!");
    console.log("Server Response:", response);
  } catch (error) {
    alert("Something went wrong while submitting the form.");
  }
};

// Toggle section display
const Section = ({ title, children }) => {
  const [open, setOpen] = useState(true);
  return (
    <div className="col-lg-12 mb-3">
      <div className="d-flex justify-content-between align-items-center">
        <h5 className="text-primary mb-3">{title}</h5>
        <button
          type="button"
          className="btn btn-sm btn-outline-secondary"
          onClick={() => setOpen(!open)}
        >
          {open ? "−" : "+"}
        </button>
      </div>
      {open && <div className="row">{children}</div>}
    </div>
  );
};

const defaultApplicant = {
  // Add fields if needed or leave empty
};

// Section Fields
const InputField = ({ label, name, value, onChange }) => {
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
  } else if (label === "Gender") {
    return (
      <select className="form-select h-55" name={name} value={value} onChange={onChange}>
        <option>Select Gender</option>
        <option>Male</option>
        <option>Female</option>
        <option>Other</option>
      </select>
    );
  }  else if (label === "Have you ever received a refusal for a Canadian visa?") {
    return (
      <select className="form-select h-55" name={name} value={value} onChange={onChange}>
        <option value={1}>Yes</option>
        <option value={0}>No</option>
      </select>
    );
  } else if (label === "Have you ever received a refusal for a U.S. visa?") {
    return (
      <select className="form-select h-55" name={name} value={value} onChange={onChange}>
        <option value={1}>Yes</option>
        <option value={0}>No</option>
      </select>
    );
  }else if (label === "Do you have any relatives or close friends in Canada?") {
    return (
      <select className="form-select h-55" name={name} value={value} onChange={onChange}>
        <option value={1}>Yes</option>
        <option value={0}>No</option>
      </select>
    );
  }else if (label === "") {
    return (
      <select className="form-select h-55" name={name} value={value} onChange={onChange}>
        <option value={1}>Yes</option>
        <option value={0}>No</option>
      </select>
    );
  }  else if (["Marital Status", "Status"].includes(label)) {
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

// SECTION FIELDS (ALL SECTIONS)
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
    { label: "Status", name: "status" }
  ],
  "Section 2: Family Information": [
    { label: "If Married, Spouse Name", name: "spouse_name" },
    { label: "Spouse Date of Birth", name: "spouse_dob" },
    { label: "Do you have children?", name: "have_children" },
    { label: "(If yes, specify number and ages)", name: "children_details" }
  ],
  "Section 3: Immigration History": [
     {
    label: "Have you previously applied for a visa to Canada?",
    name: "applied_canada_visa"
  },
  {
    label: "Please provide details of your Canada visa application (if any)",
    name: "applied_canada_visa_details"
  },
  {
    label: "Have you ever received a refusal for a Canadian visa?",
    name: "refused_canada_visa"
  },
  {
    label: "Please provide details of the Canadian visa refusal",
    name: "refused_canada_visa_details"
  },
  {
    label: "Have you ever received a refusal for a U.S. visa?",
    name: "refused_us_visa"
  },
  {
    label: "Please provide details of the U.S. visa refusal",
    name: "refused_us_visa_details"
  }
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
  ]
};


// Main form component
const ImmigrationForm = () => {
  const [formData, setFormData] = useState([{}]); // index 0 = main applicant
  const [activeTabIndex, setActiveTabIndex] = useState(0); // 0 = main, others = sub
  const [activeSubTab, setActiveSubTab] = useState("Main Page");

  const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData((prev) => {
    const updated = [...prev];
    updated[activeTabIndex] = {
      ...updated[activeTabIndex],
      [name]: value
    };
    return updated;
  });
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
    if (activeTabIndex === index) {
      setActiveTabIndex(0);
    } else if (activeTabIndex > index) {
      setActiveTabIndex(activeTabIndex - 1);
    }
  };

  
  const renderSections = () => {
    return Object.entries(sectionFields).map(([title, fields], idx) => (
      <Section key={idx} title={title}>
       {fields.map((field, i) => {
  const label = typeof field === "string" ? field : field.label;
  const name = typeof field === "string"
    ? field.toLowerCase().replace(/\s+/g, "_")
    : field.name;

  return (
    <div className="col-lg-6" key={i}>
      <div className="form-group mb-4">
        <label className="text-secondary">{label}</label>
        <InputField
          label={label}
          name={name}
          value={formData[activeTabIndex]?.[name] || ""}
          onChange={handleChange}
        />
      </div>
    </div>
  );
})}

      </Section>
    ));
  };

  return (
    <div className="container py-4">
      {/* Top Tabs */}
      <div className="mb-4 d-flex align-items-center flex-wrap">
        {[...formData].map((_, index) => (
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
        <button className="btn btn-sm btn-outline-primary px-3 mt-3" onClick={addSubApplicant}>+ Add Sub Applicant</button>
      </div>

      {/* Sub-tabs */}
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

              <form onSubmit={(e) => handleFormSubmit(e, formData)}>
                <div className="row">
                  {activeSubTab === "Main Page" && renderSections()}

                  {activeSubTab === "Upload Document" && (
                    <Section title="Upload Document">
                      <input type="file" className="form-control h-55" />
                    </Section>
                  )}

                  {activeSubTab === "Check List" && (
                    <Section title="Check List">
                      <ul className="col-lg-12 ps-4">
                        <li>Passport Copy</li>
                        <li>Educational Certificates</li>
                        <li>Work Experience</li>
                      </ul>
                    </Section>
                  )}

                  <div className="col-lg-12 mt-3">
                    <button type="submit" className="btn btn-primary px-4 py-2">
                      Submit All
                    </button>
                  </div>
                </div>
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImmigrationForm;
