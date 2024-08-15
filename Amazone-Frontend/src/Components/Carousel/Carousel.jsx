import React from "react";
import { Carousel } from "react-responsive-carousel";
import { img } from "./img/imgsData";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import classes from './carousel.module.css'


const CarouselEffect = () => {
  return (
    <div>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={false}
        showThumbs={false}
      >
        {img.map((singleImgLink, index) => {
          return <img src={singleImgLink} key={index} alt="" />;
        })}
      </Carousel>
      <div className={classes.hero__img}></div>
    </div>
  );
};

export default CarouselEffect;
