import PropTypes from "prop-types";
import {Link} from "react-router-dom";

const HeroSliderTwentyOneSingle = ({data}) => {
  return (
    <div
      className="single-slider-2 slider-height-2 d-flex align-items-center bg-img"
      style={{
        backgroundImage: `url(${
          data.img ? data.img[0] : "/assets/img/slider/slider-2-2.jpg"
        })`,
      }}
    >
      {console.log("data", data)}
      {/* // url: shop-grid-standard */}
      <div className="container">
        <div className="row">
          <div className="col-xl-6 col-lg-7 col-md-8 col-12">
            <div className="slider-content-2 slider-content-2--white slider-animated-1">
              <h3 className="animated no-style">{data.smallTitleUp}</h3>
              <h1
                className="animated"
                dangerouslySetInnerHTML={{__html: data.title}}
              />
              <div className="slider-btn btn-hover">
                <Link
                  className="animated rounden-btn"
                  to={process.env.PUBLIC_URL + "/shop-grid-standard"}
                >
                  SHOP NOW twentyOneSingle.js
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
