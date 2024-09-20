import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Armes from './pages/Armes'
import Accessoires from './pages/Accessoires'
import Munitions from './pages/Munitions'



const App = () => (
  <Router>
    <layout>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/categories/armes" element={<Armes />} />
      <Route path="/categories/accessoires" element={<Accessoires />} />
      <Route path="/categories/munitions" element={<Munitions />} />
    </Routes>
    </layout>
  </Router>
)

export default App
