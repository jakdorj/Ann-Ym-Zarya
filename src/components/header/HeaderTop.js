import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import clsx from "clsx";
import LanguageCurrencyChanger from "./sub-components/LanguageCurrencyChanger";

const HeaderTop = ({ borderStyle }) => {
  const currency = useSelector((state) => state.currency);
  return (
    <div
      className={clsx(
        "header-top-wap",
        borderStyle === "fluid-border" && "border-bottom"
      )}
    >
      <LanguageCurrencyChanger currency={currency} />
      <div className="header-offer">
        <p>
          <span>
            {/* {currency.currencySymbol + (200 * currency.currencyRate).toFixed(2)} */}
            {(100000).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </span>
          -с дээш үнийн дүнтэй захиалга хүргэлт үнэгүй
        </p>
      </div>
    </div>
  );
};

HeaderTop.propTypes = {
  borderStyle: PropTypes.string,
};

export default HeaderTop;
