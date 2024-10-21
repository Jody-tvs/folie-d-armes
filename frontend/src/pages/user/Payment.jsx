import React from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import CheckoutForm from "../../components/CheckoutForm"
import '../../styles/Payment.scss'

//clé publique stripe 
const stripePromise = loadStripe('pk_test_51PdtKNRswFkUPgM7BBLdi5zLQU4X1tDUXo1VkMT05Jt3M3k00vpvdYOadZNjNB3ib6Ufm1tmRcyc7SjutvUkSGhj00XFT8Vepf')

const Payment = () => {
  return (
    <div className="payment-page">
      <h1>Procéder au paiement</h1>
      <p>Veuillez entrer vos informations de carte pour finaliser votre achat.</p>
      
      {/* formulaire de paiement avec elements de Stripe */}
      <Elements stripe={stripePromise}>
        <CheckoutForm orderId={12345} /> {/* passe l'id de la commande */}
      </Elements>
    </div>
  )
}

export default Payment