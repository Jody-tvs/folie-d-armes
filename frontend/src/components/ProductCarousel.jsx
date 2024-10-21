import React from 'react'
import Carousel from 'react-bootstrap/Carousel'
import '@styles/ProductCarousel.scss'

const ProductCarousel = ({ mainImage, secondaryImages, altText }) => {
  const backendURL = 'http://localhost:9500/public/images/'
  
  return (
    <Carousel className="carousel">
      {/* image principale */}
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={`${backendURL}${mainImage}`}
          alt={altText || 'Image principale du produit'}
          onError={() => console.log('Failed to load main image:', `${backendURL}${mainImage}`)}
        />
      </Carousel.Item>

      {/* images secondaires */}
      {secondaryImages.length > 0 && secondaryImages.map((pic, idx) => (
        <Carousel.Item key={idx}>
          <img
            className="d-block w-100"
            src={`${backendURL}${pic.name}`}
            alt={pic.alt || `Image secondaire`}
            onError={() => console.log('Failed to load secondary image:', `${backendURL}${pic.name}`)} 
          />
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export default ProductCarousel