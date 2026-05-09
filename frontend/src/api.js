import axios from "axios";

const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:8000";

export const fetchUtilities = async () => {
  const response = await axios.get(`${API_BASE}/utilities`);
  return response.data;
};

export const fetchReportSummary = async () => {
  const response = await axios.get(`${API_BASE}/report/summary`);
  return response.data;
};

export const fetchReportCritical = async () => {
  const response = await axios.get(`${API_BASE}/report/critical`);
  return response.data;
};

export const fetchReportFiltered = async (type, risk) => {
  const params = {};
  if (type) params.type = type;
  if (risk) params.risk = risk;
  const response = await axios.get(`${API_BASE}/report/filter`, { params });
  return response.data;
};

export const fetchMaintenanceTasks = async () => {
  const response = await axios.get(`${API_BASE}/maintenance/tasks`);
  return response.data;
};

export const updateMaintenanceTask = async (id, status) => {
  const response = await axios.post(`${API_BASE}/maintenance/update`, { id, status });
  return response.data;
};