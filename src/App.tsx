// src/App.tsx

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layout/MainLayout';

// Importe TODAS as suas páginas
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Sales from './pages/Sales';
import Reports from './pages/Reports';
import Categorias from './pages/categorias';
import Clientes from './pages/Clientes';
import ProductManager from './components/ProductManager';
import Financial from './pages/Financial';
import Users from './pages/Users'; // 1. Importe a nova página aqui

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Rota 1: Rotas Públicas (sem sidebar) */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Rota 2: Rotas Privadas (que usam o MainLayout) */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/clientes" element={<Clientes />} />
            <Route path="/produtos" element={<ProductManager />} />
            <Route path="/categorias" element={<Categorias />} />
            <Route path="/vendas" element={<Sales />} />
            <Route path="/relatorios" element={<Reports />} />
            <Route path="/financeiro" element={<Financial />} />
            {/* 2. Adicione a nova rota aqui */}
            <Route path="/usuarios" element={<Users />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
