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
            src="https://cf.shopee.vn/file/vn-50009109-3e11c4ce1cc390460572c2f9c5fd4e85_xxhdpi"
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
            src="https://cf.shopee.vn/file/vn-50009109-071cfccf555036809c5e4aa62b6b95e7_xxhdpi"
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
            src="https://cf.shopee.vn/file/vn-50009109-6d01717d37418935f8338b4138b5dea3_xxhdpi"
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
