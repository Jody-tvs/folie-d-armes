import React from 'react'
import '../styles/ProductCard.scss'

//le composant reçoit un objet "product" en tant que prop contenant toutes les infos sur le produit
function ProductCard({ product }) {
  return (
    <div className="product-card">
      {/* conteneur principal pour la carte produit avec une classe pour la mise en page dans le fichier SCSS */}
      <div className="product-images">
        {/* conteneur pour afficher les images du produit */}
        {product.images.map((image, index) => (
          <img key={index} src={image} alt={`${product.title} - ${index + 1}`} />
          //boucle sur les images du produit (stockées dans un tableau) et affiche chaque image avec un texte alternatif
        ))}
      </div>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
      <p className="price">{product.price} €</p>
      <button onClick={() => alert('Ajouté au panier !')}>Ajouter au panier</button>
    </div>
  )
}

export default ProductCard