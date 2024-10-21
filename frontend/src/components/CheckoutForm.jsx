import { useState } from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { checkPayment, updatePaymentStatus } from '../api/order'
import { Navigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { selectAuthUser, selectIsAuthenticated } from '../slices/authSlice'
import { selectBasket, clearBasket } from '../slices/basketSlice'

const CheckoutForm = (props) => {
    const [error, setError] = useState(null)
    const [redirectSuccess, setRedirectSuccess] = useState(false)
    const [processing, setProcessing] = useState(false)

    const stripe = useStripe()
    const elements = useElements()
    const dispatch = useDispatch()

    //récupère panier et infos utilisateur depuis redux
    const basket = useSelector(selectBasket)
    const user = useSelector(selectAuthUser) //récupère les infos utilisateur depuis authSlice
    const isAuthenticated = useSelector(selectIsAuthenticated) //vérifi si l'utilisateur est connecté

    //calcule le montant total du panier
    const calculateTotalAmount = () => {
        return basket.totalPrice //totalPrice est déjà calculé dans le basketSlice
    }

    //gère paiement lors de la validation de la carte
    const handleSubmit = async (e) => {
        e.preventDefault()
        
        if (processing) return
        setProcessing(true)
    
        if (!stripe || !elements) {
            setError("Problème avec le terminal de paiement")
            setProcessing(false)
            return
        }
    
        if (!isAuthenticated || !user?.email) {
            setError("Vous devez être connecté et fournir un email pour le paiement.")
            setProcessing(false)
            return
        }
    
        const data = {
            email: user.email, 
            amount: calculateTotalAmount(), 
            items: basket.basket, 
        }

        //envoi la demande de paiement au back
        const paymentAuth = await checkPayment(data)
    
        if (paymentAuth.status === 500) {
            setError("Erreur lors de la vérification du paiement avec le serveur.")
            setProcessing(false)
            return
        }
    
        const secret = paymentAuth.client_secret
    
        const payment = await stripe.confirmCardPayment(secret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    email: user.email, 
                }
            }
        })
    
        if (payment.error) {
            setError(`Erreur : ${payment.error.message}`)
            setProcessing(false)
        } else {
            if (payment.paymentIntent.status === "succeeded") {
              
                let datas = {
                    orderId: paymentAuth.orderId,
                    status: "payée"
                }
    
                updatePaymentStatus(datas)
                    .then((res) => {
                        if (res.status === 200) {
                            dispatch(clearBasket())
                            setRedirectSuccess(true)
                        } else {
                            console.log(res)
                        }
                    })
                    .catch(err => console.log(err))
            }
        }
    
        setProcessing(false)
    }

    if (redirectSuccess) {
        return <Navigate to="/success" />
    }

    return (
        <section>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <CardElement />
                <button type="submit" disabled={!stripe || processing}>
                    {processing ? "Paiement en cours..." : `Payer ${calculateTotalAmount()} €`}
                </button>
            </form>
        </section>
    )
}

export default CheckoutForm