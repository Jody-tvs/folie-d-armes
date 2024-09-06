const fs = require("fs") 
const path = require('path')
const SecondaryPicture = require('../models/secondaryPictureModel')

//obtient toutes les images secondaires
const getAllSecondaryPictures = async (req, res) => {
    try {
        const pictures = await SecondaryPicture.getAllSecondaryPictures()
        if (pictures.code) {
            res.json({ status: 500, msg: "Oups une erreur est survenue" })
        } else {
            res.json({ status: 200, result: pictures })
        }
    } catch (err) {
        res.json({ status: 500, msg: "Oups une erreur est survenue" })
    }
}

//ajoute une nouvelle image secondaire
const addSecondaryPicture = async (req, res) => {
    try {
        const { name, alt, products_id } = req.body
        //vérifie les données avant insertion
        if (!name || !alt || !products_id) {
            return res.status(400).json({ status: 400, msg: "Les champs 'name', 'alt', et 'products_id' sont obligatoires." })
        }
        const id = await SecondaryPicture.addSecondaryPicture({ name, alt, products_id })
        res.json({ status: 200, message: 'Image ajoutée avec succès', id: id })
    } catch (err) {
        res.json({ status: 500, msg: "Oups une erreur est survenue" })
    }
}

//supprime une image secondaire
const deleteSecondaryPicture = async (req, res) => {
    try {
        //récupère l'ID de l'image à supprimer
        const id = req.params.id  
        if (!id || isNaN(id)) {
            return res.status(400).json({ status: 400, message: 'ID invalide' })
        }
        const affectedRows = await SecondaryPicture.deleteSecondaryPicture(id)
        if (affectedRows === 0) {
            return res.status(404).json({ status: 404, message: 'Image non trouvée' });
        } else {
            res.json({ status: 200, message: 'Image supprimée avec succès' });
        }
    } catch (err) {
        res.json({ status: 500, msg: "Oups une erreur est survenue" })
    }
}

//sauvegarde une image secondaire
const saveSecondaryPicture = async (req, res) => {
    try {
        //on vérifie si un fichier a été envoyé via le front
        if (!req.files || Object.keys(req.files).length === 0) {
            res.json({ status: 400, msg: "La photo n'a pas pu être récupérée" })
        } else {
            //on définie le chemin vers le dossier de destination
            const uploadPath = path.join('public', 'images', req.files.picture.name)
            //on déplace l'image vers le dossier public/images
            req.files.picture.mv(uploadPath, (err) => {
                if (err) {
                    res.json({ status: 500, msg: "La photo n'a pas pu être enregistrée!" })
                } else {
                    res.json({ status: 200, msg: "Image enregistrée!", url: uploadPath })
                }
            })
        }
    } catch (err) {
        res.json({ status: 500, msg: "Oups, une erreur est survenue!" })
    }
}

module.exports = {
    getAllSecondaryPictures,
    addSecondaryPicture,
    deleteSecondaryPicture,
    saveSecondaryPicture
}
