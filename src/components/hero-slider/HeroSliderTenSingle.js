import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

import { Link } from "react-router-dom";

const HeroSliderTenSingle = ({ data }) => {
  const { i18n } = useTranslation();
  return (
    <div
      className="single-slider-2 slider-height-2 d-flex align-items-center bg-img"
      style={{
        backgroundImage: `url(${
          data.img ? data.img[0] : "/assets/img/slider/slider-2-2.jpg"
        })`,
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-xl-6 col-lg-7 col-md-8 col-12 ms-auto">
            <div className="slider-content-3 slider-animated-1 text-center">
              <h3 className="animated">
                {console.log("aHeroSliderTenSingle: ", data)}
                {i18n.resolvedLanguage === "en"
                  ? data.subTitleEng
                  : data.subTitleMn}
              </h3>
              <h1
                className="animated"
                dangerouslySetInnerHTML={{
                  __html:
                    i18n.resolvedLanguage === "en"
                      ? data.titleEng
                      : data.titleMn,
                }}
              ></h1>
              <p className="animated">{data.text}</p>
              <div className="slider-btn btn-hover">
                <Link
                  className="animated"
                  to={process.env.PUBLIC_URL + "/shop-grid-standard"}
                >
                  {i18n.resolvedLanguage === "en"
                    ? data.buttonNameEng
                    : data.buttonNameMn}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

HeroSliderTenSingle.propTypes = {
  data: PropTypes.shape({}),
};

export default HeroSliderTenSingle;
