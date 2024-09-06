// src/pages/Armes.jsx
import React from 'react';

const Accessoires = () => {
  return (
    <div className="accessoires-container">
      <header className="accessoires-header">
        <h1>Nos Accessoires</h1>
        <p>Découvrez notre collection d'accessoire.</p>
      </header>

      <section className="accessoires-products">
        <div className="product-grid">
          <div className="product-card">
            <img src="path-to-image-1.jpg" alt="Accessoires 1" />
            <h3>nom de l'accessoire</h3>
            <p>Description</p>
            <button>Ajouter au Panier</button>
          </div>
          <div className="product-card">
            <img src="path-to-image-2.jpg" alt="Accessoires 2" />
            <h3>nom de l'accessoire</h3>
            <p>Description</p>
            <button>Ajouter au Panier</button>
          </div>
          <div className="product-card">
            <img src="path-to-image-3.jpg" alt="Accessoires 3" />
            <h3>nom de l'accessoire</h3>
            <p>Description</p>
            <button>Ajouter au Panier</button>
          </div>
        </div>
      </section>

      <footer className="accessoires-footer">
        <p>&copy; 2024 Folie d'Armes. Tous droits réservés.</p>
      </footer>
    </div>
  );
};

export default Accessoires;
