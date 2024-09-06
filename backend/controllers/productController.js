const fs = require("fs")  //importation de fs pour la gestion des fichiers
const path = require('path')

module.exports = (ProductModel) => {
    
    //enregistrer un nouveau produit
    const saveProduct = async (req, res) => {
        try {
            const product = await ProductModel.saveOneProduct(req)
            console.log(product)
            if (product.code) {
                res.json({status: 500, msg: "Oups une erreur est survenue"})
            }else {
                res.json({status: 200, msg: "Produit enregistré avec succès"})
            }
        }catch(err) {
            console.log(err)
            res.json({status: 500, msg: "Oups une erreur est survenue"})
        }
    }
    
    //modifier un produit
    const updateProduct = async (req, res) => {
        try {
            const product = await ProductModel.updateOneProduct(req, req.params.id)
            if (product.code) {
                res.json({status: 500, msg: "Oups une erreur est survenue"})
            }else {
                res.json({status: 200, msg: "Produit modifié avec succès"})
            }
        }catch(err) {
            res.json({status: 500, msg: "Oups une erreur est survenue"})
        }
    }
    
    //supprimer un produit
    const deleteProduct = async (req, res) => {
        try {
        //avant de supprimer on récupère les infos du produit pour (potentiellement) supprimer l'image associée
        const product = await ProductModel.getOneProduct(req.params.id)
        if (product.code) {
            res.json({status: 500, msg: "Oups une erreur est survenue"})
        }else {
            //suppression du produit
            const deleteProduct = await ProductModel.deleteOneProduct(req.params.id)
            if(deleteProduct.code) {
                res.json({status: 500, msg: "Oups une erreur est survenue"})
            }else {
                //si le produit est supprimer on supprime l'image associé si elle n'est pas la photo par defaut
                if (product[0].picture) {
                    fs.unlink(`public/images/${product[0].picture}`, (err) => {
                        if (err) {
                            res.json({status: 500, msg: "Problème de suppression de l'image"})
                        }else {
                            res.json({status: 200, msg: "Produit et image supprimés avec succès"})
                        }
                    })
                }else {
                    res.json({status: 200, msg: "Produit supprimé avec succès"})
                }
            }
        }
        }catch(err) {
            res.json({status: 500, msg: "Oups une erreur est survenue"})
        }
    }
    
    //recupération de tous les produits
    const getAllProducts = async (req, res) => {
        try {
            const products = await ProductModel.getAllProducts()
            if (products.code) {
                res.json({status: 500, msg: "Oups une erreur est survenue"})
            }else {
                res.json({status: 200, result: products})
            }
        }catch(err) {
            res.json({status: 500, msg: "Oups une erreur est survenue"})
        }
    }
    
    //recupération d'un produit spécifique par ID
    const getOneProduct = async (req, res) => {
        try {
            const product = await ProductModel.getOneProduct(req.params.id)
            if (product.code) {
                res.json({status: 500, msg: "Oups une erreur est survenue"})
            }else {
                res.json({status: 200, result: product[0]})
            }
        }catch(err) {
            res.json({status: 500, msg: "Oups une erreur est survenue"})
        }
    }
    
    //sauvegarde d'une image
    const savePicture = async (req, res) => {
        console.log("AHAHAH", req.files.images.name)
        try {
            //on vérifie si un fichier a été envoyer via le front
            if (!req.files || Object.keys(req.files).length === 0) {
                res.json({status: 400, msg: "La photo n'a pas pu être récupérée"})
            }else {
                 //définir le chemin vers le dossier de destination
            const uploadPath = path.join('public', 'images', req.files.images.name);
                //déplacer l'image vers le dossier public/images
            req.files.images.mv(uploadPath, (err) => {
                if (err) {
                    res.json({ status: 500, msg: "La photo n'a pas pu être enregistrée!" });
                } else {
                    res.json({ status: 200, msg: "Image enregistrée!", url: uploadPath });
                }
            });
        }
    } catch (err) {
        console.log(err);
        res.json({ status: 500, msg: "Oups, une erreur est survenue!" });
    }
}
    
    return {
        saveProduct,
        updateProduct,
        deleteProduct,
        getAllProducts,
        getOneProduct,
        savePicture
    }
}