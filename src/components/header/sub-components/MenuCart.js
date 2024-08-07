import { Fragment } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getDiscountPrice } from "../../../helpers/product";
import { deleteFromCart } from "../../../store/slices/cart-slice";

const MenuCart = () => {
  const dispatch = useDispatch();
  const currency = useSelector((state) => state.currency);
  const { cartItems } = useSelector((state) => state.cart);
  let cartTotalPrice = 0;

  return (
    <div className="shopping-cart-content">
      {cartItems && cartItems.length > 0 ? (
        <Fragment>
          <ul>
            {cartItems.map((item) => {
              const discountedPrice = getDiscountPrice(
                item.price,
                item.discount
              );
              const finalProductPrice = item.price * currency.currencyRate;
              const finalDiscountedPrice =
                discountedPrice * currency.currencyRate;
              discountedPrice != null
                ? (cartTotalPrice += finalDiscountedPrice * item.quantity)
                : (cartTotalPrice += finalProductPrice * item.quantity);

              return (
                <li className="single-shopping-cart" key={item.cartItemId}>
                  <div className="shopping-cart-img">
                    <Link to={process.env.PUBLIC_URL + "/product/" + item.id}>
                      <img
                        alt=""
                        src={process.env.PUBLIC_URL + item.image[0]}
                        className="img-fluid"
                      />
                    </Link>
                  </div>
                  <div className="shopping-cart-title">
                    <h4>
                      <Link to={process.env.PUBLIC_URL + "/product/" + item.id}>
                        {" "}
                        {item.name}{" "}
                      </Link>
                    </h4>
                    <h6>Тоо ширхэг: {item.quantity}</h6>
                    <span>
                      {discountedPrice !== null
                        ? finalDiscountedPrice
                            .toFixed(0)
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "₮"
                        : finalProductPrice
                            .toFixed(0)
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "₮"}
                    </span>
                    {item.selectedProductColor && item.selectedProductSize ? (
                      <div className="cart-item-variation">
                        <span>Color: {item.selectedProductColor}</span>
                        <span>Size: {item.selectedProductSize}</span>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="shopping-cart-delete">
                    <button
                      onClick={() => dispatch(deleteFromCart(item.cartItemId))}
                    >
                      <i className="fa fa-times-circle" />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="shopping-cart-total">
            <h4>
              Нийт дүн :{" "}
              <span className="shop-total">
                {cartTotalPrice
                  .toFixed(0)
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                ₮
              </span>
            </h4>
          </div>
          <div className="shopping-cart-btn btn-hover text-center">
            <Link className="default-btn" to={process.env.PUBLIC_URL + "/cart"}>
              Сагс харах
            </Link>
            <Link
              className="default-btn"
              to={process.env.PUBLIC_URL + "/checkout"}
            >
              Тооцоо хийх
            </Link>
          </div>
        </Fragment>
      ) : (
        <p className="text-center">Сагсанд ямар ч бараа алга</p>
      )}
    </div>
  );
};

export default MenuCart;
