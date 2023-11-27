import React, { Fragment } from "react";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import BannerOne from "../../wrappers/banner/BannerOne";
import BlogFeatured from "../../wrappers/blog-featured/BlogFeatured";
import HeroSliderNine from "../../wrappers/hero-slider/HeroSliderNine";
import TabProductFive from "../../wrappers/product/TabProductFive";
import axios from "../../axios-orders";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const HomeFashionTwo = () => {
  const [loading, setLoading] = useState(true);
  const router = useNavigate();
  useEffect(() => {
    axios
      .get(`theme.json`)
      .then((res) => {
        if (res.data.data.routerName === "home-fashion-two") {
          router("/home-fashion-two");
        } else if (res.data.data.routerName === "home-fashion-three") {
          router("/home-fashion-three");
        } else if (res.data.data.routerName === "home-fashion-four") {
          router("/home-fashion-four");
        } else if (res.data.data.routerName === "home-auto-parts") {
          router("/home-auto-parts");
        } else if (res.data.data.routerName === "home-grid-banner") {
          router("/home-grid-banner");
        } else if (res.data.data.routerName === "home-onepage-scroll") {
          router("/home-onepage-scroll");
        } else if (res.data.data.routerName === "home-christmas") {
          router("/home-christmas");
        } else if (res.data.data.routerName === "home-black-friday") {
          router("/home-black-friday");
        } else if (res.data.data.routerName === "home-black-friday-two") {
          router("/home-black-friday-two");
        } else if (res.data.data.routerName === "home-valentines-day") {
          router("/home-valentines-day");
        } else {
          router("/HomeFashionTwo");
        }
      })
      .catch((err) => {
        console.log("err: ", err);
        router("/home-fashion-two");
      })
      .finally(() => {});

    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);
  return (
    <Fragment>
      {loading ? (
        <div style={{ position: "absolute", width: "100%" }}>
          <div className="flone-preloader-wrapper">
            <div className="flone-preloader">
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      ) : null}
      <SEO
        titleTemplate="Fashion Home"
        description="Fashion home of flone react minimalist eCommerce template."
      />
      <LayoutOne
        headerContainerClass="container-fluid"
        headerPaddingClass="header-padding-2"
      >
        {/* hero slider */}
        <HeroSliderNine spaceLeftClass="ml-70" spaceRightClass="mr-70" />
        {/* banner */}
        <BannerOne spaceTopClass="pt-60" spaceBottomClass="pb-65" />
        {/* tab product */}
        <TabProductFive spaceBottomClass="pb-60" category="accessories" />
        {/* blog featured */}
        <BlogFeatured spaceBottomClass="pb-55" />
      </LayoutOne>
    </Fragment>
  );
};

export default HomeFashionTwo;
