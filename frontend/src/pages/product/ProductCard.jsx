import React from 'react'
import Carousel from 'react-bootstrap/Carousel'

function ProductCard({ product }) {
  const backendURL = 'http://localhost:9500/public/images/'

  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      {product.images && product.images.length > 0 ? (
        <Carousel>
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
        <p>Aucune image disponible</p>
      )}
      <p>{product.description}</p>
      <p>{product.price} €</p>
      <button>Ajouter au panier</button>
    </div>
  )
}

export default ProductCard