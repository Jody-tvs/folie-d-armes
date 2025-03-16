import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const OrderDetail = () => {
  //récupère l'id de la commande depuis l'URL pour récupérer les détails correspondant
  const { id } = useParams()
  const [order, setOrder] = useState(null) //stocke les infos de la commande
  const [loading, setLoading] = useState(true) //indique si les données sont en cours de chargement

  useEffect(() => {
    const fetchOrderDetail = async () => {
      try {
        const token = localStorage.getItem('token') //récupère le token d'authentification stocké dans le localStorage pour vérifier les permissions d'accès
        const response = await axios.get(`https://folie-d-armes.onrender.com/api/v1/order/getOneOrder/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, 
            //envoie le token dans l'en-tête de la requête pour s'assurer que l'utilisateur est autorisé à accéder aux détails de la commande
          }
        })
        setOrder(response.data) //met à jour l'état avec les données récupérer de la commande
        setLoading(false) //arrête l'état de chargement après la récupération des données
      } catch (err) {
        console.error('Erreur lors de la récupération des détails de la commande:', err)
        setLoading(false) //stop le chargement en cas d'erreur
      }
    }

    //appel la fonction pour récupérer les détails de la commande lors du montage du composant
    fetchOrderDetail()
  }, [id]) //hook useEffect se déclenche à chaque fois que l'id de la commande change

  if (loading) {
    //si l'état de chargement est actif afficher un message de chargement
    return <p>Chargement des détails de la commande...</p>
  }

  if (!order) {
    //si aucune commande n'a été trouver on affiche un message d'erreur
    return <p>Aucune commande trouvée.</p>
  }

  return (
    <div>
      {/* affiche les détails de la commande */}
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