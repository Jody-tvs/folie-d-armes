import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import '../../styles/AdminProducts.scss'

const AdminProducts = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:9500/api/v1/products')
        setProducts(response.data)
        setLoading(false)
      } catch (err) {
        console.error('Erreur lors de la récupération des produits:', err)
        setError('Impossible de charger les produits.')
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token')
    if (!token) {
      console.error('Token manquant. Impossible de supprimer le produit.')
      setError('Vous devez être connecté pour supprimer un produit.')
      return
    }

    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      try {
        await axios.delete(`http://localhost:9500/api/v1/product/delete/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setProducts(products.filter((product) => product.id !== id))
        setError(null)
      } catch (err) {
        console.error('Erreur lors de la suppression du produit:', err)
        setError('Échec de la suppression du produit.')
      }
    }
  }

  const handleEdit = (id) => {
    navigate(`/admin/editproduct/${id}`)
  };

  if (loading) {
    return <p>Chargement des produits...</p>
  }

  return (
    <div className="product-management-container">
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