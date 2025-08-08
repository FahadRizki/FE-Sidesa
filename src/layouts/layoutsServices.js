import api from "../services/api";

export const getNotifications = (token) => {
    return api.get("/notifications", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // pastikan token tersedia di context
        },
      });

};

export const markNotificationsAsRead = async (type, token) => {
    return api.post("/notification-read", 
      { type }, {
        headers: {
          Authorization: `Bearer ${token}`, // pastikan token tersedia di context
        },
      });
};