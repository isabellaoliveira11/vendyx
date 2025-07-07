// src/routes/index.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import ProductManager from '../components/ProductManager';
import Sales from '../pages/Sales'; // 👈 importa a nova página

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
<Route path="/produtos" element={<ProductManager />} />
                <Route path="/vendas" element={<Sales />} /> {/* 👈 nova rota aqui */}

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
