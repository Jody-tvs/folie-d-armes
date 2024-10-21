import React from 'react'
import Carousel from 'react-bootstrap/Carousel'
import '../styles/Home.scss'

function Home() {
    //images dans public/images afficher sur l'accueil
    const images = ['grenade à rire.webp', 'epee.webp', 'mitraillette.webp']

    return (
        <div className="home-container">
            {/* carrousel d'images */}
            <div className="carousel-container">
                <Carousel>
                    {images.map((image, index) => (
                        <Carousel.Item key={index}>
                            <img
                                className="d-block w-100"
                                src={`http://localhost:9500/public/images/${image}`} 
                                alt={`Image ${index}`}
                            />
                        </Carousel.Item>
                    ))}
                </Carousel>
            </div>

            {/* texte de présentation */}
            <div className="text-container">
                <h2>Bienvenue chez Folie d'Armes !</h2>
                <p>
                    Le site qui prouve qu’on peut vendre des armes… sans se prendre au sérieux ! 🎯<br/>
                    Chez Folie d'Armes, on t'ouvre les portes d’un univers délirant où les armes, les accessoires et les munitions ne ressemblent à rien de ce que tu connais !
                    Après tout, qui n'a jamais rêvé d’un bouclier licorne arc-en-ciel ? 🦄🌈<br/><br/>
                    <strong>Qu’est-ce qu’on a pour toi ?</strong><br/>
                    Notre catalogue démentiel regorge de surprises. Imagine des armes qui flirtent entre l’absurde et le génial 🤪, des accessoires plus improbables les uns que les autres, et des munitions dont l’usage est… franchement discutable (mais tu vas adorer) ! Que tu sois du genre épée en pâtes, casque nature-friendly 🍃 ou grenade qui balance des tubes des années 80 🎶, tu trouveras ton bonheur ici.
                </p>
                <p>
                    <strong>Ce qu’on te promet ?</strong><br/>
                    Des produits plus absurdes que dangereux ⚔️, des accessoires qui frôlent le ridicule, et un max de fun ! 🎉 Chez Folie d’Armes, c’est du décalé à 100%, et surtout… on t’écoute !
                    Envie d’un bazooka qui balance des confettis ? Ou d’une épée laser qui fait machine à café ? Dis-nous tout dans la section Contactez-nous ! fais-nous part de tes idées délirantes 🤯 et qui sait, peut-être que ton invention apparaîtra bientôt sur notre boutique ! 
                    Et si tu as un retour à faire sur l’un de nos produits, on est tout ouïe – on rit, on réfléchit, et parfois, on fait même des améliorations 🛠️.
                </p>
                <p>
                    <strong>Alors, prêt à plonger dans l’absurde ? 😜</strong>
                </p>
            </div>
        </div>
    )
}

export default Home