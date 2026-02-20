import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

export default function CustomerView() {
  const [products, setProducts] = useState([]);
  const API = "http://localhost:5000/api";

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API}/products`);
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ===== Small Purple Hero ===== */}
      <section className="w-full bg-gradient-to-r from-purple-100 to-purple-300 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-7xl font-bold text-black mb-3">
            Elevape Pro Bar
          </h1>
          <p className="text-black-100 text-3xl font-bold max-w-2x1 mx-auto">
            10 000 Puffs
          </p>
        </div>
      </section>

      {/* ===== Products Grid ===== */}
      <div className="max-w-7xl mx-auto p-8">

        {products.length === 0 ? (
          <p>No products available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Card key={product._id} className="rounded-2xl shadow-md">
                <CardContent className="p-4 space-y-2">
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <p>Price: ${product.price}</p>
                  <p>Stock: {product.stock}</p>

                  {product.image && (
                    <img
                      src={`http://localhost:5000${product.image}`}
                      alt={product.name}
                      className="w-full h-40 object-cover rounded"
                    />
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}