'use client'

import { useDispatch } from 'react-redux'
import { login } from '@/store/slices/authSlice'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function LoginPage() {
  const dispatch = useDispatch()
  const router = useRouter()
  const [name, setName] = useState('')
  const [error, setError] = useState('')

  const handleLogin = () => {
    if (name.trim() === '') {
      setError('Please enter your name')
      return
    }
    setError('')
    dispatch(login({ name }))
    router.push('/dashboard')
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      <div className="bg-black p-8 rounded shadow-md w-full max-w-md border border-gray-700">
        
        <div className="mb-6 border-b border-gray-600 pb-2">
          <h2 className="text-2xl font-bold text-white text-center">Eyego Task</h2>
        </div>

        <h1 className="text-xl font-semibold mb-4 text-white text-center">Sign in</h1>

        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-2 px-4 py-2 rounded bg-white text-black"
        />

        {error && (
          <p className="text-red-500 text-sm mb-4">{error}</p>
        )}

        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        >
          Login
        </button>
      </div>
    </div>
  )
}
