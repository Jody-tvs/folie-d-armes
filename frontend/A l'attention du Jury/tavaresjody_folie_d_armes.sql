-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Hôte : db.3wa.io
-- Généré le : mar. 22 oct. 2024 à 12:57
-- Version du serveur :  5.7.33-0ubuntu0.18.04.1-log
-- Version de PHP : 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `tavaresjody_folie_d_armes`
--

-- --------------------------------------------------------

--
-- Structure de la table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `categories`
--

INSERT INTO `categories` (`id`, `name`) VALUES
(1, 'ARMES'),
(2, 'ACCESSOIRES'),
(3, 'MUNITIONS');

-- --------------------------------------------------------

--
-- Structure de la table `contacts`
--

CREATE TABLE `contacts` (
  `id` int(11) NOT NULL,
  `email` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `subject` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `story` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `receipt_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `statut` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0= message non lu, 1= message lu'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `contacts`
--

INSERT INTO `contacts` (`id`, `email`, `subject`, `story`, `receipt_date`, `statut`) VALUES
(6, 'jtavares.mcd@gmail.com', 'Proposition d\'armes', '521651221', '2024-10-07 10:49:19', 0),
(7, 'test@example.com', 'Question divers', 'J\'ai une question à propos de votre site.....', '2024-10-07 10:49:52', 0),
(9, 'jtavares.mcd@gmail.com', 'Proposition d\'armes', 'vregvrez', '2024-10-07 12:55:36', 0);

-- --------------------------------------------------------

--
-- Structure de la table `orderdetails`
--

CREATE TABLE `orderdetails` (
  `id` int(11) NOT NULL,
  `orders_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `unit_price` float NOT NULL,
  `products_id` int(11) NOT NULL,
  `tva` float NOT NULL COMMENT 'tva au moment de l''achat'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `orderdetails`
--

INSERT INTO `orderdetails` (`id`, `orders_id`, `quantity`, `unit_price`, `products_id`, `tva`) VALUES
(1, 9, 2, 60, 8, 20.6),
(2, 9, 1, 40, 7, 20.6),
(3, 10, 1, 15, 12, 20.6),
(4, 10, 1, 20, 14, 20.6),
(11, 19, 1, 50, 6, 20.6),
(12, 19, 1, 30, 10, 20.6),
(13, 20, 2, 10, 11, 20.6),
(14, 20, 3, 20, 14, 20.6),
(15, 20, 1, 45, 9, 20.6),
(16, 32, 1, 15, 12, 20.6),
(17, 33, 30, 20, 14, 20.6),
(18, 33, 12, 15, 12, 20.6),
(19, 33, 1, 60, 8, 20.6),
(20, 34, 1, 10, 11, 20.6);

-- --------------------------------------------------------

--
-- Structure de la table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `users_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `total_amount` float NOT NULL,
  `status` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `orders`
--

INSERT INTO `orders` (`id`, `users_id`, `created_at`, `total_amount`, `status`) VALUES
(9, 4, '2024-10-16 15:09:28', 160, 'en préparation'),
(10, 4, '2024-10-16 17:26:02', 35, 'en attente'),
(19, 21, '2024-10-19 08:52:03', 80, 'en attente'),
(20, 21, '2024-10-19 08:53:59', 125, 'expédié'),
(32, 4, '2024-10-20 20:16:51', 15, 'payée'),
(33, 4, '2024-10-21 09:55:15', 840, 'en préparation'),
(34, 21, '2024-10-21 09:55:43', 10, 'en préparation');

-- --------------------------------------------------------

--
-- Structure de la table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` float NOT NULL,
  `stock` int(11) NOT NULL,
  `tva` float NOT NULL DEFAULT '20.6',
  `picture` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `alt` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `categories_id` int(11) NOT NULL,
  `statut` tinyint(1) NOT NULL DEFAULT '1' COMMENT '0 = produit non afficher sur le site, 1= produit afficher sur le site'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `price`, `stock`, `tva`, `picture`, `alt`, `categories_id`, `statut`) VALUES
(6, 'Epâtes ⚔️', 'Épée \"Pasta Blade\" 🍝\n\nFatigué(e) des armes classiques en métal ? Envie de faire preuve de créativité culinaire sur le champ de bataille ? Laissez-moi vous présenter l\' Épée Pasta Blade ! Un redoutable sabre tout en pâtes, idéal pour trancher dans l\'air... et dans une bonne assiette de sauce bolognaise. 🍅\n\nFabriqué à partir d\'un mélange secret de fusilli, penne et spaghetti, cette arme ne manque pas de diversité. Besoin d\'un snack rapide pendant un combat ? Pas de souci, faites cuire une section d\'épée en moins de 10 minutes, al dente bien sûr.\n\n⚠️ Attention : Évitez de l\'utiliser sous la pluie ou contre une sauce trop liquide... les dégâts pourraient être irrécupérables ! 💦🍽️', 50, 10, 20.6, 'épée entière.webp', 'Une épée faite de spaghettis, tenue par une main, entourée de plusieurs pâtes disposées en motifs symétriques sur une table.', 1, 1),
(7, 'Grenade d\'amour 💣', '\"Grenade moi\" ❤️\n\nMarre de la violence et des tensions ? La grenade \"Grenade moi\" est faite pour vous ! Grâce à elle, toute forme d\'agressivité disparaît instantanément.\n\nDès que vous ressentez monter la tension ou que les insultes fusent, éloignez-vous, dégoupillez... et admirez la magie ! Les insultes se transforment en mots doux 💕, et les coups de poing deviennent des câlins chaleureux 🤗.\n\n⚠️ Attention : Restez à distance pour éviter d\'être pris dans son rayon d\'action, sinon vous pourriez vous réveiller dans les bras de votre pire ennemi ! 😅\n\nPossibilité de changez la poudre \"amour\" pour \"chanson\" 🎶. Voir catégories \"munitions\".', 40, 10, 20.6, 'grenade-d_amour.webp', 'Grenade décorée de cœurs roses, avec l\'inscription \'LOVE\', tenue par une main.', 1, 1),
(8, 'Canon à  voix de Chipmunk 💥', 'Canon \"Voix de Chipmunk\" 🎈\n\nVous voulez déstabiliser vos ennemis sans faire une égratignure ? Avec le Canon Voix de Chipmunk , soyez prêt à changer les règles du jeu ! Ce redoutable lanceur propulse des ballons d\'hélium à haute vitesse. Une fois touché, votre adversaire verra sa voix transformée en une jolie soprano de dessin animé 🎤😆.\n\nParfait pour casser la tension en plein duel ou rendre un interrogatoire beaucoup plus divertissant. \n\n⚠️ Attention : Risque élevé de fou rire en entendant votre ennemi marmonner ses menaces avec une voix de chipmunk. Effet garanti pendant 5 à 10 minutes. 🌬️😂', 60, 10, 20.6, 'canon-ballon-d_helium.webp', 'Canon fictif de ballons à hélium, tenu par une main, avec plusieurs réservoirs et un ballon en métal à l\'extrémité.', 1, 1),
(9, 'Bouclier licorne 🦄', 'Bouclier \"Licorne toi de là\" 🛡️\n\nVous cherchez un bouclier unique, allié défense et attaque avec un style féérique et féroce ? Le bouclier \"Licorne toi de là\" est fait pour vous !\n\nFabriqué en bois de bambou renforcé par une sorte de lebrunchun, il est uniformément résistant. La tête de licorne, soigneusement choisie, est accompagnée d\'une corne magique capable d\'attendre vos ennemis les plus redoutables. En la touchant, ils seront instantanément transportés dans le monde enchanteur de Fairyland 🌈, où ils devront manger des tonnes de bonbons et accomplir des quêtes pour en sortir. Durée moyenne de séjour : 300 minutes.\n\n🔹 Dimensions : 80 cm (hauteur) x 50 cm (largeur), pour une protection optimale.\n🔹Poids : 1 kg .\n\n⚠️ Attention : Ne pas utiliser avant 500 mois. Si vous touchez par accident avec la corne, une clé spéciale vous permettra de sortir de Fairyland. Conservez-la précieusement !', 45, 10, 20.6, 'BouclierFace.webp', 'Bouclier décoré d\'une tête de licorne aux couleurs arc-en-ciel, avec des lanières en cuir pour le porter sur le dos.', 2, 1),
(10, 'Casque paix 🌸', 'Casque \"Peace \" 🕊️\n\nLe Peace and Love résonne en vous ? Mais dans cette décennie, tout le monde ne partage pas vos motivations, et vous réalisez que la protection est nécessaire ? Ce casque \"Peace\" est fait pour vous ! Il protège ce que vous avez de plus précieux : votre cerveau 🧠, tout en reflétant vos valeurs profondes.\n\n⚠️ Attention : N\'arrosez pas trop les plantes qui ornent le casque, sous peine de les voir pousser de façon exponentielle et rendre le casque très lourd ! 🌿😅', 30, 10, 20.6, 'Casque-face.webp', 'Casque militaire orné de fleurs colorées et de balles plantées sur le dessus, mélangeant symboles de guerre et de paix', 2, 1),
(11, 'ballon d\'hélium 🎈', 'Ballons d\'Hélium - Pack de 12 💨\n\nBesoin de refaire le plein de fun et de voix ? Le pack \"12 Ballons d\'Hélium\" est là pour ça ! Ces ballons ultra colorés sont prêts à l\'emploi pour vos besoins en festivités, en distractions... ou en stratégies de déstabilisation sonore 🎤😂.\n\nChaque pack contient 12 ballons. Parfait pour compléter votre Canon Voix de Chipmunk ou simplement égayer votre journée avec des batailles vocales hilarantes.\n\n⚠️ Attention : Ne laissez pas ces ballons sans surveillance, vos amis risqueraient de se lancer dans des duos de karaoké d\'une voix très... particulière. 🎶🐿️', 10, 10, 20.6, 'ballon d\'hélium 3.webp', 'Sachets colorés de ballons gonflables à l\'hélium, avec différentes tailles et quantités indiquées sur les emballages.', 3, 1),
(12, 'Cartouche de gaz pour canon 💨', 'Cartouche d\'Hélium - \"Voix de Chipmunk\" Prête 🐿️\n\nVous êtes à court de gaz ? Pas de panique ! Cette Cartouche d\'Hélium est là pour redonner vie à vos ballons et à votre canon à hélium. Compacte et ultra-efficace, elle est votre meilleure alliée pour garantir des voix aiguës.\n\nCompatible avec le Canon Voix de Chipmunk , simple à installer, elle assure une diffusion d\'hélium en continue pour que l\'ambiance monte aussi vite que les ballons !', 15, 10, 20.6, 'cartouche-hélium.webp', 'Cartouche compacte d\'hélium de couleur beige, tenue par une main, avec des détails mécaniques et une valve de décompression sur le dessus.', 3, 1),
(13, 'Gilet cible 🎯', 'Le gilet cible \"Touche moi\" 🛡️\n\nVous vous ennuyez lors de vos combats avec votre moitié ? Son incapacité à vous toucher vous exaspère ? Avec le gilet \"Touche moi là\", votre partenaire n\'aura plus aucune excuse pour ne pas vous atteindre. Sa grande protection évitera tout dommage collatéral et évitera les litiges inutiles parce que votre moitié se plaint de ne pas parvenir à vous toucher.\n\n⚠️ Attention : Ne le portez pas en permanence, d\'autres pourraient en profiter pour vous toucher aussi ! 😏', 45, 10, 20.6, 'Gilet par balle dos.webp', 'Gilet pare-balles décoré de cibles rouges et blanches avec l\'inscription \'JE SUIS ICI\' en noir, accentuant une ironie visuelle.', 2, 1),
(14, 'Recharge poudre grenade 🎶', 'Recharge poudre pour Grenade Années 80 💣\n\nMarre des jeunes sans goût musical ? JUL vous fait souffrir ? C\'est l\'heure de renverser la vapeur ! Grâce à cette recharge, vous allez diffuser de la vraie musique et rappeler à la jeunesse ce qu\'est un bon son ! 🎧\n\nPetite mise en garde : vous ne pourrez pas choisir la chanson. Attendez vous à entendre aussi bien Take on Me que Sunday Bloody Sunday ou encore Banana Split ! 🎤🎸', 20, 10, 20.6, 'poudre-principal.webp', 'Pot de poudre rose brillante avec une étiquette rétro \'1980\'s Songs\' et une note de musique lumineuse.', 3, 1);

-- --------------------------------------------------------

--
-- Structure de la table `secondarypictures`
--

CREATE TABLE `secondarypictures` (
  `id` int(11) NOT NULL,
  `products_id` int(11) NOT NULL,
  `name` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `alt` varchar(250) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `secondarypictures`
--

INSERT INTO `secondarypictures` (`id`, `products_id`, `name`, `alt`) VALUES
(2, 6, 'épée face.webp', 'Main tenant une épée dont la lame est faite de longs spaghettis, avec un manche orné de motifs dorés et détaillés'),
(6, 6, 'épée pres.webp', 'Vue rapprochée d\'un manche d\'épée richement décoré, avec une lame composée de spaghettis jaunes, fusionnant éléments alimentaires et ornementaux.'),
(9, 7, 'grenade-d_amour-explose.webp', 'Grenade ornée de cœurs roses, explosant en une pluie d\'étincelles et de cœurs flottants.'),
(11, 8, 'canon-ballon-d_helium-dos.webp', 'Deux vues d\'un canon fictif à ballons d\'hélium, tenu par une main, avec des réservoirs sphériques et un ballon en métal à l\'extrémité.'),
(12, 8, 'canon-ballon-d_helium-c.webp', 'Canon à ballons d\'hélium tenu par une main, avec des réservoirs sphériques et des ballons métalliques flottant dans les airs après avoir été tirés.'),
(13, 9, 'BouclierDos.webp', 'Vue arrière d\'un bouclier avec des sangles en cuir ajustables, conçu pour être porté sur le dos.'),
(14, 9, 'BouclierProfil.webp', 'Bouclier vu de profil, orné d\'une tête de licorne aux couleurs arc-en-ciel, avec des sangles en cuir pour être porté sur le dos.'),
(15, 10, 'Casque-dos.webp', 'Vue arrière d\'un casque militaire décoré de fleurs colorées et de balles enfoncées sur le dessus, symbolisant un contraste entre guerre et nature'),
(16, 10, 'Casque-profil.webp', 'Casque militaire vu de profil, décoré de fleurs colorées et de balles plantées, symbolisant le contraste entre guerre et paix.'),
(17, 11, 'ballon d\'hélium 2.webp', 'Paquets de ballons à hélium colorés, emballés en sachets dorés, avec l\'indication \'12 ballons\' sur chaque paquet.'),
(20, 12, 'cartouche-hélium-p.webp', 'Trois cartouches d\'hélium de couleur beige, tenues dans une main, avec des valves et mécanismes visibles, portant l\'inscription \'Helium Cartridge\''),
(21, 13, 'Gilet par balle face.webp', 'Gilet pare-balles vu de face, couvert de motifs de cibles rouges et blanches, évoquant un contraste entre protection et vulnérabilité.'),
(22, 13, 'Gilet par balle profil.webp', 'Gilet pare-balles vu de profil, recouvert de motifs de cibles rouges et blanches, avec des sangles latérales grises'),
(23, 14, 'poudre-chansons-dos.webp', 'Trois pots de poudre colorée rose, bleue et violette, avec des cassettes rétro étiquetées \'1980\'s Songs\' sur chaque pot.'),
(24, 14, 'poudre-chansons-face.webp', 'Trois pots lumineux de poudre colorée rose, bleue et violette, avec une grande note de musique et l\'étiquette \'1980\'s Songs\' sur chaque pot.'),
(25, 7, 'grenade-amour.webp', 'Grenade libérant une explosion de cœurs roses au-dessus d\'une main ouverte, symbolisant amour et douceur'),
(26, 12, 'cartouche-hélium-11.webp', 'Petite cartouche d\'hélium beige, tenue dans une main, avec des mécanismes et inscriptions visibles, portant l\'étiquette \'Helium Cartridge\''),
(27, 11, 'ballon-d_hélium-4.webp', 'Sachet contenant 12 ballons gonflables à l\'hélium de couleurs vives, avec un emballage argenté et l\'inscription \'12 Balloons\' en noir.');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `firstname` varchar(80) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lastname` varchar(80) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(250) COLLATE utf8mb4_unicode_ci NOT NULL,
  `zip_code` varchar(5) COLLATE utf8mb4_unicode_ci NOT NULL,
  `city` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` varchar(5) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'user',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `firstname`, `lastname`, `email`, `password`, `address`, `zip_code`, `city`, `phone`, `role`, `created_at`) VALUES
(3, 'micke', 'superprof', 'micke@gmail.com', '$2a$10$LCwgxAfn6psu1arTtJGXLumBMhZ0vI.EnXMYsuFL.woDQ9siJpQ0e', '2 rue de la paix', '69000', 'lyon', '0612345678', 'user', '2024-08-22 10:17:04'),
(4, 'hunter', 'jo', 'admin@gmail.com', '$2a$10$yFX5MfwBOVqcTznVtCZJUet49qk9gW369hQQLjI9dOnHYsqDYm.Pq', '21 rue des champs', '12345', 'Montpellier', '0123456789', 'admin', '2024-10-21 19:14:09'),
(5, 'miel', 'pops', 'mielpops@gmail.com', '$2a$10$XhOSzxGobzhZHNgsaPNzqevK7NEUJHMyonobhEeuOSS27uFdeRdzS', '2 rue des ruches', '75000', 'abeilleville', '0123456789', 'user', '2024-08-29 13:54:50'),
(7, 'tavares', 'gomez', 'tavares@gmail.com', '$2a$10$I3vXGGdI19cQgXAjmiYfQeX4CKNi.siZR4DAtcuqsMfGExhv6iCSC', '1 rue des bandis', '34000', 'encavale', '0123456789', 'user', '2024-10-03 16:21:21'),
(21, 'patate', 'douce', 'user@gmail.com', '$2a$10$ngBVTkttNcxJoLGywA566e0Tt.wOFJysXL26cYJWxXhQyU6iJUKiS', '85 azerty', '82000', 'zefzefz', '0102030405', 'user', '2024-10-21 19:13:27'),
(22, 'Admin', 'User', 'adminuser@gmail.com', '$2a$10$KXOcugAZ3NKrm3W6T0Y0nOu8wETSQLJ8gZqM2aOBiGTwPE5tKF7T2', '123 Admin Street', '75000', 'Admin City', '0123456789', 'admin', '2024-10-16 12:46:23'),
(30, 'Pierre', 'Dupont', 'pierre.dupont@example.com', '$2a$10$Uk..UnJvH1s3dphitt3h5uYNgWJJWYVP5oSvTSIDAy369D30m/e/W', '123 Rue de la Paix', '75001', 'Paris', '0123456789', 'user', '2024-10-19 12:54:46');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `contacts`
--
ALTER TABLE `contacts`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `orderdetails`
--
ALTER TABLE `orderdetails`
  ADD PRIMARY KEY (`id`),
  ADD KEY `orders_id` (`orders_id`),
  ADD KEY `products_id` (`products_id`);

--
-- Index pour la table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `users_id` (`users_id`);

--
-- Index pour la table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `categories_id` (`categories_id`);

--
-- Index pour la table `secondarypictures`
--
ALTER TABLE `secondarypictures`
  ADD PRIMARY KEY (`id`),
  ADD KEY `products_id` (`products_id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `contacts`
--
ALTER TABLE `contacts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT pour la table `orderdetails`
--
ALTER TABLE `orderdetails`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT pour la table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT pour la table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT pour la table `secondarypictures`
--
ALTER TABLE `secondarypictures`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `orderdetails`
--
ALTER TABLE `orderdetails`
  ADD CONSTRAINT `orderDetails_ibfk_1` FOREIGN KEY (`orders_id`) REFERENCES `orders` (`id`),
  ADD CONSTRAINT `orderDetails_ibfk_2` FOREIGN KEY (`products_id`) REFERENCES `products` (`id`);

--
-- Contraintes pour la table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`);

--
-- Contraintes pour la table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`categories_id`) REFERENCES `categories` (`id`);

--
-- Contraintes pour la table `secondarypictures`
--
ALTER TABLE `secondarypictures`
  ADD CONSTRAINT `secondaryPictures_ibfk_1` FOREIGN KEY (`products_id`) REFERENCES `products` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
