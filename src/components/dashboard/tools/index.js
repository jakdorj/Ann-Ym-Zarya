import {
  Avatar,
  Card,
  ColorPicker,
  Popconfirm,
  Space,
  Upload,
  message,
} from "antd";
import {
  CheckOutlined,
  SettingOutlined,
  EditOutlined,
  EllipsisOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import axios from "../../../axios-orders";
import css from "./style.module.css";
import { useNavigate } from "react-router-dom";
const { Meta } = Card;
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
const Tools = () => {
  const [colors, setColors] = useState({
    brandColor: "#ccc",
    brandHover: "#ccc",
    headingColor: "#ccc",
    pkId: "",
  });
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [logoImg, setLogoImg] = useState("");
  const [logoLoading, setLogoLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [fileListWhite, setFileListWhite] = useState([]);
  const [blackImg, setBlackImg] = useState("");
  const [whiteImg, setWhiteImg] = useState("");
  const navigate = useNavigate();
  // itemList.json?orderBy="itemList/catName"&equalTo="dogClothes"
  useEffect(() => {
    const localId = localStorage.getItem("localId");
    if (localId) {
      getData();
    } else {
      navigate("/");
    }
  }, [whiteImg, blackImg]);

  const save = () => {
    const token = localStorage.getItem("idToken");
    setEdit(false);
    const body = {
      localId: "admin",
      data: {
        brandColor: colors.brandColor,
        brandHover: colors.brandHover,
        headingColor: colors.headingColor,
      },
    };
    axios
      .patch(`colorList.json?&auth=${token}`, body)
      .then((res) => {
        if (res.status) message.success("Амжилттай");
      })
      .catch((err) => {
        message.error("Алдаа");
      });
  };

  const getData = async () => {
    setLoading(true);
    setLogoLoading(false);
    await axios
      .get(`colorList.json`)
      .then((res) => {
        setColors({
          ...colors,
          brandColor: res.data.data.brandColor,
          brandHover: res.data.data.brandHover,
          headingColor: res.data.data.headingColor,
        });
      })
      .catch((err) => {
        message.error("Бранд өнгө оруулааггүй байна!");
        console.log("err: ", err);
      })
      .finally(() => {
        setLoading(false);
      });
    await axios
      .get(`logoList.json`)
      .then((res) => {
        console.log("res.", res.data.data);
        setFileList([
          {
            uid: "-1",
            name: "image.png",
            status: "done",
            thumbUrl: res.data.data.logoBlack,
          },
        ]);
        setFileListWhite([
          {
            uid: "-1",
            name: "image.png",
            status: "done",
            thumbUrl: res.data.data.logoWhite,
          },
        ]);
        console.log("res: ", res.data);
      })
      .catch((err) => {
        message.error("Бранд лого оруулааггүй байна!");
        console.log("err: ", err);
      })
      .finally(() => {
        setLogoLoading(false);
      });
  };
  const uploadButtonWhite = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Цагаан лого зураг</div>
    </div>
  );
  const uploadButtonBlack = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Хар лого зураг</div>
    </div>
  );
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
  };
  const handleChange = (file) => {
    setFileList(file.fileList);
  };
  const handleChangeWhite = (file) => {
    setFileListWhite(file.fileList);
  };

  function getBasee64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  }
  const converBlackImg = () => {
    return blackImg;
  };
  const converWhiteImg = () => {
    return whiteImg;
  };
  const saveLogo = () => {
    setLogoLoading(true);
    console.log("fileList: ", fileList);

    if (fileList.length == 0) {
      message.error("Хар өнгийн лого оруулна уу!");
      setWhiteImg("");
      setBlackImg("");
      return setLogoLoading(true);
    }
    if (fileListWhite.length == 0) {
      message.error("Цагаан өнгийн лого оруулна уу!");
      setWhiteImg("");
      setBlackImg("");
      return setLogoLoading(true);
    }
    fileList.forEach((element) => {
      if (element.originFileObj) {
        getBasee64(element.originFileObj, (imageUrl) => setBlackImg(imageUrl));
      } else {
        setBlackImg(fileList[0].thumbUrl);
      }
    });
    fileListWhite.forEach((element) => {
      if (element.originFileObj) {
        getBasee64(element.originFileObj, (imageUrl) => {
          setWhiteImg(imageUrl);
        });
      } else {
        setWhiteImg(fileListWhite[0].thumbUrl);
      }
    });

    console.log("object", blackImg);
    console.log("whiteImg", whiteImg);
  };

  const confirm = (params) => {
    console.log("params");
    console.log("object", blackImg);
    console.log("whiteImg", whiteImg);
    const blackLogo = converBlackImg();
    const whiteLogo = converWhiteImg();
    console.log("blackLogo", blackLogo);
    console.log("whiteLogo", whiteLogo);
    if ((blackLogo === "", whiteLogo === "")) {
      message.error("Дахин оролдоно уу!!");
    } else {
      const token = localStorage.getItem("idToken");
      const body = {
        localId: "admin",
        data: {
          logoWhite: whiteLogo,
          logoBlack: blackLogo,
        },
      };
      axios
        .patch(`logoList.json?&auth=${token}`, body)
        .then((res) => {
          if (res.status) {
            message.success("Амжилттай");
            getData();
          }
        })
        .catch((err) => {
          message.error("Алдаа");
        })
        .finally(() => {
          setLogoLoading(false);
        });
    }
  };
  const cancel = (e) => {
    console.log("e:L ", e);
  };
  const saveLogoFunc = () => {
    if (fileList.length == 0) {
      message.error("Хар өнгийн лого оруулна уу!");
      setWhiteImg("");
      setBlackImg("");
      return setLogoLoading(true);
    }
    if (fileListWhite.length == 0) {
      message.error("Цагаан өнгийн лого оруулна уу!");
      setWhiteImg("");
      setBlackImg("");
      return setLogoLoading(true);
    }

    saveLogo();
  };
  return (
    <div>
      <section className="blog-details-area" style={{ marginLeft: "0px" }}>
        <div className={css.Layout}>
          <div>
            <Card
              style={{
                width: 300,
              }}
              actions={[
                <SettingOutlined key="setting" />,
                edit ? (
                  <CheckOutlined
                    key="setting"
                    style={{ color: "green" }}
                    onClick={save}
                  />
                ) : (
                  <EditOutlined key="edit" onClick={() => setEdit(true)} />
                ),
                <EllipsisOutlined key="ellipsis" />,
              ]}
            >
              <Meta
                avatar={
                  <Avatar src="https://cdn-icons-png.flaticon.com/512/4704/4704539.png" />
                }
                title="Өнгө солих"
                description={
                  <div>
                    {" "}
                    <Space direction="vertical">
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "5px",
                        }}
                      >
                        Бренд өнгө:
                        <ColorPicker
                          disabled={!edit}
                          size="small"
                          format="hex"
                          value={colors.brandColor}
                          showText
                          onChange={(e) =>
                            setColors({
                              ...colors,
                              brandColor: e.toHexString(),
                            })
                          }
                        />
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "5px",
                        }}
                      >
                        Гарчиг өнгө:
                        <ColorPicker
                          disabled={!edit}
                          size="small"
                          format="hex"
                          value={colors.brandHover}
                          showText
                          onChange={(e) =>
                            setColors({
                              ...colors,
                              brandHover:
                                typeof e === "string"
                                  ? e.toHexString()
                                  : e.toHexString(),
                            })
                          }
                        />{" "}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "5px",
                        }}
                      >
                        Бренд ховер өнгө:
                        <ColorPicker
                          disabled={!edit}
                          size="small"
                          // format="hex"
                          value={colors.headingColor}
                          showText
                          onChange={(e) =>
                            setColors({
                              ...colors,
                              headingColor: e.toHexString(),
                            })
                          }
                        />
                      </div>
                    </Space>
                  </div>
                }
              />
            </Card>
          </div>
          <div>
            <Card
              style={{
                width: 300,
              }}
              cover={
                logoLoading ? (
                  <div
                    style={{ display: "flex", gap: "5px", marginLeft: "23px" }}
                  >
                    <Upload
                      style={{ background: "#ededed" }}
                      listType="picture-circle"
                      fileList={fileList}
                      onPreview={handlePreview}
                      onChange={handleChange}
                    >
                      {fileList.length >= 1 ? null : uploadButtonBlack}
                    </Upload>
                    <Upload
                      style={{ background: "#ededed" }}
                      listType="picture-circle"
                      fileList={fileListWhite}
                      onPreview={handlePreview}
                      onChange={handleChangeWhite}
                    >
                      {fileListWhite.length >= 1 ? null : uploadButtonWhite}
                    </Upload>
                  </div>
                ) : (
                  <img
                    alt="example"
                    style={{
                      height: "110px",
                      width: "100%",
                      border: "1px solid #f0f0f0",
                    }}
                    src={
                      process.env.PUBLIC_URL +
                      "/assets/img/brand-logo/brandLogoDefault.png"
                    }
                  />
                )
              }
              actions={[
                <SettingOutlined key="setting" />,
                logoLoading ? (
                  <Popconfirm
                    title={
                      <div style={{ textTransform: "uppercase" }}>
                        {"asdasdasasd"}
                      </div>
                    }
                    placement="bottomLeft"
                    description={"Та загварыг сонгоход итгэлттэй байна уу?"}
                    onConfirm={confirm}
                    onCancel={cancel}
                    okText="Тийм"
                    cancelText="Үгүй"
                  >
                    <CheckOutlined
                      key="setting"
                      style={{ color: "green" }}
                      onClick={saveLogoFunc}
                    />
                  </Popconfirm>
                ) : (
                  <EditOutlined
                    key="edit"
                    onClick={() => setLogoLoading(true)}
                  />
                ),
                <EllipsisOutlined key="ellipsis" />,
              ]}
            >
              <Meta
                avatar={
                  <Avatar src="https://cdn-icons-png.flaticon.com/512/5229/5229534.png" />
                }
                title="Лого солих"
              />
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Tools;
