import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import '../../styles/UserOrders.scss'

function UserOrders() {
  const [orders, setOrders] = useState([]) //stock les commandes de l'utilisateur
  const [loading, setLoading] = useState(true) //gère l'état de chargement
  const [error, setError] = useState(null) //stock les messages d'erreur
  const [expandedOrders, setExpandedOrders] = useState({})  //gère l'affichage des détails des commandes

  //récupère l'utilisateur connecté à partir de Redux
  const { user } = useSelector((state) => state.auth) //récupère l'utilisateur connecté

  //useEffect pour charger les commandes de l'utilisateur dès que le composant est monter
  useEffect(() => {
    const fetchUserOrders = async () => {
      //vérifi si l'utilisateur est connecté et possède un id valide
      if (!user || !user.id) {
        setError('Utilisateur non connecté ou ID manquant')
        setLoading(false)
        return
      }

      try {
        //Requête GET pour récupérer les commandes de l'utilisateur depuis l'api
        const response = await axios.get(`https://folie-d-armes.onrender.com/api/v1/order/user/${user.id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, //envoi du token avec la requête
          },
        })

        //si aucune commande n'est trouver on affiche un message d'erreur
        if (response.data.orders && response.data.orders.length === 0) {
          setError('Aucune commande pour le moment')
        } else {
          //regroupe les commandes par order_id
          const groupedOrders = response.data.orders.reduce((acc, order) => {
            const existingOrder = acc.find(o => o.order_id === order.order_id)
            if (existingOrder) {
              //si la commande existe déjà on ajoute les produits à celle-ci
              existingOrder.products.push({
                product_name: order.product_name,
                quantity: order.quantity,
                unit_price: order.unit_price,
              })
            } else {
              //si c'est une nouvelle commande on la créer
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

          setOrders(groupedOrders) //stock les commandes regrouper dans l'état local
        }
        setLoading(false)
      } catch (error) {
        setError('Erreur lors de la récupération des commandes.')
        setLoading(false)
      }
    }

    //appel la fonction pour récupérer les commandes de l'utilisateur si celui-ci est connecté
    if (user && user.id) {
      fetchUserOrders() 
    }
  }, [user])

  //gérer l'affichage ou le masquage des détails d'une commande
  const toggleDetails = (orderId) => {
    setExpandedOrders((prevState) => ({
      ...prevState,
      [orderId]: !prevState[orderId], // Alterne entre montrer et cacher les détails
    }))
  }

  //si les commandes sont en cours de chargement on affiche un message de chargement
  if (loading) {
    return <div>Chargement des commandes...</div>
  }

  //si une erreur est survenue on affiche le message d'erreur
  if (error) {
    return <div>{error}</div>
  }

  return (
    <div className="user-orders">
      <h2>Mes Commandes</h2>
      {/* si des commandes sont présentes, les affiche */}
      {orders.length > 0 ? (
        <ul>
          {orders.map((order) => (
            <li key={order.order_id}>

              {/* résumé de la commande */}
              <div className="order-summary">
                <p>Commande #{order.order_id}</p>
                <p>Date : {new Date(order.created_at).toLocaleDateString()}</p>
                <p>Total : {order.total_amount} €</p>
                <p>Statut : {order.status}</p>
                <button onClick={() => toggleDetails(order.order_id)}>
                  {expandedOrders[order.order_id] ? 'Masquer les détails' : 'Plus de détails'}
                </button>
              </div>

              {/* détails de la commande si l'utilisateur a cliqué sur Plus de détails */}
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
        //si aucune commande n'est trouver on affiche un message
        <p>Aucune commande pour le moment.</p>
      )}
    </div>
  )
}

export default UserOrders