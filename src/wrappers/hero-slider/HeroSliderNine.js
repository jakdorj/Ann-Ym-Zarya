import PropTypes from "prop-types";
import clsx from "clsx";
import { EffectFade } from "swiper";
import Swiper, { SwiperSlide } from "../../components/swiper";
import HeroSliderNineSingle from "../../components/hero-slider/HeroSliderNineSingle.js";
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

const HeroSliderNine = ({ spaceLeftClass, spaceRightClass }) => {
  const mainContext = useContext(MainContext);
  useEffect(() => {}, [mainContext.homeSliderData]);
  return (
    <div className={clsx("slider-area", spaceLeftClass, spaceRightClass)}>
      <div className="slider-active nav-style-1">
        {mainContext.homeSliderData && (
          <Swiper options={params}>
            {mainContext.homeSliderData.map((e, key) => (
              <SwiperSlide key={key}>
                <HeroSliderNineSingle data={e} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
};

HeroSliderNine.propTypes = {
  spaceLeftClass: PropTypes.string,
  spaceRightClass: PropTypes.string,
};

export default HeroSliderNine;
