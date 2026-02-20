// src/Layout.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, ShoppingCart, Facebook, Instagram, Twitter } from "lucide-react";

export default function Layout({ children }) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      {/* ===== Header / Navbar ===== */}
      <header className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md shadow-md z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          {/* Logo */}
          <div
            className="cursor-pointer"
            onClick={() => navigate("/")}
          >
            <h1 className="text-2xl font-extrabold tracking-tight">
              <span className="text-indigo-600">Ele</span>
              <span className="text-gray-900">vape</span>
            </h1>
            <p className="text-xs font-bold text-gray-500 tracking-widest">
              ELEVATE YOUR EXPERIENCE
            </p>
          </div>

          {/* Navigation */}
          <div className="flex items-center space-x-8">
            <button
              onClick={() => navigate("/")}
              className="text-black-700 font-bold hover:text-indigo-600 transition"
            >
              HOME
            </button>

            <button
              onClick={() => navigate("/products")}
              className="text-black-700 font-bold hover:text-indigo-600 transition"
            >
              PRODUCTS
            </button>

            <button
              onClick={() => navigate("/admin")}
              className="text-black-700 font-bold hover:text-indigo-600 transition"
            >
              ADMIN
            </button>

            {/* Search Icon */}
            <button className="text-gray-700 hover:text-indigo-600 transition">
              <Search size={20} />
            </button>

            {/* Cart Icon */}
            <button
              onClick={() => navigate("/cart")}
              className="relative text-gray-700 hover:text-indigo-600 transition"
            >
              <ShoppingCart size={20} />
              <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs rounded-full px-1.5 py-0.5">
                2
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* ===== Main Content ===== */}
      <main className="flex-1 pt-28">{children}</main>
      {/* pt-28 adds spacing so content doesn't hide behind fixed header */}

      {/* ===== Footer ===== */}
      <footer className="bg-slate-950 text-gray-300 pt-12 pb-8 mt-auto">
        <div className="max-w-7xl mx-auto px-3 grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Customer Support Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Customer Support</h3>
            <ul className="space-y-3 text-sm">
              <li className="hover:text-indigo-500 cursor-pointer transition">Customer Support</li>
              <li className="hover:text-indigo-500 cursor-pointer transition">Shipping Policy</li>
              <li className="hover:text-indigo-500 cursor-pointer transition">Payment Methods</li>
              <li className="hover:text-indigo-500 cursor-pointer transition">Privacy Policy</li>
              <li className="hover:text-indigo-500 cursor-pointer transition">Terms & Conditions</li>
              <li className="hover:text-indigo-500 cursor-pointer transition">Delivery Locations</li>
              <li className="hover:text-indigo-500 cursor-pointer transition">Customer Service</li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li className="hover:text-indigo-500 cursor-pointer transition">Checkout</li>
              <li className="hover:text-indigo-500 cursor-pointer transition">Cart</li>
              <li className="hover:text-indigo-500 cursor-pointer transition">Account</li>
              <li className="hover:text-indigo-500 cursor-pointer transition">Orders</li>
              <li className="hover:text-indigo-500 cursor-pointer transition">Lost Password</li>
              <li className="hover:text-indigo-500 cursor-pointer transition">Signup</li>
            </ul>
          </div>

          {/* Brand / IGET-Vape Section */}
          <div>
            <h3 className="text-white font-semibold mb-4">IGET-Vape</h3>
            <ul className="space-y-3 text-sm">
              <li className="hover:text-indigo-500 cursor-pointer transition">Shop</li>
              <li className="hover:text-indigo-500 cursor-pointer transition">Reviews</li>
              <li className="hover:text-indigo-500 cursor-pointer transition">Faqs</li>
              <li className="hover:text-indigo-500 cursor-pointer transition">Contact</li>
            </ul>

            {/* Social Icons */}
            <div className="flex space-x-4 mt-6">
              <Facebook className="hover:text-indigo-500 cursor-pointer transition" size={20} />
              <Instagram className="hover:text-indigo-500 cursor-pointer transition" size={20} />
              <Twitter className="hover:text-indigo-500 cursor-pointer transition" size={20} />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 mt-12 pt-6 text-center text-sm text-gray-500">
          © 2026 Elevape. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
