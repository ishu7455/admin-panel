import React, { useState } from "react";

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

const ImmigrationForm = () => {
  const [subApplicants, setSubApplicants] = useState([]);
  const [activeTabIndex, setActiveTabIndex] = useState(null); // null = main applicant
  const [activeSubTab, setActiveSubTab] = useState("Main Page");

  const addSubApplicant = () => {
    setSubApplicants([...subApplicants, {}]);
    setActiveTabIndex(subApplicants.length);
    setActiveSubTab("Main Page");
  };

  const removeSubApplicant = (index) => {
    const updated = [...subApplicants];
    updated.splice(index, 1);
    setSubApplicants(updated);

    if (activeTabIndex === index) {
      setActiveTabIndex(null);
      setActiveSubTab("Main Page");
    } else if (activeTabIndex > index) {
      setActiveTabIndex(activeTabIndex - 1);
    }
  };

  const InputField = (label) => {
    if (label === "Given Name") {
      return (
        <select className="form-select form-control h-55">
          <option>Select</option>
          <option>Mr</option>
          <option>Mrs</option>
          <option>Miss</option>
        </select>
      );
    } else if (label.includes("Date")) {
      return <input type="date" className="form-control h-55" />;
    } else if (
      label.includes("Gender") ||
      label.includes("Status") ||
      label.includes("Number") ||
      label.includes("Do")
    ) {
      return (
        <select className="form-select form-control h-55">
          <option>Select</option>
          <option>Yes</option>
          <option>No</option>
        </select>
      );
    } else {
      return (
        <input
          type="text"
          className="form-control h-55"
          placeholder={`Enter ${label.toLowerCase()}`}
        />
      );
    }
  };

  const renderSections = (prefix = "") => (
    <>
      <Section title={`${prefix}Section 1: Personal Details`}>
        {[
          "Family Name (Surname)",
          "Given Name",
          "Phone Number",
          "Email ID",
          "Date of Birth",
          "Gender",
          "Marital Status",
          "Address (Full)",
          "Number of Applicants (Including You)",
          "Country of Residence",
          "Country of Citizenship",
        ].map((label, idx) => (
          <div className="col-lg-6" key={idx}>
            <div className="form-group mb-4">
              <label className="text-secondary">{label}</label>
              {InputField(label)}
            </div>
          </div>
        ))}
      </Section>

      <Section title={`${prefix}Section 2: Family Information`}>
        {[
          "If Married, Spouse Name",
          "Spouse Date of Birth",
          "Do you have children?",
          "(If yes, specify number and ages)",
        ].map((label, idx) => (
          <div className="col-lg-6" key={idx}>
            <div className="form-group mb-4">
              <label className="text-secondary">{label}</label>
              {InputField(label)}
            </div>
          </div>
        ))}
      </Section>

      <Section title={`${prefix}Section 3: Immigration History`}>
        {[
          "Have you previously applied for a visa to Canada?",
          "Have you ever received a refusal for a Canadian visa?",
          "Have you ever received a refusal for a U.S. visa?",
        ].map((question, idx) => (
          <React.Fragment key={idx}>
            <div className="col-lg-6">
              <div className="form-group mb-4">
                <label className="text-secondary">{question}</label>
                {InputField("Do")}
              </div>
            </div>
            <div className="col-lg-6">
              <div className="form-group mb-4">
                <label className="text-secondary">If yes, provide details:</label>
                <input type="text" className="form-control h-55" />
              </div>
            </div>
          </React.Fragment>
        ))}
      </Section>

      <Section title={`${prefix}Section 4: Program(s) Interested In`}>
        <div className="col-lg-6">
          <select className="form-select form-control h-55 mb-4">
            <option>Select Program</option>
            <option>Express Entry</option>
            <option>Study Permit</option>
            <option>Work Permit</option>
            <option>Family Sponsorship</option>
          </select>
        </div>
      </Section>
    </>
  );

  const renderSubTabContent = () => {
    if (activeSubTab === "Main Page") {
      const prefix =
        activeTabIndex === null ? "Applicant - " : `Sub Applicant ${activeTabIndex + 1} - `;
      return renderSections(prefix);
    } else if (activeSubTab === "Upload Document") {
      return (
        <Section title="Upload Document">
          <div className="d-flex justify-content-between align-items-center">
            <input type="file" className="form-control h-55" />
          </div>
        </Section>
      );
    } else if (activeSubTab === "Check List") {
      return (
        <Section title="Check List">
          <ul className="col-lg-12 ps-4">
            <li>Passport Copy</li>
            <li>Educational Certificates</li>
            <li>Work Experience</li>
          </ul>
        </Section>
      );
    }
  };

  return (
    <div className="container py-4">
      {/* Main/Sub Applicant Tabs */}
      <div className="mb-4 d-flex align-items-center flex-wrap">
        <div
          className={`badge me-2 px-3 py-2 mt-3 ${
            activeTabIndex === null ? "bg-primary text-white" : "bg-light text-dark"
          }`}
          style={{ borderRadius: "20px", cursor: "pointer" }}
          onClick={() => {
            setActiveTabIndex(null);
            setActiveSubTab("Main Page");
          }}
        >
          Applicant
        </div>

        {subApplicants.map((_, index) => (
          <div
            key={index}
            className={`badge me-2 px-3 py-2 mt-3 ${
              activeTabIndex === index ? "bg-primary text-white" : "bg-light text-dark"
            }`}
            style={{ borderRadius: "20px", cursor: "pointer" }}
            onClick={() => {
              setActiveTabIndex(index);
              setActiveSubTab("Main Page");
            }}
          >
            Sub Applicant #{index + 1}
            <button
              type="button"
              className="btn-close btn-close-white btn-sm ms-2"
              style={{ fontSize: "0.6rem" }}
              onClick={(e) => {
                e.stopPropagation();
                removeSubApplicant(index);
              }}
            ></button>
          </div>
        ))}

        <button
          type="button"
          className="btn btn-sm btn-outline-primary px-3 mt-3"
          onClick={addSubApplicant}
        >
          + Add Sub Applicant
        </button>
      </div>

      {/* Sub-tabs */}
      <div className="mb-4 d-flex gap-2">
        {["Main Page", "Upload Document", "Check List"].map((tab) => (
          <div
            key={tab}
            className={`px-3 py-2 rounded-pill ${
              activeSubTab === tab ? "bg-primary text-white" : "bg-light text-dark"
            }`}
            style={{ cursor: "pointer" }}
            onClick={() => setActiveSubTab(tab)}
          >
            {tab}
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="card bg-white border-0 rounded-3 mb-4 shadow">
            <div className="card-body p-4">
              <form>
                <div className="row">
                  {renderSubTabContent()}
                  <div className="col-lg-12 mt-3">
                    <button type="submit" className="btn btn-primary px-4 py-2">
                      Submit
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
