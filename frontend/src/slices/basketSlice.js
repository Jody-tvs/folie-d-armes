import { createSlice } from "@reduxjs/toolkit"

//on récupère le panier présent dans le localStorage sous la clé foliedarmes-basket. si aucun panier n'existe, on initialise un tableau vide [0]
let lsBasket = JSON.parse(window.localStorage.getItem("foliedarmes-basket")) || []

//calcule le prix total du panier en fonction de la quantité des articles
const calculateTotalAmount = (basket) => {
    return basket.reduce((total, item) => total + item.price * item.quantityInCart, 0) //multipli prix * quantit" pour chaque article
}

//initialisation de l'état du panier avec les articles et le prix total
const initialState = {
    basket: lsBasket, //récupère les articles depuis le localStorage
    totalPrice: calculateTotalAmount(lsBasket), //calcul initial du prix total
}

export const basketSlice = createSlice({
    name: "basket", //nom de l'état
    initialState, //état initial défini plus haut
    reducers: {
        //ajoute un article au panier
        addToBasket: (state, action) => {
            const item = action.payload //l'article à ajouter
            const existingItem = state.basket.find(b => b.id === item.id) //on vérifi si l'article existe déjà dans le panier

            if (existingItem) {
                //si l'article existe on incrémente sa quantité
                existingItem.quantityInCart += 1
            } else {
                //si l'article n'existe pas on l'ajoute au panier avec une quantité initila de 1
                state.basket.push({ ...item, quantityInCart: 1 })
            }

            //met à jour le prix total du panier
            state.totalPrice = calculateTotalAmount(state.basket)

            //sauvegarde le panier maj dans le localStorage
            window.localStorage.setItem("foliedarmes-basket", JSON.stringify(state.basket))
        },
        //supprime un article du panier
        removeFromBasket: (state, action) => {
            const itemId = action.payload //l'id de l'article a supprimer
            state.basket = state.basket.filter(item => item.id !== itemId) //filtre les article pour enlever celui qui a l'id correspondant
            //maj du prix total après suppression
            state.totalPrice = calculateTotalAmount(state.basket)
            //maj du localStorage avec le panier modifier
            window.localStorage.setItem("foliedarmes-basket", JSON.stringify(state.basket))
        },
        //modifie la quantité d'un article
        updateItemQuantity: (state, action) => {
            const { itemId, newQuantity } = action.payload //récupère l'id de l'article et la nouvelle quantitié 
            const item = state.basket.find(b => b.id === itemId) //trouve l'article dans le panier

            if (item) {
                //si l'article est trouver on met à jour sa quantité
                item.quantityInCart = newQuantity
                //maj du prix total après modification
                state.totalPrice = calculateTotalAmount(state.basket)
                //sauvegarde le panier maj dans le localStorage
                window.localStorage.setItem("foliedarmes-basket", JSON.stringify(state.basket))
            }
        },
        //vide entièrement le panier
        clearBasket: (state) => {
            state.basket = [] //remet le panier à un tableau vide
            state.totalPrice = 0 //réinitialise le prix total à 0

            //supprime le panier du localStorage
            window.localStorage.removeItem("foliedarmes-basket")
        },
    },
})
//export les actions pour pouvoir les utiliser dans d'autres composants
export const { addToBasket, removeFromBasket, updateItemQuantity, clearBasket } = basketSlice.actions
//sélecteur pour récupérer le panier depuis le state global
export const selectBasket = (state) => state.basket
//export le reducer qui sera utilisé pour configurer le store Redux
export default basketSlice.reducer