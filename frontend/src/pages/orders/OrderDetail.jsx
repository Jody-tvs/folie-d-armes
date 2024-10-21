import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const OrderDetail = () => {
  const { id } = useParams()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrderDetail = async () => {
      try {
        const token = localStorage.getItem('token') //récupère le token
        const response = await axios.get(`http://localhost:9500/api/v1/order/getOneOrder/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, 
          }
        });
        setOrder(response.data) //stocke les donné de la commande
        setLoading(false)
      } catch (err) {
        console.error('Erreur lors de la récupération des détails de la commande:', err)
        setLoading(false) //stop le chargement en cas d'erreur
      }
    }

    fetchOrderDetail()
  }, [id])

  if (loading) {
    return <p>Chargement des détails de la commande...</p>
  }

  if (!order) {
    return <p>Aucune commande trouvée.</p>
  }

  return (
    <div>
      <h1>Détails de la commande #{order.id}</h1>
      <p><strong>Utilisateur :</strong> {order.user_id}</p>
      <p><strong>Statut :</strong> {order.status}</p>
      <p><strong>Prix total :</strong> {order.total_price} €</p>
      <p><strong>Date :</strong> {new Date(order.created_at).toLocaleDateString()}</p>

      <h2>Produits commandés :</h2>
      <ul>
        {order.products.map((product, index) => (
          <li key={index}>
            {product.name} - Quantité : {product.quantity} - Prix : {product.price} €
          </li>
        ))}
      </ul>
    </div>
  )
}

export default OrderDetail