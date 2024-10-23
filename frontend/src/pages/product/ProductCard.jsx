import React from 'react'
import Carousel from 'react-bootstrap/Carousel'

//le composant reçoit un objet product en tant que prop contenant les informations du produit
function ProductCard({ product }) {
  //URL du back pour accéder aux images stocker dans le répertoire public
  const backendURL = 'http://localhost:9500/public/images/'

  return (
    <div className="product-card">
      {/* conteneur pour afficher la carte du produit */}
      <h3>{product.name}</h3>
      {product.images && product.images.length > 0 ? (
          //vérifi si le produit possède des images et si leur longueur est supérieure à 0
        <Carousel>
          {/* affiche un carrousel avec les images du produit */}
          {product.images.map((image, idx) => (
            <Carousel.Item key={idx}>
              <img
                className="d-block w-100"
                src={`${backendURL}${image}`}  //utilise l'url du back
                alt={product.alt || `Image de ${product.name}`}
              />
            </Carousel.Item>
          ))}
        </Carousel>
      ) : (
        //si le produit n'a pas d'images on affiche un message
        <p>Aucune image disponible</p>
      )}
      <p>{product.description}</p>
      <p>{product.price} €</p>
      <button>Ajouter au panier</button>
    </div>
  )
}

export default ProductCard