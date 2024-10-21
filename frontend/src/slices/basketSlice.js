import { createSlice } from "@reduxjs/toolkit"

//on récupère le panier présent dans le localStorage sous la clé foliedarmes-basket
let lsBasket = JSON.parse(window.localStorage.getItem("foliedarmes-basket")) || []

//calcule le prix total du panier
const calculateTotalAmount = (basket) => {
    return basket.reduce((total, item) => total + item.price * item.quantityInCart, 0)
}

//initialisation de l'état : panier et total
const initialState = {
    basket: lsBasket,
    totalPrice: calculateTotalAmount(lsBasket),
}

export const basketSlice = createSlice({
    name: "basket",
    initialState,
    reducers: {
        addToBasket: (state, action) => {
            const item = action.payload;
            const existingItem = state.basket.find(b => b.id === item.id)

            if (existingItem) {
                existingItem.quantityInCart += 1
            } else {
                state.basket.push({ ...item, quantityInCart: 1 })
            }

            //met à jour le total
            state.totalPrice = calculateTotalAmount(state.basket)

            //sauvegarde dans le localStorage
            window.localStorage.setItem("foliedarmes-basket", JSON.stringify(state.basket))
        },
        
        removeFromBasket: (state, action) => {
            const itemId = action.payload;
            state.basket = state.basket.filter(item => item.id !== itemId)

            state.totalPrice = calculateTotalAmount(state.basket)

            window.localStorage.setItem("foliedarmes-basket", JSON.stringify(state.basket))
        },

        updateItemQuantity: (state, action) => {
            const { itemId, newQuantity } = action.payload
            const item = state.basket.find(b => b.id === itemId)

            if (item) {
                item.quantityInCart = newQuantity

                state.totalPrice = calculateTotalAmount(state.basket)

                window.localStorage.setItem("foliedarmes-basket", JSON.stringify(state.basket))
            }
        },
        clearBasket: (state) => {
            state.basket = []
            state.totalPrice = 0

            //vide le localStorage
            window.localStorage.removeItem("foliedarmes-basket")
        },
    },
})

export const { addToBasket, removeFromBasket, updateItemQuantity, clearBasket } = basketSlice.actions
export const selectBasket = (state) => state.basket
export default basketSlice.reducer