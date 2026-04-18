
import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { Link } from 'react-router-dom';
import hero1 from '../assets/hero1.jpg';
import hero4 from '../assets/hero4.jpg';

import '../pages/index.css';

export default function HeroSection() {
  return (

    <div className="hero bg-light">
        <div className="container ">
         <Swiper pagination={true} modules={[Pagination]} className="Swiper-slide">
            <SwiperSlide>
                <div className="content">
                    <h4>Discover the Latest Tech</h4>
                    <h3>Upgrade your lifestyle <br /> with the newest gadgets</h3>
                    <Link to="/products" className="btn btn-primary">
                        Shop Now
                    </Link>
                </div>
                <img src={hero1} alt="slider hero one" />
                </SwiperSlide>
                <SwiperSlide>
                <div className="content">
                    <h4>Up to 50% OFF</h4>
                    <h3>Limited time deals <br /> on top brands</h3>
                    <Link to="/products" className="btn btn-primary">
                        Shop Now
                    </Link>
                </div>
                <img src={hero4} alt="slider hero two" />
                </SwiperSlide>

        </Swiper>
        </div>
    </div>

  
  )
}
