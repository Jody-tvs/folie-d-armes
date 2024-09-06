const ContactModel = require('../models/ContactModel')

module.exports = {
    
    //créer un nouveau contact
    createContact: async (req, res) => {
        try {
            console.log("Corps de la requête:", req.body)
            const newContact = await ContactModel.createContact(req)
            res.json({status: 200, msg: "Contact créé avec succès", contact: newContact})
        } catch (err) {
            res.json({status: 500, msg: "Oups, une erreur est survenue"})
        }
    },

    //récupérer tous les contacts
    getAllContacts: async (req, res) => {
        try {
            const contacts = await ContactModel.getAllContacts()
            res.json({status: 200, contacts})
        } catch (err) {
            res.json({status: 500, msg: "Oups, une erreur est survenue"})
        }
    },

    //récupérer un contact par son id
    getContactById: async (req, res) => {
        try {
            const contact = await ContactModel.getContactById(req.params.id)
            res.json({status: 200, contact})
        } catch (err) {
            res.json({status: 500, msg: "Oups, une erreur est survenue"})
        }
    },

    //marquer un message comme lu
    markAsRead: async (req, res) => {
        try {
            const updateContact = await ContactModel.updateContactStatus(req.params.id, 1) //1 = lu
            res.json({status: 200, msg: "Message marqué comme lu", contact: updateContact})
        } catch (err) {
            res.json({status: 500, msg: "Oups, une erreur est survenue"})
        }
    },

    //marquer le message comme non lu
    markAsUnread: async (req, res) => {
        try {
            const updateContact = await ContactModel.updateContactStatus(req.params.id, 0); //0 = non lu
            res.json({status: 200, msg: "Message marqué comme non lu", contact: updateContact})
        } catch (err) {
            res.json({status: 500, msg: "Oups, une erreur est survenue"})
        }
    },

    //supprimer un contact
    deleteContact: async (req, res) => {
        try {
            const deleteContact = await ContactModel.deleteContact(req.params.id)
            res.json({status: 200, msg: "Contact supprimé avec succès"})
        } catch (err) {
            res.json({status: 500, msg: "Oups, une erreur est survenue"})
        }
    }
};
