import React from 'react';

const Armes = () => {
  return (
    <div className="armes-container">
      <header className="armes-header">
        <h1>Nos Armes</h1>
        <p>Découvrez notre collection d'armes.</p>
      </header>

      <section className="armes-products">
        <div className="product-grid">
          <div className="product-card">
            <img src="path-to-image-1.jpg" alt="Arme 1" />
            <h3>nom de l'arme</h3>
            <p>Description</p>
            <button>Ajouter au Panier</button>
          </div>
          <div className="product-card">
            <img src="path-to-image-2.jpg" alt="Arme 2" />
            <h3>nom de l'arme</h3>
            <p>Description</p>
            <button>Ajouter au Panier</button>
          </div>
          <div className="product-card">
            <img src="path-to-image-3.jpg" alt="Arme 3" />
            <h3>nom de l'arme</h3>
            <p>Description</p>
            <button>Ajouter au Panier</button>
          </div>
        </div>
      </section>

      <footer className="armes-footer">
        <p>&copy; 2024 Folie d'Armes. Tous droits réservés.</p>
      </footer>
    </div>
  );
};

export default Armes;
