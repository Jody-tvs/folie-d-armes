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
  const [products, setProducts] = useState([])
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const dispatch = useDispatch()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:9500/api/v1/products?category=${category}`)
        setProducts(response.data)
      } catch (error) {
        setError('Erreur lors de la récupération des produits.')
      } finally {
        setLoading(false)
      }
    }

    if (category) {
      fetchProducts()
    }
  }, [category])

  if (loading) {
    return <p>Chargement des produits...</p>
  }

  if (error) {
    return <p>{error}</p>;
  }

  const handleNavigateToDetails = (productId) => {
    navigate(`/productdetails/${productId}`)
  }

  const handleAddToBasket = (product) => {
    dispatch(addToBasket(product))
  }
  

  return (
    <div className="category-page">
      <h1>{category}</h1>

      {products.length > 0 ? (
        <div className="product-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <h3>{product.name}</h3>
              <div onClick={() => handleNavigateToDetails(product.id)}>
                <ProductCarousel 
                  mainImage={product.picture}
                  secondaryImages={product.secondaryImages || []}
                  altText={product.alt}
                />
              </div>
              <p>{product.price} €</p>

              <div className="product-actions">
                <button onClick={() => handleNavigateToDetails(product.id)}>En savoir plus</button>
                <button onClick={() => handleAddToBasket(product)}>Ajouter au panier</button>
              </div>
            </div>
          ))}
           <p className="phrase-info">Veuillez vous connecter ou vous enregistrer pour ajouter un article au panier.</p>
        </div>
      ) : (
        <p>Aucun produit trouvé dans cette catégorie.</p>
      )}
    </div>
  )
}

export default CategoryPage