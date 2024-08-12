import React, { Fragment, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import axios from "axios";
import { notification } from "antd";

const LoginRegister = () => {
  let { pathname } = useLocation();

  const [getForm, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();
  useEffect(() => {
    checkUser();
  });
  const checkUser = () => {
    if (localStorage.getItem("localId")) {
      navigate("/");
      return;
    }
  };

  const login = () => {
    setLoading(true);
    if (getForm.email === "" || getForm.password === "") {
      api["error"]({
        message: "Алдаа гарлаа.",
        description: (
          <div style={{ textTransform: "uppercase", fontWeight: "500" }}>
            {getForm.email === ""
              ? "И-майл ээ оруулна уу!"
              : "Нууг үгээ оруулна уу!"}
          </div>
        ),
      });
      setLoading(false);
      return;
    }
    const body = {
      email: getForm.email,
      password: parseInt(getForm.password),
      returnSecureToken: true,
    };
    axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBsrI73EfDDcWvLeaQ1jVYkM7NCLzqN97Y",
        body
      )
      .then((res) => {
        if (res.data.registered === true) {
          const expIn = res.data.expiresIn;
          const expireDate = new Date(
            new Date().getTime() + parseInt(expIn) * 1000
          );
          localStorage.setItem("idToken", res.data.idToken);
          localStorage.setItem("localId", res.data.localId);
          localStorage.setItem("expireDate", expireDate);
          localStorage.setItem("refreshToken", res.data.refreshToken);
          refreshToken(expIn * 1000);
          document.location.replace("/");
        } else {
          // message.error(res.data.errors[0].message)
        }
      })
      .catch((err) => {
        if (err.response.data.error.message === "INVALID_EMAIL") {
          api["error"]({
            message: "АЛДАА ГАРЛАА.",
            description: "БҮРТГЭЛГҮЙ И-МЭЙЛ ХАЯГ БАЙНА!!",
          });
        } else if (err.response.data.error.message === "MISSING_PASSWORD") {
          api["error"]({
            message: "АЛДАА ГАРЛАА.",
            description: (
              <div style={{ textTransform: "uppercase", fontWeight: "500" }}>
                Нүүц үг буруу байна!
              </div>
            ),
          });
        } else if (
          err.response.data.error.message === "INVALID_LOGIN_CREDENTIALS"
        ) {
          api["error"]({
            message: "АЛДАА ГАРЛАА.",
            description: (
              <div style={{ textTransform: "uppercase", fontWeight: "500" }}>
                Нэтрэх нэр болон нууц үг буруу байна!
              </div>
            ),
          });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const refreshToken = async (expIn) => {
    await setTimeout(() => {
      localStorage.removeItem("localId");
      localStorage.removeItem("idToken");
      localStorage.removeItem("expiresIn");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("expireDate");
      document.location.replace("/");
      // history.push("/");
    }, expIn);
  };
  const register = () => {};
  return (
    <Fragment>
      <SEO
        titleTemplate="Login"
        description="Login page of flone react minimalist eCommerce template."
      />
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb
          pages={[
            { label: "Home", path: process.env.PUBLIC_URL + "/" },
            {
              label: "Login Register",
              path: process.env.PUBLIC_URL + pathname,
            },
          ]}
        />
        {contextHolder}
        <div className="login-register-area pt-100 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-7 col-md-12 ms-auto me-auto">
                <div className="login-register-wrapper">
                  <Tab.Container defaultActiveKey="login">
                    <Nav variant="pills" className="login-register-tab-list">
                      <Nav.Item>
                        <Nav.Link eventKey="login">
                          <h4>Нэвтрэх</h4>
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="register">
                          <h4>Бүртгүүлэх</h4>
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content>
                      <Tab.Pane eventKey="login">
                        <div className="login-form-container">
                          <div className="login-register-form">
                            <div className="form">
                              <input
                                disabled={loading}
                                type="text"
                                name="user-name"
                                placeholder="Имэйл"
                                onChange={(e) =>
                                  setForm({ ...getForm, email: e.target.value })
                                }
                              />
                              <input
                                disabled={loading}
                                type="password"
                                name="user-password"
                                placeholder="Нууц үг"
                                onChange={(e) =>
                                  setForm({
                                    ...getForm,
                                    password: e.target.value,
                                  })
                                }
                              />
                              <div className="button-box">
                                <div className="login-toggle-btn">
                                  <input disabled={loading} type="checkbox" />
                                  <label className="ml-10">Намайг санах</label>
                                  <Link to={process.env.PUBLIC_URL + "/"}>
                                    Нууц үг мартсан уу?
                                  </Link>
                                </div>
                                <button disabled={loading} onClick={login}>
                                  <span>Нэвтрэх</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="register">
                        <div className="login-form-container">
                          <div className="login-register-form">
                            <div className="form">
                              <input
                                type="text"
                                name="user-name"
                                placeholder="Username"
                                onChange={(e) =>
                                  setForm({ ...getForm, email: e.target.value })
                                }
                              />
                              <input
                                type="password"
                                name="user-password"
                                placeholder="Password"
                                onChange={(e) =>
                                  setForm({
                                    ...getForm,
                                    password: e.target.value,
                                  })
                                }
                              />
                              <input
                                name="user-email"
                                placeholder="Email"
                                type="email"
                              />
                              <div className="button-box">
                                <button onClick={register}>
                                  <span>Бүртгүүлэх</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default LoginRegister;
