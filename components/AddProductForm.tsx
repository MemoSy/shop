// components/AddProductForm.tsx
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { XMarkIcon } from '@heroicons/react/24/outline'

interface AddProductFormProps {
  isOpen: boolean
  onClose: () => void
  onAddProduct: (product: { name: string; price: number; image: string }) => void
}

const AddProductForm: React.FC<AddProductFormProps> = ({ isOpen, onClose, onAddProduct }) => {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState<File | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !price || !image) return

    const formData = new FormData()
    formData.append('file', image)
    formData.append('upload_preset', 'fanw1bgc')

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/de4xbguwz/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      )
      const data = await response.json()
      const imageUrl = data.secure_url

      onAddProduct({ name, price: parseFloat(price), image: imageUrl })
      onClose()
      setName('')
      setPrice('')
      setImage(null)
    } catch (error) {
      console.error('Error uploading image:', error)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white p-6 rounded-lg w-96"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Add New Product</h2>
              <button onClick={onClose}>
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="price" className="block mb-2">Price</label>
                <input
                  type="number"
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="image" className="block mb-2">Image</label>
                <input
                  type="file"
                  id="image"
                  onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
                  className="w-full"
                  accept="image/*"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition-colors"
              >
                Add Product
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default AddProductForm