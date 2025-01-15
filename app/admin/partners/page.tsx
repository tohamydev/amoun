'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function PartnersManagement() {
  const [partners, setPartners] = useState([])
  const [newPartner, setNewPartner] = useState({ name: '', logo: null })

  useEffect(() => {
    fetchPartners()
  }, [])

  const fetchPartners = async () => {
    const response = await fetch('/api/partners')
    const data = await response.json()
    setPartners(data)
  }

  const handleAddPartner = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('name', newPartner.name)
    formData.append('logo', newPartner.logo)

    await fetch('/api/partners', {
      method: 'POST',
      body: formData
    })

    setNewPartner({ name: '', logo: null })
    fetchPartners()
  }

  const handleDeletePartner = async (id) => {
    if (confirm('Are you sure you want to delete this partner?')) {
      await fetch(`/api/partners/${id}`, { method: 'DELETE' })
      fetchPartners()
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-5">Partners Management</h1>
      <form onSubmit={handleAddPartner} className="mb-8">
        <input
          type="text"
          value={newPartner.name}
          onChange={(e) => setNewPartner({ ...newPartner, name: e.target.value })}
          placeholder="Partner Name"
          className="border p-2 mr-2"
          required
        />
        <input
          type="file"
          onChange={(e) => setNewPartner({ ...newPartner, logo: e.target.files[0] })}
          accept="image/*"
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Partner
        </button>
      </form>
      <div className="grid grid-cols-3 gap-4">
        {partners.map((partner) => (
          <div key={partner.id} className="border p-4">
            <Image src={partner.logo || "/placeholder.svg"} alt={partner.name} width={100} height={100} />
            <p>{partner.name}</p>
            <button onClick={() => handleDeletePartner(partner.id)} className="text-red-500">
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

