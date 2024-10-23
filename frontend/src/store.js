import { configureStore } from '@reduxjs/toolkit'
import basketReducer from './slices/basketSlice'
import authReducer from './slices/authSlice'

//création du store Redux
export const store = configureStore({
  reducer: {
    basket: basketReducer, //associe le slice du panier au store sous la clé basket
    auth: authReducer, //associe le slice de l'authentification au store sous la clé auth
  },
})

export default store