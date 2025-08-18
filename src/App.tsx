import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import MainLayout from "./layout/MainLayout";
import './index.css'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const token = localStorage.getItem("token");
  const isGuest = localStorage.getItem("guestMode") === "true";
  if (!token && !isGuest) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

function PublicOnlyRoute({ children }: { children: React.ReactNode }) {
  const token = localStorage.getItem("token");
  if (token) return <Navigate to="/home" replace />;
  return <>{children}</>;
}

function ScrollToTop() {
  window.scrollTo(0, 0);
  return null;
}

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Sales = lazy(() => import("./pages/Sales"));
const Reports = lazy(() => import("./pages/Reports"));
const Categorias = lazy(() => import("./components/CategoryManager")); 
const Clientes = lazy(() => import("./pages/Clientes"));
const ProductManager = lazy(() => import("./components/ProductManager"));
const Financial = lazy(() => import("./pages/Financial"));
const Users = lazy(() => import("./pages/Users"));
const About = lazy(() => import("./pages/About"));
const NotFound = lazy(() => import("./pages/NotFound"));

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<div className="p-6 text-center">Carregando…</div>}>
        <Routes>
          <Route
            path="/login"
            element={
              <PublicOnlyRoute>
                <Login />
              </PublicOnlyRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicOnlyRoute>
                <Register />
              </PublicOnlyRoute>
            }
          />
          <Route
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<Home />} />
            <Route path="/clientes" element={<Clientes />} />
            <Route path="/produtos" element={<ProductManager />} />
            <Route path="/categorias" element={<Categorias />} />
            <Route path="/vendas" element={<Sales />} />
            <Route path="/relatorios" element={<Reports />} />
            <Route path="/financeiro" element={<Financial />} />
            <Route path="/usuarios" element={<Users />} />
            <Route path="/sobre" element={<About />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
