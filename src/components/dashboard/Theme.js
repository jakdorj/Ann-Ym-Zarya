import React, { Fragment } from "react";
import css from "./style.module.css";
import { useState } from "react";
import { Popconfirm, Skeleton, Tag, message } from "antd";
import axios from "../../axios-orders";
import { useEffect } from "react";
const Theme = () => {
  const [themes, setThemes] = useState([
    {
      title: "Home-01",
      img: "https://reactdemo.hasthemes.com/flone/p2/img/flone_preview/fashion-home-2.png",
      router: "home-fashion-two",
    },
    {
      title: "Home-02",
      img: "https://reactdemo.hasthemes.com/flone/p2/img/flone_preview/fashion-home-3.png",
      router: "home-fashion-three",
    },
    {
      title: "Home-03",
      img: "https://reactdemo.hasthemes.com/flone/p2/img/flone_preview/fashion-home-4.png",
      router: "home-fashion-four",
    },
    {
      title: "auto-parts-home",
      img: "https://reactdemo.hasthemes.com/flone/p2/img/flone_preview/auto-parts-home.png",
      router: "home-auto-parts",
    },
    {
      title: "grid-banner-home",
      img: "https://reactdemo.hasthemes.com/flone/p2/img/flone_preview/grid-banner-home.png",
      router: "home-grid-banner",
    },
    {
      title: "onepage-scroll-home",
      img: "https://reactdemo.hasthemes.com/flone/p2/img/flone_preview/onepage-home.png",
      router: "home-onepage-scroll",
    },
    {
      title: "christmas-home",
      img: "https://reactdemo.hasthemes.com/flone/p2/img/flone_preview/christmas-home-one.jpg",
      router: "home-christmas",
    },
    {
      title: "black-friday-home-one",
      img: "https://reactdemo.hasthemes.com/flone/p2/img/flone_preview/black-friday-home-one.jpg",
      router: "home-black-friday",
    },
    {
      title: "black-friday-home-two",
      img: "https://reactdemo.hasthemes.com/flone/p2/img/flone_preview/black-friday-home-two.jpg",
      router: "home-black-friday-two",
    },
    {
      title: "valentines-day-home",
      img: "https://reactdemo.hasthemes.com/flone/p2/img/flone_preview/valentines-day-home-one.jpg",
      router: "home-valentines-day",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState("");
  useEffect(() => {
    getThemes();
  }, []);
  const getThemes = () => {
    setLoading(true);
    axios
      .get(`theme.json`)
      .then((res) => {
        console.log("rese: ", res.data);
        setSelectedTheme(res.data.data.routerName);
      })
      .catch((err) => {
        message.error("Бранд өнгө оруулааггүй байна!");
        console.log("err: ", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const confirm = (params) => {
    const token = localStorage.getItem("idToken");
    const body = {
      localId: "admin",
      data: {
        routerName: params.router,
      },
    };
    axios
      .patch(`theme.json?&auth=${token}`, body)
      .then((res) => {
        if (res.status) message.success("Амжилттай солигдлоо.");
      })
      .catch((err) => {
        message.error("Алдаа");
      })
      .finally(() => {
        getThemes();
      });
  };
  const cancel = (e) => {};
  return (
    <Fragment>
      <div className={css.Container}>
        {loading
          ? [0, 1, 2, 3, 4, 5].map((e, i) => <Skeleton active key={i} />)
          : themes.map((e, i) => (
              <Popconfirm
                key={i}
                title={
                  <div style={{ textTransform: "uppercase" }}>{e.title}</div>
                }
                placement="bottomLeft"
                description={
                  "Та " + e.title + " загварыг сонгоход итгэлттэй байна уу?"
                }
                onConfirm={() => confirm(e)}
                onCancel={cancel}
                okText="Тийм"
                cancelText="Үгүй"
              >
                <div className={css.cols} key={i}>
                  <img
                    className={css.img}
                    alt="Mika"
                    width={300}
                    height={300}
                    style={{ width: "100%", height: "100%" }}
                    src={e.img}
                  />
                  <div className={css.title}>{e.title}</div>
                  {e.router === selectedTheme ? (
                    <div className={css.SelectedActive}>
                      {" "}
                      <Tag color="#108ee9">Идэвхитэй</Tag>
                    </div>
                  ) : (
                    <div className={css.SelectedHide}></div>
                  )}
                </div>
              </Popconfirm>
            ))}
      </div>
    </Fragment>
  );
};

export default Theme;
