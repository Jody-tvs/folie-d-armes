const SecondaryPicture = require('../models/secondaryPictureModel')

const getAllSecondaryPictures = async (req, res) => {
    try {
        const pictures = await SecondaryPicture.getAllSecondaryPictures()
        res.json({ status: 200, result: pictures })
    } catch (err) {
        res.json({ status: 500, msg: "Oups une erreur est survenue" })
    }
}

const getSecondaryPicturesByProductId = async (req, res) => {
    const productId = req.params.productId;
    try {
        const pictures = await SecondaryPicture.getSecondaryPicturesByProductId(productId)
        res.status(200).json(pictures);
    } catch (err) {
        res.status(500).json({ message: 'Erreur lors de la récupération des images secondaires', error: err })
    }
}

const addSecondaryPicture = async (req, res) => {
    try {
        const picture = await SecondaryPicture.addSecondaryPicture(req.body)
        res.status(200).json({ msg: "Image secondaire enregistrée avec succès" })
    } catch (err) {
        res.status(500).json({ msg: "Oups une erreur est survenue" })
    }
}

const deleteSecondaryPicture = async (req, res) => {
    try {
        await SecondaryPicture.deleteSecondaryPicture(req.params.id)
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