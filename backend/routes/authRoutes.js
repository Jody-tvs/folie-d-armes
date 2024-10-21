const withAuth = require('../middleware/withAuth')

module.exports = (app, db) => {
    const UserModel = require("../models/UserModel")(db) //on importe le model des utilisateurs
    const authController = require("../controllers/authController")(UserModel) //on initialise le controler d'authentification
    
    //route postman ok
    //route de vérification du token et de reconnexion automatique
    app.get('/api/v1/user/checkToken', withAuth, authController.checkToken)

}