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
    brandHover: "#ccc",
    headingColor: "#ccc",
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
    const token = localStorage.getItem("idToken");
    setEdit(false);
    const body = {
      localId: localStorage.getItem("localId"),
      data: {
        brandColor: colors.brandColor,
        brandHover: colors.brandHover,
        headingColor: colors.headingColor,
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
        setColors({
          ...colors,
          brandColor: res.data.data.brandColor,
          brandHover: res.data.data.brandHover,
          headingColor: res.data.data.headingColor,
          pkId: data[0][0],
        });
      })
      .catch((err) => {
        message.error("Бранд өнгө оруулааггүй байна!");
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
          <div></div>
        </div>
      </section>
    </div>
  );
};
export default Tools;
