const jwt = require("jsonwebtoken")
const secret = process.env.JWT_SECRET || "fsjs38"

const withAuth = (req, res, next) => {
    const authHeader = req.headers['authorization']

    //vérifi la présence de header authorization
    if (!authHeader) {
        return res.status(401).json({ msg: "Erreur, aucun token fourni. Accès refusé." })
    }

    //extraction du token
    const token = authHeader.startsWith("Bearer ") ? authHeader.split(' ')[1] : null

    if (!token) {
        return res.status(401).json({ msg: "Erreur, token introuvable. Accès refusé." })
    }

    //vérifi le token avec JWT
    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            //gère l'erreur si le token est expiré ou invalide
            return res.status(401).json({ msg: "Erreur, token invalide ou expiré." })
        }

        //on attache l'id et le rôle utilisateur décoder à la requête pour les futures utilisation
        req.user = {
            id: decoded.id,    
            role: decoded.role, 
        }

        //passage à la prochaine étape de la requête
        next()
    })
}

module.exports = withAuth