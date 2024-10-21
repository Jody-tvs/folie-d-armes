module.exports = (app, db) => {
    const secondaryPictureController = require('../controllers/secondaryPictureController')

    //requête SQL ok
    //route postman ok
    //route pour obtenir toutes les images secondaires
    app.get('/api/secondarypictures', secondaryPictureController.getAllSecondaryPictures)

    //requête SQL ok
    //route postman ok
    // Route pour obtenir les images secondaires d'un produit spécifique
    app.get('/api/secondarypictures/:productId', secondaryPictureController.getSecondaryPicturesByProductId)

    //requête SQL ok
    //route postman ok
    //route pour ajouter une nouvelle image secondaire via son ID
    app.post('/api/v1/product/:id/secondarypicture', secondaryPictureController.addSecondaryPicture)

    //requête SQL ok
    //route postman ok
    //route pour supprimer une image secondaire par son ID
    app.delete('/api/secondarypictures/:id', secondaryPictureController.deleteSecondaryPicture)
}