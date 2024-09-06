import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Folie d'Armes</h1>
        <p>Bienvenue sur le site d'armes et d'accessoires.</p>
      </header>

      <nav className="home-nav">
        <ul>
          <li><Link to="/categories/armes">Armes</Link></li>
          <li><Link to="/categories/accessoires">Accessoires</Link></li>
          <li><Link to="/categories/munitions">Munitions</Link></li>
        </ul>
      </nav>

      <section className="home-intro">
        <h2>A propos</h2>
        <p>Faire un texte sur pourquoi folie d'armes etc...</p>
      </section>

      <footer className="home-footer">
        <p>&copy; 2024 Folie d'Armes. Tous droits réservés.</p>
      </footer>
    </div>
  )
}

export default Home
