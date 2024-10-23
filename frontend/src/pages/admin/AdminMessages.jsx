import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../../styles/AdminMessages.scss'

const AdminMessages = () => {
  const navigate = useNavigate() //naviguer vers d'autres pages
  const [messages, setMessages] = useState([]) //stocke les messages récupérer du back
  const [loading, setLoading] = useState(true)  //indique si les données sont en cours de chargement
  const [error, setError] = useState(null) //gère les erreurs lors de la récupération des messages

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        //récupère le token d'authentification stocké dans le localStorage pour vérifier l'authentification de l'administrateur
        const token = localStorage.getItem('token')
        //requête GET pour récupérer tous les messages depuis le back en incluant le token dans l'en-tête
        const response = await axios.get('http://localhost:9500/api/v1/contacts', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        const fetchedMessages = response.data.contacts[0] || []
        setMessages(fetchedMessages)
        //met à jour l'état avec les messages récupérer et arrête le chargement
        setLoading(false)
      } catch (err) {
        console.error('Erreur lors de la récupération des messages:', err)
        setError('Impossible de charger les messages.')
        setLoading(false)
      }
    }

    fetchMessages()
  }, [])

  const handleDelete = async (id) => {
    //récupère le token d'authentification depuis le localStorage pour autoriser la suppression
    const token = localStorage.getItem('token')
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce message ?')) {
      try {
        //requête DELETE pour supprimer le message avec l'id correspondant
        await axios.delete(`http://localhost:9500/api/v1/contacts/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        //filtre les messages pour retirer celui qui a été supprimé de l'état
        setMessages((prevMessages) => prevMessages.filter((message) => message.id !== id))
        alert('Message supprimé avec succès.');
      } catch (err) {
        console.error('Erreur lors de la suppression du message:', err)
        alert('Échec de la suppression du message.')
      }
    }
  }

  const handleMarkAsRead = async (id) => {
    const token = localStorage.getItem('token')
    try {
      await axios.put(`http://localhost:9500/api/v1/contacts/${id}/read`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      //met à jour le statut du message en "lu" en envoyant une requête PUT au back
      setMessages((prevMessages) =>
        prevMessages.map((message) =>
          message.id === id ? { ...message, statut: 1 } : message
        )
      )
      //met à jour l'état local pour marquer le message comme lu
      alert('Message marqué comme lu.')
    } catch (err) {
      console.error('Erreur lors de la mise à jour du statut:', err)
      alert('Échec de la mise à jour du statut.')
    }
  }

  const handleMarkAsUnread = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.put(`http://localhost:9500/api/v1/contacts/${id}/unread`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      //met à jour le statut du message en "non lu" en envoyant une requête PUT au back
      setMessages((prevMessages) =>
        prevMessages.map((message) =>
          message.id === id ? { ...message, statut: 0 } : message
        )
      )
      //met à jour l'état local pour marquer le message comme non lu
      alert('Message marqué comme non lu.')
    } catch (err) {
      alert('Échec de la mise à jour du statut.')
    }
  }
  //gère le cas où les messages sont en cours de chargement
  if (loading) {
    return <p>Chargement des messages...</p>
  }
  //affiche message d'erreur si la récupération des messages échou
  if (error) {
    return <p>{error}</p>
  }
  //gère le cas où aucun message n'est disponible
  if (messages.length === 0) {
    return <p>Aucun message disponible.</p>
  }

  return (
    <div className="admin-messages-container">
      {/* bouton de retour pour revenir à la page précédente */}
            <button onClick={() => navigate(-1)} className="back-button">Retour</button> {/* bouton de retour */}

      <h2>Gestion des messages</h2>

      <ul>
        {messages.map((message) => (
          <li key={message.id} className={message.statut === 1 ? 'read' : 'unread'}>
            <p><strong>Sujet :</strong> {message.subject}</p>
            <p><strong>Email :</strong> {message.email ? message.email : 'Non spécifié'}</p>
            <p><strong>Message :</strong> {message.story}</p>

            <div className="button-container">
              {message.email ? (
                <button onClick={() => window.open(`mailto:${message.email}`)}>
                  Répondre
                </button>
              ) : (
                <button disabled>Aucun email pour répondre</button>
              )}
              
              {message.statut === 0 ? (
                <button onClick={() => handleMarkAsRead(message.id)}>
                  Marquer comme lu
                </button>
              ) : (
                <button onClick={() => handleMarkAsUnread(message.id)}>
                  Marquer comme non lu
                </button>
              )}

              <button onClick={() => handleDelete(message.id)} className="delete-btn">
                Supprimer
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default AdminMessages