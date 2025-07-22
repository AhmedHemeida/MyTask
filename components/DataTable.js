'use client'
import { useState } from 'react'

export default function DataTable({ data }) {
  const [search, setSearch] = useState('')
  const [sortOrder, setSortOrder] = useState('asc')
  const [currentPage, setCurrentPage] = useState(1)

  const rowsPerPage = 5
  const sortField = 'value'

  const filtered = data.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase())
  )

  const sorted = [...filtered].sort((a, b) => {
    const valA = a[sortField]
    const valB = b[sortField]
    if (valA < valB) return sortOrder === 'asc' ? -1 : 1
    if (valA > valB) return sortOrder === 'asc' ? 1 : -1
    return 0
  })

  const totalPages = Math.ceil(sorted.length / rowsPerPage)
  const paginated = sorted.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  )

  return (
    <div className="p-4">
      <div className="flex justify-end mb-4">
        <input
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border rounded bg-gray-800 text-white w-64 mb-4"
        />
      </div>

      <table className="w-full border text-left bg-gradient-to-r from-gray-800 to-white-300 text-white">
        <thead>
          <tr>
            <th className="border p-2">Name</th>
            <th
              className="border p-2 cursor-pointer"
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            >
              Value {sortOrder === 'asc' ? '▲' : '▼'}
            </th>
          </tr>
        </thead>
        <tbody>
          {paginated.map((row, i) => (
            <tr key={i} className="hover:bg-gray-700 transition">
              <td className="border p-2">{row.name}</td>
              <td className="border p-2">{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-center mt-4 gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === i + 1 ? 'bg-gray-600 text-gray' : 'bg-gray-900'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  )
}
