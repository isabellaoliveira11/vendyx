// src/routes/index.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Products from '../pages/Products'; // ⬅️ adiciona isso

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/produtos" element={<Products />} /> {/* ⬅️ nova rota */}
        
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
