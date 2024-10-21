import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext'
import { login as loginAction } from '../../slices/authSlice'
import '../../styles/Login.scss'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const dispatch = useDispatch()
  const { login } = useContext(AuthContext)

  //formulaire de connexion
  const handleLogin = async (e) => {
    e.preventDefault()
  
    try {
      const response = await axios.post('http://localhost:9500/api/v1/user/login', {
        email,
        password,
      })
  
      if (response.status === 200) {
        const { token, user } = response.data
  
        //appel login pour connecter l'utilisateur
        login(user, token)

        dispatch(loginAction({ user, token }))
  
        navigate('/')
      }
    } catch (err) {
      setError('Erreur lors de la connexion. Veuillez réessayer.')
    }
  }

  return (
    <div className="login">
      <h2>Connexion</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <div>
          <label>Email :</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="username"
          />
        </div>
        <div>
          <label>Mot de passe :</label>
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
          <div className="password-toggle">
            <input
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
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