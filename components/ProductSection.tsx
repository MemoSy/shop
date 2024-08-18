// components/ProductSection.tsx
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ShoppingCartIcon, EyeIcon, HeartIcon } from '@heroicons/react/24/outline'
import AddProductForm from './AddProductForm'

interface Product {
  id: number
  name: string
  price: number
  image: string
}

interface ProductCardProps {
  product: Product
  addToCart: (product: Product) => void
  isFavorite: boolean
  toggleFavorite: (productId: number) => void
}

const ProductCard: React.FC<ProductCardProps> = ({ product, addToCart, isFavorite, toggleFavorite }) => {
  return (
    <motion.div
      className="relative group"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <img src={product.image} alt={product.name} className="w-full h-64 object-cover rounded-lg" />
      {isFavorite && (
        <HeartIcon className="absolute top-2 right-2 h-6 w-6 text-red-500 bg-white rounded-full p-1" />
      )}
      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center space-x-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-2 bg-white rounded-full"
          onClick={() => addToCart(product)}
        >
          <ShoppingCartIcon className="h-6 w-6 text-black" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-2 bg-white rounded-full"
        >
          <EyeIcon className="h-6 w-6 text-black" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`p-2 rounded-full ${isFavorite ? 'bg-red-500' : 'bg-white'}`}
          onClick={() => toggleFavorite(product.id)}
        >
          <HeartIcon className={`h-6 w-6 ${isFavorite ? 'text-white' : 'text-black'}`} />
        </motion.button>
      </div>
      <div className="mt-2 text-center">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-gray-600">${product.price}</p>
      </div>
    </motion.div>
  )
}

interface ProductSectionProps {
  products: Product[]
  addToCart: (product: Product) => void
  favorites: number[]
  toggleFavorite: (productId: number) => void
  addProduct: (product: Omit<Product, 'id'>) => void
}

const ProductSection: React.FC<ProductSectionProps> = ({ products, addToCart, favorites, toggleFavorite, addProduct }) => {
  const [isAddProductOpen, setIsAddProductOpen] = useState(false)

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Our Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={addToCart}
              isFavorite={favorites.includes(product.id)}
              toggleFavorite={toggleFavorite}
            />
          ))}
        </div>
        <div className="mt-8 text-center">
          <button
            onClick={() => setIsAddProductOpen(true)}
            className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-colors"
          >
            Add Product
          </button>
        </div>
      </div>
      <AddProductForm
        isOpen={isAddProductOpen}
        onClose={() => setIsAddProductOpen(false)}
        onAddProduct={addProduct}
      />
    </section>
  )
}

export default ProductSection