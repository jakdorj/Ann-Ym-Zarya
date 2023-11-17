import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import RelatedProductSlider from "../../wrappers/product/RelatedProductSlider";
import ProductDescriptionTab from "../../wrappers/product/ProductDescriptionTab";
import ProductImageDescription from "../../wrappers/product/ProductImageDescription";
import LayoutEight from "../../layouts/LayoutEight";
import LayoutTen from "../../layouts/LayoutTen";
import LayoutFour from "../../layouts/LayoutFour";
import LayoutTwo from "../../layouts/LayoutTwo";
import LayoutThree from "../../layouts/LayoutThree";
import LayoutFive from "../../layouts/LayoutFive";
import LayoutSeven from "../../layouts/LayoutSeven";

const Dashboard = () => {
  let { pathname } = useLocation();
  let { id } = useParams();
  const { products } = useSelector((state) => state.product);
  const product = products.find((product) => product.id === id);

  return (
    <Fragment>
      <SEO
        titleTemplate="Product Page"
        description="Product Page of flone react minimalist eCommerce template."
      />

      <LayoutSeven headerTop="visible">
        {/* breadcrumb */}
        <div
          style={{ width: "100%", height: "100px ", background: "#000" }}
        ></div>
        <Breadcrumb
          pages={[
            { label: "Үндсэн хуудас", path: process.env.PUBLIC_URL + "/" },
            {
              label: "Хяналтын самбар",
              path: process.env.PUBLIC_URL + pathname,
            },
          ]}
        />
        asdasdasdasd
      </LayoutSeven>
    </Fragment>
  );
};

export default Dashboard;
