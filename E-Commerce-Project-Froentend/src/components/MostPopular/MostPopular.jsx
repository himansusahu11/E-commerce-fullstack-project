import React from "react";
import "./MostPopular.css";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
import { sliderSettings } from "../../utils/common";
import Product from "../product/Product";
const MostPopular = ({ products }) => {
  console.log(products);

  return (
    <div className="most-popular-wrapper">
      <div className="most-popular-container">
        <div className="most-popular-heading">
          <h1>Most Popular</h1>
        </div>
        <div className="most-popular-product">
          <Swiper {...sliderSettings}>
            <SliderButtions />
            {products.slice(0, 8).map((product, index) => {
              return (
                <SwiperSlide key={index}>
                  <Product product={product} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default MostPopular;

const SliderButtions = () => {
  const swiper = useSwiper();
  return (
    <div className="r-button">
      <button onClick={() => swiper.slidePrev()}>&lt;</button>
      <button onClick={() => swiper.slideNext()}>&gt;</button>
    </div>
  );
};
