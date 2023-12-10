import PropTypes from "prop-types";
import {useTranslation} from "react-i18next";

import {Link} from "react-router-dom";

const HeroSliderNineSingle = ({data, sliderClass}) => {
  const {i18n} = useTranslation();
  return (
    <div
      className="single-slider-2 slider-height-1 d-flex align-items-center slider-height-res bg-img"
      style={{
        backgroundImage: `url(${
          data.img ? data.img[0] : "/assets/img/slider/slider-2-2.jpg"
        })`,
      }}
    >
      {console.log("i18n.resolvedLanguage: ", i18n.resolvedLanguage)}
      <div className="container">
        <div className="row">
          <div className="col-xl-6 col-lg-6 col-md-7 ms-auto">
            <div className="slider-content-2 slider-animated-1">
              <h3 className="animated">{data.smallTitleUp}</h3>
              <h1
                className="animated"
                dangerouslySetInnerHTML={{__html: data.title}}
              ></h1>
              <div className="slider-btn btn-hover">
                <Link
                  className="animated"
                  to={process.env.PUBLIC_URL + "/shop-grid-standard"}
                >
                  SHOP NOW
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

HeroSliderNineSingle.propTypes = {
  data: PropTypes.shape({}),
};

export default HeroSliderNineSingle;
