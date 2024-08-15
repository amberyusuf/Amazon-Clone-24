import React from "react";
import CarouselEffect from "../../Components/Carousel/Carousel";
import Category from "../../Components/Category/Category";
import Products from "../../Components/Product/Products";
import LayOut from "../../Components/Layout/LayOut";

const Landing = () => {
  return (
    <LayOut>
      <CarouselEffect />
      <Category />
      <Products />
    </LayOut>
  );
};

export default Landing;
