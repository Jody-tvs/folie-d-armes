import React, { createContext, useState, useEffect } from 'react'
import checkUserSession from '../utils/checkUserSession'

//créer le contexte d'authentification
export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false) //état de l'authentification
  const [isAdmin, setIsAdmin] = useState(false) //état pour vérifier si c'est un admin
  const [user, setUser] = useState(null) //stock les infos de l'utilisateur

  const [loading, setLoading] = useState(true) //état de chargement

  useEffect(() => {
    const fetchUserData = async () => {
      //récupère les infos stocké dans le localStorage
      const token = localStorage.getItem('token')
      const storedUser = localStorage.getItem('user')

      if (token && storedUser) {
        const userData = JSON.parse(storedUser)

        //restaure l'état depuis le localStorage
        setUser(userData)
        setIsAuthenticated(true)
        setIsAdmin(userData.isAdmin || false)

        //vérifi la validité du token avec l'api en arrière-plan
        const session = await checkUserSession()

        if (!session.isAuthenticated) {
          //si le token n'est pas valide on réinitialise la session
          logout()
        }
      } else {
        //si aucune info dans le localStorage on réinitialiser l'état
        setIsAuthenticated(false)
        setIsAdmin(false)
        setUser(null)
      }

      setLoading(false) //termine l'état de chargement
    }

    fetchUserData()
  }, [])

  const login = (userData, token) => {
    //stock les infos dans le localStorage
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(userData))

    //met a jour l'état
    setUser(userData)
    setIsAuthenticated(true)
    setIsAdmin(userData.isAdmin || false)
  }

  const logout = () => {
    //supprime les infos du localStorage
    localStorage.removeItem('token')
    localStorage.removeItem('user')

    //réinitialise l'état local
    setUser(null)
    setIsAuthenticated(false)
    setIsAdmin(false)
  }

  if (loading) {
    return <div>Chargement...</div>
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, isAdmin, user, login, logout, setIsAuthenticated, setIsAdmin }}>
      {children}
    </AuthContext.Provider>
  )
}