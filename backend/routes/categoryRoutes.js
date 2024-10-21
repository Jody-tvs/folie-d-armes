const withAuth = require('../middleware/withAuth')
const isAdmin = require('../middleware/isAdmin')

module.exports = (app, db) => {
    const CategoryModel = require("../models/CategoryModel")(db)
    const categoryController = require("../controllers/categoryController")(CategoryModel)
    
    //route pour récupérer toutes les catégories
    //requête SQL ok
    //route Postman ok
    app.get('/api/v1/categories', categoryController.getAllCategories)

    //route pour récupérer une catégorie par son ID 
    //requête SQL ok
    //route Postman ok
    app.get('/api/v1/categories/:id', categoryController.getCategoryById)

    //route pour créer une nouvelle catégorie
    //requête SQL ok
    //route Postman ok
    app.post('/api/v1/categories', withAuth, isAdmin, categoryController.createCategory)

    //route pour modifier une catégorie
    //requête SQL ok
    //route Postman ok
    app.put('/api/v1/categories/:id', withAuth, isAdmin, categoryController.updateCategory)

    //route pour supprimer une catégorie
    //requête SQL ok
    //route Postman ok
    app.delete('/api/v1/categories/:id', withAuth, isAdmin, categoryController.deleteCategory)
}