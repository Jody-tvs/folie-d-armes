const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

module.exports = (ProductModel, OrderModel, UserModel) => {

    //sauvegarde une commande
    const saveOrder = async (req, res) => {
        try {
            //utilise req.user.id pour obtenir l'utilisateur authentifier
            const users_id = req.user.id
            let total_amount = 0
    
            //enregistre la commande principale avec l'ID utilisateur
            const orderInfos = await OrderModel.saveOneOrder(users_id, total_amount)
    
            if (!orderInfos || !orderInfos.insertId) {
                return res.status(500).json({status: 500, msg: "Échec de l'enregistrement de la commande"})
            }
            const orderId = orderInfos.insertId
    
            //on traite chaque produit de la commande
            for (const product of req.body.items) {
                const dbProduct = await ProductModel.getOneProduct(product.products_id)
                if (!dbProduct) {
                    return res.status(500).json({ status: 500, msg: "Produit introuvable" })
                }
            
                const unitPrice = parseFloat(dbProduct.price)
                const quantity = parseInt(product.quantity, 10)
                const products_id = parseInt(product.products_id, 10)
            
                //vérifi les valeurs avant insertion
                if (isNaN(unitPrice) || isNaN(quantity) || isNaN(products_id)) {
                    return res.status(500).json({ status: 500, msg: "Données de produit invalides" })
                }
            
                //insert les détails de la commande
                const detail = await OrderModel.saveOneOrderDetail(orderId, {
                    quantity, unitPrice, products_id, tva: product.tva
                })
            
                if (!detail || detail instanceof Error) {
                    return res.status(500).json({ status: 500, msg: "Échec de l'enregistrement des détails de la commande" })
                }
                total_amount += quantity * unitPrice
            }
    
            //maj du montant total de la commande
            const update = await OrderModel.updateTotalAmount(orderId, total_amount)
            console.log("Mise à jour du montant total :", update)
            if (!update || update instanceof Error) {
                return res.status(500).json({status: 500, msg: "Échec de la mise à jour du montant total"})
            }
    
            res.status(200).json({status: 200, orderId: orderId})
        } catch (err) {
            console.error("Erreur lors de la sauvegarde de la commande :", err)
            return res.status(500).json({status: 500, msg: "Échec de l'enregistrement de la commande"})
        }
    }

        //récupère les commandes d'un utilisateur connecté
        const getUserOrders = async (req, res) => {
            try {
                const userId = req.params.userId //récupère l'ID utilisateur depuis l'URL
                const orders = await OrderModel.getUserOrders(userId) //on appel la méthode du modèle
            if (!orders || orders.length === 0) {
                return res.status(404).json({ message: 'Aucune commande trouvée.' })
        }
            res.status(200).json({ orders })
            } catch (err) {
                console.error("Erreur lors de la récupération des commandes de l'utilisateur :", err)
                res.status(500).json({ error: 'Erreur serveur lors de la récupération des commandes.' })
    }
}

    //on gèrer l'exécution du paiement
    const executePayment = async (req, res) => {
        try {
            const users_id = req.user.id
            const items = req.body.items
            let total_amount = 0
    
            const amountInEuros = parseFloat(req.body.amount)
            if (!amountInEuros || amountInEuros <= 0) {
                return res.status(400).json({ status: 400, msg: "Montant invalide" })
            }
            const amountInCents = Math.round(amountInEuros * 100)
    
            //créer l'intention de paiement avec Stripe
            const paymentIntent = await stripe.paymentIntents.create({
                amount: amountInCents,
                currency: 'eur',
                metadata: { integration_check: 'accept_a_payment' },
                receipt_email: req.body.email || null,
            })

            //enregistre la commande dans la bdd
            const orderInfos = await OrderModel.saveOneOrder(users_id, total_amount)
            const orderId = orderInfos.insertId
    
            //enregistre chaque article du panier dans la bdd
            for (const product of items) {
                const dbProduct = await ProductModel.getOneProduct(product.id)
                if (!dbProduct) {
                    return res.status(500).json({ status: 500, msg: "Produit introuvable" })
                }
    
                const unitPrice = parseFloat(dbProduct.price)
                const quantity = parseInt(product.quantityInCart, 10)
                total_amount += quantity * unitPrice
    
                //enregistre les détails de la commande
                await OrderModel.saveOneOrderDetail(orderId, {
                    quantity, 
                    unitPrice, 
                    products_id: product.id, 
                    tva: product.tva
                })
            }
    
            //met à jour le montant total dans la BDD
            await OrderModel.updateTotalAmount(orderId, total_amount)
        
            //retourne le client_secret au frontend
            res.status(200).json({ status: 200, client_secret: paymentIntent.client_secret, orderId: orderId })
        } catch (err) {
            console.error('Erreur lors de la création du Payment Intent ou de l\'enregistrement des données :', err)
            res.status(500).json({ status: 500, msg: "Erreur interne du serveur" })
        }
    }
    
    //met à jour le statut de paiement d'une commande
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

    //récupère toutes les commandes
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

     //met à jour le statut d'une commande
     const updateOrderStatus = async (req, res) => {
        try {
            const orderId = req.params.id
            const newStatus = req.body.status

            //met à jour le statut
            const updateResult = await OrderModel.updateStatus(orderId, newStatus)

            if (updateResult.affectedRows > 0) {
                res.status(200).json({ status: 200, msg: "Statut mis à jour avec succès" })
            } else {
                res.status(500).json({ status: 500, msg: "Échec de la mise à jour du statut" })
            }
        } catch (err) {
            res.status(500).json({ status: 500, msg: "Erreur serveur lors de la mise à jour du statut" })
        }
    }

    //récupère les détails d'une commande par id
    const getOneOrder = async (req, res) => {
        try {
            //recupère une commande
            const order = await OrderModel.getOneOrder(req.params.id)
            if (order.code) {
                res.json({status: 500, msg: "Oups, une erreur est survenue"})
            } else {
                //récupère les infos de l'utilisateur associé à la commande
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
                    //récupère les détails de la commande
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

    return {
        saveOrder,           
        executePayment,     
        updatePaymentStatus, 
        getAllOrder,         
        getOneOrder,         
        updateOrderStatus,   
        getUserOrders
    }
}