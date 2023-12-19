import PropTypes from "prop-types";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const HeroSliderTwelveSingle = ({ data }) => {
  const { i18n } = useTranslation();
  return (
    <div
      className={clsx("slider-height-4 d-flex align-items-center bg-img")}
      style={{
        backgroundImage: `url(${
          data.img ? data.img[0] : "/assets/img/slider/slider-2-2.jpg"
        })`,
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-xl-12 col-lg-12 col-md-12 col-12">
            <div className="slider-content-5 slider-animated-1 text-center">
              <h3 className="animated">
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
              <div className="slider-btn-5 btn-hover">
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

HeroSliderTwelveSingle.propTypes = {
  data: PropTypes.shape({}),
};

export default HeroSliderTwelveSingle;
