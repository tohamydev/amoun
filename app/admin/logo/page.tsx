'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function LogoManagement() {
  const [logo, setLogo] = useState(null)
  const [newLogo, setNewLogo] = useState(null)

  useEffect(() => {
    fetchLogo()
  }, [])

  const fetchLogo = async () => {
    const response = await fetch('/api/logo')
    const data = await response.json()
    setLogo(data)
  }

  const handleChangeLogo = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('logo', newLogo)

    await fetch('/api/logo', {
      method: 'POST',
      body: formData
    })

    setNewLogo(null)
    fetchLogo()
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-5">Logo Management</h1>
      {logo && (
        <div className="mb-8">
          <h2 className="text-xl mb-2">Current Logo</h2>
          <Image src={logo.url || "/placeholder.svg"} alt="Current Logo" width={200} height={100} />
        </div>
      )}
      <form onSubmit={handleChangeLogo}>
        <input
          type="file"
          onChange={(e) => setNewLogo(e.target.files[0])}
          accept="image/*"
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Change Logo
        </button>
      </form>
    </div>
  )
}

