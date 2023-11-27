import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useContext } from "react";
import MainContext from "../../mainContext/mainContext";

const MobileNavMenu = () => {
  const { t } = useTranslation();
  const mainContext = useContext(MainContext);

  return (
    <nav className="offcanvas-navigation" id="offcanvas-navigation">
      <ul>
        <li className="menu-item-has-children">
          <Link to={process.env.PUBLIC_URL + "/"}>{t("home")}</Link>
        </li>

        <li className="menu-item-has-children">
          <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
            {t("shop")}
          </Link>
        </li>
        <li className="menu-item-has-children">
          <Link to={process.env.PUBLIC_URL + "/"}>{t("pages")}</Link>
          <ul className="sub-menu">
            <li>
              <Link to={process.env.PUBLIC_URL + "/cart"}>{t("cart")}</Link>
            </li>
            {mainContext.user ? (
              <li>
                <Link to={process.env.PUBLIC_URL + "/dashboard"}>
                  {t("dashboard")}
                </Link>
              </li>
            ) : null}
            <li>
              <Link to={process.env.PUBLIC_URL + "/checkout"}>
                {t("checkout")}
              </Link>
            </li>
            <li>
              <Link to={process.env.PUBLIC_URL + "/wishlist"}>
                {t("wishlist")}
              </Link>
            </li>
            <li>
              <Link to={process.env.PUBLIC_URL + "/compare"}>
                {t("compare")}
              </Link>
            </li>
            <li>
              <Link to={process.env.PUBLIC_URL + "/my-account"}>
                {t("my_account")}
              </Link>
            </li>
            <li>
              <Link to={process.env.PUBLIC_URL + "/login-register"}>
                {t("login_register")}
              </Link>
            </li>
            <li>
              <Link to={process.env.PUBLIC_URL + "/about"}>
                {t("about_us")}
              </Link>
            </li>
            <li>
              <Link to={process.env.PUBLIC_URL + "/contact"}>
                {t("contact_us")}
              </Link>
            </li>
            <li>
              <Link to={process.env.PUBLIC_URL + "/not-found"}>
                {t("404_page")}
              </Link>
            </li>
          </ul>
        </li>
        {/* <li className="menu-item-has-children">
          <Link to={process.env.PUBLIC_URL + "/blog-standard"}>
            {t("blog")}
          </Link>
          <ul className="sub-menu">
            <li>
              <Link to={process.env.PUBLIC_URL + "/blog-standard"}>
                {t("blog_standard")}
              </Link>
            </li>
            <li>
              <Link to={process.env.PUBLIC_URL + "/blog-no-sidebar"}>
                {t("blog_no_sidebar")}
              </Link>
            </li>
            <li>
              <Link to={process.env.PUBLIC_URL + "/blog-right-sidebar"}>
                {t("blog_right_sidebar")}
              </Link>
            </li>
            <li>
              <Link to={process.env.PUBLIC_URL + "/blog-details-standard"}>
                {t("blog_details_standard")}
              </Link>
            </li>
          </ul>
        </li> */}
        <li>
          <Link to={process.env.PUBLIC_URL + "/contact"}>
            {t("contact_us")}
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default MobileNavMenu;
