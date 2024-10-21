const withAuth = require('../middleware/withAuth')
const isAdmin = require('../middleware/isAdmin')

module.exports = (app, db) => {
    const ProductModel = require("../models/ProductModel")(db)
    const productController = require("../controllers/productController")(ProductModel)

    //route pour récupérer tous les produits
    //requête SQL ok
    //route Postman ok
    app.get('/api/v1/products', productController.getProductsByCategoryOrAll)

    //route pour récupérer un produit spécifique par ID
    //requête SQL ok
    //route Postman ok
    app.get('/api/v1/product/:id', productController.getOneProduct)

    //route pour ajouter un nouveau produit protéger par withAuth et isAdmin
    //requête SQL ok
    //route Postman ok
    app.post('/api/v1/product/save', withAuth, isAdmin, productController.saveProduct)

    //route pour modifier un produit protéger par withAuth et isAdmin
    //requête SQL ok
    //route Postman ok
    app.put('/api/v1/product/update/:id', withAuth, isAdmin, productController.updateProduct)

    //route pour supprimer un produit protéger par withAuth et isAdmin
    //requête SQL ok
    //route Postman ok
    app.delete('/api/v1/product/delete/:id', withAuth, isAdmin, productController.deleteProduct)

    //route d'ajout d'une image dans l'api stock l'image et retourne le nom
    //route Postman ok
    app.post('/api/v1/product/pict', productController.savePicture)

}