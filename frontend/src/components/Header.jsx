import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { clearBasket } from '../slices/basketSlice'
import { logout } from '../slices/authSlice' 
import logo from '/logo/logo.png'
import '../styles/header.scss'

function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('')

  //utilise redux pour récupérer les articles du panier et l'état de l'utilisateur connecté
  const cartItems = useSelector((state) => state.basket.basket)
  const { isAuthenticated, isAdmin } = useSelector((state) => state.auth) 
  

  //gère la déconnexion
  const handleLogout = () => {
    //déconnecte l'utilisateur et vide le panier
    localStorage.removeItem('token')
    dispatch(clearBasket()) //vide le panier dans redux
    dispatch(logout()) //utilise l'action de déconnexion depuis redux
    setIsMobileMenuOpen(false)
    setSelectedCategory('')
    navigate('/login')
  }

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value
    if (selectedCategory) {
      setSelectedCategory(selectedCategory)
      navigate(`/${selectedCategory}`)
      setIsMobileMenuOpen(false)
    }
  }

  const handleMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const handleLinkClick = () => {
    setSelectedCategory('')
    setIsMobileMenuOpen(false)
  }

  return (
    <header>
      <nav className="nav-bar">
        <div className="nav-logo">
          <Link to="/" onClick={handleLinkClick}>
            <img src={logo} alt="Logo Folie d'Armes" className="logo" />
          </Link>
        </div>

        <ul className={`nav-links ${isMobileMenuOpen ? 'open' : ''}`}>
          <li>
            <div className="category-dropdown">
              <select onChange={handleCategoryChange} value={selectedCategory}>
                <option value="">Catégories</option>
                <option value="armes">Armes</option>
                <option value="munitions">Munitions</option>
                <option value="accessoires">Accessoires</option>
              </select>
            </div>
          </li>
          
          {isAuthenticated && isAdmin && (
            <li>
              <Link to="/admin/dashboard" onClick={handleLinkClick}>
                Dashboard
              </Link>
            </li>
          )}

          <li><Link to="/" onClick={handleLinkClick}>Accueil</Link></li>
          <li><Link to="/contact" onClick={handleLinkClick}>Contactez-nous</Link></li>
          {isAuthenticated ? (
            <>
              <li><Link to="/profil" onClick={handleLinkClick}>Mon compte</Link></li>
              <li><Link to="/orders" onClick={handleLinkClick}>Mes commandes</Link></li>

              <li>
                <Link to="/basket" onClick={handleLinkClick} className="basket-link">
                  <FontAwesomeIcon icon={faShoppingCart} />
                  {cartItems.length > 0 && (
                    <span className="cart-count">{cartItems.length}</span>
                  )}
                </Link>
              </li>

              <li>
                <a onClick={handleLogout} style={{ cursor: 'pointer' }}>Déconnexion</a>
              </li>
            </>
          ) : (
            <>
              <li><Link to="/login" onClick={handleLinkClick}>Connexion</Link></li>
              <li><Link to="/register" onClick={handleLinkClick}>S'enregistrer</Link></li>
            </>
          )}
        </ul>

        <div className="nav-toggle" onClick={handleMenuToggle}>
          ☰
        </div>
      </nav>
    </header>
  )
}

export default Header