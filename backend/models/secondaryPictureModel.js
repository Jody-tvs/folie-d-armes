//obtient toutes les images secondaires
const getAllSecondaryPictures = async () => {
    const sql = `SELECT secondarypictures.id, secondarypictures.name, secondarypictures.alt, products.name AS product_name 
        FROM secondarypictures 
        JOIN products ON secondarypictures.products_id = products.id`
    try {
        const [results] = await db.query(sql)
        return results
    } catch (err) {
        throw err
    }
}

//obtient toutes les images secondaires par product_id
const getSecondaryPicturesByProductId = async (productId) => {
    const sql = `SELECT * FROM secondarypictures WHERE products_id = ?`
    try {
        const [results] = await db.query(sql, [productId])
        return results;
    } catch (err) {
        throw err
    }
}

//ajoute une nouvelle image secondaire
const addSecondaryPicture = async (data) => {
    const { name, alt, products_id } = data
    const sql = `INSERT INTO secondarypictures (name, alt, products_id)
        VALUES (?, ?, ?)`
    try {
        const [result] = await db.query(sql, [name, alt, products_id])
        return result.insertId
    } catch (err) {
        return err
    }
}

//supprime une image secondaire par ID
const deleteSecondaryPicture = async (id) => {
    const sql = `
        DELETE FROM secondarypictures WHERE id = ?`
    try {
        const [result] = await db.query(sql, [id])
        return result.affectedRows
    } catch (err) {
        return err
    }
}

module.exports = {
    getAllSecondaryPictures,
    addSecondaryPicture,
    deleteSecondaryPicture,
    getSecondaryPicturesByProductId 
}