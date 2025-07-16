import React, { useEffect, useState } from "react";
import { fetchUsers, File_BASE } from "../../api/adminApi";
import { Link } from "react-router-dom";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [meta, setMeta] = useState({});
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const loadUsers = async (page = 1, query = "") => {
    setLoading(true);
    try {
      const data = await fetchUsers(page, query);
      setUsers(data.data);
      setMeta(data);
    } catch (err) {
      console.error("Error loading users:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handlePageChange = (page) => {
    loadUsers(page, search);
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearch(query);
    loadUsers(1, query);
  };

  return (
    <div className="card bg-white border-0 rounded-3 mb-4 shadow-sm">
      <div className="card-body w-100 p-0" style={{ minWidth: "1180px" }}>
        <div className="p-4">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
            <h3 className="mb-0">All Users</h3>
            <input
              type="text"
              className="form-control w-25"
              placeholder="Search..."
              value={search}
              onChange={handleSearch}
            />
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
                  <th>Image</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="8" className="text-center py-3">Loading...</td></tr>
                ) : users.length ? (
                  users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.first_name}</td>
                      <td>{user.last_name}</td>
                      <td>{user.email}</td>
                      <td>{user.position}</td>
                      <td>{user.role?.name || "-"}</td>
                      <td>
                        {user.image && (
                          <img
                            src={`${File_BASE}/storage/${user.image}`} 
                            alt="user"
                            className="wh-34 lh-34 rounded-circle"
                          />
                        )}
                      </td>
                      <td>
                        <div className="d-flex align-items-center gap-1">
                          <Link to={`/admin/users/edit/${user.id}`} className="ps-0 border-0 bg-transparent lh-1">
                            <i className="material-symbols-outlined fs-16 text-body">edit</i>
                          </Link>
                          <button className="ps-0 border-0 bg-transparent lh-1">
                            <i className="material-symbols-outlined fs-16 text-danger">delete</i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="8" className="text-center py-3">No users found</td></tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {meta.total > 10 && (
            <div className="p-4 pt-lg-4">
              <div className="d-flex justify-content-center justify-content-sm-between align-items-center flex-wrap gap-2 text-center showing-wrap">
                <span className="fs-12 fw-medium">
                  Showing {meta.from} - {meta.to} of {meta.total} Results
                </span>
                <nav aria-label="Page navigation">
                  <ul className="pagination mb-0 justify-content-center">
                    {Array.from({ length: meta.last_page }, (_, i) => (
                      <li key={i + 1} className={`page-item ${meta.current_page === i + 1 ? "active" : ""}`}>
                        <button className="page-link" onClick={() => handlePageChange(i + 1)}>
                          {i + 1}
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserList;
