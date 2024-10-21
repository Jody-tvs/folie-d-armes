import React, { useState } from 'react'
import axios from 'axios'
import '../styles/Contact.scss'

function Contact() {
    const [email, setEmail] = useState('')
    const [subject, setSubject] = useState('')
    const [story, setStory] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setSuccess('')

        if (!subject) {
            setError('Veuillez sélectionner un sujet.')
            return
        }

        try {
            const response = await axios.post('http://localhost:9500/api/v1/contact', {
                email,
                subject,
                story,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            if (response.status === 200) {
                setSuccess('Votre message a bien été envoyé !')
                setEmail('')
                setSubject('')
                setStory('')
            }
        } catch (err) {
            console.error("Erreur lors de l'envoi du message:", err)
            setError("Erreur lors de l'envoi du formulaire. Veuillez réessayer.")
        }
    }

    return (
        <div className="contact">
            <h2>Contactez-nous</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>E-mail :</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Sujet :</label>
                    <select
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        required
                    >
                        <option value="" disabled>-- Sélectionnez votre sujet --</option>
                        <option value="Proposition d'armes">Proposition(s) d'arme(s) absurde</option>
                        <option value="Accessoires absurde">Accessoire(s) absurde</option>
                        <option value="Munitions absurde">Munition(s) absurde</option>
                        <option value="Question divers">Questions divers</option>
                    </select>
                </div>
                <div>
                    <label>Message :</label>
                    <textarea
                        value={story}
                        onChange={(e) => setStory(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Envoyer</button>
            </form>
        </div>
    )
}

export default Contact