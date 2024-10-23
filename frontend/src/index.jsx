import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './store'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css'

//ajoute un événement pour s'assurer que le DOM est entièrement chargé avant d'exécuter le script
document.addEventListener('DOMContentLoaded', () => {
  //récupère l'élément HTML avec l'id root
  const rootElement = document.getElementById('root')
  //vérifi si l'élément root est présent dans le DOM
  if (rootElement) {
    const root = ReactDOM.createRoot(rootElement) //crée un point de montage pour l'application React
    //rendu de l'application React dans le DOM
    root.render(
      <React.StrictMode> {/* mode strict pour détecter les problèmes potentiel */}
        <Provider store={store}> {/* fournit le store Redux à l'ensemble du site */}
          <App /> {/* composant principal qui contient toute la structure du site */}
        </Provider>
      </React.StrictMode>
    )
  }
})