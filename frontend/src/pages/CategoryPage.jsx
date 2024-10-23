import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addToBasket } from '../slices/basketSlice'
import ProductCarousel from '../components/ProductCarousel'
import '@styles/ProductCarousel.scss'
import '@styles/CategoryPage.scss'

function CategoryPage() {
  const { category } = useParams() 
  const [products, setProducts] = useState([]) //liste des produits de la catégorie
  const navigate = useNavigate() //naviguer entre les pages
  const [loading, setLoading] = useState(true) //gère l'affichage du chargement
  const [error, setError] = useState(null) //gère les messages d'erreur

  const dispatch = useDispatch() //useDispatch pour envoyer des actions à redux

  //useEffect pour récupérer les produits de la catégorie dès que le composant est monté ou que la catégorie change
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        //requête GET pour obtenir les produits d'une catégorie spécifique depuis l'api
        const response = await axios.get(`http://localhost:9500/api/v1/products?category=${category}`)
        //maj de l'état avec les produits récupérer
        setProducts(response.data)
      } catch (error) {
        //gère les erreurs lors de la requête
        setError('Erreur lors de la récupération des produits.')
      } finally {
        //fin du chargement une fois les données récupérer
        setLoading(false)
      }
    }
    //si une catégorie est présente dans l'URL on récupère les produits de cette catégorie
    if (category) {
      fetchProducts()
    }
  }, [category]) //le hook se relance à chaque changement de la catégorie
  //si les produits sont en cours de chargement on affiche un message de chargement
  if (loading) {
    return <p>Chargement des produits...</p>
  }
  //si une erreur est survenue on affiche un message d'erreur
  if (error) {
    return <p>{error}</p>;
  }

  //naviguer vers la page de détails d'un produit
  const handleNavigateToDetails = (productId) => {
    navigate(`/productdetails/${productId}`)
  }

  //ajouter un produit au panier
  const handleAddToBasket = (product) => {
    dispatch(addToBasket(product)) //envoi d'une action à redux pour ajouter le produit au panier
  }
  

  return (
    <div className="category-page">
      <h1>{category}</h1>

      {/* si des produits sont trouvés dans la catégorie on les affiche dans une grille */}
      {products.length > 0 ? (
        <div className="product-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <h3>{product.name}</h3>

              {/* lorsque l'utilisateur clique sur un produit il est redirigé vers les détails du produit */}
              <div onClick={() => handleNavigateToDetails(product.id)}>
                <ProductCarousel 
                  mainImage={product.picture}
                  secondaryImages={product.secondaryImages || []}
                  altText={product.alt}
                />
              </div>
              {/* affiche le prix du produit */}
              <p>{product.price} €</p>

              {/* bouton pour voir les détails ou ajouter au panier */}
              <div className="product-actions">
                <button onClick={() => handleNavigateToDetails(product.id)}>En savoir plus</button>
                <button onClick={() => handleAddToBasket(product)}>Ajouter au panier</button>
              </div>
            </div>
          ))}
          {/* phrase informative pour l'utilisateur  */}
           <p className="phrase-info">Veuillez vous connecter ou vous enregistrer pour ajouter un article au panier.</p>
        </div>
      ) : (
        //si aucun produit n'est trouvé dans la catégorie on affiche un message
        <p>Aucun produit trouvé dans cette catégorie.</p>
      )}
    </div>
  )
}

export default CategoryPage