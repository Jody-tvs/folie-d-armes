import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../../styles/AddProduct.scss'

const AddProduct = () => {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [stock, setStock] = useState('')
  const [tva, setTva] = useState('')
  const [picture, setPicture] = useState('')
  const [alt, setAlt] = useState('')
  const [categories_id, setCategoriesId] = useState('')
  const [statut, setStatut] = useState('1')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    const token = localStorage.getItem('token')

    if (!token) {
        setMessage('Token manquant, vous devez être connecté.')
        return
    }

    const productData = {
        name,          
        description,   
        price,         
        stock,         
        tva,           
        picture,       
        alt,           
        categories_id, 
        statut: parseInt(statut, 10) 
    }

    try {
        const response = await axios.post('https://folie-d-armes.onrender.com/api/v1/product/save', productData, {
            headers: {
                Authorization: `Bearer ${token}`, 
            }
        })

        if (response.status === 200) {
            setMessage('Produit ajouté avec succès !');
            //réinitialise les champs
        } else {
            setMessage('Erreur lors de l\'ajout du produit.')
        }
    } catch (err) {
        setMessage('Erreur lors de l\'ajout du produit.')
    }
}

  return (
    <div className="add-product-container">
            <button onClick={() => navigate(-1)} className="back-button">Retour</button> {/* bouton de retour */}

      <h1>Ajouter un produit</h1>
      {message && <p className="message">{message}</p>}

      <form onSubmit={handleSubmit} className="add-product-form">
        <label>Nom du produit :</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />

        <label>Description :</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />

        <label>Prix :</label>
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required min="0" />

        <label>Stock :</label>
        <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} required min="0" />

        <label>TVA :</label>
<input 
  type="number" 
  value={tva} 
  onChange={(e) => setTva(e.target.value)} 
  step="0.1"  //accepter les décimales
  required 
/>

        <label>Image principale (URL) :</label>
        <input type="text" value={picture} onChange={(e) => setPicture(e.target.value)} required />

        <label>Texte (Alt) :</label>
        <input type="text" value={alt} onChange={(e) => setAlt(e.target.value)} required />

        <label>Catégorie :</label>
        <select value={categories_id} onChange={(e) => setCategoriesId(e.target.value)} required>
          <option value="">Choisir une catégorie</option>
          <option value="1">Armes</option>
          <option value="2">Munitions</option>
          <option value="3">Accessoires</option>
        </select>

        <label>Statut :</label>
        <select value={statut} onChange={(e) => setStatut(e.target.value)} required>
          <option value="1">Disponible</option>
          <option value="0">Indisponible</option>
        </select>

        <button type="submit">Ajouter le produit</button>
      </form>
    </div>
  )
}

export default AddProduct