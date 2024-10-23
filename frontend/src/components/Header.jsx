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
  const navigate = useNavigate() //hook pour la navigation entre les pages
  const dispatch = useDispatch() //hook pour envoyer des actions à redux
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false) //gère l'ouverture/fermeture du menu mobile
  const [selectedCategory, setSelectedCategory] = useState('') //état pour la catégorie sélectionnée

  //utilise redux pour récupérer les articles du panier et l'état de l'utilisateur connecté
  const cartItems = useSelector((state) => state.basket.basket) //récupère des articles du panier
  const { isAuthenticated, isAdmin } = useSelector((state) => state.auth) //récupère de l'état de connexion et du statut d'admin
  

  //gère la déconnexion
  const handleLogout = () => {
    //supprime le token de l'utilisateur pour le déconnecter
    localStorage.removeItem('token') //suppression du token de localStorage
    dispatch(clearBasket()) //vide le panier dans létat global redux
    dispatch(logout()) //action pour déconnecter l'utilisateur dans redux
    setIsMobileMenuOpen(false) //ferme le menu mobile
    setSelectedCategory('') //réinitialise la catégorie sélectionner
    navigate('/login') //redirige vers la page de connexion
  }

  //gère le changement de catégorie dans le menu déroulant
  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value //récupère la catégorie sélectionner
    if (selectedCategory) {
      setSelectedCategory(selectedCategory) //met à jour l'état avec la catégorie choisie
      navigate(`/${selectedCategory}`) //redirige vers la page correspondante à la catégorie
      setIsMobileMenuOpen(false) //ferme le menu mobile
    }
  }

  //gère l'ouverture/fermeture du menu mobile
  const handleMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen) //alterne entre ouvert et fermer
  }

  //gère la réinitialisation de la catégorie sélectionner et ferme le menu mobile lors du clic sur un lien
  const handleLinkClick = () => {
    setSelectedCategory('') //réinitialise la catégorie
    setIsMobileMenuOpen(false) //ferme le menu mobile
  }

  return (
    <header>
      <nav className="nav-bar">
        <div className="nav-logo">
          {/* Lien pour revenir à la page d'accueil en cliquant sur le logo */}
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