import { EffectFade } from "swiper";
import Swiper, { SwiperSlide } from "../../components/swiper";
import HeroSliderTwelveSingle from "../../components/hero-slider/HeroSliderTwelveSingle.js";
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
};

const HeroSliderTwelve = () => {
  const mainContext = useContext(MainContext);
  useEffect(() => {
    console.log("HeroSliderTwelve", mainContext.homeSliderData);
  }, [mainContext.homeSliderData]);
  return (
    <div className="slider-area">
      <div className="slider-active-2 nav-style-2">
        <Swiper options={params}>
          {mainContext.homeSliderData &&
            mainContext.homeSliderData.map((e, key) => (
              <SwiperSlide key={key}>
                <HeroSliderTwelveSingle data={e} />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
};

export default HeroSliderTwelve;
