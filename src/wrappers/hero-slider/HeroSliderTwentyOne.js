import {EffectFade} from "swiper";
import Swiper, {SwiperSlide} from "../../components/swiper";
import sliderData from "../../data/hero-sliders/hero-slider-twenty-one.json";
import HeroSliderTwentyOneSingle from "../../components/hero-slider/HeroSliderTwentyOneSingle.js";
import {useContext, useEffect, useState} from "react";
import axios from "../../axios-orders.js";
import MainContext from "../../components/mainContext/mainContext.js";

const params = {
  effect: "fade",
  fadeEffect: {
    crossFade: true,
  },
  modules: [EffectFade],
  loop: true,
  speed: 1000,
  navigation: true,
  autoHeight: false,
};

const HeroSliderTwentyOne = () => {
  const mainContext = useContext(MainContext);
  useEffect(() => {
    console.log("aHeroSliderTwentyOne");
  }, [mainContext.homeSliderData]);
  return (
    <div className="slider-area">
      <div className="slider-active nav-style-1">
        {mainContext.homeSliderData && (
          <Swiper options={params}>
            {mainContext.homeSliderData.map((e, key) => (
              <SwiperSlide key={key}>
                <HeroSliderTwentyOneSingle data={e[1].values} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
};

export default HeroSliderTwentyOne;
