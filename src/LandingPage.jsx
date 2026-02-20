import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Search, ShoppingCart, Facebook, Instagram, Twitter } from "lucide-react";


export default function LandingPage() {
  const navigate = useNavigate();

  const handleShopNow = () => {
    navigate("/products");
  };

  return (
    <div className="min-h-screen flex flex-col">
     

      {/* ===== Hero Section ===== */}
      <section className="relative flex-1">
        <img
          src="/Nathan Waller.jpg" // Put your hero image in public/
          alt="Vape Hero"
          className="w-full h-[60vh] object-cover"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-40 text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
           
          </h2>
          <p className="text-3xl font-bold md:text-xl mb-6 text-center">
            Premium flavors and quality products delivered to your doorstep.
          </p>
          
        </div>
      </section>

 
{/* ===== Product Card Section ===== */}
<section className="max-w-7xl mx-auto py-16 px-4 flex justify-center">
  
  <div className="w-full md:w-[400px] bg-white rounded-2xl shadow-2xl overflow-hidden">
    
    {/* Image */}
    <img
      src="/PRO BAR.png"
      alt="ELEVAPE PRO BAR"
      className="w-full h-[250px] object-cover"
    />

    {/* Card Content */}
    <div className="p-6 text-center">
      
      <h1 className="text-2xl md:text-3xl font-bold mb-3">
        ELEVAPE PRO BAR
      </h1>

      <p className="text-gray-600 font-bold mb-6">
        YEES! 10000 PUFFS
      </p>

      <button
        onClick={() => navigate("/products")}
        className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 text-lg"
      >
        Shop Now
      </button>

    </div>

  </div>

</section>
{/* ===== About Elevape Section ===== */}
<section className="bg-white py-16">
  <div className="max-w-5xl mx-auto px-6 text-center">
    
    <h2 className="text-2xl md:text-3xl font-bold mb-6">
      Elevape Australia
    </h2>

    <p className="text-gray-600 leading-relaxed mb-6">
      Shop the best selection of Elevape products at Australia’s trusted online vape store. 
      Elevape is known for sleek design, smooth performance, and bold flavour delivery — 
      built for vapers who value quality and consistency.
    </p>

    <p className="text-gray-600 leading-relaxed mb-6">
      At Elevape Australia, we offer a wide range of premium disposable and advanced 
      vape devices to suit every preference — from beginners to experienced users. 
      Explore a variety of refreshing flavours including fruity blends, icy finishes, 
      and classic favourites designed for smooth and satisfying sessions.
    </p>

    <p className="text-gray-600 leading-relaxed">
      We are committed to delivering exceptional service across Australia, ensuring 
      a seamless shopping experience, fast delivery, and reliable support. 
      Thank you for choosing Elevape — your destination for premium vaping products.
    </p>

  </div>
</section>

</div>
  );
}