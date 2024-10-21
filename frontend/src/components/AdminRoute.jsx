import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const AdminRoute = ({ children }) => {
  const { isAuthenticated, isAdmin } = useContext(AuthContext)

  //si l'utilisateur n'est pas connecté ou n'est pas admin redirige vers l'accueil
  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/" />
  }

  //sinon retourne les enfants
  return children
}

export default AdminRoute