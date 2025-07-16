import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="header-area bg-white mb-4 rounded-bottom-15" id="header-area">
      <div className="row align-items-center">
        {/* Left header (Menu icon) */}
        <div className="col-lg-4 col-sm-6">
          <div className="left-header-content">
            <ul className="d-flex align-items-center ps-0 mb-0 list-unstyled justify-content-center justify-content-sm-start">
              <li>
                <button className="header-burger-menu bg-transparent p-0 border-0" id="header-burger-menu">
                  <span className="material-symbols-outlined">menu</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Right header (theme switch, notifications, profile) */}
        <div className="col-lg-8 col-sm-6">
          <div className="right-header-content mt-2 mt-sm-0">
            <ul className="d-flex align-items-center justify-content-center justify-content-sm-end ps-0 mb-0 list-unstyled">

              {/* Theme switch */}
              

              {/* Notifications */}
              <li className="header-right-item">
                <div className="dropdown notifications noti">
                  <button
                    className="btn btn-secondary border-0 p-0 position-relative badge"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <span className="material-symbols-outlined">notifications</span>
                  </button>

                  <div className="dropdown-menu dropdown-lg p-0 border-0 p-0 dropdown-menu-end">
                    <div className="d-flex justify-content-between align-items-center title">
                      <span className="fw-semibold fs-15 text-secondary">
                        Notifications <span className="fw-normal text-body fs-14">(03)</span>
                      </span>
                      <button className="p-0 m-0 bg-transparent border-0 fs-14 text-primary">Clear All</button>
                    </div>

                    <div className="max-h-217" data-simplebar>
                      <div className="notification-menu">
                        <NavLink to="/notification" className="dropdown-item">
                          <div className="d-flex align-items-center">
                            <div className="flex-shrink-0">
                              <i className="material-symbols-outlined text-primary">sms</i>
                            </div>
                            <div className="flex-grow-1 ms-3">
                              <p>You have requested to <span className="fw-semibold">withdrawal</span></p>
                              <span className="fs-13">2 hrs ago</span>
                            </div>
                          </div>
                        </NavLink>
                      </div>
                    </div>

                    <NavLink to="/notification" className="dropdown-item text-center text-primary d-block view-all fw-medium rounded-bottom-3">
                      <span>See All Notifications </span>
                    </NavLink>
                  </div>
                </div>
              </li>

              {/* Admin profile dropdown */}
              <li className="header-right-item">
                <div className="dropdown admin-profile">
                  <div
                    className="d-xxl-flex align-items-center bg-transparent border-0 text-start p-0 cursor dropdown-toggle"
                    data-bs-toggle="dropdown"
                  >
                    <div className="flex-shrink-0">
                      <img
                        className="rounded-circle wh-40 administrator"
                        src="/assets/images/administrator.jpg"
                        alt="admin"
                      />
                    </div>
                    <div className="flex-grow-1 ms-2 d-none d-xxl-block">
                      <div className="d-flex align-items-center justify-content-between">
                        <h3>Olivia</h3>
                      </div>
                    </div>
                  </div>

                  <div className="dropdown-menu border-0 bg-white dropdown-menu-end">
                    <div className="d-flex align-items-center info">
                      <div className="flex-shrink-0">
                        <img
                          className="rounded-circle wh-30 administrator"
                          src="/assets/images/administrator.jpg"
                          alt="admin"
                        />
                      </div>
                      <div className="flex-grow-1 ms-2">
                        <h3 className="fw-medium">Olivia John</h3>
                        <span className="fs-12">Marketing Manager</span>
                      </div>
                    </div>
                    <ul className="admin-link ps-0 mb-0 list-unstyled">
                      <li>
                        <NavLink className="dropdown-item admin-item-link d-flex align-items-center text-body" to="/my-profile">
                          <i className="material-symbols-outlined">account_circle</i>
                          <span className="ms-2">My Profile</span>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink className="dropdown-item admin-item-link d-flex align-items-center text-body" to="/login">
                          <i className="material-symbols-outlined">logout</i>
                          <span className="ms-2">Logout</span>
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
