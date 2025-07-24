import React, { useEffect, useState } from "react";
import { fetchApplicants } from "../api/fileApi";
import { Link } from "react-router-dom";


const Dashboard = () => {
  const [applicants, setApplicants] = useState([]);
  const [expandedIds, setExpandedIds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadApplicants = async () => {
      try {
        const data = await fetchApplicants();
        setApplicants(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching applicants", error);
      } finally {
        setLoading(false);
      }
    };

    loadApplicants();
  }, []);

  const toggleExpand = (id) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

 
  return (
    <>
      <div className="main-content-container overflow-hidden">
        <div className="row justify-content-center">
          <div className="col-xl-12">
            <div className="card bg-white border-0 rounded-3 mb-4">
              <div className="card-body p-4" style={{ paddingBottom: "0" }}>
                <div className="mb-3 mb-lg-4">
                  <h3 className="mb-0">Projects Overview</h3>
                </div>
                <div className="row">
                  {/* Project Cards */}
                  {[
                    {
                      icon: "folder_open",
                      color: "primary",
                      value: "1235",
                      label: "Projects this month",
                      change: "+10%",
                    },
                    {
                      icon: "stacks",
                      color: "danger",
                      value: "425",
                      label: "Projects this month",
                      change: "+5.75%",
                      title: "Active Projects",
                    },
                    {
                      icon: "assignment_turned_in",
                      color: "success",
                      value: "135",
                      label: "Projects this month",
                      change: "-15%",
                      title: "Finished Projects",
                      isDown: true,
                    },
                    {
                      icon: "group",
                      color: "primary-div",
                      value: "65+",
                      label: "Hard Worker",
                      title: "Team Members",
                      isTeam: true,
                    },
                  ].map((item, index) => (
                    <div key={index} className="col-xxl-6 col-xl-6 col-sm-6">
                      <div
                        className={`card bg-${item.color} bg-opacity-10 border-${item.color} border-opacity-10 rounded-3 mb-4 stats-box style-three`}
                      >
                        <div className="card-body p-4">
                          <div className="d-flex align-items-center mb-2">
                            <div className="flex-shrink-0">
                              <i
                                className={`material-symbols-outlined fs-40 text-${item.color}`}
                              >
                                {item.icon}
                              </i>
                            </div>
                            <div className="flex-grow-1 ms-2">
                              <span>{item.title}</span>
                              <h3 className="fs-20 mt-1 mb-0">{item.value}</h3>
                            </div>
                          </div>
                          <div className="d-flex justify-content-between flex-wrap gap-2 align-items-center">
                            <span className="fs-12">{item.label}</span>
                            {!item.isTeam ? (
                              <span
                                className={`count ${
                                  item.isDown ? "down" : "up"
                                } fw-medium ms-0`}
                              >
                                {item.change}
                              </span>
                            ) : (
                              <ul className="ps-0 mb-0 list-unstyled d-flex align-items-center">
                                {[16, 17, 18, 19].map((id) => (
                                  <li key={id} className="ms-m-15">
                                    <a href="my-profile.html">
                                      <img
                                        src={`assets/images/user-${id}.jpg`}
                                        className="wh-34 lh-34 rounded-circle border border-1 border-color-white"
                                        alt="user"
                                      />
                                    </a>
                                  </li>
                                ))}
                                <li className="ms-m-15">
                                  <a
                                    href="users-list.html"
                                    className="wh-34 lh-34 rounded-circle bg-primary d-block text-center text-decoration-none text-white fs-12 fw-medium border border-1 border-color-white"
                                  >
                                    +55
                                  </a>
                                </li>
                              </ul>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* All Projects Table */}
          <div className="card bg-white border-0 rounded-3 mb-4">
            <div className="card-body p-0">
              <div className="p-4">
                <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                  <h3 className="mb-0">All Projects</h3>
                  <select
                    className="form-select month-select form-control p-0 h-auto border-0 w-90"
                    style={{ backgroundPosition: "right 0 center" }}
                    aria-label="Default select example"
                  >
                    <option defaultValue>This Week</option>
                    <option value="1">This Month</option>
                    <option value="2">This Year</option>
                  </select>
                </div>
              </div>

              <div className="default-table-area style-two all-projects">
                <div className="table-responsive">
                  <table className="table align-middle">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                <th scope="col">External ID</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Phone</th>
                <th scope="col">DOB</th>
                <th scope="col">Status</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                                            {applicants.map((app) => (
                      <React.Fragment key={app.id}>
                        <tr>
                          <td>
                            <button
                              variant="light"
                              size="sm"
                              onClick={() => toggleExpand(app.id)}
                            >
                              {expandedIds.includes(app.id) ? "−" : "+"}
                            </button>
                          </td>
                          <td>{app.external_id}</td>
                          <td>{`${app.given_name} ${app.family_name}`}</td>
                          <td>{app.email_id}</td>
                          <td>{app.phone_number}</td>
                          <td>{app.date_of_birth}</td>
                          <td>
                            <span className="badge bg-success">
                              {app.status}
                            </span>
                          </td>
                          <td>
                            <Link to={`../edit-file/${app.id}`} className="ps-0 border-0 bg-transparent lh-1">
                            <i className="material-symbols-outlined fs-16 text-body">edit</i>
                          </Link>
                          </td>
                        </tr>
                        <tr>
  <td colSpan="10" className="p-0 border-0">
    {expandedIds.includes(app.id) && (
      <div className="p-3" style={{ marginLeft: '8px' }}>
        <strong>Sub‑Applicants:</strong>
        {app.sub_applicants?.length ? (
          <table className="table align-middle">
            <thead>
              <tr>
                <th>#</th>
                <th>External ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>DOB</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {app.sub_applicants.map((sub) => (
                <tr key={sub.id}>
                  <td>{sub.id}</td>
                  <td>{sub.external_id}</td>
                  <td>{`${sub.given_name} ${sub.family_name}`}</td>
                  <td>{sub.email_id}</td>
                  <td>{sub.phone_number}</td>
                  <td>{sub.date_of_birth}</td>
                  <td>
                    <span className="badge bg-info">
                      {sub.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="mt-2 mb-0">No sub‑applicants.</p>
        )}
      </div>
    )}
  </td>

                        </tr>
                      </React.Fragment>
                    ))}
                    </tbody>
                  </table>
                </div>

                <div className="p-4 pt-lg-4">
                  <div className="d-flex justify-content-center justify-content-sm-between align-items-center text-center flex-wrap gap-2 showing-wrap">
                    <span className="fs-12 fw-medium">Showing 5 of 30 Results</span>

                    <nav aria-label="Page navigation example">
                      <ul className="pagination mb-0 justify-content-center">
                        <li className="page-item">
                          <a
                            className="page-link icon"
                            href="project-management.html"
                            aria-label="Previous"
                          >
                            <i className="material-symbols-outlined">keyboard_arrow_left</i>
                          </a>
                        </li>
                        {[1, 2, 3, 4].map((num) => (
                          <li key={num} className="page-item">
                            <a
                              className={`page-link ${num === 1 ? "active" : ""}`}
                              href="project-management.html"
                            >
                              {num}
                            </a>
                          </li>
                        ))}
                        <li className="page-item">
                          <a
                            className="page-link icon"
                            href="project-management.html"
                            aria-label="Next"
                          >
                            <i className="material-symbols-outlined">keyboard_arrow_right</i>
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
