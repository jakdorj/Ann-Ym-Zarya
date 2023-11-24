import { Avatar, Card, ColorPicker, Space, message } from "antd";
import {
  CheckOutlined,
  SettingOutlined,
  EditOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import axios from "../../../axios-orders";
const { Meta } = Card;
const Tools = () => {
  const [colors, setColors] = useState({
    brandColor: "#ccc",
    buttonColor: "#ccc",
    borderColor: "#ccc",
    pkId: "",
  });
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  // itemList.json?orderBy="itemList/catName"&equalTo="dogClothes"
  useEffect(() => {
    const localId = localStorage.getItem("localId");
    if (localId) {
      getData();
    }
  }, []);

  const save = () => {
    console.log("object", colors);
    const token = localStorage.getItem("idToken");
    setEdit(false);
    const body = {
      localId: localStorage.getItem("localId"),
      data: {
        brandColor: colors.brandColor,
        buttonColor: colors.buttonColor,
        borderColor: colors.borderColor,
      },
    };
    axios
      .patch(`colorList/${colors.pkId}.json?&auth=${token}`, body)
      .then((res) => {
        if (res.status) message.success("Амжилттай");
      })
      .catch((err) => {
        message.error("Алдаа");
      });
  };

  const getData = () => {
    setLoading(true);
    axios
      .get(`colorList.json`)
      .then((res) => {
        const data = Object.entries(res.data).reverse();
        console.log("data: ", data[0][0]);
        setColors({
          ...colors,
          brandColor: data[0][1].data.brandColor,
          buttonColor: data[0][1].data.buttonColor,
          borderColor: data[0][1].data.borderColor,
          pkId: data[0][0],
        });
      })
      .catch((err) => {
        console.log("err: ", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <div>
      <section className="blog-details-area" style={{ marginLeft: "0px" }}>
        <div className=" ">
          <Card
            style={{
              width: 300,
            }}
            // cover={
            //   <img
            //     alt="example"
            //     src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            //   />
            // }
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
                        value={colors.buttonColor}
                        showText
                        onChange={(e) =>
                          setColors({
                            ...colors,
                            buttonColor:
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
                        value={colors.borderColor}
                        showText
                        onChange={(e) =>
                          setColors({
                            ...colors,
                            borderColor: e.toHexString(),
                          })
                        }
                      />
                    </div>
                  </Space>
                </div>
              }
            />
          </Card>
          <div></div>
        </div>
      </section>
    </div>
  );
};
export default Tools;
