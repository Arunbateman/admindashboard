import React from "react";
import { SlLogout } from "react-icons/sl";
import "./Sidebar.css";

const Sidebar = ({ isOpen, onToggle }) => {
  return (
    <div className={`sidebar ${isOpen ? "open" : "close"}`}>
      <div className="sidebar-header">
        <h2>Admin Dashboard</h2>
      </div>

      <div className="admin-details">
        <h3>Admin Details</h3>
        <div className="admin-detail-row">
          <strong>Id:</strong>
          <span>1001</span>
        </div>
        <div className="admin-detail-row">
          <strong>Role:</strong>
          <span>Administrator</span>
        </div>
      </div>

      <div className="logout-section">
        <SlLogout className="logout-icon" />
        Log Out
      </div>

      {/* Close Button */}
     
    </div>
  );
};

export default Sidebar;
