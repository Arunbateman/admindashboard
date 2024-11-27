import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FiSidebar } from "react-icons/fi";
import Sidebar from "./Sidebar";
import UserTable from "./UserTable";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showToggleButton, setShowToggleButton] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [loading, setLoading] = useState(true); // New loading state
  const navigate = useNavigate();

  // Fetch users
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Start loading
      try {
        const response = await axios.get("http://localhost:5002/userss");
        setTimeout(() => {
          setUsers(response.data || []);
          setLoading(false); // End loading after delay
        }, 3000); // Simulated 3-second delay
      } catch (error) {
        console.error("Error fetching users:", error);
        alert("Failed to fetch users. Please try again later.");
        setLoading(false); // Ensure loading ends even on error
      }
    };

    fetchData();
  }, []);

  // Toggle Sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Debounced Scroll Handler
  useEffect(() => {
    let timer;
    const handleScroll = () => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        if (window.scrollY > 50 && window.scrollY > lastScrollY) {
          setShowToggleButton(false);
        } else if (window.scrollY < lastScrollY) {
          setShowToggleButton(true);
        }
        setLastScrollY(window.scrollY);
      }, 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timer) clearTimeout(timer);
    };
  }, [lastScrollY]);

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} />

      {/* Sidebar Toggle Button */}
      <button
        className={`toggle-button ${showToggleButton ? "" : "hidden"}`}
        onClick={toggleSidebar}
        aria-label="Toggle Sidebar"
        aria-expanded={isSidebarOpen}
        aria-controls="sidebar"
      >
        <FiSidebar />
      </button>

      {/* Main Content */}
      <div className={`main-content ${isSidebarOpen ? "shifted" : ""}`}>
        <h1>User Verification</h1>
        {loading ? (
          <div className="spinner-container">
            <div className="spinner"></div> {/* Add spinner element */}
            <p>Loading users...</p>
          </div>
        ) : users.length > 0 ? (
          <UserTable
            users={users}
            onUserClick={(userId) => navigate(`/user/${userId}`)}
          />
        ) : (
          <div className="no-users-container">
          <p>No users available...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
