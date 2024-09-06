const withAuth = require('../middleware/withAuth')

module.exports = (app, db) => {
    const ProductModel = require("../models/ProductModel")(db)
    const productController = require("../controllers/productController")(ProductModel)

    //route pour récupérer tous les produits
    //requête SQL ok
    //route Postman ok
    app.get('/api/v1/products', productController.getAllProducts)

    //route pour récupérer un produit spécifique par ID
    //requête SQL ok
    //route Postman ok
    app.get('/api/v1/product/:id', productController.getOneProduct)

    //route pour ajouter un nouveau produit
    //requête SQL ok
    //route Postman ok
    app.post('/api/v1/product/save', withAuth, productController.saveProduct)

    //route pour modifier un produit
    //requête SQL ok
    //route Postman ok
    app.put('/api/v1/product/update/:id', withAuth, productController.updateProduct)

    //route pour supprimer un produit
    //requête SQL ok
    //route Postman ok
    app.delete('/api/v1/product/delete/:id', withAuth, productController.deleteProduct)

    //route d'ajout d'une image dans l'api (stock l'image et retourne le nom)
    //route Postman ok
    app.post('/api/v1/product/pict', productController.savePicture)
}
