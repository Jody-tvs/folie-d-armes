import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Home from './pages/Home'
import Login from './pages/user/Login'
import Register from './pages/user/Register'
import Contact from './pages/Contact'
import Header from './components/Header'
import Footer from './components/Footer'
import Rgpd from './pages/Rgpd'
import ConditionsGenerales from './pages/ConditionsGenerales'
import Profil from './pages/user/Profil'
import UserOrders from './pages/user/UserOrders'
import Basket from './pages/user/Basket'
import ProductDetail from './pages/product/ProductDetail'
import CategoryPage from './pages/CategoryPage'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminRoute from './components/AdminRoute'
import './styles/App.scss'
import '@fortawesome/fontawesome-free/css/all.min.css'
import { AuthProvider } from './context/AuthContext'
import AdminProducts from './pages/admin/AdminProducts'
import AdminOrders from './pages/admin/AdminOrders'
import AddProduct from './pages/admin/AddProduct'
import EditProduct from './pages/admin/EditProduct'
import OrderDetail from './pages/orders/OrderDetail'
import AdminMessages from './pages/admin/AdminMessages'
import Payment from './pages/user/Payment'
import Success from './pages/Success'

function App() {
  const dispatch = useDispatch() //permet d'envoyer des actions à Redux
  const { user } = useSelector((state) => state.auth) //sélectionne les infos de l'utilisateur dans le store Redux

  //effet qui s'exécute après la connexion d'un utilisateur
  useEffect(() => {
    if (user) {
        //action à exécuter après la connexion de l'utilisateur
    }
  }, [user, dispatch]) //hook useEffect se déclenche à chaque fois que user ou dispatch change

  return (
    <AuthProvider> {/* fournit le contexte d'authentification à toute l'application */}
      <Router>
        <div className="app">
          <Header /> {/* affiche la barre de navigation */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/rgpd" element={<Rgpd />} />
            <Route path="/conditions-generales" element={<ConditionsGenerales />} />
            <Route path="/basket" element={<Basket />} />
            <Route path="/orders" element={<UserOrders />} /> 

            <Route path="/productdetails/:id" element={<ProductDetail />} />
            <Route path="/profil" element={<Profil />} />
            <Route path="/:category" element={<CategoryPage />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/success" element={<Success />} />

            {/* protéger avec AdminRoute */}
            <Route
              path="/admin/dashboard"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/products"
              element={
                <AdminRoute>
                  <AdminProducts />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/orders"
              element={
                <AdminRoute>
                  <AdminOrders />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/addproduct"
              element={
                <AdminRoute>
                  <AddProduct />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/editproduct/:id"
              element={
                <AdminRoute>
                  <EditProduct />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/order/:id"
              element={
                <AdminRoute>
                  <OrderDetail />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/messages"
              element={
                <AdminRoute>
                  <AdminMessages />
                </AdminRoute>
              }
            />
          </Routes>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App