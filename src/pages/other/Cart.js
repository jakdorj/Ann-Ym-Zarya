import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import SEO from "../../components/seo";
import { getDiscountPrice } from "../../helpers/product";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import {
  addToCart,
  decreaseQuantity,
  deleteFromCart,
  deleteAllFromCart,
} from "../../store/slices/cart-slice";
import { cartItemStock } from "../../helpers/product";

const Cart = () => {
  let cartTotalPrice = 0;

  const [quantityCount] = useState(1);
  const dispatch = useDispatch();
  let { pathname } = useLocation();

  const currency = useSelector((state) => state.currency);
  const { cartItems } = useSelector((state) => state.cart);

  return (
    <Fragment>
      <SEO
        titleTemplate="Cart"
        description="Cart page of flone react minimalist eCommerce template."
      />

      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb
          pages={[
            { label: "Үндсэн хуудас", path: process.env.PUBLIC_URL + "/" },
            { label: "Сагс", path: process.env.PUBLIC_URL + pathname },
          ]}
        />
        <div className="cart-main-area pt-90 pb-100">
          <div className="container">
            {cartItems && cartItems.length >= 1 ? (
              <Fragment>
                <h3 className="cart-page-title">Таны сагсанд байгаа зүйлс</h3>
                <div className="row">
                  <div className="col-12">
                    <div className="table-content table-responsive cart-table-content">
                      <table>
                        <thead>
                          <tr>
                            <th>Зураг</th>
                            <th>Барааны нэр</th>
                            <th>Нэгжийн үнэ</th>
                            <th>Тоо ширхэг</th>
                            <th>Нийт дүн</th>
                            <th>Үйлдэл</th>
                          </tr>
                        </thead>
                        <tbody>
                          {cartItems.map((cartItem, key) => {
                            const discountedPrice = getDiscountPrice(
                              cartItem.price,
                              cartItem.discount
                            );
                            const finalProductPrice =
                              cartItem.price * currency.currencyRate;
                            const finalDiscountedPrice =
                              discountedPrice * currency.currencyRate;

                            discountedPrice != null
                              ? (cartTotalPrice +=
                                  finalDiscountedPrice * cartItem.quantity)
                              : (cartTotalPrice +=
                                  finalProductPrice * cartItem.quantity);
                            return (
                              <tr key={key}>
                                <td className="product-thumbnail">
                                  <Link
                                    to={
                                      process.env.PUBLIC_URL +
                                      "/product/" +
                                      cartItem.id
                                    }
                                  >
                                    <img
                                      className="img-fluid"
                                      src={
                                        process.env.PUBLIC_URL +
                                        cartItem.image[0]
                                      }
                                      alt=""
                                    />
                                  </Link>
                                </td>

                                <td className="product-name">
                                  <Link
                                    to={
                                      process.env.PUBLIC_URL +
                                      "/product/" +
                                      cartItem.id
                                    }
                                  >
                                    {cartItem.name}
                                  </Link>
                                  {cartItem.selectedProductColor &&
                                  cartItem.selectedProductSize ? (
                                    <div className="cart-item-variation">
                                      <span>
                                        Өнгө: {cartItem.selectedProductColor}
                                      </span>
                                      <span>
                                        Хэмжээ: {cartItem.selectedProductSize}
                                      </span>
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                </td>

                                <td className="product-price-cart">
                                  {discountedPrice !== null ? (
                                    <Fragment>
                                      <span className="amount old">
                                        {finalProductPrice
                                          .toFixed(0)
                                          .replace(
                                            /\B(?=(\d{3})+(?!\d))/g,
                                            ","
                                          )}
                                        ₮
                                      </span>
                                      <span className="amount">
                                        {finalDiscountedPrice
                                          .toFixed(0)
                                          .replace(
                                            /\B(?=(\d{3})+(?!\d))/g,
                                            ","
                                          )}
                                        ₮
                                      </span>
                                    </Fragment>
                                  ) : (
                                    <span className="amount">
                                      {finalProductPrice
                                        .toFixed(0)
                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                      ₮
                                    </span>
                                  )}
                                </td>

                                <td className="product-quantity">
                                  <div className="cart-plus-minus">
                                    <button
                                      className="dec qtybutton"
                                      onClick={() =>
                                        dispatch(decreaseQuantity(cartItem))
                                      }
                                    >
                                      -
                                    </button>
                                    <input
                                      className="cart-plus-minus-box"
                                      type="text"
                                      value={cartItem.quantity}
                                      readOnly
                                    />
                                    <button
                                      className="inc qtybutton"
                                      onClick={() =>
                                        dispatch(
                                          addToCart({
                                            ...cartItem,
                                            quantity: quantityCount,
                                          })
                                        )
                                      }
                                      disabled={
                                        cartItem !== undefined &&
                                        cartItem.quantity &&
                                        cartItem.quantity >=
                                          cartItemStock(
                                            cartItem,
                                            cartItem.selectedProductColor,
                                            cartItem.selectedProductSize
                                          )
                                      }
                                    >
                                      +
                                    </button>
                                  </div>
                                </td>
                                <td className="product-subtotal">
                                  {discountedPrice !== null
                                    ? (finalDiscountedPrice * cartItem.quantity)
                                        .toFixed(0)
                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                    : (finalProductPrice * cartItem.quantity)
                                        .toFixed(0)
                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                  ₮
                                </td>

                                <td className="product-remove">
                                  <button
                                    onClick={() =>
                                      dispatch(
                                        deleteFromCart(cartItem.cartItemId)
                                      )
                                    }
                                  >
                                    <i className="fa fa-times"></i>
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="cart-shiping-update-wrapper">
                      <div className="cart-shiping-update">
                        <Link
                          to={process.env.PUBLIC_URL + "/shop-grid-standard"}
                        >
                          Дэлгүүр
                        </Link>
                      </div>
                      <div className="cart-clear">
                        <button onClick={() => dispatch(deleteAllFromCart())}>
                          Сагсыг бүгдийн цэвэрлэх
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-4 col-md-6">
                    {/* <div className="cart-tax">
                      <div className="title-wrap">
                        <h4 className="cart-bottom-title section-bg-gray">
                          Estimate Shipping And Tax
                        </h4>
                      </div>
                      <div className="tax-wrapper">
                        <p>
                          Enter your destination to get a shipping estimate.
                        </p>
                        <div className="tax-select-wrapper">
                          <div className="tax-select">
                            <label>* Country</label>
                            <select className="email s-email s-wid">
                              <option>Bangladesh</option>
                              <option>Albania</option>
                              <option>Åland Islands</option>
                              <option>Afghanistan</option>
                              <option>Belgium</option>
                            </select>
                          </div>
                          <div className="tax-select">
                            <label>* Region / State</label>
                            <select className="email s-email s-wid">
                              <option>Bangladesh</option>
                              <option>Albania</option>
                              <option>Åland Islands</option>
                              <option>Afghanistan</option>
                              <option>Belgium</option>
                            </select>
                          </div>
                          <div className="tax-select">
                            <label>* Zip/Postal Code</label>
                            <input type="text" />
                          </div>
                          <button className="cart-btn-2" type="submit">
                            Get A Quote
                          </button>
                        </div>
                      </div>
                    </div> */}
                  </div>

                  <div className="col-lg-4 col-md-6">
                    <div className="discount-code-wrapper">
                      <div className="title-wrap">
                        <h4 className="cart-bottom-title section-bg-gray">
                          Купон кодыг ашиглах
                        </h4>
                      </div>
                      <div className="discount-code">
                        <p>Хэрэв танд купоны код байгаа бол оруулна уу.</p>
                        <form>
                          <input type="text" required name="name" />
                          <button className="cart-btn-2" type="submit">
                            Купон шалгах
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-4 col-md-12">
                    <div className="grand-totall">
                      <div className="title-wrap">
                        <h4 className="cart-bottom-title section-bg-gary-cart">
                          Нийт дүн
                        </h4>
                      </div>
                      <h5>
                        Нийт бүтээгдэхүүн
                        <span>
                          {cartTotalPrice
                            .toFixed(0)
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                          ₮
                        </span>
                      </h5>

                      <h4 className="grand-totall-title">
                        Нийт дүн
                        <span>
                          {cartTotalPrice
                            .toFixed(0)
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                          ₮
                        </span>
                      </h4>
                      <Link to={process.env.PUBLIC_URL + "/checkout"}>
                        Төлбөр тооцоог үргэлжлүүлэх
                      </Link>
                    </div>
                  </div>
                </div>
              </Fragment>
            ) : (
              <div className="row">
                <div className="col-lg-12">
                  <div className="item-empty-area text-center">
                    <div className="item-empty-area__icon mb-30">
                      <i className="pe-7s-cart"></i>
                    </div>
                    <div className="item-empty-area__text">
                      Сагсанд ямар ч бараа олдсонгүй <br />{" "}
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

export default Cart;
