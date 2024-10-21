const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET || "fsjs38"

module.exports = (UserModel) => {

    //vérifie la validité du token
   const checkToken = async (req, res) => {
    try {
        const user = await UserModel.findOneUser(req.id)
        if (user.code || !user) { //vérifi si aucun utilisateur n'est trouver
            return res.status(500).json({status: 500, msg: "Oups une erreur est survenue 1"})
        } 

        const myUser = {
            id: user.id, 
            firstName: user.firstname,
            lastName: user.lastname,
            email: user.email,
            address: user.address,
            zip_code: user.zip_code,
            city: user.city,
            phone: user.phone,
            role: user.role,
            isAdmin: user.role === "admin"
        }

        return res.status(200).json({status: 200, user: myUser})
        
    } catch (err) {
        return res.status(500).json({status: 500, msg: "Oups, une erreur est survenue 2"})
    }
}

    //connexion pour générer le token
    const loginUser = async (req, res) => {
        try {
            const user = await UserModel.findOneUserByEmail(req.body.email)

            if (!user || user.length === 0) {
                return res.status(404).json({ msg: 'Utilisateur non trouvé' })
            }

            const isMatch = await bcrypt.compare(req.body.password, user[0].password)
            if (!isMatch) {
                return res.status(401).json({ msg: 'Mot de passe incorrect' })
            }

            const token = jwt.sign(
                { id: user[0].id, role: user[0].role }, 
                secret,
                { expiresIn: '1h' } 
            )

            res.json({ token })
        } catch (err) {
            res.status(500).json({ msg: 'Erreur lors de la connexion' })
        }
    }

    return {
        checkToken,
        loginUser
    }
}