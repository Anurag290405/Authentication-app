// src/services/authService.js
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/auth";

export const sendRegisterOTP = async (data) => {
  try {
    const res = await axios.post(`${BASE_URL}/register`, data);
    return res.data;
  } catch (err) {
    return { success: false, message: err.response?.data?.message || "Error" };
  }
};

export const verifyOTP = async (data) => {
  try {
    const res = await axios.post(`${BASE_URL}/verify-otp`, data);
    return res.data;
  } catch (err) {
    return { success: false, message: err.response?.data?.message || "Verification failed" };
  }
};

export const loginUser = async (data) => {
  try {
    const res = await axios.post(`${BASE_URL}/login`, data);
    return res.data;
  } catch (err) {
    return { success: false, message: err.response?.data?.message || "Login failed" };
  }
};
