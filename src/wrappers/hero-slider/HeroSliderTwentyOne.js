import { EffectFade } from "swiper";
import Swiper, { SwiperSlide } from "../../components/swiper"; 
import HeroSliderTwentyOneSingle from "../../components/hero-slider/HeroSliderTwentyOneSingle.js";
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
                <HeroSliderTwentyOneSingle data={e} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
};

export default HeroSliderTwentyOne;
