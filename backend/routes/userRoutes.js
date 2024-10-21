const withAuth = require('../middleware/withAuth') 

module.exports = (app, db) => {
    const UserModel = require("../models/UserModel")(db) 
    const userController = require("../controllers/userController")(UserModel)
    
    //route d'enregistrement d'un utilisateur créer un nouvelle utilisateur dans la bdd
    //requête SQL ok
    //route Postman ok
    app.post('/api/v1/user/register', userController.saveUser)

    //route de connexion d'un utilisateur
    //requête SQL ok
    //route Postman ok
    app.post('/api/v1/user/login', userController.loginUser)

    //route de modification des infos utilisateur 
    //requête SQL ok
    //route Postman ok
    app.put('/api/v1/user/update', withAuth, userController.updateUser)

    //route de suppression d'un utilisateur
    //requête SQL ok
    //route Postman ok
    app.delete('/api/v1/user/delete', withAuth, userController.deleteUser)

    //requête SQL ok
    //route Postman ok
    //route de modification de mot de passe
    app.put('/api/v1/user/update-password', withAuth, userController.updatePassword)

    //route de récupération des infos du profil de l'utilisateur connecté
    //requête SQL ok
    //route Postman ok
    app.get('/api/v1/user/profil', withAuth, userController.getUserProfile)
}