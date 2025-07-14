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

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    alert('u9877');
    const loadScript = (src) => {
      const script = document.createElement('script');
      script.src = src;
      script.async = false;
      document.body.appendChild(script);
    };

    // Load all Trezo JS
    const scripts = [
      '/src/assets/js/bootstrap.bundle.min.js',
      '/src/assets/js/sidebar-menu.js',
      '/src/assets/js/dragdrop.js',
      '/src/assets/js/quill.min.js',
      '/src/assets/js/prism.js',
      '/src/assets/js/clipboard.min.js',
      '/src/assets/js/feather.min.js',
      '/src/assets/js/simplebar.min.js',
      '/src/assets/js/apexcharts.min.js',
      '/src/assets/js/echarts.min.js',
      '/src/assets/js/swiper-bundle.min.js',
      '/src/assets/js/fullcalendar.main.js',
      '/src/assets/js/jsvectormap.min.js',
      '/src/assets/js/world-merc.js',
      '/src/assets/js/moment.min.js',
      '/src/assets/js/lightpick.js',
      '/src/assets/js/custom/apexcharts.js',
      '/src/assets/js/custom/echarts.js',
      '/src/assets/js/custom/custom.js',
      
    ];

    scripts.forEach(loadScript);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="add-user" element={<AddUser />} />
          <Route path="add-file" element={<ImmigrationForm />} />
          <Route path="user-list" element={<UserList />} />


          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
