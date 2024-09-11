module.exports = (_db) => {
    db = _db
    return CategoryModel
}

class CategoryModel {
    
    //on récupère toutes les catégories
    static getAllCategories() {
        return db.query('SELECT * FROM categories')
        .then((res) => {
            return res //retourne la liste des catégories
        })
        .catch((err) => {
            return err //gère et retourne les erreurs potentielles
        })
    }
    
    //on récupère une catégoris par son ID 
    static getCategoryById(id) {
        return db.query('SELECT * FROM categories WHERE id = ?', [id])
        .then((res) => {
            return res 
        })
        .catch((err) => {
            return err 
        })
    }

    //on créer une nouvelle catégorie
    static createCategory(data) {
        return db.query('INSERT INTO categories (name) VALUES (?)', [data.name])
        .then((res) => {
            return res 
        })
        .catch((err) => {
            return err 
        })
    }
    
    //modifier une catégories 
    static updateCategory(id, data) {
        return db.query('UPDATE categories SET name = ? WHERE id = ?', [data.name, id])
        .then((res) => {
            return res 
        })
        .catch((err) => {
            return err 
        })
    }
    
    //supprimer une catégorie pat son ID
    static deleteCategory(id) {
        return db.query('DELETE FROM categories WHERE id = ?', [id])
        .then((res) => {
            return res 
        })
        .catch((err) => {
            return err 
        })
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
}