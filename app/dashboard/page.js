'use client'
import Chart from '@/components/Chart'
import DataTable from '@/components/DataTable'
import { mockData } from '@/utils/mockData'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/navigation'
import { logout } from '@/store/slices/authSlice'
import { useEffect, useState } from 'react'

export default function Dashboard() {
  const { user } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const router = useRouter()
  const [showWelcome, setShowWelcome] = useState(true)

  useEffect(() => {
    if (!user) {
      router.push('/login')
    } else {
      setTimeout(() => setShowWelcome(false), 2000)
    }
  }, [user])

  const handleLogout = () => {
    dispatch(logout())
    router.push('/login')
  }

  if (!user) return null

  if (showWelcome) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white">
        <h1 className="text-4xl font-bold text-center px-4">Welcome, {user.name}</h1>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white p-4 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* Chart Section */}
      <div className="w-full overflow-x-auto">
        <Chart data={mockData} />
      </div>

      {/* Data Table Section */}
      <div className="w-full overflow-x-auto">
        <DataTable data={mockData} />
      </div>
    </div>
  )
}
