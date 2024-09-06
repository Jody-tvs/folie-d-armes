const stripe = require('stripe')('sk_test_51PdtKNRswFkUPgM7hRhf93osVGq4DLMJlk3QB2GhBei7BkYaGlggmi5dghNb792d3pBkNlm0tD0VYbu8MmkpFxZd00vcK7HG9L')
const withAuth = require('../middleware/withAuth')

module.exports = (ProductModel, OrderModel, UserModel) => {

    //sauvegarder une commande
    const saveOrder = async (req, res) => {
        try {
            let total_amount = 0
    
            //enregistrement de la commande principale
            const orderInfos = await OrderModel.saveOneOrder(req.body.users_id, total_amount)
    
            if (!orderInfos || !orderInfos.insertId) {
              res.json({status: 500, msg: "Échec de l'enregistrement de la commande"})
            }
            const orderId = orderInfos.insertId

            //on traite chaque produit de la commande
            for (const product of req.body.items) {
                const dbProduct = await ProductModel.getOneProduct(product.products_id)
                if (!dbProduct || dbProduct.length === 0 || dbProduct[0].length === 0) {
                  res.json({status: 500, msg: "Produit introuvable"})
                }
    
                const unitPrice = parseFloat(dbProduct[0][0].price)
                const quantity = parseInt(product.quantity, 10) //convertir la quantité en nombre
                const products_id = parseInt(product.products_id, 10)

                //on vérifie les valeurs avant insertion
                if (isNaN(unitPrice) || isNaN(quantity) || isNaN(products_id)) {
                   res.json({status: 500, msg: "Données de produit invalides"})
                }
    
                //on insert les détails de la commande
                try {
                    const detail = await OrderModel.saveOneOrderDetail(orderId, {
                        quantity, unitPrice, products_id, tva: product.tva
                    })
                    if (!detail || detail instanceof Error) {
                      res.json({status: 500, msg: "Échec de l'enregistrement de la commande"})
                    }
                } catch (err) {
                res.json({status: 500, msg: "Échec de l'enregistrement de la commande"})
                }
                total_amount += quantity * unitPrice;
            }
    
            //mise à jour du montant total de la commande
            const update = await OrderModel.updateTotalAmount(orderId, total_amount)
            if (!update || update instanceof Error) {
            res.json({status: 500, msg: "Échec de l'enregistrement de la commande"})
            }
    
            res.json({status: 200, orderId: orderId})
        } catch (err) {
            res.json({status: 500, msg: "Échec de l'enregistrement de la commande"})
        }
    };
    
    
    //on gèrer l'exécution du paiement
    const executePayment = async (req, res) => {
        try {
            //on récupère les infos de la commande par son ID
            const order = await OrderModel.getOneOrder(req.body.orderId)
            if (order.code) {
                res.json({status: 500, msg: "Le paiement ne peut pas être vérifié 1"})
            } else {
                //on créer une intention de paiement avec Stripe
                const paymentIntent = await stripe.paymentIntents.create({
                    amount: order[0][0].total_amount * 100, //il est en cents donc on multiplie le montant à payer par 100
                    currency: 'eur', //devise en euros
                    metadata: {integration_check: 'accept_a_payment'}, //on consulte si le paiement est valide ou non
                    receipt_email: req.body.email //l'utilisateur recoit sa confirmation de paiement par mail
                })
                res.json({status: 200, client_secret: paymentIntent['client_secret']}) //renvoie le client_secret pour finaliser le paiement
            }
        } catch(err) {
            res.json({status: 500, msg: "Le paiement ne peut pas être vérifié 2"})
        }
    }

    //mettre à jour le statut de paiement d'une commande
    const updatePaymentStatus = async (req, res) => {
        try {
            const validate = await OrderModel.updateStatus(req.body.orderId, req.body.status)
            if (validate.code) {
                res.json({status: 500, msg: "Le statut de paiement de la commande ne peut pas être modifié"})
            } else {
                res.json({status: 200, msg: "Statut de paiement mis à jour avec succès"})
            }
        } catch(err) {
            res.json({status: 500, msg: "Le statut de paiement de la commande ne peut pas être modifié"})
        }
    }

    //récupération de toutes les commandes
    const getAllOrder = async (req, res) => {
        try {
            const orders = await OrderModel.getAllOrders()
            if (orders.code) {
                res.json({status: 500, msg: "Oups, une erreur est survenue lors de la récupération des commandes"})
            } else {
                res.json({status: 200, result: orders}) //renvoie la liste des commandes au client
            }
        } catch(err) {
            res.json({status: 500, msg: "Oups, une erreur est survenue"})
        }
    }

    //récupération des détails d'une commande par ID
    const getOneOrder = async (req, res) => {
        try {
            //recupération d'une commande
            const order = await OrderModel.getOneOrder(req.params.id)
            if (order.code) {
                res.json({status: 500, msg: "Oups, une erreur est survenue"})
            } else {
                //récupération des infos de l'utilisateur associé à la commande
                const user = await UserModel.getOneUser(order[0].users_id)
                if (user.code) {
                    res.json({status: 500, msg: "Oups, une erreur est survenue"})
                } else {
                    const myUser = {
                        firstName: user[0].firstname,
                        lastName: user[0].lastname,
                        address: user[0].address,
                        zip: user[0].zip_code,
                        city: user[0].city,
                        phone: user[0].phone
                    }
                    //récupération des détails de la commande
                    const details = await OrderModel.getAllDetails(req.params.id)
                    if (details.code) {
                        res.json({status: 500, msg: "Oups, une erreur est survenue"})
                    } else {
                        res.json({status: 200, order: order[0], user: myUser, orderDetail: details})
                    }
                }
            }
        } catch(err) {
            res.json({status: 500, msg: "Oups, une erreur est survenue"})
        }
    }

    //retour des méthodes du contrôleur pour les utiliser dans nos routes
    return {
        saveOrder,           //sauvegarde d'une nouvelle commande
        executePayment,      //exécution du paiement d'une commande
        updatePaymentStatus, //mise à jour du statut de paiement d'une commande
        getAllOrder,         //récuépration de toutes les commandes
        getOneOrder          //récupération d'une commande spécifique par ID
    }
}

