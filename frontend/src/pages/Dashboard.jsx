import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import React from "react";

export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/");
        return;
      }

      try {
        const { data } = await axios.get("http://localhost:5000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log(data)
        if (data?.role !== "admin") {
          alert("Access Denied");
          navigate("/");
        } else {
          setUser(data);
        }
      } catch (error) {
        console.log("Invalid session");
        navigate("/");
      }
    };

    fetchUser();
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {user ? (
        <div className="bg-white p-6 rounded-lg shadow-md w-96">
          <h2 className="text-xl font-semibold text-center mb-4">Admin Dashboard</h2>
          <p className="text-center">Welcome, {user.name}!</p>
          <p className="text-center text-gray-600">Email: {user.email}</p>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/");
            }}
            className="w-full p-2 mt-4 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
