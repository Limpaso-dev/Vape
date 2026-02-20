import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

export default function AdminDashboardApp() {
  const [token, setToken] = useState(localStorage.getItem("adminToken") || "");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    stock: "",
    imageFile: null
  });

  const API = "http://localhost:5000/api";

  // Login
  const handleLogin = async () => {
    try {
      const res = await fetch(`${API}/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      console.log("Login response:", data);

      if (res.ok && data.token) {
        localStorage.setItem("adminToken", data.token);
        setToken(data.token);
      } else {
        alert(data.message || "Login failed! Check credentials.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login error! Check console.");
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setToken("");
  };

  // Fetch products
  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API}/products`);
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Fetch products error:", error);
    }
  };

  // Add product
  const addProduct = async () => {
    try {
      const formData = new FormData();
      formData.append("name", newProduct.name);
      formData.append("price", newProduct.price);
      formData.append("stock", newProduct.stock);
      if (newProduct.imageFile) {
        formData.append("image", newProduct.imageFile);
      }

      const res = await fetch(`${API}/products`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      });

      const data = await res.json();
      console.log("Added product:", data);
      setNewProduct({ name: "", price: "", stock: "", imageFile: null });
      fetchProducts();
    } catch (err) {
      console.error("Add product error:", err);
      alert("Failed to add product! Check console.");
    }
  };

  // Delete product
  const deleteProduct = async (id) => {
    try {
      await fetch(`${API}/products/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchProducts();
    } catch (error) {
      console.error("Delete product error:", error);
    }
  };

  useEffect(() => {
    if (token) fetchProducts();
  }, [token]);

  // Login form
  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Card className="w-full max-w-md p-6 rounded-2xl shadow-lg">
          <CardContent className="space-y-4">
            <h2 className="text-2xl font-bold">Admin Login</h2>
            <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button className="w-full" onClick={handleLogin}>Login</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Dashboard
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <Button className="mb-4" onClick={handleLogout}>Logout</Button>

      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-6"
      >
        Admin Dashboard
      </motion.h1>

      <Card className="mb-8 rounded-2xl shadow-md">
        <CardContent className="p-6 space-y-4">
          <h2 className="text-xl font-semibold">Add Product</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Input
              placeholder="Product Name"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            />
            <Input
              placeholder="Price"
              type="number"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            />
            <Input
              placeholder="Stock"
              type="number"
              value={newProduct.stock}
              onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setNewProduct({ ...newProduct, imageFile: e.target.files[0] })}
            />
          </div>
          <Button onClick={addProduct}>Add Product</Button>
        </CardContent>
      </Card>

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
              <Button variant="destructive" onClick={() => deleteProduct(product._id)}>
                Delete
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
