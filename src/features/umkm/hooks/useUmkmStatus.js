import { useEffect, useState, useMemo } from "react"
import { getUmkmStatus } from "../umkmService"
import { markNotificationsAsRead } from "../../../layouts/layoutsServices"
import { ITEMS_PER_PAGE } from "../../../config/statusConfig"


export function useUmkmStatus(token) {
  const [allStatuses, setAllStatuses] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (token) {
      markNotificationsAsRead("umkm", token)
        .then(() => console.log("Notifikasi telah dibaca"))
        .catch((err) => console.error("Gagal membaca notifikasi:", err))
    }
  }, [token])

  useEffect(() => {
    const fetchStatuses = async () => {
      if (!token) return

      try {
        const res = await getUmkmStatus(token)
        setAllStatuses(res.data)
      } catch (err) {
        setError(err.message || "Gagal mengambil status UMKM")
      } finally {
        setLoading(false)
      }
    }

    fetchStatuses()
  }, [token])

  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(allStatuses.map(item => item.umkm_category).filter(Boolean))]
    return uniqueCategories
  }, [allStatuses])

  return {
    allStatuses,
    categories,
    error,
    loading,
    refetch: () => window.location.reload()
  }
}



export function useFiltering(allStatuses, statusFilter, categoryFilter) {
  return useMemo(() => {
    let filtered = allStatuses

    if (statusFilter) {
      filtered = filtered.filter(item => item.status?.toLowerCase() === statusFilter)
    }

    if (categoryFilter) {
      filtered = filtered.filter(item => item.umkm_category === categoryFilter)
    }

    return filtered
  }, [allStatuses, statusFilter, categoryFilter])
}

export function usePagination(filteredStatuses, currentPage) {
  return useMemo(() => {
    const totalPages = Math.ceil(filteredStatuses.length / ITEMS_PER_PAGE)
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const endIndex = startIndex + ITEMS_PER_PAGE
    const currentPageStatuses = filteredStatuses.slice(startIndex, endIndex)

    return {
      currentPageStatuses,
      totalPages,
      startIndex,
      endIndex
    }
  }, [filteredStatuses, currentPage])
}