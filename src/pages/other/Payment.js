import { Fragment, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { Button, Result } from "antd";
const Payment = () => {
  let { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <Fragment>
      <SEO
        titleTemplate="Checkout"
        description="Checkout page of flone react minimalist eCommerce template."
      />
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb
          pages={[
            { label: "Үндсэн хуудас", path: process.env.PUBLIC_URL + "/" },
            {
              label: "Төлбөр",
              path: process.env.PUBLIC_URL + pathname,
            },
          ]}
        />
        <div className="checkout-area  pb-100">
          <div className="container">
            <Result
              status="success"
              title="Таны захиалга амжилттай!"
              subTitle={`Order number: ${localStorage.getItem(
                "orderNumber"
              )} Cloud server configuration takes 1-5 minutes, please wait.`}
              extra={[
                <Button
                  type="primary"
                  key="console"
                  onClick={() => navigate("/")}
                >
                  Дэлгүүр
                </Button>,
              ]}
            />
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default Payment;
