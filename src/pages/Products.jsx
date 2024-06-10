import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './css/Products.css'; // Import your CSS file

const axiosInstance = axios.create({
  baseURL: 'https://kyzen-backend-1.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

const setAuthToken = (token) => {
  if (token) {
    axiosInstance.defaults.headers.Authorization = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.Authorization;
  }
};

const Products = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    type: '',
    imageUrl: '',
  });
  const [editingProduct, setEditingProduct] = useState(null);
  const [id, setId] = useState(null);

  const fetchProducts = async () => {
    try {
      const userId = JSON.parse(localStorage.getItem('user'));
      setId(userId);
      setAuthToken(localStorage.getItem('token'));
      const response = await axiosInstance.get(`/users/${userId}/products`);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const addProduct = async () => {
    try {
      const userId = JSON.parse(localStorage.getItem('user'));
      await axiosInstance.post(`/users/${userId}/products`, newProduct);
      fetchProducts();
      setNewProduct({ name: '', price: '', type: '', imageUrl: '' });
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const deleteProduct = async (productId) => {
    try {
      const userId = JSON.parse(localStorage.getItem('user'));
      await axiosInstance.delete(`/users/${userId}/products/${productId}`);
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const editProduct = async () => {
    try {
      const userId = JSON.parse(localStorage.getItem('user'));
      await axiosInstance.put(`/users/${userId}/products/${editingProduct.id}`, editingProduct);
      fetchProducts();
      setEditingProduct(null);
    } catch (error) {
      console.error('Error editing product:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="products-container">
      <h2>All Products</h2>
      <div className="products-grid">
        {products?.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.imageUrl} alt={product.name} className="product-image" />
            <div className="product-details">
              <h3>Product Name:- {product.name}</h3>
              <p>Price:- ${product.price}</p>
              <p>Product Type:- {product.type}</p>
              <button className="product-button" onClick={() => deleteProduct(product.id)}>Delete</button>
              {editingProduct && editingProduct.id === product.id ? (
                <div className="edit-product-form">
                  <input
                    type="text"
                    value={editingProduct.name}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, name: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    value={editingProduct.price}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, price: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    value={editingProduct.type}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, type: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    value={editingProduct.imageUrl}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, imageUrl: e.target.value })
                    }
                  />
                  <button className="product-button" onClick={editProduct}>Save</button>
                </div>
              ) : (
                <button className="product-button" onClick={() => setEditingProduct(product)}>Edit</button>
              )}
            </div>
          </div>
        ))}
      </div>
      <h3>Add Products</h3>
      <div className="add-product-form">
        <input
          type="text"
          placeholder="Name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
        />
        <input
          type="text"
          placeholder="Type"
          value={newProduct.type}
          onChange={(e) => setNewProduct({ ...newProduct, type: e.target.value })}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={newProduct.imageUrl}
          onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })}
        />
        <button className="product-button" onClick={addProduct}>Add Product</button>
      </div>
    </div>
  );
};

export default Products;
