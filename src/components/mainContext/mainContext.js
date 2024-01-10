import axios from "../../axios-orders";
import React, {useEffect, useState} from "react";
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
    getLogos();
    getLanguage();
    getAdmin();
    homeSlider();
    getChristmas();
  }, []);
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
  const homeSlider = () => {
    axios
      .get(`homeSlider.json?orderBy="values/type"&equalTo="1"`)
      .then((res) => {
        const data = Object.entries(res.data).reverse();
        // setSilderData(data);
        const resJson = [];
        data.forEach((element) => {
          resJson.push(element[1].values);
        });
        const datas = resJson.sort((a, b) => (a.first > b.first ? 1 : -1));
        setHomeSliderData(datas);
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  };
  const getChristmas = () => {
    setChrismasDataLoad(true);
    axios
      .get(`christmastTheme.json`)
      .then((res) => {
        console.log("res: ", res.data);
        if (res.data === "" || res.data === null) {
          console.log("null");
          return;
        } else {
          const data = Object.entries(res.data).reverse();
          return setChrismasData(data[0][1].values);
        }
      })
      .catch((err) => {
        console.log("err: ", err);
      })
      .finally(() => {
        setChrismasDataLoad(false);
      });
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
