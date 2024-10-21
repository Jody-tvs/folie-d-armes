import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../../styles/AdminOrder.scss';

const AdminOrders = () => {
  const navigate = useNavigate()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [expandedOrders, setExpandedOrders] = useState({})

  useEffect(() => {
    //charge les commandes depuis l'api
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token') //récupère le token
        const response = await axios.get('http://localhost:9500/api/v1/order/all', {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        })

        //vérifi que le premier tableau contient des commandes
        if (response.data.result.length > 0 && response.data.result[0].length > 0) {
          const groupedOrders = groupOrdersById(response.data.result[0])
          setOrders(groupedOrders) //utiliser le tableau regroupé pour les commandes
        } else {
          setOrders([]) //on s'assurer que le tableau est vide si aucune commande n'est trouver
        }

        setLoading(false)
      } catch (err) {
        console.error('Erreur lors de la récupération des commandes:', err)
        setError('Impossible de charger les commandes.')
        setLoading(false)
      }
    }

    fetchOrders() //charge les commandes à l'initialisation
  }, [])

  //groupe les commandes par order_id
  const groupOrdersById = (orders) => {
    const grouped = orders.reduce((acc, order) => {
      if (!acc[order.order_id]) {
        acc[order.order_id] = {
          ...order,
          products: [],
        }
      }
      acc[order.order_id].products.push({
        product_name: order.product_name,
        quantity: order.quantity,
      })
      return acc
    }, {})
    return Object.values(grouped) //retourne les commandes regroupé sous forme de tableau
  }

  //met a jour le statut de la commande
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:9500/api/v1/order/update-status/${orderId}`, { status: newStatus }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      //maj du statut dans l'interface utilisateur
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.order_id === orderId ? { ...order, status: newStatus } : order
        )
      )
      alert('Statut mis à jour avec succès.')
    } catch (err) {
      console.error('Erreur lors de la mise à jour du statut:', err)
      alert('Échec de la mise à jour du statut.')
    }
  }

  //gère l'affichage ou le masquage des détail d'une commande
  const toggleDetails = (orderId) => {
    setExpandedOrders((prevState) => ({
      ...prevState,
      [orderId]: !prevState[orderId], 
    }))
  }

  if (loading) {
    return <p>Chargement des commandes...</p>
  }

  return (
    <div className="order-management-container">
          <button onClick={() => navigate('/admin/dashboard')} className="back-button">Retour</button> {/* bouton de retour */}
      <h2>Gestion des commandes</h2>

      {/* message d'erreur s'il y en a */}
      {error && <p className="error-message">{error}</p>}

      {/* affiche les commandes */}
      {orders.length === 0 ? (
        <p>Aucune commande disponible.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Utilisateur</th>
              <th>Date</th>
              <th>Total</th>
              <th>Statut</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <React.Fragment key={order.order_id}>
                <tr>
                  <td>{order.order_id}</td>
                  <td>{order.firstname} {order.lastname}</td>
                  <td>{new Date(order.created_at).toLocaleDateString()}</td>
                  <td>{order.total_amount} €</td>
                  <td>
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.order_id, e.target.value)}
                    >
                      <option value="en attente">En attente</option>
                      <option value="en préparation">En préparation</option>
                      <option value="expédié">Expédié</option>
                    </select>
                  </td>
                  <td>
                    <button onClick={() => toggleDetails(order.order_id)}>
                      {expandedOrders[order.order_id] ? 'Masquer les détails' : 'Voir plus de détails'}
                    </button>
                  </td>
                </tr>

                {/* détails de la commande si elle est étendue */}
                {expandedOrders[order.order_id] && (
                  <tr>
                    <td colSpan="7">
                      <div className="order-details">
                        <h4>Produits commandés :</h4>
                        <ul>
                          {order.products.map((product, index) => (
                            <li key={`${order.order_id}-product-${index}`}>
                              {product.product_name} - Quantité : {product.quantity}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default AdminOrders