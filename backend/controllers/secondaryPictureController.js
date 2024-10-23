const SecondaryPicture = require('../models/secondaryPictureModel')

//récupère toutes les images secondaire
const getAllSecondaryPictures = async (req, res) => {
    try {
        const pictures = await SecondaryPicture.getAllSecondaryPictures()
        //appel une méthode du modèle pour obtenir toutes les images secondaires depuis la bdd
        res.json({ status: 200, result: pictures })
        //renvoie les images obtenues avec un statut 200 succès
    } catch (err) {
        res.json({ status: 500, msg: "Oups une erreur est survenue" })
        //gère les erreurs et renvoie un message d'erreur avec un statut 500 erreur serveur
    }
}

//récupère les images secondaires associer à un produit spécifique
const getSecondaryPicturesByProductId = async (req, res) => {
    const productId = req.params.productId
    //récupère l'id du produit à partir des paramètres de l'URL
    try {
        const pictures = await SecondaryPicture.getSecondaryPicturesByProductId(productId)
        //appel une méthode du modèle pour obtenir les images secondaires liées à un produit spécifique
        res.status(200).json(pictures)
        //renvoie les images obtenues avec un statut 200 succès
    } catch (err) {
        res.status(500).json({ message: 'Erreur lors de la récupération des images secondaires', error: err })
        //gère les erreurs et renvoie un message d'erreur avec un statut 500
    }
}

//ajout d'une nouvelle image secondaire
const addSecondaryPicture = async (req, res) => {
    try {
        const picture = await SecondaryPicture.addSecondaryPicture(req.body)
        //appel une méthode du modèle pour ajouter une nouvelle image secondaire avec les données envoyées dans la requête req.body
        res.status(200).json({ msg: "Image secondaire enregistrée avec succès" })
    } catch (err) {
        res.status(500).json({ msg: "Oups une erreur est survenue" })
    }
}

//supprime une image secondaire
const deleteSecondaryPicture = async (req, res) => {
    try {
        await SecondaryPicture.deleteSecondaryPicture(req.params.id)
        //appel une méthode du modèle pour supprimer une image secondaire en fonction de l'id récupérer dans les paramètres de l'URL req.params.id
        res.json({ status: 200, message: 'Image supprimée avec succès' })
    } catch (err) {
        res.json({ status: 500, msg: "Oups une erreur est survenue" })
    }
}

module.exports = {
    getAllSecondaryPictures,
    addSecondaryPicture,
    deleteSecondaryPicture,
    getSecondaryPicturesByProductId
}