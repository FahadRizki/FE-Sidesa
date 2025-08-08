// hooks/useLetterStatus.js
import { useState, useEffect, useMemo } from 'react'
import { getLetterStatus } from '../services/letterService'
import { markNotificationsAsRead } from '../../../layouts/layoutsServices'

// Constants
const STATUS_TYPES = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  COMPLETED: 'completed'
}

const DEFAULT_ERROR_MESSAGE = 'Gagal mengambil status surat'
const DEFAULT_LETTER_TITLE = 'Surat Tidak Diketahui'

// Helper functions
const normalizeStatusData = (response) => {
  if (!response?.data) return []

  const { data } = response
  
  // Handle different response formats
  if (Array.isArray(data)) return data
  if (data.data && Array.isArray(data.data)) return data.data
  if (data.letter_requests && Array.isArray(data.letter_requests)) return data.letter_requests
  if (data.letters && Array.isArray(data.letters)) return data.letters
  if (typeof data === 'object') return [data]
  
  return []
}

const mapLetterItem = (item, index) => ({
  ...item,
  id: item.id || index,
  title: item.letter_type?.name || item.letterType?.name || DEFAULT_LETTER_TITLE,
  status: item.status || STATUS_TYPES.PENDING,
  created_at: item.created_at || item.createdAt || new Date().toISOString(),
  letter_type: item.letter_type || item.letterType || null,
})

const extractUniqueLetterTypes = (statusData) => {
  return [...new Set(
    statusData
      .map(item => item.letter_type?.name || item.letterType?.name)
      .filter(Boolean)
  )]
}

const getErrorMessage = (error) => {
  return error.response?.data?.message || error.message || DEFAULT_ERROR_MESSAGE
}

// Main hook
export function useLetterStatus(token) {
  const [allStatuses, setAllStatuses] = useState([])
  const [letterTypes, setLetterTypes] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchStatuses = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await getLetterStatus()
      const statusData = normalizeStatusData(response)
      
      if (!Array.isArray(statusData)) {
        throw new Error('Data yang diterima bukan format array yang valid')
      }
      
      const mappedData = statusData.map(mapLetterItem)
      const uniqueTypes = extractUniqueLetterTypes(mappedData)

      setAllStatuses(mappedData)
      setLetterTypes(uniqueTypes)
      
    } catch (err) {
      const errorMessage = getErrorMessage(err)
      setError(errorMessage)
      setAllStatuses([])
      setLetterTypes([])
      
      // console.error('Error fetching letter statuses:', {
      //   message: err.message,
      //   response: err.response?.data,
      //   status: err.response?.status
      // })
    } finally {
      setLoading(false)
    }
  }

  // Mark notifications as read when token changes
  useEffect(() => {
    if (!token) return

    markNotificationsAsRead('letter', token)
      .then(() => console.log('Notifikasi telah dibaca'))
      .catch((error) => console.error('Gagal membaca notifikasi:', error))
  }, [token])

  // Initial fetch
  useEffect(() => {
    fetchStatuses()
  }, [])

  // Status counts calculator
  const statusCounts = useMemo(() => {
    const counts = allStatuses.reduce((acc, item) => {
      const status = item.status?.toLowerCase() || STATUS_TYPES.PENDING
      acc[status] = (acc[status] || 0) + 1
      return acc
    }, {})
    
    return {
      total: allStatuses.length,
      pending: counts.pending || 0,
      approved: counts.approved || 0,
      rejected: counts.rejected || 0,
      completed: counts.completed || 0,
      ...counts
    }
  }, [allStatuses])

  return { 
    allStatuses, 
    letterTypes, 
    error, 
    loading, 
    refetch: fetchStatuses,
    statusCounts
  }
}

// Filtering hook
export function useFiltering(allStatuses, statusFilter, typeFilter) {
  return useMemo(() => {
    let filtered = [...allStatuses]

    // Apply status filter
    if (statusFilter && statusFilter !== 'all') {
      filtered = filtered.filter(item => 
        item.status?.toLowerCase() === statusFilter.toLowerCase()
      )
    }

    // Apply type filter
    if (typeFilter && typeFilter !== 'all') {
      filtered = filtered.filter(item => {
        const itemType = item.letter_type?.name || item.letterType?.name
        return itemType === typeFilter
      })
    }

    return filtered
  }, [allStatuses, statusFilter, typeFilter])
}

// Pagination hook
export function usePagination(filteredStatuses, currentPage, itemsPerPage = 5) {
  const totalPages = Math.ceil(filteredStatuses.length / itemsPerPage)
  
  const currentPageStatuses = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return filteredStatuses.slice(startIndex, endIndex)
  }, [filteredStatuses, currentPage, itemsPerPage])

  const paginationInfo = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = Math.min(startIndex + itemsPerPage, filteredStatuses.length)
    
    return {
      currentPage,
      totalPages,
      totalItems: filteredStatuses.length,
      itemsPerPage,
      startIndex: startIndex + 1,
      endIndex,
      hasNextPage: currentPage < totalPages,
      hasPrevPage: currentPage > 1
    }
  }, [filteredStatuses.length, currentPage, itemsPerPage, totalPages])

  return { 
    currentPageStatuses, 
    totalPages,
    paginationInfo
  }
} 