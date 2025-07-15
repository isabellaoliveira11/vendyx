import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import ProductManager from '../components/ProductManager';
import Sales from '../pages/Sales';
import Reports from '../pages/Reports'; 
import Register from '../pages/Register'; 


function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/produtos" element={<ProductManager />} />
        <Route path="/vendas" element={<Sales />} />
        <Route path="/relatorios" element={<Reports />} /> 
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
