import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import '../../styles/EditProduct.scss'

const EditProduct = () => {
  const navigate = useNavigate() //initialisation de useNavigate pour la redirection
  const { id } = useParams() //récupère l'id du produit à partir des paramètre de la route
  const [productData, setProductData] = useState({
    //initialisation des données du produit avec des valeurs vides
    name: '',
    description: '',
    price: '',
    stock: '',
    tva: '',
    picture: '',
    alt: '',
    categories_id: '',
    statut: '1', //statut du produit par défaut disponible (1)
  });
  const [message, setMessage] = useState('') //état pour gérer les messages de succès ou d'erreur

  //useEffect pour récupérer les données du produit quand la page se charge ou quand l'id du produit change
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        //requête GET pour récupérer les détails du produit avec l'id donner
        const response = await axios.get(`http://localhost:9500/api/v1/product/${id}`)
        setProductData(response.data) //met à jour l'état avec les données du produit récupérer
      } catch (err) {
        console.error('Erreur lors de la récupération des données du produit:', err) //gère les erreurs lors de la récupération
      }
    }

    fetchProductData() //appel de la fonction pour récupérer les données du produit
  }, [id]) //hook useEffect se déclenche à chaque fois que l'id change

  //gère la soumission du formulaire de modification
  const handleSubmit = async (e) => {
    e.preventDefault() //empêche le rechargement de la page lors de la soumission

    const token = localStorage.getItem('token') //récupère le token de l'utilisateur depuis le localStorage
    if (!token) {
      setMessage('Token manquant, vous devez être connecté.') //message d'erreur si l'utilisateur n'est pas authentifier
      return
    }

    try {
      //requête PUT pour mettre à jour le produit avec les nouvelles données
      const response = await axios.put(`http://localhost:9500/api/v1/product/update/${id}`, productData, {
        headers: {
          Authorization: `Bearer ${token}`, //envoie le token dans les headers pour l'authentification
        },
      })

      if (response.status === 200) {
        setMessage('Produit modifié avec succès !') //si la réponse est OK, affiche un message de succès
      } else {
        setMessage('Erreur lors de la modification du produit.') //si la réponse n'est pas OK on affiche un message d'erreur
      }
    } catch (err) {
      setMessage('Erreur lors de la modification du produit.') //gère les erreurs lors de la modification
      console.error('Erreur lors de la modification du produit :', err)
    }
  }

  //gère les modifications des champs du formulaire
  const handleChange = (e) => {
    setProductData({
      ...productData, //copie l'état actuel du produit
      [e.target.name]: e.target.value, //met à jour le champ modifier avec la nouvelle valeur
    })
  }

  return (
    <div className="edit-product-container">
      {/* bouton de retour à la page précédente */}
            <button onClick={() => navigate(-1)} className="back-button">Retour</button> {/* bouton de retour */}

      <h1>Modifier le produit</h1>
      {message && <p className="message">{message}</p>}

      {/* formulaire de modification du produit */}
      <form onSubmit={handleSubmit} className="edit-product-form">
        <div className="form-column">
          <label>Nom du produit :</label>
          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleChange}
            required
          />

          <label>Description :</label>
          <textarea
            name="description"
            value={productData.description}
            onChange={handleChange}
            required
          />

          <label>Prix :</label>
          <input
            type="number"
            name="price"
            value={productData.price}
            onChange={handleChange}
            required
          />

          <label>Stock :</label>
          <input
            type="number"
            name="stock"
            value={productData.stock}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-column">
          <label>TVA :</label>
          <input
            type="number"
            name="tva"
            step="0.1"
            value={productData.tva}
            onChange={handleChange}
            required
          />

          <label>Image principale (URL) :</label>
          <input
            type="text"
            name="picture"
            value={productData.picture}
            onChange={handleChange}
            required
          />

          <label>Texte (Alt) :</label>
          <input
            type="text"
            name="alt"
            value={productData.alt}
            onChange={handleChange}
            required
          />

          <label>Catégorie :</label>
          <select
            name="categories_id"
            value={productData.categories_id}
            onChange={handleChange}
            required
          >
            <option value="1">Armes</option>
            <option value="2">Munitions</option>
            <option value="3">Accessoires</option>
          </select>

          <label>Statut :</label>
          <select
            name="statut"
            value={productData.statut}
            onChange={handleChange}
            required
          >
            <option value="1">Disponible</option>
            <option value="0">Indisponible</option>
          </select>

          <button type="submit">Modifier le produit</button>
        </div>
      </form>
    </div>
  )
}

export default EditProduct