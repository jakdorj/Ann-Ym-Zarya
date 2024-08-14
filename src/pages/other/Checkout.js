import { Fragment, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getDiscountPrice } from "../../helpers/product";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import emailjs from "emailjs-com";
import {
  Alert,
  Avatar,
  message,
  notification,
  Segmented,
  Spin,
  Typography,
} from "antd";
import axios from "../../axios-orders";
import moment from "moment";
const { Paragraph } = Typography;
const Checkout = () => {
  let cartTotalPrice = 0;

  let { pathname } = useLocation();
  const currency = useSelector((state) => state.currency);
  const { cartItems } = useSelector((state) => state.cart);
  const [orderNumber, setOrderNumber] = useState("MH12345");
  const [segmentValue, setSegment] = useState(0);
  const [pay, setPay] = useState(false);
  const [load, setLoad] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    username: "",
    phone: "",
    email: "",
    address: "",
  });
  const [isWideScreen, setIsWideScreen] = useState(
    window.matchMedia("(min-width: 768px)").matches
  );
  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");

    const handleChange = (e) => {
      setIsWideScreen(e.matches);
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

  const payCheck = async () => {
    setLoad(true);
    const cartIds = cartItems.map((item) => item.id);
    let error = false;
    let success = false;
    try {
      // Fetch items data
      const res = await axios.get("items.json");
      if (res.data) {
        const data = Object.entries(res.data).reverse();
        const result = data.map(([id, itemData]) => ({
          id,
          ...itemData.data,
        }));

        // Process items and prepare update data
        const updatedResult = result.map((item) => {
          const cartItem = cartItems.find((cart) => cart.id === item.id);
          if (cartItem) {
            const stockDifference = item.stock - cartItem.quantity;
            console.log("cartItem.quantity: ", cartItem.quantity);
            if (stockDifference < 0) {
              error = true;
              return api["error"]({
                message: "Бараа дууссан байна!",
                description: (
                  <div>
                    <span style={{ color: "red" }}> {item.name}</span> - Энэ
                    барааны дууссан байна. Та тоогоо багасгаж оруулна!
                  </div>
                ),
                showProgress: true,
                pauseOnHover: true,
              });
            }

            const updatedVariation = item?.variation?.map((variation) => {
              if (cartItem.selectedProductColor === variation.color) {
                const updatedSizes = variation?.size?.map((size) => {
                  if (size.name === cartItem.selectedProductSize) {
                    const stockTotal = size.stock - cartItem.quantity;
                    if (stockTotal < 0) {
                      error = true;
                      return api["error"]({
                        message: `Барааны ${size.name} хэмжээ дууссан байна!`,
                        description: (
                          <div>
                            <span style={{ color: "red" }}> {item.name}</span> -
                            Энэ барааны {size.name}: хэмжээ дууссан байна. Та
                            тоогоо багасгаж оруулна!
                          </div>
                        ),
                        showProgress: true,
                        pauseOnHover: true,
                      });
                    }
                    return {
                      ...size,
                      stock: stockTotal,
                    };
                  }
                  return size;
                });

                return {
                  ...variation,
                  size: updatedSizes,
                };
              }
              return variation;
            });

            return {
              ...item,
              stock: stockDifference,
              variation: updatedVariation,
              quantity: cartItem.quantity,
              selectedProductColor: cartItem.selectedProductColor,
              selectedProductSize: cartItem.selectedProductSize,
            };
          }
          return item;
        });

        if (error) {
          api["error"]({
            message: "Үйлдэл амжилтгүй боллоо!",
            description: (
              <div>Танд асуудал үүссэн байна. Дахин оролдоно уу.</div>
            ),
            showProgress: true,
            pauseOnHover: true,
          });
          return;
        }

        const updateData = updatedResult.filter((e) => cartIds.includes(e.id));

        if (error) {
          return;
        }

        const patchRequests = updateData.map((element) => {
          const body = { stock: element.stock, variation: element.variation };
          if (element.variation === undefined || element.variation === "null") {
            delete body.variation;
          }
          return axios
            .patch(`items/${element.id}/data.json`, body)
            .then(() => {})
            .catch((err) => {
              console.error("Error updating data:", err);
              throw err; // Propagate the error to be handled by Promise.all
            });
        });

        await Promise.all(patchRequests);

        if (!error) {
          const body = {
            date: moment().format("YYYY-MM-DD, HH:mm:ss"),
            ...userInfo,
            price: totalPrice,
            orderNumber: orderNumber,
            orders: { updateData },
          };

          await axios
            .post(`orderHistory.json`, body)
            .then((res) => {
              email(body);
              setTimeout(() => {
                setLoad(false);
                localStorage.setItem("orderNumber", orderNumber);
                navigate("/payment");
              }, 5000);
            })
            .catch((err) => {
              console.log("err: ", err);
            });
        }
        // All updates succeeded, proceed with navigation
      }
    } catch (err) {
      console.error("Error processing checkout:", err);
      api["error"]({
        message: "Үйлдэл амжилтгүй боллоо!",
        description: <div>Танд асуудал үүссэн байна. Дахин оролдоно уу.</div>,
        showProgress: true,
        pauseOnHover: true,
      });
    } finally {
    }
  };

  const checkInfo = () => {
    if (!userInfo) {
      api["error"]({
        message: "Мэдээлэл дутуу байна!",
        description: <div>Мэдээлэл ээ бүгдийн бөглөнө үү!</div>,
        showProgress: true,
        pauseOnHover: true,
      });
      return;
    }

    const hasEmptyFields = Object.values(userInfo).some(
      (value) => value.trim() === ""
    );

    if (hasEmptyFields) {
      api["error"]({
        message: "Мэдээлэл дутуу байна!",
        description: <div>Мэдээлэл ээ бүгдийн бөглөнө үү!</div>,
        showProgress: true,
        pauseOnHover: true,
      });
      return;
    } else {
      setPay(true);
      const orderNumber = "AY" + Math.floor(Math.random() * 1000000);
      setOrderNumber(orderNumber);
    }
  };

  const email = async (data) => {
    const mailData = {
      client_name: "jakdorj0@gmail.com",
      email: data.email,
      name: data.username,
      orderNumber: data.orderNumber,
      price: data.price.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      message: "Таны захиалга амжилттай төлөгдлөө",
    };
    emailjs
      .send(
        "service_m68200h", // service id service_rq0sez5
        "template_1fopgy9", // template id
        mailData,
        "tfQLBSkpvKb1FGeAI" // public api uZb0rDKmRujoy7mfg
      )
      .then(
        (res) => {},
        (err) => {
          message.error("Амжилтгүй хүсэлт");
        }
      );

    await setTimeout(() => {
      const mailDataAdmin = {
        client_name: data.email,
        email: "jakdorj0@gmail.com",
        name: data.username,
        orderNumber: data.orderNumber,
        price: data.price.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        message: "Таны захиалга амжилттай төлөгдлөө",
      };
      emailjs
        .send(
          "service_m68200h", // service id service_rq0sez5
          "template_1fopgy9", // template id
          mailDataAdmin,
          "tfQLBSkpvKb1FGeAI" // public api uZb0rDKmRujoy7mfg
        )
        .then(
          (res) => {
            console.log("res ===> ", res);
          },
          (err) => {
            message.error("Амжилтгүй хүсэлт");
          }
        );
    }, 2500);
  };
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
              label: pay ? "Төлбөр шалгах" : "Тооцоо хийх",
              path: process.env.PUBLIC_URL + pathname,
            },
          ]}
        />
        <div className="checkout-area pt-95 pb-100">
          {contextHolder}
          {!pay ? (
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
                            <input
                              type="text"
                              onChange={(e) =>
                                setUserInfo({
                                  ...userInfo,
                                  username: e.target.value,
                                })
                              }
                            />
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
                            <input
                              type="text"
                              onChange={(e) =>
                                setUserInfo({
                                  ...userInfo,
                                  phone: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="billing-info mb-20">
                            <label>Е-майл хаяг</label>
                            <input
                              type="text"
                              onChange={(e) =>
                                setUserInfo({
                                  ...userInfo,
                                  email: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>
                      </div>

                      <div className="additional-info-wrap">
                        <h4>Хаяг байршил</h4>
                        <div className="additional-info">
                          <label>
                            Хүргэлтийн хаяг байршил дэлгэрэнгуй бичих
                          </label>
                          <textarea
                            onChange={(e) =>
                              setUserInfo({
                                ...userInfo,
                                address: e.target.value,
                              })
                            }
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
                                            .replace(
                                              /\B(?=(\d{3})+(?!\d))/g,
                                              ","
                                            )
                                        : (
                                            finalProductPrice *
                                            cartItem.quantity
                                          )
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
                        <button
                          className="btn-hover"
                          onClick={() => (
                            setTotalPrice(cartTotalPrice), checkInfo()
                          )}
                        >
                          Захиалга өгөх
                        </button>
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
                        <Link
                          to={process.env.PUBLIC_URL + "/shop-grid-standard"}
                        >
                          Дэлгүүр буцах
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="container">
              <div
                style={{
                  color: "#1b231f",
                  paddingLeft: "20px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: isWideScreen ? "" : "column",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      width: "100%",
                      marginTop: isWideScreen ? "0px" : "20px",
                    }}
                  >
                    <div
                      style={{
                        fontWeight: "bold",
                        color: "#1b231f",
                        lineHeight: "22px",
                        fontSize: "18px",
                        textTransform: "capitalize",
                        marginBottom: "15px",
                      }}
                    >
                      Дансаар шилжүүлэх
                    </div>
                    <div style={{ width: "100%", padding: "5px 10px" }}>
                      <Segmented
                        onChange={(e) => setSegment(e)}
                        block
                        style={{ background: "#e5e5e5" }}
                        options={[
                          {
                            label: (
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "5px",
                                  padding: "2px 0px",
                                }}
                              >
                                <Avatar
                                  src="https://shoppy.mn/6c9e352b03a264120e020b343ccfa2ee.svg"
                                  size={"small"}
                                ></Avatar>
                                <div style={{ fontWeight: "500" }}>
                                  Хаан банк
                                </div>
                              </div>
                            ),
                            value: 0,
                          },
                          {
                            label: (
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "5px",
                                  padding: "2px 0px",
                                }}
                              >
                                <Avatar
                                  size={"small"}
                                  src="https://shoppy.mn/6694474afda69dbb6b09a10c63bd5f9f.svg"
                                />
                                <div style={{ fontWeight: "500" }}>
                                  TDB банк
                                </div>
                              </div>
                            ),
                            value: 1,
                          },
                        ]}
                      />
                      <div
                        style={{
                          background: "#fff",
                          padding: "10px 15px",
                          marginTop: "10px",
                          lineHeight: "15px",
                          borderRadius: "10px",
                          border: "1px solid #dfdfdf",
                        }}
                      >
                        <div
                          style={{
                            color: "#9ca3af",
                            fontSize: "12px",
                            fontWeight: "500",
                          }}
                        >
                          Хүлээн авах данс
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <div style={{ fontWeight: "bold" }}>
                            {segmentValue === 0
                              ? "530 101 9298"
                              : "456 108 617"}
                          </div>
                          <Paragraph
                            style={{ marginBottom: "0px" }}
                            copyable={{
                              text: "5301019298",
                            }}
                          />
                        </div>
                      </div>
                      <div
                        style={{
                          background: "#fff",
                          padding: "10px 15px",
                          marginTop: "10px",
                          lineHeight: "15px",
                          borderRadius: "10px",
                          border: "1px solid #dfdfdf",
                        }}
                      >
                        <div
                          style={{
                            color: "#9ca3af",
                            fontSize: "12px",
                            fontWeight: "500",
                          }}
                        >
                          Хүлээн авагч
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <div style={{ fontWeight: "bold" }}>Амарбаяр</div>
                          <Paragraph
                            style={{ marginBottom: "0px" }}
                            copyable={{
                              text: "Амарбаяр",
                            }}
                          />
                        </div>
                      </div>
                      <div
                        style={{
                          background: "#fff",
                          padding: "10px 15px",
                          marginTop: "10px",
                          lineHeight: "15px",
                          borderRadius: "10px",
                          border: "1px solid #dfdfdf",
                        }}
                      >
                        <div
                          style={{
                            color: "#9ca3af",
                            fontSize: "12px",
                            fontWeight: "500",
                          }}
                        >
                          Захиалгын дүн
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <div style={{ fontWeight: "bold" }}>
                            {totalPrice
                              .toFixed(0)
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            ₮
                          </div>
                          <Paragraph
                            style={{ marginBottom: "0px" }}
                            copyable={{
                              text: totalPrice,
                            }}
                          />
                        </div>
                      </div>
                      <div
                        style={{
                          background: "#fff",
                          padding: "10px 15px",
                          marginTop: "10px",
                          lineHeight: "15px",
                          borderRadius: "10px",
                          border: "1px solid #dfdfdf",
                        }}
                      >
                        <div
                          style={{
                            color: "#9ca3af",
                            fontSize: "12px",
                            fontWeight: "500",
                          }}
                        >
                          Гүйлгээний утга
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <div style={{ fontWeight: "bold" }}>
                            {orderNumber}
                          </div>
                          <Paragraph
                            style={{ marginBottom: "0px" }}
                            copyable={{
                              text: orderNumber,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <Alert
                  message={
                    <span>
                      Төлбөр төлөгдсөний дараа таны захиалга идэвхэждэг болохыг
                      анхаараарай! Төлбөрийг дээрх дансанд шилжүүлэх ба
                      захиалгын <strong>{orderNumber}</strong> дугаарыг
                      гүйлгээний утга дээр бичнэ үү. Мөн та өөрийн банкны
                      аппликейшныг ашиглан QR кодыг уншуулж төлбөр төлөх
                      боломжтой.
                    </span>
                  }
                  type="warning"
                  style={{
                    marginTop: "5px",
                    marginBottom: "10px",
                    fontSize: "12px",
                    lineHeight: "16px",
                    fontWeight: "400",
                    textAlign: "justify",
                    padding: "15px 30px",
                  }}
                />
                <div style={{ width: "50%" }}>
                  <div className="your-order-area">
                    <div className="place-order mt-25">
                      <button
                        className="btn-hover"
                        onClick={payCheck}
                        disabled={load}
                      >
                        {load ? (
                          <>
                            <Spin /> Уншиж байна..
                          </>
                        ) : (
                          " Төлбөр шалгах"
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default Checkout;
