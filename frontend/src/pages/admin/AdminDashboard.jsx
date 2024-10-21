import React from 'react'
import { Link } from 'react-router-dom'
import "../../styles/AdminDashboard.scss"

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard-container">
      <h1>Dashboard</h1>

      <div className="dashboard-grid">
        {/* gère les produits */}
        <Link to="/admin/products" className="dashboard-item">
          <h2>Gérer les produits</h2>
          <p>Ajouter, modifier ou supprimer des produits.</p>
        </Link>

        {/* gère les commandes */}
        <Link to="/admin/orders" className="dashboard-item">
          <h2>Gérer les commandes</h2>
          <p>Voir le detail des commandes et modification du statut.</p>
        </Link>

         {/* gère les commandes et les messages */}
         <Link to="/admin/messages" className="dashboard-item">
          <h2>Gérer les messages</h2>
          <p>Voir, répondre ou supprimer les messages.</p>
        </Link>
      </div>
    </div>
  )
}

export default AdminDashboard