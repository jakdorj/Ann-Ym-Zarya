import PropTypes from "prop-types";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import axios from "../../axios-orders";
import { useState } from "react";
import { useContext } from "react";
import MainContext from "../mainContext/mainContext";

const Logo = ({ imageUrl, logoClass }) => {
  const [logo, setLogo] = useState("");
  useEffect(() => {
    console.log("Logo ==> : ", imageUrl);
  }, []);
  return (
    <div className={clsx(logoClass)}>
      <Link to={process.env.PUBLIC_URL + "/"}>
        {/* <img alt="" src={logo} /> */}
        <img alt="" src={process.env.PUBLIC_URL + imageUrl} />
      </Link>
    </div>
  );
};

Logo.propTypes = {
  imageUrl: PropTypes.string,
  logoClass: PropTypes.string,
};

export default Logo;
