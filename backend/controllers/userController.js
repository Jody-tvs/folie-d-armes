const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const secret = 'fsjs38'

module.exports = (UserModel) => {
    //enregistrement d'un nouvel utilisateur
    const saveUser = async(req, res) => {

        try {
            //on vérifie si un utilisateur avec cet email existe deja dans la BDD
            const check = await UserModel.getUserByEmail(req)
            if (check.code) {
                //si une erreur survient lors de la vérif, on retourne une erreur serveur
                res.json({ status: 500, msg: "Oups, une erreur est survenue " })
            }
            else {
                //Si un utilisateur avec cet email existe deja on retourne une erreur comme quoi l'email est deja utiliser
                if (check[0].length > 0) {
                    res.json({status: 500, msg: "cette email existe deja"})
                }
                else {
                    //si aucun utilisateur existe avec cet email on enregistre le nouvelle utilisateur 
                    const user = await UserModel.saveOneUser(req)
                    if (user.code) {
                        //si erreur lors de l'enregistrement on retourne une erreur serveur
                        res.json({ status: 50, msg: "Oups, une erreur est survenue " })
                    }
                    else {
                        //si tout est ok on confirme que l'utilisateur a été enregistrer
                        res.json({ status: 200, msg: "L'utilisateur à bien été enregistré" })
                    }
                }
            }
        }
        catch (err) {
            //on gere les erreurs générales
            res.json({ status: 500, msg: "Oups, une erreur est survenue " })
        }
    }

    //methode pour connecter un utilisateur
    const loginUser = async(req, res) => {

        try {
            //on verifie si un utilisateur avec cet email existe dans la BDD
            const check = await UserModel.getUserByEmail(req)
            if (check.code) {
                res.json({ status: 500, msg: "Oups, une erreur est survenue" })
            }
            else {
                if (check.length === 0) {
                    res.json({ status: 404, msg: "Utilisateur introuvable" })
                }
                else {
                    //si utilisateur trouver on compare les mdp
                    const same = await bcrypt.compare(req.body.password, check[0][0].password)
                    if (same) {
                        //si mdp correspondent on créer un token JWT avec les infos de l'utilisateur (pas d'infos sensible !)
                        const payload = { id: check[0][0].id, role: check[0][0].role }
                        const token = jwt.sign(payload, secret)

                        //maj de la date de dernière connexion dans la BDD 
                        const connect = await UserModel.updateConnexion(check[0][0].id)
                        if (connect.code) {
                            res.json({ status: 500, msg: "Oups, une erreur est survenue" })
                        }
                        else {
                            //on renvoie le token JWT et les infos utilisateur au front
                            const user = {
                                id: check[0][0].id,
                                firstname: check[0][0].firstname,
                                lastname: check[0][0].lastname,
                                email: check[0][0].email,
                                address: check[0][0].address,
                                zip_code: check[0][0].zip_code,
                                city: check[0][0].city,
                                phone: check[0][0].phone,
                                role: check[0][0].role
                            }
                            res.json({ status: 200, token: token, user: user })
                        }
                    }
                    else {
                        //si mdp ne correspondent pas on retourne une erreur 
                        res.json({ status: 404, msg: "Mot de passe incorrect" })
                    }
                }
            }
        }
        catch (err) {
            //on gère les erreurs générales
            res.json({ status: 500, msg: "Oups, une erreur est survenue " })
        }
    }
    //mettre à jour les infos d'un utilisateur
    const updateUser = async(req, res) => {
        try {
            //maj des infos utilisateur dans la BDD
            const user = await UserModel.updateUser(req, req.params.id)
            if (user.code) {
                //si erreur de maj on retourne erreur serveur
                res.json({ status: 500, msg: "Erreur lors de la mise à jour de l'utilisateur" })
            }
            else {
                //on recupère les infos mise à jour de l'utilisateur
                const newUser = await UserModel.findOneUser(req.params.id)
                if (newUser.code) {
                    res.json({ status: 500, msg: "Oups, une erreur est survenue" })
                }
                else {
                    //on renvoie les infos mis à jour de l'utilisateur au front
                    const myUser = {
                        id: newUser[0][0].id,
                        firstname: newUser[0][0].firstname,
                        lastname: newUser[0][0].lastname,
                        email: newUser[0][0].email,
                        address: newUser[0][0].address,
                        zip_code: newUser[0][0].zip_code,
                        city: newUser[0][0].city,
                        phone: newUser[0][0].phone,
                        role: newUser[0][0].role
                    }
                    res.json({ status: 200, msg: "Utilisateur modifié avec succès", newUser: myUser })
                }
            }
        }
        catch (err) {
            res.json({ status: 500, msg: "Oups, une erreur est survenue" })
        }
    }

    //Méthode pour supprimer un utilisateur
    const deleteUser = async(req, res) => {
        try {
            //suppression d'un utilisateur dans la BDD
            const deleteUser = await UserModel.deleteOneUser(req.params.id)
            if (deleteUser.code) {
                //si erreur lors de la suppression on retourne une erreur serveur
                res.json({ status: 500, msg: "Oups, une erreur est survenue" })
            }
            else {
                //confirmation de la suppression
                res.json({ status: 200, msg: " Utilisateur supprimé avec succès" })
            }
        }
        catch (err) {
            res.json({ status: 500, msg: "Oups, une erreur est survenue" })
        }
    }

    //on retourne les méthodes pour etre utilisées dans les routes 
    return {
        saveUser,
        loginUser,
        updateUser,
        deleteUser
    }
}
