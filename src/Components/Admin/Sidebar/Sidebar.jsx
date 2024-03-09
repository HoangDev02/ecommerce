import React, { useState } from "react";
import "./Sidebar.css"; // Make sure to create a Sidebar.css file for your styles
import User from "../user/User";

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState("");

  const selectItem = (item) => {
    setActiveItem(item);
  };
  const notifications = {
    cards: 18,
    payments: 10,
  };

  // Function to render notification bubble
  const renderNotificationBubble = (count) => {
    return count > 0 ? (
      <span className="notification-bubble">{count}</span>
    ) : null;
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-4">
          <div className="sidebar">
            <div
              className={`menu-item ${
                activeItem === "overview" ? "active" : ""
              }`}
              onClick={() => selectItem("overview")}
            >
              <i className="pi pi-home menu-icon"></i>
              Overview
            </div>
            <div
              className={`menu-item ${activeItem === "users" ? "active" : ""}`}
              onClick={() => selectItem("users")}
            >
              <i className="pi pi-users menu-icon"></i>
              Users
            </div>
            <div className="menu-item">
              <i className="pi pi-briefcase menu-icon"></i>
              Agents
            </div>
            <div className="menu-item">
              <i className="pi pi-wallet menu-icon"></i>
              Cards {renderNotificationBubble(notifications.cards)}
            </div>
            <div className="menu-item">
              <i className="pi pi-bitcoin menu-icon"></i>
              Bitcoin & Ethereum
            </div>
            <div className="menu-item">
              <i className="pi pi-credit-card menu-icon"></i>
              Payments {renderNotificationBubble(notifications.payments)}
            </div>
            <div className="menu-item">
              <i className="pi pi-exchange menu-icon"></i>
              Transactions
            </div>
            <div className="menu-item">
              <i className="pi pi-chart-line menu-icon"></i>
              Statistics
            </div>
            <div className="menu-item">
              <i className="pi pi-sign-out menu-icon"></i>
              Logout
            </div>
          </div>
        </div>
        <div className="col-8">
          <div className="content">
            {activeItem === "overview" && <div>Overview Content</div>}
            {activeItem === "users" && <User />}
            {/* Repeat for other content based on activeItem */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
