module.exports = (UserModel) => {
    
    //on vérifie la validité du token et récupère les infos de l'utilisateur
    const checkToken = async (req, res) => {
        try {
            //on récup des infos de l'utilisateur dans la BDD en fonction de l'ID recup du token
            const user = await UserModel.findOneUser(req.id)
            if(user.code) {
                //si une errreur survient lors de la récupération des infos de l'utilisateur
                res.json({status: 500, msg: "Oups une erreur est survenue 1"})
            }else {
                //on créer un objet 'myUser' pour renvoyer seulement les infos nécessaire au front
                const myUser = {
                    id: user[0][0].id,
                    firstName: user[0][0].firstname,
                    lastName: user[0][0].lastname,
                    email: user[0][0].email,
                    address: user[0][0].address,
                    zip_code: user[0][0].zip_code,
                    city: user[0][0].city,
                    phone: user[0][0].phone,
                    role: user[0][0].role
                }
                res.json({status: 200, user: myUser}) //renvoi des infos de l'utilisateur au front pour une reco automatique
            }
        }catch (err) {
            //gestion des erreurs (imprévue)
            res.json({status: 500, msg: "Oups, une erreur est survenue 2"})
        }
    }
    return {
        checkToken //on export checkToken pour l'utiliser dans nos routes
    }
}