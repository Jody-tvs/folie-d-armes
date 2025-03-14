import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import '../../styles/AdminProducts.scss'

const AdminProducts = () => {
  //état pour stocker les produits, l'état de chargement et les erreurs
  const [products, setProducts] = useState([]) //produits récupérer
  const [loading, setLoading] = useState(true) //indique si la page est en cours de chargement
  const [error, setError] = useState(null) //contient les erreurs
  const navigate = useNavigate() //utilisé pour la navigation

  //hook useEffect pour récupérer la liste des produits au chargement de la page
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        //appel api pour récup la liste des produits
        const response = await axios.get('http://localhost:9500/api/v1/products')
        setProducts(response.data) //on stock les produit dans l'état
        setLoading(false) //on indique que le chargement est terminer
      } catch (err) {
        //en cas d'erreur lors de l'appel api
        console.error('Erreur lors de la récupération des produits:', err)
        setError('Impossible de charger les produits.')
        setLoading(false) //chargement terminer même en cas d'erreur
      }
    }

    fetchProducts() //exécute la fonction fetchProducts
  }, []) //[]indique que l'effet se produit uniquement lors du premier rendu

  //suppresion d'un produit
  const handleDelete = async (id) => {
    const token = localStorage.getItem('token') //récupère le token JWT pour l'authentification
    if (!token) {
      //si il manque le token
      console.error('Token manquant. Impossible de supprimer le produit.')
      setError('Vous devez être connecté pour supprimer un produit.')
      return //arrêt de la fonction si l'utilisateur n'est pas connecter
    }
    //demande de confirmation avant de supprimer le produit
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      try {
        //appel api pour supprimer un produit par son id
        await axios.delete(`http://localhost:9500/api/v1/product/delete/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, //envoi du token dans le header pour l'authentification
          },
        })
        //maj de l'état en filtrant les produits pour exclure celui qui a été supprimer
        setProducts(products.filter((product) => product.id !== id))
        setError(null) //réinitialise l'erreur
      } catch (err) {
        console.error('Erreur lors de la suppression du produit:', err)
        setError('Échec de la suppression du produit.')
      }
    }
  }
  //redirige vers la page de modification de produit
  const handleEdit = (id) => {
    navigate(`/admin/editproduct/${id}`) //redirige vers la page d'édition du produit
  }
  //affiche un message de chargement si les produits sont en cours de récupération
  if (loading) {
    return <p>Chargement des produits...</p>
  }

  return (
    <div className="product-management-container">
      {/* bouton de retour à la page précédente */}
        <button onClick={() => navigate(-1)} className="back-button">Retour</button> {/* bouton de retour */}

      <h2>Gestion des produits</h2>

      {/* bouton pour ajouter un produit */}
      <Link to="/admin/addproduct" className="add-product-button">
        Ajouter un produit
      </Link>

      {error && <p className="error-message">{error}</p>}

      {products.length === 0 ? (
        <p>Aucun produit disponible.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Prix</th>
              <th>Quantité</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.price} €</td>
                <td>{product.stock}</td>
                <td className="action-links">
                  <button onClick={() => handleEdit(product.id)} className="edit">
                    Modifier
                  </button>
                  <button onClick={() => handleDelete(product.id)} className="delete">
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default AdminProducts