import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";

const MainLayout = () => (
    <>
    <Sidebar />
     <div className="container-fluid">
            <div className="main-content d-flex flex-column">
      <Header />
      <main className="p-3">
        <Outlet />
      </main>
    



                <div className="flex-grow-1"></div>

                <footer className="footer-area bg-white text-center rounded-top-7">
                    <p className="fs-14">© <span className="text-primary-div">Trezo</span> is Proudly Owned by <a href="https://envytheme.com/" target="_blank" className="text-decoration-none text-primary">EnvyTheme</a></p>
                </footer>
                </div>
        </div>
       
            
        </>
);

export default MainLayout;
