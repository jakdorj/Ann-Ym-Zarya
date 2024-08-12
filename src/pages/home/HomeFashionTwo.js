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
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import BrandLogoSliderOne from "../../wrappers/brand-logo/BrandLogoSliderOne";
const HomeFashionTwo = () => {
  const [loading, setLoading] = useState(true);
  const router = useNavigate();
  useEffect(() => {
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
        titleTemplate="Үндсэн хуудас"
        description="Fashion home of flone react minimalist eCommerce template."
      />
      <LayoutOne
        headerContainerClass="container-fluid"
        headerPaddingClass="header-padding-2"
      >
        {/* <Breadcrumb
          pages={[
            {
              label: "Ann Yum Zarya-SHD",
              path: process.env.PUBLIC_URL + "/",
            },
          ]}
        /> */}
        {/* hero slider */}
        <HeroSliderNine spaceLeftClass="ml-70" spaceRightClass="mr-70" />
        {/* banner */}
        {/* <BannerOne spaceTopClass="pt-60" spaceBottomClass="pb-65" /> */}
        {/* tab product */}
        <TabProductFive
          spaceBottomClass="pb-60"
          spaceTopClass="pt-60"
          category="Захиалга"
        />
        <BrandLogoSliderOne spaceBottomClass="pb-70" />
        {/* blog featured */}
        {/* <BlogFeatured spaceBottomClass="pb-55" /> */}
      </LayoutOne>
    </Fragment>
  );
};

export default HomeFashionTwo;
