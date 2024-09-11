module.exports = (_db) => {
    db = _db
    return ContactModel
};

class ContactModel {
    //créer un nouveau contact
        static createContact(req) {
        return db.query(
            "INSERT INTO contacts (email, subject, story, statut, receipt_date) VALUES (?, ?, ?, 0, NOW())", //le statut est à 0 (non lu)
            [req.body.email, req.body.subject, req.body.story]
        )
        .then((res) => {
            return res
        })
        .catch((err) => {
            return err
        });
    }

    //récupérer tous les contacts
    static getAllContacts() {
        return db.query("SELECT * FROM contacts")
        .then((res) => {
            return res
        })
        .catch((err) => {
            return err
        })
    }

    //récupérer un contact par ID
    static getContactById(id) {
        return db.query("SELECT * FROM contacts WHERE id = ?", [id])
        .then((res) => {
            return res
        })
        .catch((err) => {
            return err
        })
    }

    //mettre à jour le statut d'un contact (marquer comme lu ou non lu)
    static updateContactStatus(id, statut) {
        return db.query("UPDATE contacts SET statut = ? WHERE id = ?", [statut, id])
        .then((res) => {
            return res
        })
        .catch((err) => {
            return err
        })
    }

    //supprimer un contact
    static deleteContact(id) {
        return db.query("DELETE FROM contacts WHERE id = ?", [id])
        .then((res) => {
            return res
        })
        .catch((err) => {
            return err
        })
    }
}

module.exports = ContactModel