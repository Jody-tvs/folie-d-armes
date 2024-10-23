import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { addToBasket } from '../../slices/basketSlice'
import ProductCarousel from '../../components/ProductCarousel'
import '../../styles/ProductDetail.scss'

function ProductDetail() {
  const { id } = useParams() //extraction de l'id du produit à partir des paramètres de l'URL
  const navigate = useNavigate() //useNavigate pour permettre la navigation entre les pages
  const [product, setProduct] = useState(null) //contient les détails du produit initialisé à null
  const [secondaryPictures, setSecondaryPictures] = useState([]) //contient les images secondaires initialisé à un tableau vide

  //useDispatch pour accéder à la fonction de dispatch de redux
  const dispatch = useDispatch()

  useEffect(() => {
    //fonction asynchrone pour récupérer les détails du produit et les images secondaires
    const fetchProductDetails = async () => {
      try {
        //obtenient les détails du produit depuis l'API
        const productResponse = await axios.get(`http://localhost:9500/api/v1/product/${id}`)
        setProduct(productResponse.data) //maj de l'état product avec les données récupérer

        //obtenient les images secondaires associé au produit
        const secondaryPicturesResponse = await axios.get(`http://localhost:9500/api/secondarypictures/${id}`)
        setSecondaryPictures(secondaryPicturesResponse.data) //maj de l'état secondaryPictures avec les images récupérer
      } catch (error) {
        //gère les erreurs en cas de problème lors de la récupération des données
        console.error('Erreur lors de la récupération des détails du produit :', error)
      }
    }
    //appel de la fonction pour récupérer les détails du produit à chaque changement de l'id
    fetchProductDetails()
  }, [id]) //tableau de dépendances [id] permet de relancer l'effet quand l'id change

  //si les détails du produit ne sont pas encore disponibles product est null on affiche un message de chargement
  if (!product) {
    return <div>Chargement...</div>
  }

  //gére l'ajout du produit au panier
  const handleAddToBasket = () => {
    //dispatch de l'action addToBasket avec le produit en tant que paramètre
    dispatch(addToBasket(product))
  }
  
  //rendu du composant  affichage des détails du produit
  return (
    <div className="product-detail-container">
      {/* bouton de retour qui utilise la fonction navigate pour revenir à la page précédente */}
      <button onClick={() => navigate(-1)} className="button-back">Retour</button>

      {/* affichage du carousel d'images du produit */}
      <div className="carousel-container">
        <ProductCarousel
          mainImage={product.picture}
          secondaryImages={secondaryPictures}
          altText={product.alt}
        />
      </div>

      {/* affichage des infos texte du produit */}
      <div className="text-container">
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <p className="price">{product.price} €</p>
        {/* bouton pour ajouter le produit au panier */}
        <button className="button-green" onClick={handleAddToBasket}>Ajouter au panier</button>
        {/* phrase informative pour l'utilisateur */}
        <p className="phrase-info">Veuillez vous connecter ou vous enregistrer pour ajouter un article au panier.</p>
      </div>
    </div>
  )
}

export default ProductDetail