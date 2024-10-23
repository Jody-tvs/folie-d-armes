const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const secret = 'fsjs38'

module.exports = (UserModel) => {
    //enregistre un nouvel utilisateur
    const saveUser = async (req, res) => {
        try {
            const check = await UserModel.getUserByEmail(req)
            if (check[0].length > 0) {
                return res.status(409).json({ msg: "Cet email existe déjà" })
            }
    
            const password = req.body.password
            const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
            if (!passwordRegex.test(password)) {
                return res.status(400).json({
                    msg: "Le mot de passe doit contenir au moins 8 caractères, une lettre majuscule, un chiffre, et un caractère spécial."
                })
            }
            
            //créer un nouvel utilisateur
            await UserModel.saveOneUser(req)
    
            //génère un token JWT pour la connexion automatique
            const user = await UserModel.getUserByEmail(req) //récupère le nouvelle utilisateur avec son email
            const payload = { id: user[0][0].id, role: user[0][0].role } //objet payload qui contient les infos utilisateuts  (id et son role)
            const token = jwt.sign(payload, process.env.JWT_SECRET || secret, { expiresIn: '1h' }) //token JWT avec les infos playload et clé secrete, le token expire au bout d'une heure
    
            //envoi le token au client pour qu'il soit automatiquement connecté
            return res.status(201).json({ 
                msg: "L'utilisateur a bien été enregistré", 
                token: token,
                user: {
                    id: user[0][0].id,
                    firstname: user[0][0].firstname,
                    lastname: user[0][0].lastname,
                    email: user[0][0].email,
                    address: user[0][0].address,
                    zip_code: user[0][0].zip_code,
                    city: user[0][0].city,
                    phone: user[0][0].phone,
                    role: user[0][0].role,
                    isAdmin: user[0][0].role === "admin"
                }
            })
        } catch (err) {
            return res.status(500).json({ msg: "Erreur interne lors de l'enregistrement de l'utilisateur." })
        }
    }
    
    //connecte un utilisateur
    const loginUser = async (req, res) => {
        try {
            const check = await UserModel.getUserByEmail(req)
            if (check.code) {
                return res.status(500).json({ msg: "Erreur interne lors de la vérification de l'utilisateur." })
            }
            if (check[0].length === 0) {
                return res.status(404).json({ msg: "Utilisateur introuvable." })
            }

            const user = check[0][0]
            const same = await bcrypt.compare(req.body.password, user.password)
            if (!same) {
                return res.status(401).json({ msg: "Mot de passe incorrect." })
            }

            const payload = { id: user.id, role: user.role }
            const token = jwt.sign(payload, process.env.JWT_SECRET || secret, { expiresIn: '1h' })

            const connect = await UserModel.updateConnexion(user.id)
            if (connect.code) {
                return res.status(500).json({ msg: "Erreur lors de la mise à jour de la date de dernière connexion." })
            }

            return res.status(200).json({
                msg: "Connexion réussie",
                token: token,
                user: {
                    id: user.id,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    email: user.email,
                    address: user.address,
                    zip_code: user.zip_code,
                    city: user.city,
                    phone: user.phone,
                    role: user.role,
                    isAdmin: user.role === "admin"
                }
            })
        } catch (err) {
            return res.status(500).json({ msg: "Erreur interne lors de la connexion." })
        }
    }

    //met à jour les infos d'un utilisateur
    const updateUser = async (req, res) => {
        try {
            const updates = {};
            const allowedFields = ["email", "address", "city", "zip_code", "phone"]
            
            //on parcour les champs autorisés et les ajouter à updates si présents dans req.body
            allowedFields.forEach(field => {
                if (req.body[field]) {
                    updates[field] = req.body[field];
                }
            })
    
            if (Object.keys(updates).length === 0) {
                return res.status(400).json({ msg: "Aucune donnée à mettre à jour." })
            }
            const userId = req.user.id

            //appel du modèle pour effectuer la maj
            const user = await UserModel.updateUser(updates, userId)
            if (user.code) {
                return res.status(500).json({ msg: "Erreur lors de la mise à jour de l'utilisateur" })
            }
    
            res.status(200).json({ msg: "Utilisateur modifié avec succès" })
    
        } catch (err) {
            res.status(500).json({ msg: "Oups, une erreur est survenue" })
        }
    }

    //maj du mot de passe
    const updatePassword = async (req, res) => {
        try {
            const { currentPassword, newPassword } = req.body
            const userId = req.user?.id //on utilise l'ID de l'utilisateur à partir du token
            if (!userId) {
                return res.status(401).json({ msg: "Erreur : Utilisateur non authentifié." })
            }
            //récupère les infos utilisateur
            const user = await UserModel.findOneUser(userId)
            if (user[0].length === 0) {
                return res.status(404).json({ msg: "Utilisateur introuvable." })
            }

            //vérifier le mdp actuel
            const same = await bcrypt.compare(currentPassword, user[0][0].password)
            if (!same) {
                return res.status(401).json({ msg: "Mot de passe actuel incorrect." })
            }

            //hash du nouveau mdp
            const hashedPassword = await bcrypt.hash(newPassword, 10)
            
            //maj du mot de passe
            const result = await UserModel.updateUserPassword(userId, hashedPassword)
            if (result.code) {
                return res.status(500).json({ msg: "Erreur lors de la mise à jour du mot de passe." })
            }

            return res.status(200).json({ msg: "Mot de passe mis à jour avec succès." })
        } catch (err) {
            return res.status(500).json({ msg: "Oups, une erreur est survenue." })
        }
    }

    //supprimer un utilisateur
    const deleteUser = async (req, res) => {
        try {
            const deleteUser = await UserModel.deleteOneUser(req.user.id)
            if (deleteUser.affectedRows > 0) {
                res.json({ status: 200, msg: "Utilisateur supprimé avec succès" })
            } else {
                res.json({ status: 500, msg: "Oups, une erreur est survenue" })
            }
        } catch (err) {
            res.json({ status: 500, msg: "Oups, une erreur est survenue" })
        }
    }

    //récupère profil utilisateur
    const getUserProfile = async (req, res) => {
        try {
            const user = await UserModel.findOneUser(req.user.id)
            if (!user || user.length === 0) {
                return res.status(404).json({ msg: "Utilisateur non trouvé." })
            }

            res.status(200).json({ user: user[0] })
        } catch (err) {
            res.status(500).json({ msg: "Erreur lors de la récupération du profil utilisateur." })
        }
    }

    return {
        saveUser,
        loginUser,
        updateUser,
        updatePassword,
        getUserProfile,
        deleteUser
    }
}