import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { clearBasket, removeFromBasket, updateItemQuantity } from '../../slices/basketSlice'
import { useNavigate } from 'react-router-dom'
import '../../styles/basket.scss'

function Basket() {
  const navigate = useNavigate()
  const { basket, totalPrice } = useSelector((state) => state.basket)
  const dispatch = useDispatch()

  const handleRemoveItem = (itemId) => {
    dispatch(removeFromBasket(itemId));
  }

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity > 0) {
      dispatch(updateItemQuantity({ itemId, newQuantity }))
    }
  }

  const handlePayment = () => {
    //redirige vers la page de paiement
    navigate('/payment')
  }

  return (
    <div className="basket">
      <h1>Mon Panier</h1>
      {basket.length === 0 ? (
        <p>Votre panier est vide.</p>
      ) : (
        <div>
          {basket.map((item) => (
            <div key={item.id} className="basket-item">
              <img src={`http://localhost:9500/public/images/${item.picture}`} alt={item.alt} />
              <div className="details">
                <h3>{item.name}</h3>
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