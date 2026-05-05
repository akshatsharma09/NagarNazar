import axios from "axios";

export const fetchUtilities = async () => {
  const response = await axios.get("/utilities");
  return response.data;
};

export const fetchReportSummary = async () => {
  const response = await axios.get("/report/summary");
  return response.data;
};

export const fetchReportCritical = async () => {
  const response = await axios.get("/report/critical");
  return response.data;
};

export const fetchReportFiltered = async (type, risk) => {
  const params = {};
  if (type) params.type = type;
  if (risk) params.risk = risk;
  const response = await axios.get("/report/filter", { params });
  return response.data;
};

export const fetchMaintenanceTasks = async () => {
  const response = await axios.get("/maintenance/tasks");
  return response.data;
};

export const updateMaintenanceTask = async (id, status) => {
  const response = await axios.post("/maintenance/update", { id, status });
  return response.data;
};