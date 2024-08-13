import PropTypes from "prop-types";
import clsx from "clsx";
import { Link } from "react-router-dom";

const Logo = ({ logoClass, imageUrl }) => {
  return (
    <div className={clsx(logoClass)}>
      <Link to={process.env.PUBLIC_URL + "/"}>
        <div
          style={{
            color: "#ffb386",
            fontWeight: "bold",
            fontSize: "20px",
            textTransform: "uppercase",
          }}
        >
          Ann Yum Zarya
        </div>
        {/* <img
          alt=""
          src={process.env.PUBLIC_URL + imageUrl}
          style={{ width: "50px" }}
        /> */}
      </Link>
    </div>
  );
};

Logo.propTypes = {
  imageUrl: PropTypes.string,
  logoClass: PropTypes.string,
};

export default Logo;
