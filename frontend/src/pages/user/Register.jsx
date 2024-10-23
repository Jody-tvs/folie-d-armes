import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { login } from '../../slices/authSlice'
import '../../styles/Register.scss'

function Register() {
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false) //afficher/cacher le mot de passe
    const [address, setAddress] = useState('')
    const [zipCode, setZipCode] = useState('')
    const [city, setCity] = useState('')
    const [phone, setPhone] = useState('')
    const [error, setError] = useState('') //stock les erreurs lors de la soumission du formulaire
    const [passwordError, setPasswordError] = useState('') //stock les erreurs de validation du mot de passe
    const navigate = useNavigate()

    const dispatch = useDispatch()

    //validation du mdp
    const validatePassword = (password) => {
        //on vérifi que le mdp a moins 8 caractères une majuscule un nombre et un caractère spécial
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        return passwordRegex.test(password)
    }

    //gère la soumission du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault()  //empeche le rechargement de la page lors de la soumission
        setError('') //réinitialise les erreurs d'inscription
        setPasswordError('') //réinitialise les erreurs de mot de passe
    
        //valide le mdp avant de soumettre le formulaire
        if (!validatePassword(password)) {
            setPasswordError(
                'Le mot de passe doit contenir au moins 8 caractères, une lettre majuscule, un nombre et un caractère spécial.'
            )
            return //stop la soumission si le mot de passe n'est pas valide
        }
        try {
            //envoi des données d'inscription à l'api back
            const response = await axios.post('http://localhost:9500/api/v1/user/register', {
                firstname,
                lastname,
                email,
                password,
                address,
                zip_code: zipCode,
                city,
                phone,
            })
    
            //si l'inscription réussit on traite la réponse
            if (response.status === 201) {
                const { token, user } = response.data;
    
                //stock le token JWT dans le localStorage pour les futurs requetes
                localStorage.setItem('token', token);

                //met à jour le store redux avec les infos de l'utilisateur et le token
                dispatch(login({
                    user: user,
                    token: token,
                }))

                //redirige vers la page d'accueil après l'inscription
                navigate('/')
            }
        } catch (err) {
            //gère les erreurs si l'email est déjà utilisé
            if (err.response && err.response.status === 409) {
                setError('Cet email est déjà utilisé.')
            } else {
                //gère les autres erreurs
                setError('Erreur lors de l\'inscription. Veuillez réessayer.')
            }
        }
    }
    
    return (
        <div className="register">
            <h2>Inscription</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Affiche les erreurs d'inscription */}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Prénom :</label>
                    <input
                        type="text"
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Nom :</label>
                    <input
                        type="text"
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Email :</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Mot de passe :</label>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <div className="password-toggle">
                        <input
                            type="checkbox"
                            checked={showPassword}
                            onChange={() => setShowPassword(!showPassword)} 
                        />
                        <label>Afficher mot de passe</label>
                    </div>
                    {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
                </div>
                <div>
                    <label>Adresse :</label>
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Code Postal :</label>
                    <input
                        type="text"
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Ville :</label>
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Numéro de Téléphone :</label>
                    <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Enregistrer</button>
            </form>
        </div>
    )
}

export default Register