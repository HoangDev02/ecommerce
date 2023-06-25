import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './carousels.css';

const Carousels = () => {
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-8'>
        <div id="carouselExampleCaptions" class="carousel slide">
      <div class="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
      </div>
      <div class="carousel-inner">
          <div class="carousel-item active">
            <img src="https://cf.shopee.vn/file/vn-50009109-fb0a3410935bda8c71ebbb703f9a8acc_xxhdpi" class="d-block w-100" alt="..."/>
            <div class="carousel-caption d-none d-md-block">
              <h5>First slide label</h5>
              <p>Some representative placeholder content for the first slide.</p>
            </div>
          </div>
          <div class="carousel-item">
            <img src="https://cf.shopee.vn/file/vn-50009109-fb0a3410935bda8c71ebbb703f9a8acc_xxhdpi" class="d-block w-100" alt="..."/>
            <div class="carousel-caption d-none d-md-block">
              <h5>Second slide label</h5>
              <p>Some representative placeholder content for the second slide.</p>
            </div>
          </div>
          <div class="carousel-item">
            <img src="https://cf.shopee.vn/file/vn-50009109-fb0a3410935bda8c71ebbb703f9a8acc_xxhdpi" class="d-block w-100" alt="..."/>
            <div class="carousel-caption d-none d-md-block">
              <h5>Third slide label</h5>
              <p>Some representative placeholder content for the third slide.</p>
            </div>
          </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
        </div>
        </div>
        <div className='col-4'>
          <div className='row'>
            <div id="carouselExampleSlidesOnly" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img src="https://cf.shopee.vn/file/vn-50009109-3672b745fc02ba7e79e0418fe3385f1a_xhdpi" class="d-block w-100" alt="..."/>
              </div>
            </div>
          </div>
          </div>
          <div className='row' >
            <div id="carouselExampleSlidesOnly" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img src="https://cf.shopee.vn/file/vn-50009109-a87e65ed49362e2f5d9dcca4c754dea5_xhdpi" class="d-block w-100" alt="..."/>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousels;
