// app/page.js
'use client'

import { useState, useEffect } from 'react'
import Hero from '../components/Hero'
import ProductSection from '../components/ProductSection'
import Footer from '../components/Footer'

export default function Home() {
  const [cartItems, setCartItems] = useState([])
  const [favorites, setFavorites] = useState([])
  const [products, setProducts] = useState([
    { id: 1, name: 'Elegant Sofa', price: 1299, image: '/1.jpg' },
    { id: 2, name: 'Modern Dining Table', price: 899, image: '/2.jpg' },
    { id: 3, name: 'Luxurious Bed Frame', price: 1599, image: '/3.jpg' },
    { id: 4, name: 'Stylish Armchair', price: 599, image: '/4.jpg' },
    { id: 5, name: 'Minimalist Bookshelf', price: 449, image: '/5.jpg' },
    { id: 6, name: 'Chic Coffee Table', price: 349, image: '/6.jpg' },
    { id: 7, name: 'Cozy Recliner', price: 799, image: '/7.jpg' },
    { id: 8, name: 'Sleek TV Stand', price: 499, image: '/8.jpg' },
    { id: 9, name: 'Rustic Dining Chairs (Set of 4)', price: 699, image: '/9.jpg' },
    { id: 10, name: 'Modern Wardrobe', price: 1099, image: '/10.jpg' },
  ])

  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) setCartItems(JSON.parse(savedCart))

    const savedFavorites = localStorage.getItem('favorites')
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites))

    const savedProducts = localStorage.getItem('products')
    if (savedProducts) setProducts(JSON.parse(savedProducts))
  }, [])

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems))
  }, [cartItems])

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }, [favorites])

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products))
  }, [products])

  const addToCart = (product: any) => {
    setCartItems((prevItems: any) => {
      const existingItem = prevItems.find((item: any) => item.id === product.id)
      if (existingItem) {
        return prevItems.map((item: any) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...prevItems, { ...product, quantity: 1 }]
    })
  }

  const removeFromCart = (productId: any) => {
    setCartItems((prevItems: any) => {
      const existingItem = prevItems.find((item: any) => item.id === productId)
      if (existingItem.quantity === 1) {
        return prevItems.filter((item: any) => item.id !== productId)
      }
      return prevItems.map((item: any) =>
        item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
      )
    })
  }

  const toggleFavorite = (productId: any) => {
    setFavorites((prevFavorites: any) => {
      if (prevFavorites.includes(productId)) {
        return prevFavorites.filter((id: any) => id !== productId)
      }
      return [...prevFavorites, productId]
    })
  }

  const addProduct = (newProduct: any) => {
    setProducts((prevProducts) => [...prevProducts, { ...newProduct, id: Date.now() }])
  }

  return (
    <main>
      <Hero cartItems={cartItems} addToCart={addToCart} removeFromCart={removeFromCart} />
      <ProductSection
        products={products}
        addToCart={addToCart}
        favorites={favorites}
        toggleFavorite={toggleFavorite}
        addProduct={addProduct}
      />
      <Footer />
    </main>
  )
}