import React from 'react'
import '../styles/Footer.scss'
import { Link } from 'react-router-dom' 

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-column">
        <h3>Où sommes-nous ?</h3>
        <p>17 place de la folie</p>
        <p>34000, Montpellier</p>
      </div>
      <div className="footer-column">
        <h3>Contact</h3>
        <p>Téléphone : 04 02 36 65 85</p>
        <p>Email : <a href="mailto:foliearmes@gmail.com">foliearmes@gmail.com</a></p>
      </div>
      <div className="footer-column">
        <h3>Informations</h3>
        <p><Link to="/rgpd">Politique de confidentialité (RGPD)</Link></p>
        <p><Link to="/conditions-generales">Conditions générales</Link></p>
      </div>
    </footer>
  )
}

export default Footer