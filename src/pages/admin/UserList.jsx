import React from "react";

const UserList = () => {
  const projects = [
    {
      id: "#854",
      name: "Project CyberSphere",
      client: "NovaTech Solutions",
      budget: "$4,500",
      start: "25 Mar 2024",
      end: "25 Apr 2024",
      status: "Finished",
      statusClass: "success",
      teamCount: 10,
    },
    {
      id: "#857",
      name: "Data Dynamo Drive",
      client: "BlueSky Technologies",
      budget: "$7,500",
      start: "10 Mar 2024",
      end: "10 Apr 2024",
      status: "In Progress",
      statusClass: "danger",
      teamCount: 15,
    },
    {
      id: "#858",
      name: "QuantumLeap Quest",
      client: "NexGen Systems",
      budget: "$3,400",
      start: "05 Mar 2024",
      end: "05 Apr 2024",
      status: "Finished",
      statusClass: "success",
      teamCount: 3,
    },
  ];

  return (
  
      <div className="card bg-white border-0 rounded-3 mb-4 shadow-sm">
        <div className="card-body w-100 p-0" style={{ minWidth: "1180px" }}>
          <div className="p-4">
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
              <h3 className="mb-0">All Users</h3>
              <select
                className="form-select month-select form-control p-0 h-auto border-0 w-90"
                style={{ backgroundPosition: "right 0 center" }}
                aria-label="Time Filter"
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
                    <th>ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Position</th>
                    <th>Role</th>
                    <th>Start Date</th>
                    <th>Image</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((project, idx) => (
                    <tr key={idx}>
                      <td className="text-body">{project.id}</td>
                      <td>
                        <a href="#">{project.name}</a>
                      </td>
                      <td>{project.client}</td>
                      <td>
                        <ul className="ps-0 mb-0 list-unstyled d-flex align-items-center">
                          {[16, 17, 18, 19].map((id) => (
                            <li key={id} className="ms-m-15">
                              <a href="#">
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
                              href="#"
                              className="wh-34 lh-34 rounded-circle bg-primary d-block text-center text-white fs-12 fw-medium border border-1 border-color-white text-decoration-none"
                            >
                              +{project.teamCount}
                            </a>
                          </li>
                        </ul>
                      </td>
                      <td className="text-body">{project.budget}</td>
                      <td className="text-body">{project.start}</td>
                      <td className="text-body">{project.end}</td>
                      <td>
                        <span
                          className={`badge bg-${project.statusClass} bg-opacity-10 text-${project.statusClass} p-2 fs-12 fw-normal`}
                        >
                          {project.status}
                        </span>
                      </td>
                      <td>
                        <div className="d-flex align-items-center gap-1">
                          <button className="ps-0 border-0 bg-transparent lh-1">
                            <i className="material-symbols-outlined fs-16 text-primary">visibility</i>
                          </button>
                          <button className="ps-0 border-0 bg-transparent lh-1">
                            <i className="material-symbols-outlined fs-16 text-body">edit</i>
                          </button>
                          <button className="ps-0 border-0 bg-transparent lh-1">
                            <i className="material-symbols-outlined fs-16 text-danger">delete</i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="p-4 pt-lg-4">
              <div className="d-flex justify-content-center justify-content-sm-between align-items-center flex-wrap gap-2 text-center showing-wrap">
                <span className="fs-12 fw-medium">Showing 5 of 30 Results</span>
                <nav aria-label="Page navigation">
                  <ul className="pagination mb-0 justify-content-center">
                    <li className="page-item">
                      <a className="page-link icon" href="#">
                        <i className="material-symbols-outlined">keyboard_arrow_left</i>
                      </a>
                    </li>
                    {[1, 2, 3, 4].map((n) => (
                      <li key={n} className="page-item">
                        <a className={`page-link ${n === 1 ? "active" : ""}`} href="#">
                          {n}
                        </a>
                      </li>
                    ))}
                    <li className="page-item">
                      <a className="page-link icon" href="#">
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
  );
};

export default UserList;
