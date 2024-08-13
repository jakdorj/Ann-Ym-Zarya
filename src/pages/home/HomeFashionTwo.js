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
import ShopProducts from "../../wrappers/product/ShopProducts";
import Paginator from "react-hooks-paginator";
import { useLocation } from "react-router-dom";
import { getSortedProducts } from "../../helpers/product";
import { useSelector } from "react-redux";
import ShopTopbar from "../../wrappers/product/ShopTopbar";
import ShopSidebar from "../../wrappers/product/ShopSidebar";
const HomeFashionTwo = () => {
  const [loading, setLoading] = useState(true);
  const [layout, setLayout] = useState("grid three-column");
  const [sortType, setSortType] = useState("");
  const [sortValue, setSortValue] = useState("");
  const [filterSortType, setFilterSortType] = useState("");
  const [filterSortValue, setFilterSortValue] = useState("");
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const { products } = useSelector((state) => state.product);
  const [isWideScreen, setIsWideScreen] = useState(
    window.matchMedia("(min-width: 768px)").matches
  );
  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");

    const handleChange = (e) => {
      setIsWideScreen(e.matches);
      if (e.matches) {
        setLayout("grid three-column");
      } else {
        setLayout("grid two-column");
      }
    };

    // Set initial state
    handleChange(mediaQuery);

    // Add event listener
    mediaQuery.addEventListener("change", handleChange);

    // Clean up listener on component unmount
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  const pageLimit = 15;
  let { pathname } = useLocation();

  const getLayout = (layout) => {
    console.log("layout: ", layout);
    setLayout(layout);
  };

  const getSortParams = (sortType, sortValue) => {
    setSortType(sortType);
    setSortValue(sortValue);
  };

  const getFilterSortParams = (sortType, sortValue) => {
    setFilterSortType(sortType);
    setFilterSortValue(sortValue);
  };

  useEffect(() => {
    let sortedProducts = getSortedProducts(products, sortType, sortValue);
    const filterSortedProducts = getSortedProducts(
      sortedProducts,
      filterSortType,
      filterSortValue
    );
    sortedProducts = filterSortedProducts;
    setSortedProducts(sortedProducts);
    setCurrentData(sortedProducts.slice(offset, offset + pageLimit));
  }, [offset, products, sortType, sortValue, filterSortType, filterSortValue]);

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
        description="Ann yum zarya цахим дэлгүүр."
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
        <div className="shop-area pt-95 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-3 order-2 order-lg-1">
                <ShopSidebar
                  products={products}
                  getSortParams={getSortParams}
                  sideSpaceClass="mr-30"
                />
              </div>
              <div className="col-lg-9 order-1 order-lg-2">
                {/* shop topbar default */}
                <ShopTopbar
                  getLayout={getLayout}
                  getFilterSortParams={getFilterSortParams}
                  productCount={products.length}
                  sortedProductCount={currentData.length}
                />

                {/* shop page content default */}
                <ShopProducts layout={layout} products={currentData} />

                {/* shop product pagination */}
                <div className="pro-pagination-style text-center mt-30">
                  <Paginator
                    totalRecords={sortedProducts.length}
                    pageLimit={pageLimit}
                    pageNeighbours={2}
                    setOffset={setOffset}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    pageContainerClass="mb-0 mt-0"
                    pagePrevText="«"
                    pageNextText="»"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <TabProductFive
          spaceBottomClass="pb-60"
          spaceTopClass="pt-60"
          category="Захиалга"
        /> */}
        {/* <BrandLogoSliderOne spaceBottomClass="pb-70" /> */}
        {/* blog featured */}
        {/* <BlogFeatured spaceBottomClass="pb-55" /> */}
      </LayoutOne>
    </Fragment>
  );
};

export default HomeFashionTwo;
