import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar-area" id="sidebar-area">
      <div className="logo position-relative">
        <NavLink to="/" className="d-block text-decoration-none position-relative">
          <img src="/assets/images/logo-icon.png" alt="logo-icon" />
          <span className="logo-text fw-bold text-dark">Trezo</span>
        </NavLink>
        <button
          className="sidebar-burger-menu bg-transparent p-0 border-0 opacity-0 z-n1 position-absolute top-50 end-0 translate-middle-y"
          id="sidebar-burger-menu"
        >
          <i data-feather="x"></i>
        </button>
      </div>

      <aside id="layout-menu" className="layout-menu menu-vertical menu active" data-simplebar>
        <ul className="menu-inner">
          {/* MAIN */}
          <li className="menu-title small text-uppercase">
            <span className="menu-title-text">MAIN</span>
          </li>

          <li className="menu-item open">
            <a href="#!" className="menu-link menu-toggle active">
              <span className="material-symbols-outlined menu-icon">dashboard</span>
              <span className="title">Dashboard</span>
              <span className="count">30</span>
            </a>
            <ul className="menu-sub">
              <li className="menu-item">
                <NavLink to="/ecommerce" className="menu-link">eCommerce</NavLink>
              </li>
              <li className="menu-item">
                <NavLink to="/crm" className="menu-link">
                  CRM <span className="new tag">Hot</span>
                </NavLink>
              </li>
            </ul>
          </li>

          {/* Front Pages */}
          <li className="menu-item">
            <a href="#!" className="menu-link menu-toggle active">
              <span className="material-symbols-outlined menu-icon">note_stack</span>
              <span className="title">Front Pages</span>
            </a>
            <ul className="menu-sub">
              <li className="menu-item">
                <NavLink to="/home" className="menu-link">Home</NavLink>
              </li>
              <li className="menu-item">
                <NavLink to="/features" className="menu-link">Features</NavLink>
              </li>
            </ul>
          </li>

          {/* Apps */}
          <li className="menu-title small text-uppercase">
            <span className="menu-title-text">APPS</span>
          </li>
          <li className="menu-item">
            <NavLink to="/to-do-list" className="menu-link">
              <span className="material-symbols-outlined menu-icon">format_list_bulleted</span>
              <span className="title">To Do List</span>
            </NavLink>
          </li>

          {/* Others */}
          <li className="menu-title small text-uppercase">
            <span className="menu-title-text">OTHERS</span>
          </li>
          <li className="menu-item">
            <NavLink to="/my-profile" className="menu-link">
              <span className="material-symbols-outlined menu-icon">account_circle</span>
              <span className="title">My Profile</span>
            </NavLink>
          </li>

          <li className="menu-item">
            <a href="#!" className="menu-link menu-toggle active">
              <span className="material-symbols-outlined menu-icon">settings</span>
              <span className="title">Settings</span>
            </a>
            <ul className="menu-sub">
              <li className="menu-item">
                <NavLink to="/account-settings" className="menu-link">Account Settings</NavLink>
              </li>
              <li className="menu-item">
                <NavLink to="/change-password" className="menu-link">Change Password</NavLink>
              </li>
              <li className="menu-item">
                <NavLink to="/connections" className="menu-link">Connections</NavLink>
              </li>
              <li className="menu-item">
                <NavLink to="/privacy-policy" className="menu-link">Privacy Policy</NavLink>
              </li>
              <li className="menu-item">
                <NavLink to="/terms-conditions" className="menu-link">Terms & Conditions</NavLink>
              </li>
            </ul>
          </li>

          {/* Multi Level Menu */}
          <li className="menu-item">
            <a href="#!" className="menu-link menu-toggle active">
              <span className="material-symbols-outlined menu-icon">unfold_more</span>
              <span className="title">Multi Level Menu</span>
            </a>
            <ul className="menu-sub">
              <li className="menu-item after-sub-menu">
                <a href="#!" className="menu-link menu-toggle">
                  <span className="title">Level One</span>
                </a>
                <ul className="menu-sub">
                  <li className="menu-item">
                    <NavLink to="/level-three" className="menu-link">Level Three</NavLink>
                  </li>
                </ul>
              </li>
            </ul>
          </li>

          {/* Logout */}
          <li className="menu-item">
            <NavLink to="/logout" className="menu-link">
              <span className="material-symbols-outlined menu-icon">logout</span>
              <span className="title">Logout</span>
            </NavLink>
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;
