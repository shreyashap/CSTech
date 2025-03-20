import Sidebar from "../components/Sidebar";
import React from "react";

export default function Dashboard() {
  return (
    <div className="flex">
      <Sidebar />
      <div>
      <h2>Dashboard</h2>
      <nav>
        <ul>
          <li><Link to="/agents">Manage Agents</Link></li>
          <li><Link to="/upload">Upload & Distribute Lists</Link></li>
        </ul>
      </nav>
    </div>
    </div>
  );
}
