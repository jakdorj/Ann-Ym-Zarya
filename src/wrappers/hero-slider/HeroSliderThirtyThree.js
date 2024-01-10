import {Link} from "react-router-dom";
import sliderData from "../../data/hero-sliders/hero-slider-thirty-three.json";
import MainContext from "../../components/mainContext/mainContext";
import {useContext, useEffect, useState} from "react";
import {useTranslation} from "react-i18next";

const HeroSliderThirtyThree = () => {
  const {i18n} = useTranslation();
  const mainContext = useContext(MainContext);
  const [data, setData] = useState({
    buttonName: "Shop now",
    title: "Title",
    subTitle: "Subtitle",
    homeBgImgSmall: process.env.PUBLIC_URL + sliderData.image,
    homeBgImgFull: process.env.PUBLIC_URL + sliderData.backgroundImage,
  });
  useEffect(() => {
    console.log("HomeChristmas", mainContext.homeSliderData);
    console.log("HomeChristmas data", mainContext.christmasData);
    if (!mainContext.christmasDataLoad) {
      if (mainContext.christmasData) {
        if (i18n.resolvedLanguage === "en") {
          setData({
            buttonName: mainContext.christmasData.buttonNameEng,
            title: mainContext.christmasData.titleEng,
            subTitle: mainContext.christmasData.subTitleEng,
            homeBgImgSmall: mainContext.christmasData.homeBgImgSmall,
            homeBgImgFull: mainContext.christmasData.homeBgImgFull,
          });
        } else {
          setData({
            buttonName: mainContext.christmasData.buttonNameMn,
            title: mainContext.christmasData.titleMn,
            subTitle: mainContext.christmasData.subTitleMn,
            homeBgImgSmall: mainContext.christmasData.homeBgImgSmall,
            homeBgImgFull: mainContext.christmasData.homeBgImgFull,
          });
        }
      }
    }
  }, [mainContext.christmasData, mainContext.christmasDataLoad]);

  //   <Link
  //   className="animated"
  //   to={process.env.PUBLIC_URL + "/shop-grid-standard"}
  // >
  //   {i18n.resolvedLanguage === "en"
  //     ? data.buttonNameEng
  //     : data.buttonNameMn}
  // </Link>

  return (
    <div className="slider-area position-relative">
      {mainContext.christmasDataLoad ? (
        <div className="flone-preloader-wrapper">
          <div className="flone-preloader">
            <span></span>
            <span></span>
          </div>
        </div>
      ) : null}

      <span
        className="body-effect effect-snow"
        style={{
          backgroundImage: `url(${
            process.env.PUBLIC_URL + "/assets/img/icon-img/snow1.png"
          })`,
        }}
      />
      <div
        className="single-slider slider-height-14 bg-img"
        style={{
          backgroundImage: `url(${data.homeBgImgFull})`,
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-xl-6 col-lg-6 col-md-6 col-12 col-sm-6 align-self-center">
              <div className="slider-content-14">
                <h3>{data.subTitle}</h3>
                <h1 dangerouslySetInnerHTML={{__html: data.title}} />
                <div className="slider-btn btn-hover">
                  <Link to={process.env.PUBLIC_URL + sliderData.url}>
                    {data.buttonName}
                    {/* {mainContext.christmasData
                      ? mainContext.christmasData.buttonNameEng
                        ? i18n.resolvedLanguage === "en"
                          ? mainContext.christmasData.buttonNameEng
                          : mainContext.christmasData.buttonNameMn
                        : "SHOP NOW"
                      : "SHOP NOW"} */}
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-12 col-sm-6">
              <div className="slider-single-img-14">
                <img src={data.homeBgImgSmall} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSliderThirtyThree;
