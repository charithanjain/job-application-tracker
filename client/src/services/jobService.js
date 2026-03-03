import axios from "axios";

const API = `${import.meta.env.VITE_API_BASE_URL}/jobs`;

const getAuthHeaders = () => ({
  headers: {
    Authorization: localStorage.getItem("token"),
  },
});

export const getJobs = () => axios.get(API, getAuthHeaders());
export const createJob = (data) => axios.post(API, data, getAuthHeaders());
export const deleteJob = (id) => axios.delete(`${API}/${id}`, getAuthHeaders());
export const updateJob = (id, data) =>
  axios.put(`${API}/${id}`, data, getAuthHeaders());
