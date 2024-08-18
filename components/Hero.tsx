"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "./Header";

const slides = [
  {
    title: "Luxury Furniture",
    subtitle: "Elevate Your Living Space",
    gradient: "bg-gradient-to-r from-purple-500 to-pink-500",
  },
  {
    title: "Modern Design",
    subtitle: "Transform Your Home",
    gradient: "bg-gradient-to-r from-blue-500 to-green-500",
  },
  {
    title: "Comfort & Style",
    subtitle: "The Perfect Combination",
    gradient: "bg-gradient-to-r from-yellow-500 to-red-500",
  },
];

const Hero = ({ cartItems, addToCart, removeFromCart }: any) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);
  return (
    <div className="relative h-screen">
      <Header cartItems={cartItems} addToCart={addToCart} removeFromCart={removeFromCart} />
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className={`absolute inset-0 ${slides[currentSlide].gradient}`}
        >
          <div className="relative h-full flex items-center justify-center text-white">
            <div className="text-center">
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-6xl font-bold mb-4"
              >
                {slides[currentSlide].title}
              </motion.h1>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-2xl mb-8"
              >
                {slides[currentSlide].subtitle}
              </motion.p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-black px-8 py-3 rounded-full text-lg font-semibold"
              >
                Shop Now
              </motion.button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Hero;
