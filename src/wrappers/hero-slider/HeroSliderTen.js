import { EffectFade } from "swiper";
import Swiper, { SwiperSlide } from "../../components/swiper";
// import sliderData from "../../data/hero-sliders/hero-slider-ten.json";
import HeroSliderTenSingle from "../../components/hero-slider/HeroSliderTenSingle.js";
import { useContext, useEffect } from "react";
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
  autoplay: false,
};

const HeroSliderTen = () => {
  const mainContext = useContext(MainContext);
  useEffect(() => {
    console.log("aHeroSliderTen", mainContext.homeSliderData);
  }, [mainContext.homeSliderData]);
  return (
    <div className="slider-area">
      <div className="slider-active nav-style-1">
        <Swiper options={params}>
          {mainContext.homeSliderData &&
            mainContext.homeSliderData.map((e, key) => {
              return (
                <SwiperSlide key={key}>
                  <HeroSliderTenSingle data={e} />
                </SwiperSlide>
              );
            })}
        </Swiper>
      </div>
    </div>
  );
};

export default HeroSliderTen;
