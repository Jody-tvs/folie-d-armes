- FOLIE D'ARMES : site de vente d'armes et d'accessoires absurde.

   Description :
**FOLIE D'ARMES** est un site web permettant d'acheter des armes et des accessoires absurde.

LES VISITEURS :

- Les visiteurs peuvent voir les armes/accessoires présenter sur le site.
- Ils peuvent chercher les articles dans les categories correspondante.
- Cliquez sur "en savoir plus" qui donne accès à une déscription du produit.
- Pour accéder un ajout au panier et accéder au paiement, ils doivent se créer un compte et être connectés.

LES UTILISATEURS :

- Créer un compte et se connecter avec leur mail et mot de passe. 
- Supprimer leur compte.
- Modifier leurs infos personnel via la page "mon compte".
- Avoir accès à leurs commandes passer via la page "mes commandes" et afficher le detail de ces dernière.
- Ils peuvent accéder au paiment du panier une fois le panier valider.

L'ADMINISTRATEUR :

- Il a accès au dashboard avec 3 rubriques :
1. La gestion des produits : L'ajout d'un produit, la modification d'un produit existant (nom, decription, prix, image..) et la suppression d'un produit.
2. La gestion des commandes : Accès au commandes utilisateurs, possibilité de voir le detail et mofication du statut (en attente, en préparation et expédié).
3. La gestion des messages : Accès aux messages reçu, possibilité de répondre, les marqués comme lu ou non lu et les supprimer.



## INSTALLATION

### Visez les dossiers dans le terminal:
- backend 
- et frontend

### Installez les dépendances du projet : 
**npm i**

### Lancez l'application : 
**npm run dev**

### Accédez au site depuis votre navigateur à l'adresse suivante :
    http://localhost:9000


**Bibliothèques utlisés**:

**Communes au back et au front**:
 
1. Axios :

- Gestion des requêtes HTTP : Bibliothèque pour effectuer des requêtes HTTP, notamment pour interagir avec des APIs.
- Back pour interagir avec d'autres services et  front pour récupérer des données depuis le serveur.

2. Sass et Sass Loader :

- réprocesseur CSS : Sass est utilisé pour écrire des feuilles de style de manière plus efficace avec des fonctionnalités avancées comme les variables et les fonctions.
- Le sass-loader permet d'intégrer Sass dans les projets, que ce soit dans le back ou le front.

3. Stripe :

- Paiement en ligne : intégre les services de paiement en ligne de Stripe, à la fois pour traiter les paiements sur le back et pour gérer l'interface de paiement sur le front.

**Back:**

1. Babel (Transpilation JavaScript) :

- Transpile le code JavaScript moderne et JSX pour le rendre compatible avec les environnements plus anciens.

2. bcryptjs :

- Hachage de mots de passe : Utilisé pour sécuriser les mots de passe en les hachant avant de les stocker dans la base de données.

3. body-parser :

- Analyse des données des requêtes HTTP : Utilisé pour analyser les corps des requêtes HTTP, notamment pour gérer les données envoyées en JSON.

4. cors :

- Gestion des requêtes cross-origin : Permet de configurer le partage de ressources entre différentes origines (CORS) pour autoriser les requêtes provenant d'autres domaines.

5. Express :

- Framework de serveur web : Framework léger pour la création d'applications web et d'APIs.
- Extensions : express-fileupload (gestion des fichiers), express-validator (validation des données des requêtes).

6. Helmet :

- Sécurité des en-têtes HTTP : Middleware pour sécuriser l'application en configurant des en-têtes HTTP pour prévenir des attaques courantes (XSS, clickjacking, etc.).

7. jsonwebtoken (JWT) :

- Gestion de l'authentification : Utilisé pour créer et vérifier des tokens JWT pour l'authentification des utilisateurs.

8. MySQL, MySQL2, Promise MySQL :

- Gestion des bases de données MySQL : Bibliothèques pour interagir avec une base de données MySQL, mysql2 étant une version plus moderne et compatible avec les promesses.

**Outils de développement backend**:

ESLint : Outil de linting pour détecter des problèmes dans le code JavaScript.
Jest : Framework de tests unitaires.
Morgan : Middleware pour enregistrer les requêtes HTTP.
Nodemon : Relance automatiquement le serveur en cas de changement dans le code.
Prettier : Outil pour formater le code.
Supertest : Outil pour tester les APIs HTTP.


**Front**:

1. FontAwesome :

-Icônes : @fortawesome/fontawesome-free et ses autres packages sont utilisés pour afficher des icônes sur l'interface utilisateur.

2. Redux et Redux Toolkit :

- Gestion d'état global : redux, @reduxjs/toolkit, react-redux et redux-thunk sont utilisés pour gérer l'état global de l'application de manière efficace et centralisée.

3. Bootstrap et React Bootstrap :

- Composants UI et styles : bootstrap et react-bootstrap sont utilisés pour construire une interface utilisateur réactive et stylisée avec des composants prêts à l'emploi.

4. React et React DOM :

React est utilisé pour construire les composants de l'interface utilisateur, tandis que react-dom est utilisé pour rendre ces composants dans le DOM.

5. React Router DOM :

- Utilisé pour gérer la navigation et les différentes pages dans une application React.

6. React Responsive Carousel :

- Carrousel d'images : Pour ajouter un carrousel d'images adaptatif dans l'interface utilisateur.

7. Vite et ses outils :

- Bundling et développement rapide : vite et @vitejs/plugin-react sont utilisés pour compiler et optimiser les fichiers front-end avec une rapidité accrue par rapport à Webpack.

**Outils de développement frontend**:

ESLint : Pour le linting du code React.
Prettier : Pour le formatage du code.
ESLint Plugins : Plugins supplémentaires pour appliquer les bonnes pratiques avec React, les hooks, et la gestion du rafraîchissement à chaud.



**ANGLAIS**


FOLIE D'ARMES: Absurd weapon and accessory sales website.

Description: 

FOLIE D'ARMES is a website allowing users to buy absurd weapons and accessories.


VISITORS:

- Visitors can view the weapons/accessories presented on the site.
- They can search for items in the corresponding categories.
- Click on "learn more" to access a product description.
- To add items to the cart and proceed to checkout, they must create an account and be logged in.


USERS:

- Create an account and log in with their email and password.
- Delete their account.
- Modify their personal information via the "my account" page.
- Access their past orders via the "my orders" page and view the details of their orders.
- They can proceed to checkout once their cart is validated.


ADMINISTRATOR:

- The administrator has access to the dashboard with 3 sections:
- Product Management: Add a product, modify an existing product (name, description, price, image, etc.), and delete a product.
- Order Management: Access user orders, view order details, and change the status (pending, in preparation, or shipped).
- Message Management: Access received messages, respond to them, mark them as read or unread, and delete them.


INSTALLATION

Navigate to the directories in the terminal:

backend
and frontend
Install the project dependencies:
**npm i**

Launch the application:
**npm run dev**

Access the site from your browser at the following address:
http://localhost:9000

**Libraries used**:

**Common to both backend and frontend**:

Axios:

- HTTP request management: A library for making HTTP requests, especially to interact with APIs.
- Used in the backend to interact with other services and in the frontend to retrieve data from the server.

Sass and Sass Loader:

- CSS preprocessor: Sass is used to write stylesheets more efficiently, with advanced features like variables and functions.
- The sass-loader allows Sass to be integrated into projects, whether in the backend or frontend.

Stripe:

- Online payments: Integrates Stripe's online payment services, both for processing payments on the backend and managing the payment interface on the frontend.

**Backend**:

Babel (JavaScript Transpilation):

- Transpiles modern JavaScript and JSX code to make it compatible with older environments.

bcryptjs:

- Password hashing: Used to secure passwords by hashing them before storing them in the database.

body-parser:

- Parsing HTTP request data: Used to parse the body of HTTP requests, particularly for handling JSON data.

cors:

- Cross-origin request management: Configures Cross-Origin Resource Sharing (CORS) to allow requests from other domains.

Express:

- Web server framework: A lightweight framework for building web applications and APIs.
- Extensions: express-fileupload (file management), express-validator (request data validation).

Helmet:

- HTTP headers security: Middleware that secures the application by configuring HTTP headers to prevent common attacks (XSS, clickjacking, etc.).

jsonwebtoken (JWT):

- Authentication management: Used to create and verify JWT tokens for user authentication.

MySQL, MySQL2, Promise MySQL:

- MySQL database management: Libraries to interact with a MySQL database, with mysql2 being a more modern version compatible with promises.

**Backend development tools**:

ESLint: Linting tool to detect issues in JavaScript code.
Jest: Unit testing framework.
Morgan: Middleware for logging HTTP requests.
Nodemon: Automatically restarts the server when code changes are detected.
Prettier: Tool for code formatting.
Supertest: Tool for testing HTTP APIs.


**Frontend**:

FontAwesome:

- Icons: @fortawesome/fontawesome-free and its other packages are used to display icons in the user interface.

Redux and Redux Toolkit:

- Global state management: redux, @reduxjs/toolkit, react-redux, and redux-thunk are used to efficiently and centrally manage the global state of the application.

Bootstrap and React Bootstrap:
- UI components and styles: bootstrap and react-bootstrap are used to build a responsive and styled user interface with ready-to-use components.

React and React DOM:
- React is used to build UI components, while react-dom is used to render these components into the DOM.

React Router DOM:
- Used to manage navigation and different pages in a React application.

React Responsive Carousel:
- Image carousel: Used to add a responsive image carousel in the user interface.

Vite and its tools:

- Fast bundling and development: vite and @vitejs/plugin-react are used to compile and optimize front-end files with faster performance compared to Webpack.

**Frontend development tools**:

ESLint: For linting React code.
Prettier: For code formatting.
ESLint Plugins: Additional plugins to enforce best practices with React, hooks, and hot-reloading management.