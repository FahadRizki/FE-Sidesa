import api from "../../services/api";

export const getFeedbacks = () => api.get(`/feedbacks`);
export const storeFeedback = (data) => api.post(`/feedback-store`, data);
export const searchResidents = (search) => api.get(`/search-residents?search=${search}`);