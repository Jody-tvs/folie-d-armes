module.exports = (_db) => {
    db = _db;
    return OrderModel;
}

class OrderModel {
    //sauvegarder la commande
    static async saveOneOrder(users_Id, total_amount) {
        try {
            const [result] = await db.query(
                'INSERT INTO orders (users_id, total_amount, created_at, status) VALUES (?, ?, NOW(), "not payed")',
                [users_Id, total_amount]
            )
            return result
        } catch (err) {
            console.error('Erreur lors de l\'insertion de la commande:', err)
            throw err;
        }
    }
    
    //sauvegarder un détail de commande
    static async saveOneOrderDetail(orderId, product) {
        return db.query(
            'INSERT INTO orderdetails (orders_id, quantity, unit_price, products_id, tva) VALUES (?, ?, ?, ?, ?)',
            [orderId, product.quantity, product.unitPrice, product.products_id, product.tva]
        )
    }
    
    //modifier le montant total d'une commande
    static updateTotalAmount(orderId, total_amount) {
        // Vérifiez que orderId est bien un nombre et non un objet ou undefined
        if (typeof orderId !== 'number' || isNaN(orderId)) {
            console.error("ID de commande invalide :", orderId);
            throw new Error("ID de commande invalide");
        }
    
        return db.query(
            'UPDATE orders SET total_amount = ? WHERE id = ?',
            [total_amount, orderId]
        )
        .then((res) => {
            return res;
        })
        .catch((err) => {
            console.error('Erreur lors de la mise à jour du montant total de la commande:', err);
            throw err;
        });
    }
    

    //récupérer une commande en fonction de son ID
    static getOneOrder(id) {
        return db.query(`
            SELECT 
                orders.id AS order_id,
                orders.created_at,
                orders.total_amount,
                orders.status,
                users.firstname,
                users.lastname,
                users.email,
                users.address,
                users.zip_code,
                users.city,
                users.phone,
                orderdetails.quantity,
                orderdetails.unit_price,
                products.name AS product_name,
                products.description AS product_description,
                products.picture AS product_picture,
                products.alt AS product_alt,
                categories.name AS category_name
            FROM 
                orders
            INNER JOIN 
                users ON orders.users_id = users.id
            INNER JOIN 
                orderdetails ON orders.id = orderdetails.orders_id
            INNER JOIN 
                products ON orderdetails.products_id = products.id
            INNER JOIN 
                categories ON products.categories_id = categories.id
            WHERE 
                orders.id = ?
        `, [id])
    }

    //modifier le statut d'une commande (not payed à payed)
    static updateStatus(orderId, status) {
        return db.query('UPDATE orders SET status = ? WHERE id = ?', [status, orderId])
    }

    //récupérer toutes les commandes
    static getAllOrders() {
        return db.query('SELECT * FROM orders')
    }

    //récupérer les détails d'une commande
    static getAllDetails(orderId) {
        return db.query(`
            SELECT orderdetails.id, orderdetails.quantity, orderdetails.unit_price, orderdetails.tva,
                   orderdetails.quantity * orderdetails.unit_price AS total,
                   products.name AS product_name, products.description AS product_description, products.picture AS product_picture
            FROM 
                orderdetails
            INNER JOIN 
                products ON orderdetails.products_id = products.id
            WHERE 
                orderdetails.orders_id = ?;
        `, [orderId])
    }
} 