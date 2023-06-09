import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './carousels.css';

const Carousels = () => {
  return (
    <div className="carousel">
      <Carousel>
        <Carousel.Item className="banner">
          <img
            className="d-block w-100"
            src="https://milano.exdomain.net/image/cache/catalog/slider/a4-1900x774.jpg"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item className="banner">
          <img
            className="d-block w-100"
            src="https://intphcm.com/data/upload/banner-thoi-trang-nam.jpg"
            alt="Second slide"
          />
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item className="banner">
          <img
            className="d-block w-100"
            src="https://tmluxury.vn/wp-content/uploads/ao-so-mi-nam-dep-tm-luxury.jpg"
            alt="Third slide"
          />
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default Carousels;
