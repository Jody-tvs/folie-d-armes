import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import '../../styles/UserOrders.scss'

function UserOrders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [expandedOrders, setExpandedOrders] = useState({})

  const { user } = useSelector((state) => state.auth) //récupère l'utilisateur connecté

  useEffect(() => {
    const fetchUserOrders = async () => {
      if (!user || !user.id) {
        setError('Utilisateur non connecté ou ID manquant')
        setLoading(false)
        return
      }

      try {
        const response = await axios.get(`http://localhost:9500/api/v1/order/user/${user.id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, //envoi du token avec la requête
          },
        })

        if (response.data.orders && response.data.orders.length === 0) {
          //si aucune commande n'est trouvée
          setError('Aucune commande pour le moment')
        } else {
          //regroupe les commandes par order_id
          const groupedOrders = response.data.orders.reduce((acc, order) => {
            const existingOrder = acc.find(o => o.order_id === order.order_id)
            if (existingOrder) {
              //ajoute les produits à la commande existante
              existingOrder.products.push({
                product_name: order.product_name,
                quantity: order.quantity,
                unit_price: order.unit_price,
              })
            } else {
              //créer une nouvelle commande
              acc.push({
                order_id: order.order_id,
                created_at: order.created_at,
                total_amount: order.total_amount,
                status: order.status,
                products: [{
                  product_name: order.product_name,
                  quantity: order.quantity,
                  unit_price: order.unit_price,
                }]
              })
            }
            return acc
          }, [])

          setOrders(groupedOrders) //stock les commandes regrouper
        }
        setLoading(false);
      } catch (error) {
        setError('Erreur lors de la récupération des commandes.')
        setLoading(false);
      }
    };

    if (user && user.id) {
      fetchUserOrders() //récupère les commandes si l'utilisateur est connecté
    }
  }, [user])

  const toggleDetails = (orderId) => {
    setExpandedOrders((prevState) => ({
      ...prevState,
      [orderId]: !prevState[orderId],
    }))
  }

  if (loading) {
    return <div>Chargement des commandes...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  return (
    <div className="user-orders">
      <h2>Mes Commandes</h2>
      {orders.length > 0 ? (
        <ul>
          {orders.map((order) => (
            <li key={order.order_id}>
              <div className="order-summary">
                <p>Commande #{order.order_id}</p>
                <p>Date : {new Date(order.created_at).toLocaleDateString()}</p>
                <p>Total : {order.total_amount} €</p>
                <p>Statut : {order.status}</p>
                <button onClick={() => toggleDetails(order.order_id)}>
                  {expandedOrders[order.order_id] ? 'Masquer les détails' : 'Plus de détails'}
                </button>
              </div>

              {expandedOrders[order.order_id] && (
                <div className="order-details">
                  <h3>Détails de la commande :</h3>
                  {order.products.map((product, index) => (
                    <div key={index} className="product-detail">
                      <p>Produit : {product.product_name}</p>
                      <p>Quantité : {product.quantity}</p>
                      <p>Prix unitaire : {product.unit_price} €</p>
                    </div>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>Aucune commande pour le moment.</p>
      )}
    </div>
  )
}

export default UserOrders