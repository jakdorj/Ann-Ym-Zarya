import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const HeroSliderTwentyOneSingle = ({ data }) => {
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
      {console.log("aHeroSliderTwentyOneSingle", data)}
      {/* // url: shop-grid-standard */}
      <div className="container">
        <div className="row">
          <div className="col-xl-6 col-lg-7 col-md-8 col-12">
            <div className="slider-content-2 slider-content-2--white slider-animated-1">
              <h3 className="animated no-style">
                {" "}
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
              />
              <div className="slider-btn btn-hover">
                <Link
                  className="animated rounden-btn"
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

HeroSliderTwentyOneSingle.propTypes = {
  data: PropTypes.shape({}),
};

export default HeroSliderTwentyOneSingle;
