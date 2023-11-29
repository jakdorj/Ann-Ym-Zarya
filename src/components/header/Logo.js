import PropTypes from "prop-types";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { useContext } from "react";
import MainContext from "../mainContext/mainContext";

const Logo = ({ logoClass }) => {
  const mainContext = useContext(MainContext);
  return (
    <div className={clsx(logoClass)}>
      <Link to={process.env.PUBLIC_URL + "/"}>
        <img alt="" src={mainContext.logo.logoBlack} />
        {/* <img alt="" src={process.env.PUBLIC_URL + imageUrl} /> */}
      </Link>
    </div>
  );
};

Logo.propTypes = {
  imageUrl: PropTypes.string,
  logoClass: PropTypes.string,
};

export default Logo;
