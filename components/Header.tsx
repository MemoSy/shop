// components/Header.js
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ShoppingCartIcon,
  XMarkIcon,
  PlusIcon,
  MinusIcon,
} from "@heroicons/react/24/outline";

const Header = ({ cartItems, addToCart, removeFromCart }: any) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setIsScrolled(currentScrollY > 50);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const navItems = ["Home", "Shop", "About", "Contact"];

  const generateWhatsAppLink = () => {
    const phoneNumber = "905342967813"; // Replace with your WhatsApp number
    const message = cartItems
      .map(
        (item: any) =>
          `${item.name} - Quantity: ${item.quantity} - Total: $${
            item.price * item.quantity
          }`
      )
      .join("\n");

    const encodedMessage = encodeURIComponent(
      `Hello, I would like to purchase the following items:\n${message}`
    );

    return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  };

  const CartMenu = () => (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "tween", duration: 0.3 }}
      className="fixed top-0 right-0 w-2/5 h-full bg-white shadow-lg z-50 p-6 overflow-y-auto"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-black">Your Cart</h2>
        <button onClick={() => setIsCartOpen(false)}>
          <XMarkIcon className="h-6 w-6 text-black" />
        </button>
      </div>
      {cartItems.length === 0 ? (
        <p className="text-black">Your cart is empty</p>
      ) : (
        <>
          {cartItems.map((item: any) => (
            <div
              key={item.id}
              className="flex items-center justify-between mb-4 bg-gray-100 p-4 rounded-lg"
            >
              <div className="flex items-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-md mr-4"
                />
                <div>
                  <h3 className="font-semibold text-black">{item.name}</h3>
                  <p className="text-gray-600">${item.price * item.quantity}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="bg-gray-200 rounded-full p-1"
                >
                  <MinusIcon className="h-4 w-4 text-black" />
                </button>
                <span className="text-black">{item.quantity}</span>
                <button
                  onClick={() => addToCart(item)}
                  className="bg-gray-200 rounded-full p-1"
                >
                  <PlusIcon className="h-4 w-4 text-black" />
                </button>
              </div>
            </div>
          ))}
          <a
            href={generateWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-black text-white py-2 rounded-md mt-4 text-center block"
          >
            Complete Purchase
          </a>
        </>
      )}
    </motion.div>
  );

  return (
    <>
      <motion.header
        className={`fixed w-full z-40 transition-colors duration-300 ${
          isScrolled ? "bg-black text-white" : "bg-transparent text-white"
        }`}
        initial={{ y: 0 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.3 }}
      >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            Luxury Furniture
          </Link>
          <nav>
            <ul className="flex space-x-6 items-center">
              {navItems.map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase()}`}
                    className="relative group"
                  >
                    {item}
                    <motion.div
                      className="absolute bottom-0 left-0 w-0 h-0.5 bg-white rounded-full"
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                </li>
              ))}
              <li>
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="relative"
                >
                  <ShoppingCartIcon className="h-6 w-6" />
                  {cartItems.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                      {cartItems.length}
                    </span>
                  )}
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </motion.header>
      <AnimatePresence>{isCartOpen && <CartMenu />}</AnimatePresence>
    </>
  );
};

export default Header;
