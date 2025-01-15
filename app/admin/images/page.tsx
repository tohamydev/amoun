'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function ImagesManagement() {
  const [images, setImages] = useState([])
  const [newImage, setNewImage] = useState(null)

  useEffect(() => {
    fetchImages()
  }, [])

  const fetchImages = async () => {
    const response = await fetch('/api/images')
    const data = await response.json()
    setImages(data)
  }

  const handleUploadImage = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('image', newImage)

    await fetch('/api/images', {
      method: 'POST',
      body: formData
    })

    setNewImage(null)
    fetchImages()
  }

  const handleDeleteImage = async (id) => {
    if (confirm('Are you sure you want to delete this image?')) {
      await fetch(`/api/images/${id}`, { method: 'DELETE' })
      fetchImages()
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-5">Images Management</h1>
      <form onSubmit={handleUploadImage} className="mb-8">
        <input
          type="file"
          onChange={(e) => setNewImage(e.target.files[0])}
          accept="image/*"
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Upload Image
        </button>
      </form>
      <div className="grid grid-cols-3 gap-4">
        {images.map((image) => (
          <div key={image.id} className="border p-4">
            <Image src={image.url || "/placeholder.svg"} alt={image.name} width={200} height={200} />
            <p>{image.name}</p>
            <button onClick={() => handleDeleteImage(image.id)} className="text-red-500">
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

