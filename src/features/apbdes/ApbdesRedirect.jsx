import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { getApbdesYears } from "./services/apbdesServices"
import { Loader } from "lucide-react"
export default function ApbdesRedirect() {
  const navigate = useNavigate()

  useEffect(() => {
    getApbdesYears().then((res) => {
      const years = res.data
      if (years && years.length > 0) {
        const latestYear = years[0] // atau pakai `years.sort().reverse()[0]`
        navigate(`/apbdes/${latestYear}`)
      } else {
        // Redirect ke fallback page
        navigate("/")
      }
    })
  }, [navigate])

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 flex flex-col items-center justify-center px-4 text-center">
      <div className="w-20 h-20 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center animate-spin mb-6 shadow-lg">
        <Loader className="w-10 h-10 text-white" />
      </div>
      <h2 className="text-xl font-semibold text-gray-700 mb-2 animate-pulse">
        Mengarahkan ke data APBDes terbaru...
      </h2>
      <p className="text-gray-500 text-sm">
        Mohon tunggu sebentar, kami sedang mengambil data tahun anggaran terbaru
      </p>
    </div>
  )
}
