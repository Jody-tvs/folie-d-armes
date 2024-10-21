import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../../styles/AdminMessages.scss'

const AdminMessages = () => {
  const navigate = useNavigate()
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:9500/api/v1/contacts', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        const fetchedMessages = response.data.contacts[0] || []
        setMessages(fetchedMessages)
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
    const token = localStorage.getItem('token')
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce message ?')) {
      try {
        await axios.delete(`http://localhost:9500/api/v1/contacts/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
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
      setMessages((prevMessages) =>
        prevMessages.map((message) =>
          message.id === id ? { ...message, statut: 1 } : message
        )
      )
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
      setMessages((prevMessages) =>
        prevMessages.map((message) =>
          message.id === id ? { ...message, statut: 0 } : message
        )
      )
      alert('Message marqué comme non lu.')
    } catch (err) {
      alert('Échec de la mise à jour du statut.')
    }
  }

  if (loading) {
    return <p>Chargement des messages...</p>
  }

  if (error) {
    return <p>{error}</p>
  }

  if (messages.length === 0) {
    return <p>Aucun message disponible.</p>
  }

  return (
    <div className="admin-messages-container">
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