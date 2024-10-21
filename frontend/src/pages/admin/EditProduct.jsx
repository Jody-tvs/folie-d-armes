import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import '../../styles/EditProduct.scss'

const EditProduct = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    tva: '',
    picture: '',
    alt: '',
    categories_id: '',
    statut: '1',
  });
  const [message, setMessage] = useState('')

  useEffect(() => {
    //récupère les donné du produit à modifier
    const fetchProductData = async () => {
      try {
        const response = await axios.get(`http://localhost:9500/api/v1/product/${id}`)
        setProductData(response.data);
      } catch (err) {
        console.error('Erreur lors de la récupération des données du produit:', err)
      }
    }

    fetchProductData()
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const token = localStorage.getItem('token')
    if (!token) {
      setMessage('Token manquant, vous devez être connecté.')
      return
    }

    try {
      const response = await axios.put(`http://localhost:9500/api/v1/product/update/${id}`, productData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.status === 200) {
        setMessage('Produit modifié avec succès !')
      } else {
        setMessage('Erreur lors de la modification du produit.')
      }
    } catch (err) {
      setMessage('Erreur lors de la modification du produit.')
      console.error('Erreur lors de la modification du produit :', err)
    }
  }

  const handleChange = (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="edit-product-container">
            <button onClick={() => navigate(-1)} className="back-button">Retour</button> {/* bouton de retour */}

      <h1>Modifier le produit</h1>
      {message && <p className="message">{message}</p>}

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