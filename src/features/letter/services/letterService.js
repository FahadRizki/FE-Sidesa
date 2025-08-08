import api from '../../../services/api';

export const storeLetter = (data) => api.post(`/letter-requests`, data);
export const getLetterTypes = () => api.get(`/letter-types`);
export const getLetterStatus = () => api.get(`/letter-status`);
export const searchResidents = (search) => api.get(`/search-residents?search=${search}`);
// Tambahkan ini ke letterService.js yang sudah ada

export const getDownloadLetter = async (letterId) => {
  try {
    console.log(`🚀 Requesting letter download with ID: ${letterId}`);

    const token = localStorage.getItem('token');
    if (!token) throw new Error('Token tidak ditemukan. Silakan login kembali.');

    const response = await api.get(`/letter-download/${letterId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/pdf',
      },
      responseType: 'blob',
      timeout: 30000,
    });

    console.log('✅ Surat berhasil didapatkan dari server');
    return response;

  } catch (error) {
    console.error('❌ Error saat mencoba mengunduh surat:', error);

    // Debug bantuan tambahan
    if (error.response) {
      console.log('📦 Server response:', error.response.status, error.response.data);
    }

    throw error;
  }
};
