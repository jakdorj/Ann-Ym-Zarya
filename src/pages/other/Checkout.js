import { Fragment } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { getDiscountPrice } from "../../helpers/product";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";

const Checkout = () => {
  let cartTotalPrice = 0;

  let { pathname } = useLocation();
  const currency = useSelector((state) => state.currency);
  const { cartItems } = useSelector((state) => state.cart);

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
            { label: "Тооцоо хийх", path: process.env.PUBLIC_URL + pathname },
          ]}
        />
        <div className="checkout-area pt-95 pb-100">
          <div className="container">
            {cartItems && cartItems.length >= 1 ? (
              <div className="row">
                <div className="col-lg-7">
                  <div className="billing-info-wrap">
                    <h3>Тооцооны дэлгэрэнгүй мэдээлэл</h3>
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="billing-info mb-20">
                          <label>Захиалагчийн нэр</label>
                          <input type="text" />
                        </div>
                      </div>
                      {/* <div className="col-lg-12">
                        <div className="billing-select mb-20">
                          <label>Country</label>
                          <select>
                            <option>Select a country</option>
                            <option>Azerbaijan</option>
                            <option>Bahamas</option>
                            <option>Bahrain</option>
                            <option>Bangladesh</option>
                            <option>Barbados</option>
                          </select>
                        </div>
                      </div> */}
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>Холбоо барих утасны дугаар</label>
                          <input type="text" />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>Е-майл хаяг</label>
                          <input type="text" />
                        </div>
                      </div>
                    </div>

                    <div className="additional-info-wrap">
                      <h4>Хаяг байршил</h4>
                      <div className="additional-info">
                        <label>Хүргэлтийн хаяг байршил дэлгэрэнгуй бичих</label>
                        <textarea
                          placeholder="Хүргэлтийн хаяг. "
                          name="message"
                          defaultValue={""}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-5">
                  <div className="your-order-area">
                    <h3>Таны захиалга</h3>
                    <div className="your-order-wrap gray-bg-4">
                      <div className="your-order-product-info">
                        <div className="your-order-top">
                          <ul>
                            <li>Бараа</li>
                            <li>Үнэ</li>
                          </ul>
                        </div>
                        <div className="your-order-middle">
                          <ul>
                            {cartItems.map((cartItem, key) => {
                              const discountedPrice = getDiscountPrice(
                                cartItem.price,
                                cartItem.discount
                              );
                              const finalProductPrice = (
                                cartItem.price * currency.currencyRate
                              ).toFixed(2);
                              const finalDiscountedPrice = (
                                discountedPrice * currency.currencyRate
                              ).toFixed(2);

                              discountedPrice != null
                                ? (cartTotalPrice +=
                                    finalDiscountedPrice * cartItem.quantity)
                                : (cartTotalPrice +=
                                    finalProductPrice * cartItem.quantity);
                              return (
                                <li key={key}>
                                  <span className="order-middle-left">
                                    {cartItem.name} X {cartItem.quantity}
                                  </span>{" "}
                                  <span className="order-price">
                                    {discountedPrice !== null
                                      ? (
                                          finalDiscountedPrice *
                                          cartItem.quantity
                                        )
                                          .toFixed(0)
                                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                      : (finalProductPrice * cartItem.quantity)
                                          .toFixed(0)
                                          .replace(
                                            /\B(?=(\d{3})+(?!\d))/g,
                                            ","
                                          )}
                                    ₮
                                  </span>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                        <div className="your-order-bottom">
                          <ul>
                            <li className="your-order-shipping">Хүргэлт</li>
                            <li>Үнэгүй</li>
                          </ul>
                        </div>
                        <div className="your-order-total">
                          <ul>
                            <li className="order-total">Нийт үнэ</li>
                            <li>
                              {cartTotalPrice
                                .toFixed(0)
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                              ₮
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="payment-method"></div>
                    </div>
                    <div className="place-order mt-25">
                      <button className="btn-hover">Захиалга өгөх</button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="row">
                <div className="col-lg-12">
                  <div className="item-empty-area text-center">
                    <div className="item-empty-area__icon mb-30">
                      <i className="pe-7s-cash"></i>
                    </div>
                    <div className="item-empty-area__text">
                      Бараа олдсонгүй <br />{" "}
                      <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
                        Дэлгүүр буцах
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default Checkout;
