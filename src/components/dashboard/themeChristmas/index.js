import { Button, Tabs, Typography, message } from "antd";
import { useEffect, useState } from "react";
// import { SearchOutlined, InfoCircleOutlined } from "@ant-design/icons";
import axios from "../../../axios-orders";
import css from "./style.module.css";
import BackgroundImage from "./backgroundImage";
import HomeBgImgSmall from "./homeBgImgSmall";
import BannerArea from "./bannerArea";
const { Paragraph } = Typography;
const ThemeChristmas = () => {
  const [getChristmaskey, setChristmaskey] = useState();
  // const [loadingTable, setLoadingTable] = useState(false);
  const [updateChristmas, setUpdateChristmas] = useState(false);
  const [getData, setData] = useState({
    titleMn: "Шинэ Жилийн Сollection",
    titleEng: "New Year Offer Collection",
    subTitleMn: "Шинэ Жилийн Хямдрал Sale",
    subTitleEng: "Christmas Sale",
    buttonNameMn: "Дэлгүүр",
    buttonNameEng: "Shop now",
  });
  //   homeBgImgFull: "",
  // homeBgImgSmall: "",
  // itemTitleOneMn: "",
  // itemTitleOneEng: "",
  // itemTitleTwoMn: "",
  // itemTitleTwoEng: "",
  // itemTitleThreeMn: "",
  // itemTitleThreeEng: "",
  // itemOneImg: "",
  // itemTwoImg: "",
  // itemThreeImg: "",
  // dealOfTheDay: "",
  // commentMn: "",
  // commentEng: "",
  // commentImg: "",

  // bvten -

  // "titleMn", - "Гарчиг",
  // "titleEng", - "Title",
  // "subTitleMn", - "Гарчиг /Дэд/",
  // "subTitleEng", - "SubTitle",
  // "buttonNameMn", - "Товчлуур",
  // "buttonNameEng", - "Button name",
  // "homeBgImgFull", - "Баннер зураг том",
  // "homeBgImgSmall", - "Баннер хажуу зураг",
  // "itemTitleOneMn", - "Гарчиг 1",
  // "itemTitleOneEng", - "Title 1",
  // "itemTitleTwoMn", - "Гарчиг 2",
  // "itemTitleTwoEng", - "Title 2",
  // "itemTitleThreeMn", - "Гарчиг 3",
  // "itemTitleThreeEng", - "Title 3",
  // "itemOneImg", - "Зураг 1 / 370x21
  // "itemTwoImg", - "Зураг 2 / 370x21
  // "itemThreeImg", - "Зураг 3 / 370x215"
  // "dealOfTheDay", - "deal of the day /
  // "commentMn", - "Сэтгэгдэл",
  // "commentEng", - "Comment",
  // "commentImg", - "Сэтгэгдэл зураг
  // "type",  - "Төрөл",
  const [tabValue, setTabValue] = useState("1");
  useEffect(() => {
    const localId = localStorage.getItem("localId");
    if (localId) {
      getDataFunc();
    }
  }, []);

  const getDataFunc = () => {
    // setLoadingTable(true);
    // const token = localStorage.getItem("idToken");
    axios
      .get(`christmastTheme.json`)
      .then((res) => {
        console.log("res: ", res.data);
        if (res.data === "" || res.data === null) {
          console.log("null");
          setUpdateChristmas(false);
          return;
        } else {
          const data = Object.entries(res.data).reverse();
          setData(data[0][1].values);
          setChristmaskey(data[0][0]);
          setUpdateChristmas(true);
        }
      })
      .catch((err) => {
        console.log("err: ", err);
      })
      .finally(() => {
        // setLoadingTable(false);
      });
  };
  const save = () => {
    // tabValue: 1 = english | 2 = mongol
    // updateChristmas: true = update | false = save
    if (updateChristmas) {
      // console.log("update");
      const token = localStorage.getItem("idToken");
      const body = {
        localId: localStorage.getItem("localId"),
        values: { ...getData },
      };
      axios
        .patch(`christmastTheme/${getChristmaskey}.json?&auth=${token}`, body)
        .then((res) => {
          getDataFunc();
          message.success("Амжилттай");
        })
        .catch((err) => {
          console.log("err: ", err);
          message.error("error");
        });
      return;
    } else {
      if (
        (getData.titleMn === "") |
        (getData.titleEng === "") |
        (getData.subTitleMn === "") |
        (getData.subTitleEng === "") |
        (getData.buttonNameMn === "") |
        (getData.buttonNameEng === "")
      ) {
        return message.error("Талбар хоосон байна!");
      } else {
        const token = localStorage.getItem("idToken");
        const body = {
          localId: localStorage.getItem("localId"),
          values: {
            titleMn: getData.titleMn,
            titleEng: getData.titleEng,
            subTitleMn: getData.subTitleMn,
            subTitleEng: getData.subTitleEng,
            buttonNameMn: getData.buttonNameMn,
            buttonNameEng: getData.buttonNameEng,
          },
        };
        setTimeout(() => {
          console.log("zurags: ", body);
          axios
            .post(`christmastTheme.json?&auth=${token}`, body)
            .then((res) => {
              // if (res.data.name) message.success("Амжилттай");
              getDataFunc();
              console.log("res: ", res);
            })
            .catch((err) => {
              message.error("Амжилтгүй");
            })
            .finally(() => {
              // setBtnLoad(false);
            });
        }, 800);
      }
      return;
    }

    // console.log("getData: ", getData);
  };
  const tabItems = new Array(2).fill(null).map((_, i) => {
    const id = String(i + 1);
    return {
      label: <div>{id === "1" ? "English" : "Монгол"}</div>,
      key: id,
      children: (
        <div>
          <div
            style={{
              position: "relative",
              border: "2px solid #000",
              borderRadius: "10px",
              top: "20px",
            }}
          >
            <img
              alt="mika"
              style={{ width: "100%", height: "100%" }}
              height={100}
              width={100}
              src="assets/img/tour/banner-background-image1.jpg"
            />
            <div style={{ position: "absolute", top: "20px", left: "20px" }}>
              <BackgroundImage
                getDataFunc={getDataFunc}
                updateChristmas={updateChristmas}
                getChristmaskey={getChristmaskey}
                getData={getData}
              />
            </div>
            <div className={css.BgImg}>
              <div>
                <div className={css.Subtitle}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <div className={css.Line}></div>
                    <div className={css.SubText}>
                      <Paragraph
                        style={{
                          fontSize: "25px",
                          color: "#fff",
                          marginBottom: "6px",
                        }}
                        editable={{
                          onChange: (e) =>
                            tabValue === "1"
                              ? setData({ ...getData, subTitleEng: e })
                              : setData({ ...getData, subTitleMn: e }),
                        }}
                      >
                        {tabValue === "1"
                          ? getData.subTitleEng
                          : getData.subTitleMn}
                      </Paragraph>
                    </div>
                  </div>
                </div>
                <div className={css.Title}>
                  <Paragraph
                    style={{
                      fontSize: "72px",
                      color: "#fff",
                      lineHeight: "96px",
                      marginBottom: "6px",
                    }}
                    editable={{
                      onChange: (e) =>
                        tabValue === "1"
                          ? setData({ ...getData, titleEng: e })
                          : setData({ ...getData, titleMn: e }),
                    }}
                  >
                    {tabValue === "1" ? getData.titleEng : getData.titleMn}
                  </Paragraph>
                </div>
                <div>
                  <button
                    style={{
                      background: "#fff",
                      width: "186px",
                      border: "none",
                      padding: "15px 0px",
                      fontSize: "16px",
                      textTransform: "uppercase",
                    }}
                  >
                    <Paragraph
                      style={{ fontSize: "16px", margin: 0 }}
                      editable={{
                        onChange: (e) =>
                          tabValue === "1"
                            ? setData({ ...getData, buttonNameEng: e })
                            : setData({ ...getData, buttonNameMn: e }),
                      }}
                    >
                      {tabValue === "1"
                        ? getData.buttonNameEng
                        : getData.buttonNameMn}
                    </Paragraph>
                  </button>
                </div>
              </div>
              <div className={css.DetailImg}>
                <HomeBgImgSmall
                  getDataFunc={getDataFunc}
                  updateChristmas={updateChristmas}
                  getChristmaskey={getChristmaskey}
                  getData={getData}
                />
              </div>
            </div>
          </div>
          <div>
            <Button onClick={save} type="primary" size="large">
              Хадгалах
            </Button>
          </div>

          <BannerArea
            tabValue={tabValue}
            getDataFunc={getDataFunc}
            updateChristmas={updateChristmas}
            getChristmaskey={getChristmaskey}
            getData={getData}
          />
        </div>
      ),
    };
  });
  const onChange = (key) => {
    setTabValue(key);
  };

  return (
    <section>
      <Tabs defaultActiveKey={tabValue} items={tabItems} onChange={onChange} />
    </section>
  );
};
export default ThemeChristmas;
