import React, { useState, useEffect } from "react";
import { addAgent, getAgents } from "../services/api";
import Sidebar from "../components/Sidebar";


export default function Agents() {
  const [agents, setAgents] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });

  useEffect(() => {
    fetchAgents();
  }, []);

  const fetchAgents = async () => {
    const { data } = await getAgents();
    setAgents(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addAgent(form);
    fetchAgents();
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-10">
        <h1 className="text-xl font-bold mb-5">Manage Agents</h1>

        <form className="mb-5 flex gap-2" onSubmit={handleSubmit}>
          <input className="border p-2" placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input className="border p-2" placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <input className="border p-2" placeholder="Phone" onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          <input className="border p-2" type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
          <button className="bg-blue-500 text-white p-2">Add</button>
        </form>

        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Phone</th>
            </tr>
          </thead>
          <tbody>
            {agents.map((agent) => (
              <tr key={agent._id} className="border-t">
                <td className="p-2">{agent.name}</td>
                <td className="p-2">{agent.email}</td>
                <td className="p-2">{agent.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
