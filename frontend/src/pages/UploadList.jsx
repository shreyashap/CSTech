import { useState } from "react";
import { uploadList } from "../services/api";
import Sidebar from "../components/Sidebar";
import React from "react";

export default function UploadList() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleUpload = async () => {
    if (!file) return setMessage("Please select a file.");
    try {
      await uploadList(file);
      setMessage("List uploaded and distributed successfully.");
    } catch (err) {
      setMessage("Error uploading file.");
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-10">
        <h1 className="text-xl font-bold mb-5">Upload & Distribute List</h1>

        <input type="file" onChange={(e) => setFile(e.target.files[0])} className="border p-2 mb-3" />
        <button onClick={handleUpload} className="bg-blue-500 text-white p-2">Upload</button>

        {message && <p className="mt-3 text-green-600">{message}</p>}
      </div>
    </div>
  );
}
