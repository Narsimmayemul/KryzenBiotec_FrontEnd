import React, { useState, useEffect } from 'react';
import axiosInstance from './axiosInstance';
import './css/Products.css'; // Import your CSS file

const Products = () => {
  const [editingProduct, setEditingProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    type: '',
    imageUrl: '',
  });

  const [time, setTime] = useState('');
  const [button, setButton] = useState('Schedule');
  const [added, setAdded] = useState('');
  const [scheduledProduct, setScheduledProduct] = useState({
    name: '',
    price: '',
    type: '',
    imageUrl: '',
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const userId = JSON.parse(localStorage.getItem('user'));
      const token = localStorage.getItem('token');
      if (!userId || !token) {
        throw new Error('User ID or token not found');
      }
      const response = await axiosInstance.get(`/users/${userId}/products`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const addProduct = async () => {
    try {
      const userId = JSON.parse(localStorage.getItem('user'));
      const token = localStorage.getItem('token');
      if (!userId || !token) {
        throw new Error('User ID or token not found');
      }
      await axiosInstance.post(`/users/${userId}/products`, newProduct, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchProducts();
      setNewProduct({ name: '', price: '', type: '', imageUrl: '' });
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const deleteProduct = async (productId) => {
    try {
      const userId = JSON.parse(localStorage.getItem('user'));
      const token = localStorage.getItem('token');
      if (!userId || !token) {
        throw new Error('User ID or token not found');
      }
      await axiosInstance.delete(`/users/${userId}/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const editProduct = async () => {
    try {
      const userId = JSON.parse(localStorage.getItem('user'));
      const token = localStorage.getItem('token');
      if (!userId || !token) {
        throw new Error('User ID or token not found');
      }
      await axiosInstance.put(`/users/${userId}/products/${editingProduct.id}`, editingProduct, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchProducts();
      setEditingProduct(null);
    } catch (error) {
      console.error('Error editing product:', error);
    }
  };

  const handleInputChange = (e, setProduct, product) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleScheduleSubmit = (e) => {
    e.preventDefault();
    setButton('Waiting for scheduled time to complete...')
    runAtSpecificTime(addScheduledProduct, time);
  };

  const runAtSpecificTime = (func, time) => {
    const now = new Date();
    const targetTime = new Date(time);

    if (targetTime <= now) {
      console.log("Please enter a future time.");
      return;
    }

    const delay = targetTime - now;
    setTimeout(func, delay);
  };

  const addScheduledProduct = async () => {
    try {
      setAdded('Product is being added...');
      const userId = JSON.parse(localStorage.getItem('user'));
      const token = localStorage.getItem('token');
      if (!userId || !token) {
        throw new Error('User ID or token not found');
      }
      await axiosInstance.post(`/users/${userId}/products`, scheduledProduct, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchProducts();
      setButton('Schedule');
      setScheduledProduct({ name: '', price: '', type: '', imageUrl: '' });
      setAdded('');
    } catch (error) {
      console.error('Error adding scheduled product:', error);
    }
  };

  return (
    <div className="products-container">
      <h2>All Products</h2>
      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.imageUrl} alt={product.name} className="product-image" />
            <div className="product-details">
              <h3>Product Name: {product.name}</h3>
              <p>Price: ${product.price}</p>
              <p>Product Type: {product.type}</p>
              <button className="product-button" onClick={() => deleteProduct(product.id)}>Delete</button>
              <button className="product-button" onClick={() => setEditingProduct(product)}>Edit</button>
              {editingProduct && editingProduct.id === product.id && (
                <div className="edit-product-form">
                  <input
                    type="text"
                    name="name"
                    value={editingProduct.name}
                    onChange={(e) => handleInputChange(e, setEditingProduct, editingProduct)}
                  />
                  <input
                    type="number"
                    name="price"
                    value={editingProduct.price}
                    onChange={(e) => handleInputChange(e, setEditingProduct, editingProduct)}
                  />
                  <input
                    type="text"
                    name="type"
                    value={editingProduct.type}
                    onChange={(e) => handleInputChange(e, setEditingProduct, editingProduct)}
                  />
                  <input
                    type="text"
                    name="imageUrl"
                    value={editingProduct.imageUrl}
                    onChange={(e) => handleInputChange(e, setEditingProduct, editingProduct)}
                  />
                  <button className="product-button" onClick={editProduct}>Save</button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <h3>Add Products</h3>
      <div className="add-product-form">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={newProduct.name}
          onChange={(e) => handleInputChange(e, setNewProduct, newProduct)}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) => handleInputChange(e, setNewProduct, newProduct)}
        />
        <input
          type="text"
          name="type"
          placeholder="Type"
          value={newProduct.type}
          onChange={(e) => handleInputChange(e, setNewProduct, newProduct)}
        />
        <input
          type="text"
          name="imageUrl"
          placeholder="Image URL"
          value={newProduct.imageUrl}
          onChange={(e) => handleInputChange(e, setNewProduct, newProduct)}
        />
        <button className="product-button" onClick={addProduct}>Add Product</button>
      </div>

      <div>
        <h1>Schedule a Function</h1>
        <form onSubmit={handleScheduleSubmit}>
          <div style={{ display: 'flex', flexDirection: 'column', width: '25%' }}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={scheduledProduct.name}
              onChange={(e) => handleInputChange(e, setScheduledProduct, scheduledProduct)}
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={scheduledProduct.price}
              onChange={(e) => handleInputChange(e, setScheduledProduct, scheduledProduct)}
            />
            <input
              type="text"
              name="type"
              placeholder="Type"
              value={scheduledProduct.type}
              onChange={(e) => handleInputChange(e, setScheduledProduct, scheduledProduct)}
            />
            <input
              type="text"
              name="imageUrl"
              placeholder="Image URL"
              value={scheduledProduct.imageUrl}
              onChange={(e) => handleInputChange(e, setScheduledProduct, scheduledProduct)}
            />
            <label htmlFor="time">Run at specific time (ISO format):</label>
            <p>{added}</p>
            <input
              type="datetime-local"
              id="time"
              name="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
          <br />
          <button type="submit">{button}</button>
        </form>
      </div>
    </div>
  );
};

export default Products;
