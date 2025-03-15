const express = require('express')
const app = express()
const path = require('path')

const mysql = require("mysql2/promise")
const cors = require ("cors")

//activation de cors pour permettre les requetes depuis d'autre domaines
app.use(cors())

//uploads de fichiers
const fileUpload = require('express-fileupload')

app.use(fileUpload({
    createParentPath: true
}))

//parse les URL encoder et JSON
app.use(express.urlencoded({extended: true}))
app.use(express.json())

//défini le répertoir public pour les fichiers statique
app.use('/public', express.static(path.join(__dirname, 'public')))

const dotenv = require("dotenv")
dotenv.config()

//on recupère nos routes
const userRoutes = require("./routes/userRoutes")
const authRoutes = require("./routes/authRoutes")
const categoryRoutes = require("./routes/categoryRoutes")
const productRoutes = require("./routes/productRoutes")
const orderRoutes = require("./routes/orderRoutes")
const contactRoutes = require("./routes/contactRoutes")
const secondaryPictureRoutes = require("./routes/secondaryPictureRoutes")

mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
}).then((db) => {
    console.log('Connexion à la BDD réussie!')
    
    //garder la connexion active
    setInterval(async () => {
      await db.query("SELECT 1")
    }, 10000)
    
    //routes de base pour vérifier que l'API fonctionne
    app.get('/', async (req, res, next) => {
        res.json({status: 200, msg: "bienvenue sur l'API FOLIE D'ARMES!"})
    })

    // ✅ Route test connexion BDD
    app.get('/api/test-db', async (req, res) => {
        try {
            const [rows] = await db.query("SELECT 1 + 1 AS result")
            res.json({ message: "Connexion BDD réussie 🎉", result: rows })
        } catch (error) {
            console.error(error)
            res.status(500).json({ message: "Erreur connexion BDD ❌", error })
        }
    })
    
    //on défini les routes pour les utilisateurs, l'authentification, produits, commandes et contact 
    userRoutes(app, db)
    authRoutes(app, db)
    categoryRoutes(app, db)
    productRoutes(app, db)
    orderRoutes(app, db)
    contactRoutes(app, db)
    secondaryPictureRoutes(app, db)
}).catch(err => console.log(err))

//on défini le port sur lequel le serveur écoute
const PORT = process.env.PORT || 9500
app.listen(PORT, () => {
    console.log(`Serveur à l'écoute sur le port ${PORT}!`)
})