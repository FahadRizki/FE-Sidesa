import { getComplaintStatus } from '../complaintService';
import { markNotificationsAsRead } from '../../../layouts/layoutsServices';
import { useAuth } from '../../../context/AuthContext';
import { useEffect, useState, useMemo, useCallback } from 'react';
import { ITEMS_PER_PAGE } from "../../../config/statusConfig"
export const useComplaintData = () => {
  const [data, setData] = useState({
    complaints: [],
    complaintTypes: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAuth();

  const fetchComplaintData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await getComplaintStatus();
      const complaints = response.data.map(item => ({
        ...item,
        title: item.title || 'Aduan Tidak Diketahui',
      }));

      const uniqueTypes = [...new Set(
        complaints
          .map(item => item.type_complaint)
          .filter(Boolean)
      )];

      setData({
        complaints,
        complaintTypes: uniqueTypes,
      });
    } catch (err) {
      console.error('Error fetching complaint data:', err);
      setError(
        err.response?.data?.message || 
        err.message || 
        'Gagal mengambil status aduan'
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchComplaintData();
  }, [fetchComplaintData]);

  // Mark notifications as read
  useEffect(() => {
    if (token) {
      markNotificationsAsRead('complaint', token)
        .then(() => console.log('Notifikasi telah dibaca'))
        .catch((error) => console.error('Gagal membaca notifikasi:', error));
    }
  }, [token]);

  return { ...data, loading, error, refetch: fetchComplaintData };
};

export const useFilters = (complaints) => {
  const [filters, setFilters] = useState({
    status: '',
    type: '',
  });

  const filteredComplaints = useMemo(() => {
    return complaints.filter(complaint => {
      const statusMatch = !filters.status || 
        complaint.status?.toLowerCase() === filters.status;
      const typeMatch = !filters.type || 
        complaint.type_complaint === filters.type;
      
      return statusMatch && typeMatch;
    });
  }, [complaints, filters]);

  const updateFilter = useCallback((key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  return {
    filters,
    filteredComplaints,
    updateFilter,
  };
};

export const usePagination = (items, itemsPerPage = ITEMS_PER_PAGE) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(items.length / itemsPerPage);
  
  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return items.slice(startIndex, endIndex);
  }, [items, currentPage, itemsPerPage]);

  const goToPage = useCallback((page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      scrollToTop();
    }
  }, [totalPages]);

  // Reset to first page when items change
  useEffect(() => {
    setCurrentPage(1);
  }, [items.length]);

  return {
    currentPage,
    totalPages,
    paginatedItems,
    goToPage,
  };
};