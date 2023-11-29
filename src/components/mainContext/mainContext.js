import axios from "../../axios-orders";
import React, { useEffect, useState } from "react";
const MainContext = React.createContext();
export const MainItem = (props) => {
  const [language, setLanguage] = useState("");
  const [langName, setLangName] = useState("English");
  const [user, setUser] = useState(false);
  const [logo, setLogo] = useState("");

  useEffect(() => {
    getLogos();
    getLanguage();
    getAdmin();
  }, [logo]);
  const getLanguage = () => {
    if (localStorage.getItem("language")) {
      if (localStorage.getItem("language") === 0) {
        // eng = 0 || mn = 1
        setLangName("English");
        setLanguage("data.eng");
        return;
      } else {
        setLangName("Монгол");
        setLanguage("data mn");
        return;
      }
    }
  };
  const onChangeLanguage = (param) => {
    if (param === 0) {
      localStorage.setItem("language", 0);
      return getLanguage();
    } else {
      localStorage.setItem("language", 1);
      return getLanguage();
    }
  };
  const getAdmin = () => {
    if (localStorage.getItem("localId")) {
      setUser(true);
    }
  };
  const logout = () => {
    localStorage.removeItem("idToken");
    localStorage.removeItem("localId");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("expireDate");
    setUser(false);
    getLanguage();
  };
  const getLogos = () => {
    axios
      .get(`logoList.json`)
      .then((res) => {
        setLogo(res.data.data);
      })
      .catch((err) => {
        // message.error("Бранд лого оруулааггүй байна!");
        console.log("err: ", err);
      })
      .finally(() => {
        // setLogoLoading(false);
      });
  };
  return (
    <MainContext.Provider
      value={{ langName, language, onChangeLanguage, user, logout, logo }}
    >
      {props.children}
    </MainContext.Provider>
  );
};
export default MainContext;
