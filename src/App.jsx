import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Trezo CSS Files
import './assets/css/sidebar-menu.css';
import './assets/css/simplebar.css';
import './assets/css/apexcharts.css';
import './assets/css/prism.css';
import './assets/css/rangeslider.css';
import './assets/css/quill.snow.css';
import './assets/css/google-icon.css';
import './assets/css/remixicon.css';
import './assets/css/swiper-bundle.min.css';
import './assets/css/fullcalendar.main.css';
import './assets/css/jsvectormap.min.css';
import './assets/css/lightpick.css';
import './assets/css/style.css';

// Pages and Layouts
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import AddUser from './pages/admin/AddUser';
import ImmigrationForm from './pages/files/ImmigrationForm';
import UserList from './pages/admin/UserList';
import MicrosoftSuccess from './pages/Auth/MicrosoftSuccess';
import MicrosoftLogin from './pages/Auth/MicrosoftLogin';
import PerfectScrollbar from 'perfect-scrollbar';




function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const loadScript = (src) => {
      const script = document.createElement('script');
      script.src = src;
      script.async = false;
      document.body.appendChild(script);
    };

    // Load all Trezo JS
    const scripts = [
      '/assets/js/bootstrap.bundle.min.js',
      '/assets/js/sidebar-menu.js',
      '/assets/js/dragdrop.js',
      '/assets/js/quill.min.js',
      '/assets/js/prism.js',
      '/assets/js/clipboard.min.js',
      '/assets/js/feather.min.js',
      '/assets/js/simplebar.min.js',
      '/assets/js/apexcharts.min.js',
      '/assets/js/echarts.min.js',
      '/assets/js/swiper-bundle.min.js',
      '/assets/js/fullcalendar.main.js',
      '/assets/js/jsvectormap.min.js',
      '/assets/js/world-merc.js',
      '/assets/js/moment.min.js',
      '/assets/js/lightpick.js',
      '/assets/js/custom/apexcharts.js',
      '/assets/js/custom/echarts.js',
      '/assets/js/custom/custom.js',
      
    ];

    scripts.forEach(loadScript);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="/admin/users/create" element={<AddUser />} />
          <Route path="/admin/users/edit/:id" element={<AddUser />} />
          <Route path="add-file" element={<ImmigrationForm />} />
          <Route path="edit-file/:id" element={<ImmigrationForm />} />

          <Route path="user-list" element={<UserList />} />
          <Route path="success" element={<MicrosoftSuccess />} />
          <Route path="login" element={<MicrosoftLogin />} />




          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
