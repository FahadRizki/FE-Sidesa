import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { BASE_URL } from "../../../config";
import { getNewsDetail } from "../newsServices";

export default function NewsDetail() {
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNewsDetail = async () => {
      try {
        const response = await getNewsDetail(id);
        setNews(response.data);
        setLoading(false);
      } catch (error) {
        setError("Terjadi kesalahan saat memuat berita.");
        setLoading(false);
      }
    };

    fetchNewsDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-300 animate-pulse">Memuat berita...</p>
      </div>
    );
  }

  if (error || !news) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <Link
            to="/news"
            className="text-blue-400 text-sm font-medium hover:underline mb-4 inline-block"
          >
            ← Kembali ke Daftar Berita
          </Link>

          <h1 className="text-3xl font-bold text-white mb-2">{news.title}</h1>

          <p className="text-sm text-gray-400 mb-4">
            {new Date(news.publish_date).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>

          {news.image && (
            <img
              src={`${BASE_URL}/storage/content_images/${news.image}`}
              alt={news.title}
              className="w-full h-80 object-cover rounded mb-6"
              loading="lazy"
            />
          )}

          <p className="text-gray-300">{news.content}</p>
        </div>
      </div>
    </div>
  );
}
