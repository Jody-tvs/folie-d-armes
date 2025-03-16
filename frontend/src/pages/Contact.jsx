import React, { useState } from 'react' //import des modules nécessaire à la gestion des états et composants React
import axios from 'axios' //import d'axios pour effectuer des requêtes HTTP vers le serveur
import '../styles/Contact.scss'

function Contact() {
    //on déclare les états pour gerer les champs du formulaire et les messages d'erreur et succès
    const [email, setEmail] = useState('')
    const [subject, setSubject] = useState('')
    const [story, setStory] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    //fonction appeler lors de la soumission du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault() //empêche le comportement par défaut du formulaire (rechargement de la page)
        setError('') //réinitialisation du message d'erreur avant chaque soumission
        setSuccess('') //réinitialisation du message de succès avant chaque soumission

        //on s'assure que le sujet est bien sélectionner
        if (!subject) {
            setError('Veuillez sélectionner un sujet.') //si aucun sujet n'est sélectionner on affiche un message d'erreur
            return //arrêt de l'exécution de la fonction
        }

        try {
            //requête POST pour envoyer les données du formulaire au serveur 
            const response = await axios.post('https://folie-d-armes.onrender.com/api/v1/contact', {
                email,
                subject,
                story,
            }, {
                headers: {
                    'Content-Type': 'application/json', //type de contenu
                },
            })

            //vérifi si la requête est bien passer
            if (response.status === 200) {
                setSuccess('Votre message a bien été envoyé !')
                //réinitialisation des champs après l'envoi
                setEmail('')
                setSubject('')
                setStory('')
            }
        } catch (err) {
            console.error("Erreur lors de l'envoi du message:", err)
            setError("Erreur lors de l'envoi du formulaire. Veuillez réessayer.") //message d'erreur général
        }
    }

    //rendu du formulaire de contact
    return (
        <div className="contact">
            <h2>Contactez-nous</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* affiche message d'erreur si il y en a un */}
            {success && <p style={{ color: 'green' }}>{success}</p>} {/* affiche le message de succès si tout est ok */}

            {/* appel handleSubmit à la soumission */}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>E-mail :</label>
                    <input
                        type="email"
                        value={email} //valeur liée à l'état email
                        onChange={(e) => setEmail(e.target.value)} //met à jour l'état email à chaque changement
                        required //champ obligatoire
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