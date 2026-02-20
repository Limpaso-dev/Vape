import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const handleShopNow = () => {
    navigate("/products"); // route to CustomerView
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="relative w-full max-w-4xl">
        {/* Hero image */}
        <img
          src="/hero-image.jpg" // put your image inside public folder
          alt="Vapes Hero"
          className="w-full h-96 object-cover rounded-lg"
        />

        {/* CTA overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Button
            onClick={handleShopNow}
            className="bg-indigo-600 text-white px-6 py-3 text-lg rounded-lg hover:bg-indigo-700"
          >
            Shop Now
          </Button>
        </div>
      </div>
    </div>
  );
}
