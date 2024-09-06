const jwt = require("jsonwebtoken")
const secret = "fsjs38"

const withAuthAdmin = (req, res, next) => {
    //on récupère notre token dans le header de la requète HTTP
    const token = req.headers['x-access-token']

    //si il ne le trouve pas
    if(token === undefined) {
        res.json({status: 404, msg: "Erreur, token introuvable"})
    }else {
        //sinon il a trouvé un token, utilisation de la fonction de vérification de jsonwebtoken
        jwt.verify(token, secret, (err, decoded) => {
            if(err) {
                //si le token est invalide ou expirer
                res.json({status: 401, msg: "Erreur, ton token est invalide"})
            }else {
                //on vérifie le rôle de l'utilisateur (seul un admin peut passer)
                if (decoded.role !== "admin") {
                    res.json({status: 401, msg: "Erreur, tu n'es pas admin petit filou"})
                }else {
                    //on rajoute la propriété id dans l'objet req qui va nous permettre de récupérer les infos de l'utilisateur à reconnecter
                    req.id = decoded.id
                    next ()
                }
            }
        })
    }
}

module.exports = withAuthAdmin