import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../../styles/Profil.scss'
import { useNavigate } from 'react-router-dom'

function Profil() {
    //état des infos utilisateur
    const [user, setUser] = useState({})
    const [selectedField, setSelectedField] = useState('')
    const [newValue, setNewValue] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    //etat pour la modification du mdp
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()

    //récupère les données utilisateur
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token')
                if (token) {
                    const response = await axios.get('http://localhost:9500/api/v1/user/profil', {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                    setUser(response.data.user)
                }
            } catch (err) {
                setError('Erreur lors de la récupération des informations utilisateur.')
            }
        }
        fetchUserData()
    }, [])

    //maj des infos utilisateur
    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setSuccess('')

        if (!selectedField || !newValue) {
            setError('Veuillez sélectionner un champ et fournir une nouvelle valeur.')
            return
        }

        try {
            const token = localStorage.getItem('token')
            if (token) {
                const updates = { [selectedField]: newValue }

                const response = await axios.put('http://localhost:9500/api/v1/user/update', updates, {
                    headers: { Authorization: `Bearer ${token}` }
                })

                if (response.status === 200) {
                    setSuccess(`Votre ${selectedField} a été mis à jour avec succès.`)
                    setUser({ ...user, [selectedField]: newValue })
                    setNewValue('')
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

        if (newPassword !== confirmNewPassword) {
            setError('Les nouveaux mots de passe ne correspondent pas.')
            return
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        if (!passwordRegex.test(newPassword)) {
            setError('Le mot de passe doit contenir au moins 8 caractères, une majuscule, un chiffre et un caractère spécial.')
            return
        }

        try {
            const token = localStorage.getItem('token')
            if (token) {
                const response = await axios.put('http://localhost:9500/api/v1/user/update-password', {
                    currentPassword,
                    newPassword
                }, {
                    headers: { Authorization: `Bearer ${token}` }
                })

                if (response.status === 200) {
                    setSuccess('Votre mot de passe a été mis à jour avec succès.')
                    setCurrentPassword('')
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
                const response = await axios.delete(`http://localhost:9500/api/v1/user/delete`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })

                if (response.status === 200) {
                    //suppression réussie on supprime le token local et déconnecte l'utilisateur                    localStorage.removeItem('token');
                    localStorage.removeItem('token')
                    alert('Votre compte a été supprimé avec succès.')
                    navigate('/')
                    window.location.reload()
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