const bcrypt = require('bcryptjs')
const saltRounds = 10 //nombre de tours pour le hachage


module.exports = (_db) => {
    db = _db
    return UserModel
}

class UserModel {
    
    //sauvegarde un utilisateur dans la BDD
    static async saveOneUser(req) {
        try {
            const hash = await bcrypt.hash(req.body.password, saltRounds)
            const result = await db.query(`
                INSERT INTO users (firstname, lastname, email, password, address, zip_code, city, phone, created_at) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
                [
                    req.body.firstname,
                    req.body.lastname,
                    req.body.email,
                    hash,
                    req.body.address,
                    req.body.zip_code,
                    req.body.city,
                    req.body.phone,
                ]
            )
            return result

        } catch (err) {
            throw err
        }
    }
    
    //recupere un utilisateur en fonction de son email
    static getUserByEmail(req) {
        
        return db.query("SELECT * FROM users WHERE email = ?", [req.body.email])
        .then((res) => {
            return res
        })
        .catch((err) => {
            return err
        })
    }
    
    //recupere un utilisateur en fonction de son ID
    static findOneUser(id) {
        
        return db.query("SELECT * FROM users WHERE id =?", [id])
        .then((res) => {
            return res
        })
        .catch((err) => {
            return err
        })
    }
    
    //met à jour les infos d'un utilisateur
    static updateUser(updates, userId) {
        //vérifie si updates contient des champs à mettre à jour
        const fields = Object.keys(updates)
        if (fields.length === 0) {
            return Promise.reject({ message: "Aucune donnée à mettre à jour" })
        }
    
        const values = Object.values(updates)
        values.push(userId) //ajout de l'ID utilisateur à la fin
    
        //requête SQL dynamique
        const setString = fields.map(field => `${field} = ?`).join(', ')
        const query = `UPDATE users SET ${setString} WHERE id = ?`

        return db.query(query, values)
            .then((res) => {
                return res
            })
            .catch((err) => {
                console.error("Erreur lors de la mise à jour de l'utilisateur :", err)
                return { code: err.code, message: err.message }
            })
    }
    
    //modifie le mdp
    static updateUserPassword(id, hashedPassword) {
        return db.query("UPDATE users SET password = ? WHERE id = ?", [hashedPassword, id])
        .then((res) => {
            return res
        })
        .catch((err) => {
            return err
        })
}

    //met à jour la date de dernière connexion d'un utilisateur
    static updateConnexion(id) {
        
        return db.query("UPDATE users SET created_at = NOW() WHERE id = ?", [id])
        .then((res) => {
            return res
        })
        .catch((err) => {
            return err
        })
    }
    
    //supprime un compte utilisateur
    static deleteOneUser (id) {
        return db.query("DELETE FROM users WHERE id = ?", [id])
        .then((res) => {
            return res
        })
        .catch((err) => {
            return err
        })
    }
}