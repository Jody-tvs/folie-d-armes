module.exports = (_db) => {
    db = _db
    return ProductModel
}

class ProductModel {

    //récupération de tous les produits
    static getAllProducts() {
        return db.query('SELECT * FROM products')
            .then((res) => {
                return res
            })
            .catch((err) => {
                return err
            })
    }

    //récupération d'un seul produit
    static getOneProduct(id) {
        return db.query('SELECT * FROM products WHERE id = ?', [id])
            .then((res) => {
                return res
            })
            .catch((err) => {
                return err
            })
    }

    //sauvegarde d'un nouveau produit
    static saveOneProduct(req) {
        return db.query(`INSERT INTO products (name, description, price, stock, tva, picture, alt, categories_id, statut) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                req.body.name,
                req.body.description,
                req.body.price,
                req.body.stock,
                req.body.tva,
                req.body.picture,
                req.body.alt,
                req.body.categories_id,
                req.body.statut
            ]
        )
        .then((res) => {
            return res
        })
        .catch((err) => {
            return err
        })
    }

    //modification d'un produit 
    static updateOneProduct(req, id) {
        return db.query(`UPDATE products SET name = ?, description = ?, price = ?, stock = ?, tva = ?, picture = ?, alt = ?, categories_id = ?, statut = ? WHERE id = ?`,
            [
                req.body.name,
                req.body.description,
                req.body.price,
                req.body.stock,
                req.body.tva,
                req.body.picture,
                req.body.alt,
                req.body.categories_id,
                req.body.statut,
                id
            ]
        )
        .then((res) => {
            return res
        })
        .catch((err) => {
            return err
        })
    }

    //suppression d'un produit
    static deleteOneProduct(id) {
        return db.query('DELETE FROM products WHERE id = ?', [id])
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err
            })
    }
}