import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import React from "react";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  mobile: z.string().min(10, "Invalid mobile number"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", data);
      if (response.status === 201) {
        navigate("/");
      }
    } catch (err) {
      setError(err.response?.error?.message || "Registration failed");
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-bold text-white text-center mb-6">Register</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            {...register("name")}
            placeholder="Full Name"
            className="w-full p-3 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 outline-none"
          />
          {errors.name && <p className="text-red-400 text-sm">{errors.name.message}</p>}
          
          <input
            {...register("email")}
            placeholder="Email"
            className="w-full p-3 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 outline-none"
          />
          {errors.email && <p className="text-red-400 text-sm">{errors.email.message}</p>}
          
          <input
            {...register("mobile")}
            placeholder="Mobile Number"
            className="w-full p-3 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 outline-none"
          />
          {errors.mobile && <p className="text-red-400 text-sm">{errors.mobile.message}</p>}
          
          <input
            {...register("password")}
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 outline-none"
          />
          {errors.password && <p className="text-red-400 text-sm">{errors.password.message}</p>}

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-all"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <p className="text-white text-center mt-4">
          Already have an account?{" "}
          <a href="/" className="text-blue-400 hover:text-blue-300">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
