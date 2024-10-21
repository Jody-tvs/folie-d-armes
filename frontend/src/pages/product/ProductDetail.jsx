import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { addToBasket } from '../../slices/basketSlice'
import ProductCarousel from '../../components/ProductCarousel'
import '../../styles/ProductDetail.scss'

function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [secondaryPictures, setSecondaryPictures] = useState([])

  const dispatch = useDispatch()

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const productResponse = await axios.get(`http://localhost:9500/api/v1/product/${id}`)
        setProduct(productResponse.data)

        const secondaryPicturesResponse = await axios.get(`http://localhost:9500/api/secondarypictures/${id}`)
        setSecondaryPictures(secondaryPicturesResponse.data)
      } catch (error) {
        console.error('Erreur lors de la récupération des détails du produit :', error)
      }
    }

    fetchProductDetails()
  }, [id])

  if (!product) {
    return <div>Chargement...</div>
  }

  const handleAddToBasket = () => {
    dispatch(addToBasket(product))
  }
  

  return (
    <div className="product-detail-container">
      <button onClick={() => navigate(-1)} className="button-back">Retour</button>

      <div className="carousel-container">
        <ProductCarousel
          mainImage={product.picture}
          secondaryImages={secondaryPictures}
          altText={product.alt}
        />
      </div>

      <div className="text-container">
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <p className="price">{product.price} €</p>
        <button className="button-green" onClick={handleAddToBasket}>Ajouter au panier</button>
        <p className="phrase-info">Veuillez vous connecter ou vous enregistrer pour ajouter un article au panier.</p>
      </div>
    </div>
  )
}

export default ProductDetail