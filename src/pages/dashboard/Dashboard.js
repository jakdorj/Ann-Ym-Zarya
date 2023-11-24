import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import SEO from "../../components/seo";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import LayoutSeven from "../../layouts/LayoutSeven";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import Theme from "../../components/dashboard/Theme";
import Tools from "../../components/dashboard/tools";
const { Header, Content, Footer, Sider } = Layout;
const Dashboard = () => {
  let { pathname } = useLocation();
  let { id } = useParams();
  const { products } = useSelector((state) => state.product);
  const product = products.find((product) => product.id === id);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Fragment>
      <SEO
        titleTemplate="Product Page"
        description="Product Page of flone react minimalist eCommerce template."
      />

      <LayoutSeven headerTop="visible">
        {/* breadcrumb */}
        <div
          style={{ width: "100%", height: "100px ", background: "#000" }}
        ></div>
        {/* <Breadcrumb
          pages={[
            { label: "Үндсэн хуудас", path: process.env.PUBLIC_URL + "/" },
            {
              label: "Хяналтын самбар",
              path: process.env.PUBLIC_URL + pathname,
            },
          ]}
        /> */}
        <Layout>
          <Sider
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={(broken) => {
              console.log(broken);
            }}
            onCollapse={(collapsed, type) => {
              console.log(collapsed, type);
            }}
          >
            <div
              style={{
                background: "rgba(255,255,255,.2)",
                height: "32px",
                width: "86%",
                margin: "15px 10px",
                borderRadius: "6px",
              }}
            />
            <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={["4"]}
              items={[
                UserOutlined,
                VideoCameraOutlined,
                UploadOutlined,
                UserOutlined,
              ].map((icon, index) => ({
                key: String(index + 1),
                icon: React.createElement(icon),
                label: `nav ${index + 1}`,
              }))}
            />
          </Sider>
          <Layout>
            <Header
              style={{
                padding: 0,
                background: colorBgContainer,
              }}
            />
            <Content
              style={{
                margin: "24px 16px 0",
              }}
            >
              <div
                style={{
                  padding: 24,
                  minHeight: 700,
                  background: colorBgContainer,
                }}
              >
                <Tools />
              </div>
            </Content>
            <Footer
              style={{
                textAlign: "center",
              }}
            >
              Ant Design ©2023 Created by Ant UED
            </Footer>
          </Layout>
        </Layout>
      </LayoutSeven>
    </Fragment>
  );
};

export default Dashboard;
