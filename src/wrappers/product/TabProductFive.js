import PropTypes from "prop-types";
import clsx from "clsx";
import { Link } from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import ProductGridTwo from "./ProductGridTwo";

const TabProductFive = ({
  spaceTopClass,
  spaceBottomClass,
  category,
  productTabClass,
}) => {
  return (
    <div className={clsx("product-area", spaceTopClass, spaceBottomClass)}>
      <div className="container">
        <Tab.Container defaultActiveKey="newArrival">
          <Nav
            variant="pills"
            className={clsx("product-tab-list-2 mb-60", productTabClass)}
          >
            <Nav.Item>
              <Nav.Link eventKey="newArrival">
                <h4>Шинэ бараа</h4>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="order">
                <h4>Захиалах бараа</h4>
              </Nav.Link>
            </Nav.Item>
            {/* <Nav.Item>
              <Nav.Link eventKey="saleItems">
                <h4>Sale Items</h4>
              </Nav.Link>
            </Nav.Item> */}
          </Nav>
          <Tab.Content>
            <Tab.Pane eventKey="newArrival">
              <div className="row">
                <ProductGridTwo
                  category={"Шинэ"}
                  type="new"
                  limit={8}
                  spaceBottomClass="mb-25"
                />
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="order">
              <div className="row">
                <ProductGridTwo
                  category={category}
                  type="order"
                  limit={8}
                  spaceBottomClass="mb-25"
                />
              </div>
            </Tab.Pane>
            {/* <Tab.Pane eventKey="saleItems">
              <div className="row">
                <ProductGridTwo
                  category={category}
                  type="saleItems"
                  limit={8}
                  spaceBottomClass="mb-25"
                />
              </div>
            </Tab.Pane> */}
          </Tab.Content>
        </Tab.Container>
        <div className="view-more text-center mt-20 toggle-btn6 col-12">
          <Link
            className="loadMore6"
            to={process.env.PUBLIC_URL + "/shop-grid-standard"}
          >
            Дэлгэрэнгуй үзэх
          </Link>
        </div>
      </div>
    </div>
  );
};

TabProductFive.propTypes = {
  category: PropTypes.string,
  productTabClass: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string,
};

export default TabProductFive;
