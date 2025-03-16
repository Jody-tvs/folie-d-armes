import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../../styles/Profil.scss'
import { useNavigate } from 'react-router-dom'

function Profil() {
    //état des infos utilisateur
    const [user, setUser] = useState({}) //stock les infos utilisateur
    const [selectedField, setSelectedField] = useState('') //champ sélectionné pour modification
    const [newValue, setNewValue] = useState('') //nouvelle valeur pour le champ sélectionné
    const [error, setError] = useState('') //message d'erreur
    const [success, setSuccess] = useState('') //message de succès

    //etat pour la modification du mdp
    const [currentPassword, setCurrentPassword] = useState('') //mdp actuel
    const [newPassword, setNewPassword] = useState('') //nouveau mdp
    const [confirmNewPassword, setConfirmNewPassword] = useState('') //confirmation du nouveau mdp
    const [showPassword, setShowPassword] = useState(false) //afficher ou masquer les mdp
    const navigate = useNavigate() //useNavigate pour la redirection

    //récupère les données utilisateur
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token') //récupère le token d'authentification
                if (token) {
                    //requête GET pour récupérer les données utilisateur à partir de l'api
                    const response = await axios.get('https://folie-d-armes.onrender.com/api/v1/user/profil', {
                        headers: {
                            Authorization: `Bearer ${token}` //envoi du token dans les en-têtes de la requête
                        }
                    })
                    setUser(response.data.user) //maj de l'état utilisateur avec les données récupérer
                }
            } catch (err) {
                setError('Erreur lors de la récupération des informations utilisateur.')
            }
        }
        fetchUserData()
    }, []) //[] pour s'exécuter une seule fois après le premier rendu du composant

    //maj des infos utilisateur
    const handleSubmit = async (e) => {
        e.preventDefault() //empêche le rechargement de la page à la soumission du formulaire
        setError('')
        setSuccess('')

        //vérifi si un champ est sélectionné et une nouvelle valeur est fournie
        if (!selectedField || !newValue) {
            setError('Veuillez sélectionner un champ et fournir une nouvelle valeur.')
            return
        }

        try {
            const token = localStorage.getItem('token')
            if (token) {
                const updates = { [selectedField]: newValue } //crée un objet avec le champ sélectionné et la nouvelle valeur
                //requête PUT pour mettre à jour les infos utilisateur
                const response = await axios.put('https://folie-d-armes.onrender.com/api/v1/user/update', updates, {
                    headers: { Authorization: `Bearer ${token}` }
                })

                if (response.status === 200) {
                    setSuccess(`Votre ${selectedField} a été mis à jour avec succès.`) //message de succès
                    setUser({ ...user, [selectedField]: newValue }) //maj des infos utilisateur dans l'état local
                    setNewValue('') //réinitialisation du champ de la nouvelle valeur
                }
            }
        } catch (err) {
            setError('Erreur lors de la mise à jour des informations utilisateur.')
        }
    }

    //gère la mise à jour du mdp
    const handlePasswordUpdate = async (e) => {
        e.preventDefault()
        setError('')
        setSuccess('')

        // vérifi si le nouveau mot de passe et la confirmation correspondent
        if (newPassword !== confirmNewPassword) {
            setError('Les nouveaux mots de passe ne correspondent pas.')
            return
        }

        //vérifi si le nouveau mdp respecte les critères de sécurité
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        if (!passwordRegex.test(newPassword)) {
            setError('Le mot de passe doit contenir au moins 8 caractères, une majuscule, un chiffre et un caractère spécial.')
            return
        }

        try {
            const token = localStorage.getItem('token')
            if (token) {
                //requête PUT pour mettre à jour le mdp
                const response = await axios.put('https://folie-d-armes.onrender.com/api/v1/user/update-password', {
                    currentPassword,
                    newPassword
                }, {
                    headers: { Authorization: `Bearer ${token}` }
                })

                if (response.status === 200) {
                    setSuccess('Votre mot de passe a été mis à jour avec succès.') //message de succès
                    setCurrentPassword('') //réinitialisation des champs
                    setNewPassword('')
                    setConfirmNewPassword('')
                }
            }
        } catch (err) {
            setError('Erreur lors de la mise à jour du mot de passe.')
        }
    }

    //supprime le compte utilisateur
    const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer votre compte ?")
    if (confirmDelete) {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                //requête DELETE pour supprimer le compte utilisateur
                const response = await axios.delete('https://folie-d-armes.onrender.com/api/v1/user/delete', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })

                if (response.status === 200) {
                    //suppression réussie on supprime le token local et déconnecte l'utilisateur
                    localStorage.removeItem('token')
                    alert('Votre compte a été supprimé avec succès.')
                    navigate('/')
                    window.location.reload() //recharge la page après suppression
                } else {
                    setError('Erreur lors de la suppression du compte.')
                }
            }
        } catch (err) {
            setError('Erreur lors de la suppression du compte.')
        }
    }
}

    return (
        <div className="profil-container">
            <div className="column">
                <h2>Modifier vos informations</h2>
                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}

                <div className="profil-info">
                    <label>Choisissez un champ à modifier :</label>
                    <select value={selectedField} onChange={(e) => setSelectedField(e.target.value)}>
                        <option value="">Sélectionner</option>
                        <option value="email">Email</option>
                        <option value="address">Adresse</option>
                        <option value="city">Ville</option>
                        <option value="zip_code">Code Postal</option>
                        <option value="phone">Téléphone</option>
                    </select>
                </div>

                {/* formulaire pour la mise à jour du champ sélectionné */}
                {selectedField && (
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>{selectedField} :</label>
                            <input
                                type="text"
                                value={newValue}
                                onChange={(e) => setNewValue(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit">Mettre à jour</button>
                    </form>
                )}
            </div>

            <div className="column">
                <h2>Modifier votre mot de passe</h2>
                <form onSubmit={handlePasswordUpdate}>
                    <div>
                        <label>Mot de passe actuel :</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Nouveau mot de passe :</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Confirmer le nouveau mot de passe :</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            value={confirmNewPassword}
                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="password-toggle">
                        <input
                            type="checkbox"
                            checked={showPassword}
                            onChange={() => setShowPassword(!showPassword)}
                        />
                        <label>Afficher mot de passe</label>
                    </div>
                    <button type="submit">Changer le mot de passe</button>
                </form>
            </div>
            <div>
                <button onClick={handleDeleteAccount} className="delete-account-btn">Supprimer le compte</button>
            </div>
        </div>
    )
}

export default Profil