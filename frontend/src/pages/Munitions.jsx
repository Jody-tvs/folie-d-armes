// src/pages/Armes.jsx
import React from 'react';

const Munitions = () => {
  return (
    <div className="munitions-container">
      <header className="munitions-header">
        <h1>Nos Munitions</h1>
        <p>Découvrez notre collection de munitions.</p>
      </header>

      <section className="munitions-products">
        <div className="product-grid">
          <div className="product-card">
            <img src="path-to-image-1.jpg" alt="Munitions 1" />
            <h3>nom de munition</h3>
            <p>Description</p>
            <button>Ajouter au Panier</button>
          </div>
          <div className="product-card">
            <img src="path-to-image-2.jpg" alt="Munitions 2" />
            <h3>nom de munition</h3>
            <p>Description</p>
            <button>Ajouter au Panier</button>
          </div>
          <div className="product-card">
            <img src="path-to-image-3.jpg" alt="Munitions 3" />
            <h3>nom de munition</h3>
            <p>Description</p>
            <button>Ajouter au Panier</button>
          </div>
        </div>
      </section>

      <footer className="munitions-footer">
        <p>&copy; 2024 Folie d'Armes. Tous droits réservés.</p>
      </footer>
    </div>
  );
};

export default Munitions;
