// src/App.tsx - VERSÃO FINAL E CORRETA

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layout/MainLayout'; // Importe o novo layout

// Importe TODAS as suas páginas
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Sales from './pages/Sales';
import Reports from './pages/Reports';
import Categorias from './pages/categorias';
import Clientes from './pages/Clientes';
import ProductManager from './components/ProductManager'; // Note que isso é um componente, não uma página. Idealmente seria uma página.

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
            <Route path="/" element={<Navigate to="/home" />} /> {/* Redireciona a raiz para /home */}
            <Route path="/home" element={<Home />} />
            <Route path="/clientes" element={<Clientes />} />
            <Route path="/produtos" element={<ProductManager />} />
            <Route path="/categorias" element={<Categorias />} />
            <Route path="/vendas" element={<Sales />} />
            <Route path="/relatorios" element={<Reports />} />
          </Route>
        </Routes>
      </BrowserRouter>
      {/* O Toaster pode ficar aqui, se você tiver um */}
    </>
  );
}

export default App;