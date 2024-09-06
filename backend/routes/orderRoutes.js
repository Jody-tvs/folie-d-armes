const withAuth = require('../middleware/withAuth')

module.exports = (app, db) => {
    const ProductModel = require('../models/ProductModel')(db)
    const OrderModel = require('../models/OrderModel')(db)
    const UserModel = require('../models/UserModel')(db)
    const orderController = require('../controllers/orderController')(ProductModel, OrderModel, UserModel)
    
    //route de sauvegarde complète d'une commande
    //route Postman ok
    app.post('/api/v1/order/save', withAuth, orderController.saveOrder)

    //route de gestion du paiement (va analyser le bon fonctionnement du paiement)
    //route Postman ok
    app.post('/api/v1/order/payment', withAuth, orderController.executePayment)

    //route de modification du status de paiement de la commande
    //route Postman ok
    app.put('/api/v1/order/validate', withAuth, orderController.updatePaymentStatus)

    //route de récupération de toutes les commandes
    //route Postman ok
    app.get('/api/v1/order/all', withAuth, orderController.getAllOrder)

    //route de récupération d'une commande spécifique par son ID
    //route Postman ok
    app.get('/api/v1/order/getOneOrder/:id', withAuth, orderController.getOneOrder)
}