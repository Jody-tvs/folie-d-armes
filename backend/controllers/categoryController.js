module.exports = (CategoryModel) => {

    //on récupère toutes les catégories
    const getAllCategories = async(req, res) => {
        try {
            const categories = await CategoryModel.getAllCategories()
            if (categories.code) {
                res.json({ status: 500, msg: "Erreur lors de la récupération des catégories" })
            }
            else {
                res.json({ status: 200, result: categories })
            }
        }
        catch (err) {
            res.json({ status: 500, msg: "Oups, une erreur est survenue" })
        }
    }

    //on récupère une categorie par son ID
    const getCategoryById = async(req, res) => {
        try {
            const category = await CategoryModel.getCategoryById(req.params.id)
            if (category.code) {
                res.json({ status: 500, msg: "Erreur lors de la récupération de la catégorie" })
            }
            else {
                res.json({ status: 200, result: category[0] })
            }
        }
        catch (err) {
            res.json({ status: 500, msg: "Oups, une erreur est survenue" })
        }
    }

    //on créer une nouvelle catégorie
    const createCategory = async(req, res) => {
        try {
            const newCategory = await CategoryModel.createCategory(req.body)
            if (newCategory.code) {
                res.json({ status: 500, msg: "Erreur lors de la création de la catégorie" })
            }
            else {
                res.json({ status: 200, msg: "Categorie créée avec succès" })
            }
        }
        catch (err) {
            res.json({ status: 500, msg: "Oups, une erreur est survenue" })
        }
    }

    //modification d'une catégorie
    const updateCategory = async(req, res) => {
        try {
            const updatedCategory = await CategoryModel.updateCategory(req.params.id, req.body)
            if (updatedCategory.code) {
                res.json({ status: 500, msg: "Erreur lors de la mise à jour de la catégorie" })
            }
            else {
                res.json({ status: 200, msg: "Categorie mise à jour avec succès" })
            }
        }
        catch (err) {
            res.json({ status: 500, msg: "Oups, une erreur est survenue" })
        }
    }

    //supprimer une catégorie
    const deleteCategory = async(req, res) => {
        try {
            const deleteCategory = await CategoryModel.deleteCategory(req.params.id)
            if (deleteCategory.code) {
                res.json({ status: 500, msg: "Erreur lors de la suppression de la catégorie" })
            }
            else {
                res.json({ status: 200, msg: "Categorie supprimée avec succès" })
            }
        }
        catch (err) {
            res.json({ status: 500, msg: "Oups, une erreur est survenue" })
        }
    }

    return {
        getAllCategories,
        getCategoryById,
        createCategory,
        updateCategory,
        deleteCategory
    }
}