import axios from 'axios'
import { store } from '../store'

//vérifie le paiement via le back
export const checkPayment = async (data) => {
  try {
    const token = store.getState().auth.token //récupère le token depuis le store Redux
    const response = await axios.post(`${API_URL}/order/payment`, data, {
      headers: {
        Authorization: `Bearer ${token}` //ajout du token dans l'header authorization
      }
    })
    return response.data
  } catch (error) {
    console.error("Erreur lors de la vérification du paiement", error)
    return { status: 500 }
  }
}

//met à jour le statut du paiement dans le back
export const updatePaymentStatus = async (data) => {
  try {
    const token = store.getState().auth.token //récupère le token depuis le store redux
    const response = await axios.put(`${API_URL}/order/validate`, data, {
      headers: {
        Authorization: `Bearer ${token}` //ajout du token dans l'header authorization
      }
    })
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la mise à jour du statut de paiement", error)
    return { status: 500 }
  }
}