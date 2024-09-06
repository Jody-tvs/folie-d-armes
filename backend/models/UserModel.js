const bcrypt = require('bcryptjs')
const saltRounds = 10 //nombre de tours pour le hachage


module.exports = (_db) => {
    db = _db
    return UserModel
}

class UserModel {
    
    //sauvegarder un utilisateur dans la BDD
    static saveOneUser(req) {
        //On hash le mot de passe
        return bcrypt.hash(req.body.password, saltRounds)
        .then((hash) => {
            //on insert les infos de l'utilisateur dans la BDD
            return db.query(`INSERT INTO users (firstname, lastname, email, password, address, zip_code, city, phone, created_at) 
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
            .then((res) => {
                return res //retourne le resultat de la requete si c'est reussie
            })
            .catch((err) => {
                return err //retourne l'erreur  en cas d'echec de la requete
            })
        })
        .catch(err => err) //gère les erreurs lors du hashage du mdp
    }
    
    //recuperer un utilisateur en fonction de son email
    static getUserByEmail(req) {
        
        return db.query("SELECT * FROM users WHERE email = ?", [req.body.email])
        .then((res) => {
            return res
        })
        .catch((err) => {
            return err
        })
    }
    
    //recuperer un utilisateur en fonction de son ID
    static findOneUser(id) {
        
        return db.query("SELECT * FROM users WHERE id =?", [id])
        .then((res) => {
            return res
        })
        .catch((err) => {
            return err
        })
    }
    
    //mettre à jour les infos d'un utilisateur
    static updateUser(req, userId) {
        
        return db.query("UPDATE users SET firstName = ?, lastName = ?, address = ?, zip_code = ?, city = ?, phone = ? WHERE id = ?",
        [
            req.body.firstname,
            req.body.lastname,
            req.body.address,
            req.body.zip_code,
            req.body.city,
            req.body.phone,
           userId
        ]
    )
    .then((res) => {
        return res
    })
    .catch((err) => {
        return err
    })
}

    //mettre à jour la date de dernière connexion d'un utilisateur
    static updateConnexion(id) {
        
        return db.query("UPDATE users SET created_at = NOW() WHERE id = ?", [id])
        .then((res) => {
            return res
        })
        .catch((err) => {
            return err
        })
    }
    
    //supprimer un compte utilisateur
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