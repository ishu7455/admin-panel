import React, { useEffect, useState } from "react";
import { fetchApplicants } from "../api/fileApi";
import { Link } from "react-router-dom";


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



  useEffect(() => {
   
    loadApplicants();
  }, []);

  const toggleExpand = (id) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handlePageChange = (pageNumber) => {
  loadApplicants(pageNumber); // fetch data for the selected page
};


 
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
                      icon: "stacks",
                      color: "danger",
                      value: "425",
                      label: "Projects this month",
                      change: "+5.75%",
                      title: "Active Projects",
                    },{
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
                    <div key={index} className="col-xxl-4 col-xl-4 col-sm-6">
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

          {/* <PaymentChart /> */}

 <div className="main-content-container overflow-hidden">
  <div className="row">
    {/* Left Column */}
    <div className="col-lg-8 col-xxl-9">
      <div
        className="rounded-3 p-4 mb-4"
        style={{
          background: "linear-gradient(104deg, #361E7D 2.4%, #403CFF 112.33%)",
        }}
      >
        <div className="d-flex flex-wrap gap-2 justify-content-between align-items-center mb-1">
          <span className="d-block mb-1" style={{ color: "#B1BBC8" }}>
            Today’s Payment
          </span>
          <select
            className="form-select month-select form-control w-135 bg-border-color border-color"
            aria-label="Default select example"
            defaultValue=""
          >
            <option value="">All</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>

        <div className="d-flex align-items-center mb-4">
          <h3 className="fs-32 fw-bold text-white mb-0">$1,528</h3>
          <span
            className="fw-medium fs-12 border border-success px-2 rounded-pill ms-2"
            style={{ backgroundColor: "#D8FFC8", color: "#1E8308" }}
          >
            +5.4%
          </span>
        </div>

        <div
          style={{
            marginTop: "-24px",
            marginRight: "-9px",
            marginBottom: "-27px",
            marginLeft: "-17px",
          }}
        >
          <div id="today_payment"></div>
        </div>
      </div>
    </div>

    {/* Right Column */}
    <div className="col-lg-4 col-xxl-3">
      {/* Active User */}
      <div className="card bg-white border-0 rounded-3 mb-4">
        <div className="card-body p-4">
          <div className="d-flex justify-content-between align-items-center position-relative">
            <div className="flex-grow-1 me-3">
              <span className="d-block mb-2">Active User</span>
              <h3 className="fs-24 fw-bold">241K</h3>
              <span className="bg-success bg-opacity-10 border border-success rounded-pill text-success px-2 fs-12 fw-medium d-inline-block">
                +5.4%
              </span>
            </div>
            <div className="position-absolute top-50 end-0 translate-middle-y saas-chart-position">
              <div id="active_user" style={{ width: "95px" }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Revenue */}
      <div className="card bg-white border-0 rounded-3 mb-4">
        <div className="card-body p-4">
          <div className="d-flex justify-content-between align-items-center position-relative">
            <div className="flex-grow-1 me-3">
              <span className="d-block mb-2">Revenue</span>
              <h3 className="fs-24 fw-bold">$1.2M</h3>
              <span className="bg-danger bg-opacity-10 border border-danger rounded-pill text-danger px-2 fs-12 fw-medium d-inline-block">
                -3.2%
              </span>
            </div>
            <div className="position-absolute top-50 end-0 translate-middle-y saas-chart-position">
              <div id="revenue_two" style={{ width: "130px" }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Conversion */}
      <div className="card bg-white border-0 rounded-3 mb-4">
        <div className="card-body p-4">
          <div className="d-flex justify-content-between align-items-center position-relative">
            <div className="flex-grow-1 me-3">
              <span className="d-block mb-2">Conversion</span>
              <h3 className="fs-24 fw-bold">32.5%</h3>
              <span className="bg-success bg-opacity-10 border border-success rounded-pill text-success px-2 fs-12 fw-medium d-inline-block">
                +1.4%
              </span>
            </div>
            <div className="position-absolute top-50 end-0 translate-middle-y saas-chart-position">
              <div id="conversion" style={{ width: "130px" }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

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
