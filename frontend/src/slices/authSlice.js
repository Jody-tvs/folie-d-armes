import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null, //infos utilisateur 
  isAuthenticated: false, //statut de connexion
  isAdmin: false, //statut admin
  token: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    //connecte l'utilisateur
    login: (state, action) => {
      state.user = action.payload.user //stock les infos utilisateur
      state.token = action.payload.token //stock le jeton d'authentification
      state.isAuthenticated = true //marque l'utilisateur comme connecter
      state.isAdmin = action.payload.user.isAdmin || false //défini le statut admin
    },
    
    //déconnecte l'utilisateur
    logout: (state) => {
      state.user = null //réinitialise les infos utilisateur
      state.token = null //réinitialise le token
      state.isAuthenticated = false //marque l'utilisateur comme déconnecter
      state.isAdmin = false //réinitialise le statut admin
    },
    
    //met à jour les infos utilisateur
    updateUserInfo: (state, action) => {
      state.user = { ...state.user, ...action.payload } //met à jour les infos utilisateur
    },
  },
})

export const { login, logout, updateUserInfo } = authSlice.actions

//sélecteur pour accéder aux infos
export const selectAuthUser = (state) => state.auth.user //récupère les infos utilisateur
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated //récupère le statut de connexion
export const selectIsAdmin = (state) => state.auth.isAdmin //récupère le statut admin
export const selectAuthToken = (state) => state.auth.token //récupère le token d'authentification

export default authSlice.reducer