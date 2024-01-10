import {
  Button,
  DatePicker,
  Divider,
  Modal,
  Space,
  Typography,
  Upload,
  message,
} from "antd";
import {useEffect, useState} from "react";
import {PlusOutlined} from "@ant-design/icons";
import axios from "../../../../axios-orders";
import css from "./style.module.css";
import dayjs from "dayjs";
import BABI from "./bannerAreaBgImg";
const {Paragraph} = Typography;
const {RangePicker} = DatePicker;
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
const BannerArea = ({
  getDataFunc,
  getChristmaskey,
  getData,
  updateChristmas,
  tabValue,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [item, setItem] = useState({
    itemTitleOneMn: "Эрэгтэй хүүхэд",
    itemTitleOneEng: "Male kids",
    itemTitleTwoMn: "Эмэгтэй хүүхэд",
    itemTitleTwoEng: "Female kids",
    itemTitleThreeMn: "Бусад хувцас",
    itemTitleThreeEng: "Other clothes",

    itemSubTitleOneMn: "Эхлэх үнэ",
    itemSubTitleOneEng: "Starting at",
    itemSubTitleTwoMn: "Эхлэх үнэ",
    itemSubTitleTwoEng: "Starting at",
    itemSubTitleThreeMn: "Эхлэх үнэ",
    itemSubTitleThreeEng: "Starting at",

    itemOnePrice: "99",
    itemTwoPrice: "99",
    itemThreePrice: "99",

    itemOneImg: "assets/img/tour/banner-48.png",
    itemTwoImg: "assets/img/tour/banner-49.png",
    itemThreeImg: "assets/img/tour/banner-50.png",

    dealOfTheDayImg: "assets/img/tour/deal-11.png",
    dealOfTheDayTime: "12-23-2023 16:14:26",
  });

  const [fileList, setFileList] = useState([]);
  const [bgImg, setBgImg] = useState("");

  useEffect(() => {
    console.log("updateChristmas: ", getData);
    if (updateChristmas) {
      setItem(getData);
    }
    setLoading(false);
  }, [getData]);
  const onChange = (value, dateString) => {
    console.log("Selected Time: ", value);
    console.log("Formatted Selected Time: ", dateString);
    setItem({...item, dealOfTheDayTime: dateString});
  };
  const onOk = (value) => {
    console.log("onOk: ", value);
  };
  const showModal = () => {
    // tabValue: 1 = english | 2 = mongol
    // updateChristmas: true = update | false = save
    setIsModalOpen(true);
  };

  function getBasee64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  }
  const handleOk = () => {
    if (fileList.length === 0) {
      return message.error("Зураг заавал оруулна уу!");
    }
    setIsModalOpen(false);
    setItem({...item, dealOfTheDayImg: bgImg});
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleCancelImg = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{marginTop: 8}}>Зураг</div>
    </div>
  );
  const handleChange = (file) => {
    setFileList(file.fileList);
    getBasee64(file.fileList[0].originFileObj, (imageUrl) => {
      setBgImg(imageUrl);
    });
  };
  const bannerAreaSave = () => {
    setLoading(true);
    if (updateChristmas) {
      console.log("updateChristmas: ", updateChristmas);
      const token = localStorage.getItem("idToken");
      const body = {
        localId: localStorage.getItem("localId"),
        values: {...item},
      };
      axios
        .patch(`christmastTheme/${getChristmaskey}.json?&auth=${token}`, body)
        .then((res) => {
          getDataFunc();
          message.success("Амжилттай");
          setIsModalOpen(false);
        })
        .catch((err) => {
          console.log("err: ", err);
          message.error("error");
          setIsModalOpen(false);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      // updateChristmas: true = update | false = save
      const token = localStorage.getItem("idToken");
      const body = {
        localId: localStorage.getItem("localId"),
        values: {...item},
      };
      setTimeout(() => {
        axios
          .post(`christmastTheme.json?&auth=${token}`, body)
          .then((res) => {
            // if (res.data.name) message.success("Амжилттай");
            getDataFunc();
            message.success("Амжилттай");
          })
          .catch((err) => {
            message.error("Амжилтгүй");
          })
          .finally(() => {
            setLoading(false);
          });
      }, 800);
    }
  };
  return (
    <div style={{width: "100%", marginTop: "30px"}}>
      <Divider orientation="center">Banner Area</Divider>
      <div style={{display: "flex", justifyContent: "center"}}>
        <div style={{display: "flex", gap: "20px"}}>
          <div className={css.box}>
            <img alt="example" style={{width: "100%"}} src={item.itemOneImg} />
            <div className={css.detail}>
              <div className={css.title}>
                {/* {item.itemTitleOneEng} */}
                <Paragraph
                  style={{
                    fontSize: "36px",
                    color: "#df262b",
                    margin: 0,
                    fontFamily: "Cormorant Garamond",
                  }}
                  editable={{
                    onChange: (e) =>
                      tabValue === "1"
                        ? setItem({...item, itemTitleOneEng: e})
                        : setItem({...item, itemTitleOneMn: e}),
                  }}
                >
                  {tabValue === "1"
                    ? item.itemTitleOneEng
                    : item.itemTitleOneMn}
                </Paragraph>
              </div>
              <div className={css.subFlex}>
                <div className={css.subTitle}>
                  <Paragraph
                    style={{
                      fontSize: "18px",
                      fontWeight: "600",
                      fontFamily: "Cormorant Garamond",
                    }}
                    editable={{
                      onChange: (e) =>
                        tabValue === "1"
                          ? setItem({...item, itemSubTitleOneEng: e})
                          : setItem({...item, itemSubTitleOneMn: e}),
                    }}
                  >
                    {tabValue === "1"
                      ? item.itemSubTitleOneEng
                      : item.itemSubTitleOneMn}
                  </Paragraph>
                </div>
                <div className={css.price}>
                  <Paragraph
                    style={{
                      fontSize: "20px",
                      fontWeight: "600",
                      color: "#df262b",
                      margin: 0,
                      fontFamily: "Cormorant Garamond",
                    }}
                    editable={{
                      onChange: (e) => setItem({...item, itemOnePrice: e}),
                    }}
                  >
                    ${item.itemOnePrice}
                  </Paragraph>
                </div>
              </div>
            </div>
            <div style={{position: "absolute", bottom: "20px", right: "20px"}}>
              <BABI setItem={setItem} item={item} imgNumber={1} />
            </div>
          </div>
          <div className={css.box}>
            <img alt="example" style={{width: "100%"}} src={item.itemTwoImg} />
            <div className={css.detail}>
              <div className={css.title}>
                {/* {item.itemTitleOneEng} */}
                <Paragraph
                  style={{
                    fontSize: "36px",
                    color: "#df262b",
                    margin: 0,
                    fontFamily: "Cormorant Garamond",
                  }}
                  editable={{
                    onChange: (e) =>
                      tabValue === "1"
                        ? setItem({...item, itemTitleTwoEng: e})
                        : setItem({...item, itemTitleTwoMn: e}),
                  }}
                >
                  {tabValue === "1"
                    ? item.itemTitleTwoEng
                    : item.itemTitleTwoMn}
                </Paragraph>
              </div>
              <div className={css.subFlex}>
                <div className={css.subTitle}>
                  <Paragraph
                    style={{
                      fontSize: "18px",
                      fontWeight: "600",
                      fontFamily: "Cormorant Garamond",
                    }}
                    editable={{
                      onChange: (e) =>
                        tabValue === "1"
                          ? setItem({...item, itemSubTitleTwoEng: e})
                          : setItem({...item, itemSubTitleTwoMn: e}),
                    }}
                  >
                    {tabValue === "1"
                      ? item.itemSubTitleTwoEng
                      : item.itemSubTitleTwoMn}
                  </Paragraph>
                </div>
                <div className={css.price}>
                  <Paragraph
                    style={{
                      fontSize: "20px",
                      fontWeight: "600",
                      color: "#df262b",
                      margin: 0,
                      fontFamily: "Cormorant Garamond",
                    }}
                    editable={{
                      onChange: (e) => setItem({...item, itemTwoPrice: e}),
                    }}
                  >
                    ${item.itemTwoPrice}
                  </Paragraph>
                </div>
              </div>
            </div>
            <div style={{position: "absolute", bottom: "20px", right: "20px"}}>
              <BABI setItem={setItem} item={item} imgNumber={2} />
            </div>
          </div>
          <div className={css.box}>
            <img
              alt="example"
              style={{width: "100%"}}
              src={item.itemThreeImg}
            />
            <div className={css.detail}>
              <div className={css.title}>
                {/* {item.itemTitleOneEng} */}
                <Paragraph
                  style={{
                    fontSize: "36px",
                    color: "#df262b",
                    margin: 0,
                    fontFamily: "Cormorant Garamond",
                  }}
                  editable={{
                    onChange: (e) =>
                      tabValue === "1"
                        ? setItem({...item, itemTitleThreeEng: e})
                        : setItem({...item, itemTitleThreeMn: e}),
                  }}
                >
                  {tabValue === "1"
                    ? item.itemTitleThreeEng
                    : item.itemTitleThreeMn}
                </Paragraph>
              </div>
              <div className={css.subFlex}>
                <div className={css.subTitle}>
                  <Paragraph
                    style={{
                      fontSize: "18px",
                      fontWeight: "600",
                      fontFamily: "Cormorant Garamond",
                    }}
                    editable={{
                      onChange: (e) =>
                        tabValue === "1"
                          ? setItem({...item, itemSubTitleThreeEng: e})
                          : setItem({...item, itemSubTitleThreeMn: e}),
                    }}
                  >
                    {tabValue === "1"
                      ? item.itemSubTitleThreeEng
                      : item.itemSubTitleThreeMn}
                  </Paragraph>
                </div>
                <div className={css.price}>
                  <Paragraph
                    style={{
                      fontSize: "20px",
                      fontWeight: "600",
                      color: "#df262b",
                      margin: 0,
                      fontFamily: "Cormorant Garamond",
                    }}
                    editable={{
                      onChange: (e) => setItem({...item, itemThreePrice: e}),
                    }}
                  >
                    ${item.itemThreePrice}
                  </Paragraph>
                </div>
              </div>
            </div>
            <div style={{position: "absolute", bottom: "20px", right: "20px"}}>
              <BABI setItem={setItem} item={item} imgNumber={3} />
            </div>
          </div>
        </div>
      </div>
      <Divider orientation="center">Deal of the day</Divider>
      <div style={{display: "flex", justifyContent: "center"}}>
        <Modal
          title="Зураг солих"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Upload
            listType="picture-circle"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
          >
            {fileList.length >= 1 ? null : uploadButton}
          </Upload>
          <Modal
            open={previewOpen}
            title={previewTitle}
            footer={null}
            onCancel={handleCancelImg}
          >
            <img alt="example" style={{width: "100%"}} src={previewImage} />
          </Modal>
        </Modal>
        <div className={css.dod}>
          <img
            alt="example"
            style={{width: "100%"}}
            src={item.dealOfTheDayImg}
          />
          <div className={css.datePick}>
            <Button type="primary" onClick={showModal}>
              + зураг солих / 549x352 /
            </Button>
            <Space direction="vertical" size={12}>
              <DatePicker
                value={dayjs(
                  item.dealOfTheDayTime
                    ? item.dealOfTheDayTime
                    : "12-23-2023 16:14:26",
                  "MM-DD-YYYY HH:mm:ss"
                )}
                showTime
                onChange={onChange}
                onOk={onOk}
                format="MM-DD-YYYY HH:mm:ss"
                // "November 13, 2024 12:12:00",
              />
            </Space>
          </div>
        </div>

        <div>
          <Button
            type="primary"
            size="large"
            onClick={bannerAreaSave}
            loading={loading}
          >
            Хадгалах
          </Button>
        </div>
      </div>
    </div>
  );
};
export default BannerArea;
