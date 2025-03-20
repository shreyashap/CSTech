import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-5">
      <h2 className="text-xl font-bold">Admin Panel</h2>
      <nav className="mt-5">
        <Link to="/dashboard" className="block py-2 px-3 hover:bg-gray-700">Dashboard</Link>
        <Link to="/agents" className="block py-2 px-3 hover:bg-gray-700">Agents</Link>
        <Link to="/upload-list" className="block py-2 px-3 hover:bg-gray-700">Upload List</Link>
      </nav>
    </div>
  );
}
    