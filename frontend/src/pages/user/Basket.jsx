import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { clearBasket, removeFromBasket, updateItemQuantity } from '../../slices/basketSlice'
import { useNavigate } from 'react-router-dom'
import '../../styles/basket.scss'

function Basket() {
  const navigate = useNavigate() //permet la navigation vers d'autres pages
  const { basket, totalPrice } = useSelector((state) => state.basket) //récupère le contenu du panier et le prix total depuis le state redux
  const dispatch = useDispatch() //useDispatch pour envoyer des actions à redux

  //suppression d'un article du panier
  const handleRemoveItem = (itemId) => {
    dispatch(removeFromBasket(itemId)) //dispatch de l'action removeFromBasket avec l'id de l'article à supprimer
  }

  //gère le changement de quantité d'un article dans le panier
  const handleQuantityChange = (itemId, newQuantity) => {
    //si la nouvelle quantité est supérieure à 0 on met à jour la quantité de l'article
    if (newQuantity > 0) {
      dispatch(updateItemQuantity({ itemId, newQuantity })) //dispatch de l'action updateItemQuantity avec l'id de l'article et la nouvelle quantité
    }
  }

  //gérer le paiement
  const handlePayment = () => {
    //redirige vers la page de paiement
    navigate('/payment')
  }

  return (
    <div className="basket">
      <h1>Mon Panier</h1>
      {/* si le panier est vide on affiche un message */}
      {basket.length === 0 ? (
        <p>Votre panier est vide.</p>
      ) : (
        <div>
          {/* si le panier n'est pas vide on affiche les articles dans le panier */}
          {basket.map((item) => (
            <div key={item.id} className="basket-item">
              <img src={`http://localhost:9500/public/images/${item.picture}`} alt={item.alt} />
              <div className="details">
                <h2>{item.name}</h2>
                <div className="price-quantity">
                  <p className="price">Prix : {item.price} €</p>
                  <div className="quantity">
                    <label>Quantité : </label>
                    <input 
                      type="number" 
                      value={item.quantityInCart} 
                      onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))} 
                    />
                  </div>
                </div>
                <button onClick={() => handleRemoveItem(item.id)}>Supprimer</button>
              </div>
            </div>
          ))}
          <div className="basket-summary">
            <h3>Total: {totalPrice} €</h3>
            <button onClick={handlePayment}>Payer</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Basket