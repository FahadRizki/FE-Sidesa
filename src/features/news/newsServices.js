import api from "../../services/api";

export const getNews = (page = 1, limit = 6) =>
  api.get(`/content`, {
    params: {
      type: "news",
      page,
      limit,
    },
  });

export const getNewsDetail = (id) => api.get(`/news-detail/${id}`);
export const searchNews = (search) => api.get(`/search-news?search=${search}`);