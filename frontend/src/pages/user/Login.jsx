import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext'
import { login as loginAction } from '../../slices/authSlice'
import '../../styles/Login.scss'

function Login() {
  //état pour gérer l'email le mot de passe l'affichage du mot de passe et les messages d'erreur
  const [email, setEmail] = useState('') 
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const dispatch = useDispatch() //useDispatch pour envoyer des actions à redux
  const { login } = useContext(AuthContext) //récup la fonction login depuis AuthContext

  //formulaire de connexion
  const handleLogin = async (e) => {
    e.preventDefault() //empêche le comportement par défaut du formulaire
  
    try {
      //requête POST à l'api pour connecter l'utilisateur
      const response = await axios.post('http://localhost:9500/api/v1/user/login', {
        email,
        password,
      })
  
      //si la requête réussit on récupère le token et les infos utilisateur
      if (response.status === 200) {
        const { token, user } = response.data
  
        //appel de la fonction login du contexte d'authentification pour connecter l'utilisateur
        login(user, token)

        dispatch(loginAction({ user, token })) //dispatch de l'action redux pour mettre à jour l'état global avec les infos utilisateur et le token
  
        navigate('/')
      }
    } catch (err) {
      setError('Erreur lors de la connexion. Veuillez réessayer.')
    }
  }

  return (
    <div className="login">
      <h2>Connexion</h2>
      {/* affichage d'un message d'erreur si une erreur est présente */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* formulaire de connexion */}
      <form onSubmit={handleLogin}>
        <div>
          <label>Email :</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} //maj de l'état email lors de la saisie
            required //champ obligatoire
            autoComplete="username" //suggestion automatique pour l'email
          />
        </div>
        <div>
          <label>Mot de passe :</label>
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)} //maj de l'état password lors de la saisie
            required
            autoComplete="current-password" //suggestion automatique pour le mot de passe
          />
          <div className="password-toggle">
            <input
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)} //inverse l'état showPassword au changement
            />
            <label>Afficher mot de passe</label>
          </div>
        </div>
        <button type="submit">Se connecter</button>
      </form>
    </div>
  )
}

export default Login