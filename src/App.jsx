import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
// import AddProduct from './pages/AddProduct';
// import EditProduct from './pages/EditProduct';
import Home from './pages/Home';
import Products from './pages/Products';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path='/' element={<Home />} /> 
          <Route path="/products" element={<Products />} />
          {/* <Route path="/edit-product/:id" element={<EditProduct />} /> */}
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
