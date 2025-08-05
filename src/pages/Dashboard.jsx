import React, { useEffect, useState } from "react";
import { fetchApplicants } from "../api/fileApi";
import { Link } from "react-router-dom";
import PaymentChart from "./PaymentChart";
import {fetchStatus} from "../api/fileApi";



const Dashboard = () => {
  const [expandedIds, setExpandedIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [applicants, setApplicants] = useState([]);
const [pagination, setPagination] = useState({
  current: 1,
  total: 0,
  perPage: 10,
  lastPage: 1,
});
const [search, setSearch] = useState("");

const loadApplicants = async (page = 1) => {
  try {
    const data = await fetchApplicants(page , search);
    setApplicants(data.data);
    setPagination({
      current: data.current_page,
      total: data.total,
      perPage: data.per_page,
      lastPage: data.last_page,
    });
  } catch (error) {
    console.error("Failed to fetch applicants:", error);
  }
};
const [statusCounts, setStatusCounts] = useState({});




  useEffect(() => {
   
    loadApplicants();
     fetchStatus().then(setStatusCounts).catch(console.error);
  }, []);

  const toggleExpand = (id) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handlePageChange = (pageNumber) => {
  loadApplicants(pageNumber); // fetch data for the selected page
};
const statusCards = [
  {
    key: "totalNew",
    title: "New",
    icon: "fiber_new",
    color: "primary",
  },
  {
    key: "totalInProcess",
    title: "In Process",
    icon: "sync",
    color: "warning",
  },
  {
    key: "totalFinalReview",
    title: "Final Review",
    icon: "search",
    color: "info",
  },
  {
    key: "totalCompleted",
    title: "Completed",
    icon: "check_circle",
    color: "success",
  },
  {
    key: "totalPendingDocumentRequest",
    title: "Pending Docs",
    icon: "hourglass_empty",
    color: "danger",
  },
];



 
  return (
    <>
      <div className="main-content-container overflow-hidden">
        <div className="row justify-content-center">
          <div className="col-xl-12">
            <div className="card bg-white border-0 rounded-3 mb-4">
              <div className="card-body p-4" style={{ paddingBottom: "0" }}>
                <div className="mb-3 mb-lg-3">
                  <h3 className="mb-0">Projects Overview</h3>
                </div>
                <div className="row">
                  {/* Project Cards */}
                  
                  {statusCards.map((item, index) => (
  <div key={index} className="col-xxl-2 col-xl-2 col-sm-5">
    <div
      className={`card bg-${item.color} bg-opacity-10 border-${item.color} border-opacity-10 rounded-3 mb-4 stats-box style-three`}
    >
      <div className="card-body p-4">
        <div className="d-flex align-items-center mb-2">
          <div className="flex-shrink-0">
            <i className={`material-symbols-outlined fs-40 text-${item.color}`}>
              {item.icon}
            </i>
          </div>
          <div className="flex-grow-1 ms-2">
            <span>{item.title}</span>
            <h3 className="fs-20 mt-1 mb-0">
              {statusCounts[item.key] ?? 0}
            </h3>
          </div>
        </div>
        <div className="d-flex justify-content-between flex-wrap gap-2 align-items-center">
          <span className="fs-12">Applicants</span>
          <span className="count up fw-medium ms-0">+0%</span>
        </div>
      </div>
    </div>
  </div>
))}

                </div>
              </div>
            </div>
          </div>

          <PaymentChart />
          {/* All Projects Table */}
          <div className="card bg-white border-0 rounded-3 mb-4">
            <div className="card-body p-0">
              <div className="p-4">
                <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                  <h3 className="mb-0">All Files</h3>
                  <input
                    type="text"
                    className="form-control w-25"
                    placeholder="Search by Assign To / Assign By"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={(e) => {
                    // loadApplicants();
                      if (e.key === 'Enter') loadApplicants(); // Search on Enter
                    }}
                  />
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
                        <th scope="col">Assign BY</th>
                        <th scope="col">Assign To</th>
                        <th scope="col">Program</th>
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
                          <td>{app.assign_by_user?.first_name ?? 'Not Assign'}</td>
                          <td>{app.assign_to_user?.first_name ?? 'Not Assign'}</td>
                          <td>{app.program?.name ?? 'Not Selected'}</td>
                          <td>
                            <span
                              className={`badge p-2 fs-12 fw-normal ${
                                app.status === 'New'
                                  ? 'bg-success bg-opacity-10 text-success'
                                  : app.status === 'Final Review'
                                  ? 'badge bg-info bg-opacity-10 text-info p-2 fs-12 fw-normal'
                                  : app.status === 'Completed'
                                  ? 'bg-success bg-opacity-10 text-success'
                                  : app.status === 'On Hold'
                                  ? 'badge bg-danger bg-opacity-10 text-danger p-2 fs-12 fw-normal'
                                  : 'bg-secondary bg-opacity-10 text-secondary'
                              }`}
                            >
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
                                      <th>Program</th>
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
                                        <td>{sub.program?.name ?? 'Not Selected'}</td>
                                        <td>
                                           <span
                                              className={`badge p-2 fs-12 fw-normal ${
                                                app.status === 'New'
                                                  ? 'bg-success bg-opacity-10 text-success'
                                                  : app.status === 'Final Review'
                                                  ? 'badge bg-info bg-opacity-10 text-info p-2 fs-12 fw-normal'
                                                  : app.status === 'Completed'
                                                  ? 'bg-success bg-opacity-10 text-success'
                                                  : app.status === 'On Hold'
                                                  ? 'badge bg-danger bg-opacity-10 text-danger p-2 fs-12 fw-normal'
                                                  : 'bg-secondary bg-opacity-10 text-secondary'
                                              }`}
                                              >
                                              {app.status}
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
                      <ul className="pagination">
                        {[...Array(pagination.lastPage)].map((_, index) => {
                          const pageNum = index + 1;
                          return (
                            <li
                              key={pageNum}
                              className={`page-item ${pagination.current === pageNum ? 'active' : ''}`}
                              onClick={() => handlePageChange(pageNum)}
                              style={{ cursor: 'pointer' }}
                            >
                              <span className="page-link">{pageNum}</span>
                            </li>
                          );
                        })}
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
