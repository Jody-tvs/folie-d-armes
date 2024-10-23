import { useState } from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { checkPayment, updatePaymentStatus } from '../api/order'
import { Navigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { selectAuthUser, selectIsAuthenticated } from '../slices/authSlice'
import { selectBasket, clearBasket } from '../slices/basketSlice'

const CheckoutForm = (props) => {
    //état local pour gérer les erreurs la redirection et le statut de traitement du paiement
    const [error, setError] = useState(null)
    const [redirectSuccess, setRedirectSuccess] = useState(false) //gère la redirection après le succès du paiement
    const [processing, setProcessing] = useState(false) //gère l'état de traitement du paiement en cours ou non

    const stripe = useStripe() //hook pour accéder à l'API Stripe
    const elements = useElements() //hook pour accéder aux éléments Stripe comme le CardElement
    const dispatch = useDispatch() //hook pour envoyer des actions à Redux

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
        //si le paiement est déjà en cours on empêche une nouvelle soumission
        if (processing) return
        setProcessing(true) //indique que le traitement du paiement a commencer
        //vérifi si Stripe et les éléments de paiement sont charger
        if (!stripe || !elements) {
            setError("Problème avec le terminal de paiement")
            setProcessing(false)
            return
        }
        //vérifi si l'utilisateur est authentifier et si son email est valide
        if (!isAuthenticated || !user?.email) {
            setError("Vous devez être connecté et fournir un email pour le paiement.")
            setProcessing(false)
            return
        }
        //prépare les données à envoyer au back pour vérifier la validiter du paiement
        const data = {
            email: user.email, //email de l'utilisateur connecter
            amount: calculateTotalAmount(), //montant total du panier
            items: basket.basket, //contenu du panier
        }

        //envoi la demande de paiement au back pour obtenir un client_secret stripe
        const paymentAuth = await checkPayment(data)
        //si le back retourne une erreur on affiche un message d'erreur
        if (paymentAuth.status === 500) {
            setError("Erreur lors de la vérification du paiement avec le serveur.")
            setProcessing(false)
            return
        }
        //récupère le client_secret renvoyer par Stripe
        const secret = paymentAuth.client_secret
        //confirme le paiement via Stripe avec le client_secret et les détails de la carte
        const payment = await stripe.confirmCardPayment(secret, {
            payment_method: {
                card: elements.getElement(CardElement), //utilise les détails de la carte fournis par l'utilisateur
                billing_details: {
                    email: user.email, //renseigne l'email de l'utilisateur comme détail de facturation
                }
            }
        })
        //gère les erreurs de paiement si Stripe en retourne une
        if (payment.error) {
            setError(`Erreur : ${payment.error.message}`) //affiche le message d'erreur
            setProcessing(false) //arrête le traitement du paiement
        } else {
            //si le paiement est validé avec succès
            if (payment.paymentIntent.status === "succeeded") {
              
                let datas = {
                    orderId: paymentAuth.orderId, //récupère l'ID de la commande
                    status: "payée" //statut de la commande après paiement
                }
                //met à jour le statut de la commande dans la bdd
                updatePaymentStatus(datas)
                    .then((res) => {
                        if (res.status === 200) {
                            dispatch(clearBasket()) //vide le panier après un paiement réussi
                            setRedirectSuccess(true) //redirige vers la page de succès
                        } else {
                            console.log(res)
                        }
                    })
                    .catch(err => console.log(err))
            }
        }
    
        setProcessing(false) //din du traitement du paiement
    }
    //si le paiement a réussi redirige vers la page de succès
    if (redirectSuccess) {
        return <Navigate to="/success" />
    }

    return (
        <section>
            {/* affiche les erreurs de paiement s'il y en a */}
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                {/* composant stripe pour saisir les infos de la carte */}
                <CardElement />
                <button type="submit" disabled={!stripe || processing}>
                    {/* affiche le statut de traitement ou le bouton de paiement */}
                    {processing ? "Paiement en cours..." : `Payer ${calculateTotalAmount()} €`}
                </button>
            </form>
        </section>
    )
}

export default CheckoutForm