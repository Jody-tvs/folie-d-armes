import React from 'react'

const Login = () => (
  <div className="form-container">
    <h1>Connexion</h1>
    <form>
      <input type="email" placeholder="Votre email" required />
      <input type="password" placeholder="Votre mot de passe" required />
      <button type="submit">Se connecter</button>
    </form>
  </div>
)

export default Login
