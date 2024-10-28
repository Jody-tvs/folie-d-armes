const path = require('path')

module.exports = (ProductModel) => {

    //enregistre un nouveau produit
    const saveProduct = async (req, res) => {
        try {
            //on appel le modèle pour sauvegarder le produit
            const product = await ProductModel.saveOneProduct(req)
            res.json({ status: 200, msg: "Produit enregistré avec succès", product })
        } catch (err) {
            res.status(500).json({ msg: "Erreur lors de l'enregistrement du produit" })
        }
    }

    //modifie un produit
    const updateProduct = async (req, res) => {
        try {
            const product = await ProductModel.updateOneProduct(req, req.params.id)
            res.json({ status: 200, msg: "Produit modifié avec succès", product })
        } catch (err) {
            res.json({ status: 500, msg: "Oups une erreur est survenue" })
        }
    }

    //supprime un produit
    const deleteProduct = async (req, res) => {
        try {
            const product = await ProductModel.getOneProduct(req.params.id)
            if (!product) {
                return res.status(404).json({ msg: "Produit non trouvé" })
            }
    
            await ProductModel.deleteOneProduct(req.params.id)
            res.json({ status: 200, msg: "Produit supprimé avec succès" })
        } catch (err) {
            console.error("Erreur lors de la suppression du produit :", err)
            res.status(500).json({ status: 500, msg: "Oups une erreur est survenue" })
        }
    }
    

    //récupère les images secondaires d'un produit
    const getSecondaryPictures = async (req, res) => {
        try {
            const pictures = await ProductModel.getSecondaryPictures(req.params.productId)
            res.status(200).json(pictures)
        } catch (err) {
            res.status(500).json({ message: "Erreur lors de la récupération des images secondaires" })
        }
    }

    //récupère tous les produits par catégorie
    const getProductsByCategoryOrAll = async (req, res) => {
        try {
            const products = await ProductModel.getProductsByCategoryOrAll(req.query.category)
            res.status(200).json(products)
        } catch (err) {
            res.status(500).json({ message: "Erreur lors de la récupération des produits" })
        }
    }

    //récupère un produit par son ID
    const getOneProduct = async (req, res) => {
        try {
            const product = await ProductModel.getOneProductWithImages(req.params.id)
            if (product) {
                res.status(200).json(product)
            } else {
                res.status(404).json({ message: "Produit non trouvé" })
            }
        } catch (err) {
            res.status(500).json({ message: "Erreur lors de la récupération du produit" })
        }
    }

    //sauvegarde d'une image
    const savePicture = async (req, res) => {
        try {
            const uploadPath = path.join('public', 'images', req.files.images.name)
            req.files.images.mv(uploadPath, (err) => {
                if (err) {
                    res.status(500).json({ msg: "La photo n'a pas pu être enregistrée" })
                } else {
                    res.status(200).json({ msg: "Image enregistrée", url: uploadPath })
                }
            })
        } catch (err) {
            res.status(500).json({ msg: "Oups une erreur est survenue" })
        }
    }

    return {
        saveProduct,
        updateProduct,
        deleteProduct,
        getProductsByCategoryOrAll,
        getOneProduct,
        getSecondaryPictures,
        savePicture
    }
}