import PropTypes from "prop-types";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { useContext } from "react";
import MainContext from "../mainContext/mainContext";

const FooterCopyright = ({ footerLogo, spaceBottomClass, colorClass }) => {
  const mainContext = useContext(MainContext);
  return (
    <div className={clsx("copyright", spaceBottomClass, colorClass)}>
      <div className="footer-logo">
        <Link to={process.env.PUBLIC_URL + "/"}>
          {/* <img alt="" src={process.env.PUBLIC_URL + footerLogo} /> */}
          <img alt="" src={mainContext.logo.logoBlack} />
        </Link>
      </div>
      <p>
        &copy; {new Date().getFullYear()}{" "}
        <a
          href="https://hasthemes.com"
          rel="noopener noreferrer"
          target="_blank"
        >
          Bondooloi kids
        </a>
        .<br /> All Rights Reserved
      </p>
    </div>
  );
};

FooterCopyright.propTypes = {
  footerLogo: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  colorClass: PropTypes.string,
};

export default FooterCopyright;
