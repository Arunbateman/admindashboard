import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminDashboard from './components/AdminDashboard';
import UserDetailsPage from './components/UserDetails';
import Admin_Login from './components/Admin_Login';
import Admin_Signup from './components/Admin_Signup';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Admin_Login/>}/>
        <Route path="/signup" element={<Admin_Signup/>}/>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/user/:userId" element={<UserDetailsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
