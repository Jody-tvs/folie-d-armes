module.exports = (app, db) => {
    const contactController = require('../controllers/contactController')
    
    //route pour créer un nouveau contact 
    //requête SQL ok
    //route Postman ok
    app.post('/api/v1/contact', (req, res) => {contactController.createContact(req, res, db)})
    
    //route pour récupérer tous les contacts 
    //requête SQL ok
    //route Postman ok
    app.get('/api/v1/contacts', (req, res) => {contactController.getAllContacts(req, res, db)})
    
    //route pour récupérer un contact par son ID
    //requête SQL ok
    //route Postman ok
    app.get('/api/v1/contacts/:id', (req, res) => {contactController.getContactById(req, res, db)})
    
    //route pour marquer un message comme lu
    //requête SQL ok
    //route Postman ok
    app.put('/api/v1/contacts/:id/read', (req, res) => {contactController.markAsRead(req, res, db)})
    
    //route pour marquer un message comme non lu
    //requête SQL ok
    //route Postman ok
    app.put('/api/v1/contacts/:id/unread', (req, res) => {contactController.markAsUnread(req, res, db)})
    
    //route pour supprimer un contact
    //requête SQL ok
    //route Postman ok
    app.delete('/api/v1/contacts/:id', (req, res) => {contactController.deleteContact(req, res, db)})
}