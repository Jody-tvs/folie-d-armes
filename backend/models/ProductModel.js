module.exports = (_db) => {
    db = _db
    return ProductModel
}

class ProductModel {

    //récupère tous les produits ou par catégorie
    static getProductsByCategoryOrAll(category) {
        let query = `
            SELECT p.*, c.name AS category_name
            FROM products p
            JOIN categories c ON p.categories_id = c.id
        `
        if (category) {
            query += ' WHERE c.name = ?'
        }
        return db.query(query, [category])
            .then(res => res[0])
            .catch(err => err);
    }
    
    //récupère un produit avec ses images secondaires
    static getOneProductWithImages(id) {
        const query = `
          SELECT p.*, GROUP_CONCAT(sp.name) AS secondary_images
          FROM products p
          LEFT JOIN secondarypictures sp ON sp.products_id = p.id
          WHERE p.id = ?
          GROUP BY p.id
        `
        return db.query(query, [id])
          .then((res) => res[0][0]) //retourne le produit avec ses images
          .catch((err) => err);
      }
    

    //récupère les images secondaires d'un produit
    static getSecondaryPictures(productId) {
        const sql = `SELECT * FROM secondarypictures WHERE products_id = ?`
        return db.query(sql, [productId])
            .then((res) => res[0])
            .catch((err) => err)
    }

    //récupère un produit par son ID
    static async getOneProduct(id) {
        try {
            const [rows] = await db.query('SELECT * FROM products WHERE id = ?', [id])
            if (rows.length === 0) {
                //si aucun produit n'est trouver renvoye null ou une erreur
                return null
            }
            return rows[0] //renvoie le premier produit trouvé
        } catch (err) {
            console.error('Erreur SQL lors de la récupération du produit:', err)
            throw err
        }
    }
    

    //enregistre un nouveau produit
    static saveOneProduct(req) {
        const { name, description, price, stock, tva, picture, alt, categories_id, statut } = req.body
        const sql = `
            INSERT INTO products (name, description, price, stock, tva, picture, alt, categories_id, statut) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `

        return db.query(sql, [name, description, price, stock, tva, picture, alt, categories_id, statut])
            .then((res) => res)
            .catch((err) => {
                console.error('Erreur SQL lors de l\'insertion du produit :', err)
                return err
            })
    }
    
    //maj d'un produit
    static updateOneProduct(req, id) {
        const { name, description, price, stock, tva, picture, alt, categories_id, statut } = req.body
        const sql = `
            UPDATE products 
            SET name = ?, description = ?, price = ?, stock = ?, tva = ?, picture = ?, alt = ?, categories_id = ?, statut = ?
            WHERE id = ?
        `
        return db.query(sql, [name, description, price, stock, tva, picture, alt, categories_id, statut, id])
            .then((res) => res)
            .catch((err) => err)
    }

    //supprimer un produit
    static deleteOneProduct(id) {
        const sql = `DELETE FROM products WHERE id = ?`
        return db.query(sql, [id])
            .then((res) => res)
            .catch((err) => err)
    }
}