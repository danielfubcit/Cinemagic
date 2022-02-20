import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper';

import 'swiper/css';
import 'swiper/css/pagination';

import movies from '@/utils/imdbTop250.json';

SwiperCore.use([Pagination]);

export default function Carousel(){
  const [movieData, setMovieData] = useState(movies);
  
  const titles = [];
  const slides = [];

// array pushes 15 movie slides to SwiperJS
  for(let i = 0; i < 15; i += 1){
    if(movieData[i].Title){
      titles.push(movieData[i].Title);
    }

    if(titles[i].String.length > 35){
      return (
        String.subtract
      )
    }

    slides.push(
      <SwiperSlide key={ `slide-${ i }` } tag='li'>
        <img 
          src='http://placekitten.com/160/175' 
          alt={ `Slide ${ i }` }
          style={ styles.image }
        />

        { titles.map((o) => <p className='carouselText'>{ o }</p>) }
        {/* { titles.at((o) => <p className='carouselText'>{ o }</p>) } */}
      </SwiperSlide>
    )

    titles.pop(i);
  }

// Screen dimension check
  if(typeof window !== "undefined"){
    if(window.innerWidth === 375){
      return (
        <React.Fragment>
          <Swiper 
            className='customSwiper' 
            wrapperTag='ul'
            modules={[Pagination]}
            pagination={{
              clickable: true,
            }}
            slidesPerView={3}
            slidesPerGroup={3}
            spaceBetween={150}
            loop={false}
          >
            { slides }
          </Swiper>
        </React.Fragment>
      )
    }
  }

// default return for desktop screen
  return (
    <React.Fragment>
      <Swiper 
        className='customSwiper' 
        wrapperTag='ul'
        modules={[Pagination]}
        pagination={{
          clickable: true,
        }}
        slidesPerView={3}
        slidesPerGroup={3}
        spaceBetween={100}
        loop={false}
      >
        { slides }
      </Swiper>
    </React.Fragment>
  )
}

var styles = {
  image: {
    borderRadius: "20px",
  }
}
