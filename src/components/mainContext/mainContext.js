import axios from "../../axios-orders";
import React, { useEffect, useState } from "react";
const MainContext = React.createContext();
export const MainItem = (props) => {
  const [language, setLanguage] = useState("");
  const [langName, setLangName] = useState("English");
  const [user, setUser] = useState(false);
  const [logo, setLogo] = useState("");
  const [homeSliderData, setHomeSliderData] = useState("");
  const [christmasData, setChrismasData] = useState();
  const [christmasDataLoad, setChrismasDataLoad] = useState(false);
  useEffect(() => {
    getLanguage();
    getAdmin();
    getHomeBanner();
  }, []);
  const getHomeBanner = () => {
    axios
      .get(`homeSlider.json?orderBy="data/type"&equalTo="1"`)
      .then((res) => {
        if (res.data !== null) {
          const data = Object.entries(res.data).reverse();
          const result = [];
          data.forEach((element) => {
            result.push({ id: element[0], ...element[1]?.data });
          });
          const datas = result.sort((a, b) => (a.first > b.first ? 1 : -1));
          console.log("data: ", result);
          setHomeSliderData(datas);
        }
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  };
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
    document.location.replace("/login");
  };
  return (
    <MainContext.Provider
      value={{
        langName,
        language,
        onChangeLanguage,
        user,
        logout,
        logo,
        homeSliderData,
        christmasData,
        christmasDataLoad,
      }}
    >
      {props.children}
    </MainContext.Provider>
  );
};
export default MainContext;
