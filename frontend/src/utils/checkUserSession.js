import axios from 'axios'

//vérifi si l'utilisateur est toujours authentifié grace au token stocké
const checkUserSession = async () => {
  try {
    //récupère le token de l'utilisateur depuis le localStorage
    const token = localStorage.getItem('token')
    //si un token est présent
    if (token) {
      //envoie une requête au back pour vérifier la validiter du token
      const response = await axios.get('http://localhost:9500/api/v1/user/checkToken', {
        headers: {
          Authorization: `Bearer ${token}` //on passe le token dans le hheader de la requête
        }
      })
      //si la réponse est positive et que l'utilisateur est trouver
      if (response.status === 200 && response.data.user) {
        return {
          isAuthenticated: true, //l'utilisateur est authentifié
          isAdmin: response.data.user.isAdmin //on vérifi si l'utilisateur est un admin
        }
      }
    }
    //si aucun token est présent ou que l'authentification échoue on retourne
    return {
      isAuthenticated: false, //l'utilisateur n'est pas authentifié
      isAdmin: false //l'utilisateur n'est pas un admin
    }
  } catch (err) {
    //affiche une erreur si la vérification du token échoue dans la console
    console.error("Erreur lors de la vérification du token", err)
   //si l'erreur vient du fait que le token n'est pas valide 
   if (err.response && err.response.status === 401) {

    return {
      isAuthenticated: false, //l'utilisateur n'est pas authentifié
      isAdmin: false //l'utilisateur n'est pas un admin
    }
  } else {
    //si c'est une autre erreur réseau serveur.. on laisse l'utilisateur connecté
    return {
      isAuthenticated: true, //garde l'utilisateur authentifié
      isAdmin: false //il n'est pas amdin
    }
  }}
}

export default checkUserSession