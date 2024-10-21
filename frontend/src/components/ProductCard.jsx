import React from 'react'
import '../styles/ProductCard.scss'

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <div className="product-images">
        {product.images.map((image, index) => (
          <img key={index} src={image} alt={`${product.title} - ${index + 1}`} />
        ))}
      </div>
      <h3>{product.title}</h3>
      <p>{product.description}</p>
      <p className="price">{product.price} €</p>
      <button onClick={() => alert('Ajouté au panier !')}>Ajouter au panier</button>
    </div>
  )
}

export default ProductCard