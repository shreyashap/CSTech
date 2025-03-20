import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

export const login = (data) => API.post("/auth/login", data);
export const addAgent = (data) => API.post("/agents", data);
export const getAgents = () => API.get("/agents");
export const uploadList = (file) => {
  const formData = new FormData();
  formData.append("file", file);
  return API.post("/lists/upload", formData);
};
