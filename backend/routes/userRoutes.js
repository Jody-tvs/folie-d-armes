const withAuth = require('../middleware/withAuth') //importation du middleware pour la vérif de l'authentification

module.exports = (app, db) => {
    const UserModel = require("../models/UserModel")(db) //initialisation du model utilisateur avec la BDD
    const userController = require("../controllers/userController")(UserModel) //initialisation du controleur utilisateur avec le modele
    
    //route d'enregistrement d'un utilisateur (créer un nouvelle utilisateur dans la BDD)
    //requête SQL ok
    //route Postman ok
    app.post('/api/v1/user/register', userController.saveUser)

    //route de connexion d'un utilisateur (sert à l'utilisateur de se connecter et génère un token qu'on envoie vers le front)
    //requête SQL ok
    //route Postman ok
    app.post('/api/v1/user/login', userController.loginUser)

    //route de modification  des infos utilisateur (route protéger par le middleware withAuth pour vérifier l'authentification)
    //requête SQL ok
    //route Postman ok
    app.put('/api/v1/user/update/:id', withAuth, userController.updateUser)

    //route de suppression d'un utilisateur (route aussi protéger par withAuth qui assure qu'un seul utilisateur authentifier peut supprimer un compte)
    //requête SQL ok
    //route Postman ok
    app.delete('/api/v1/user/delete/:id', withAuth, userController.deleteUser)
}