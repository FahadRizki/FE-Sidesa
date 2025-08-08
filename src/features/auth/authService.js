
import api from "../../services/api";

export const login = (data) => api.post(`/login`, data);

export const register = (data) => api.post(`/register`, data);

export const forgetPassword = (data) => api.post(`/forgot-password`, data);

export const resetPassword = (data) => api.post(`/reset-password`, data);

// Email verification
export const resendVerification = (data) => api.post(`/email-resend`, data);

// Laravel route to verify email uses GET method with params in URL
export const verifyEmail = (id, hash) => api.get(`/email-verify/${id}/${hash}`);

// Logout (requires auth token in headers, should be handled via axios interceptor or manually)
export const logout = () => api.post(`/logout`);

// Get authenticated user data
export const getUser = () => api.get(`/user`);

export const searchAll = (search) => api.get(`/search-residents-register?search=${search}`);