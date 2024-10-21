import axios from 'axios'

//vérifi si l'utilisateur est toujours authentifié
const checkUserSession = async () => {
  try {
    const token = localStorage.getItem('token')

    if (token) {
      const response = await axios.get('http://localhost:9500/api/v1/user/checkToken', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (response.status === 200 && response.data.user) {
        return {
          isAuthenticated: true,
          isAdmin: response.data.user.isAdmin 
        }
      }
    }

    return {
      isAuthenticated: false,
      isAdmin: false
    }
  } catch (err) {
    console.error("Erreur lors de la vérification du token", err)

   if (err.response && err.response.status === 401) {

    return {
      isAuthenticated: false,
      isAdmin: false
    }
  } else {
    //si c'est une autre erreur réseau serveur.. on laisse l'utilisateur connecté
    return {
      isAuthenticated: true, //garde l'utilisateur authentifié
      isAdmin: false 
    }
  }}
}

export default checkUserSession