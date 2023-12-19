import React, { Fragment } from "react";
import SEO from "../../components/seo";
import LayoutSeven from "../../layouts/LayoutSeven";
import {
  DashboardOutlined,
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Tabs, theme } from "antd";
import Theme from "../../components/dashboard/Theme";
import Tools from "../../components/dashboard/tools";
import { useState } from "react";
import HomeSlider from "../../components/dashboard/homeSlider";
import ThemeChristmas from "../../components/dashboard/themeChristmas";
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [menuItems] = useState([
    { id: 0, label: "Theme", icon: DashboardOutlined },
    { id: 1, label: "Dashboard", icon: DashboardOutlined },
    { id: 2, label: "Banner", icon: DashboardOutlined },
  ]);
  const [menuKey, setMenuKey] = useState("theme");
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const menuhandler = (e) => {
    console.log("menuhandler: ", e);
    setMenuKey(e.key);
  };
  const mItems = [
    getItem("Theme", "theme", <MailOutlined />),
    getItem("Banner", "banner", <AppstoreOutlined />, [
      getItem("Home banner", "homeBanner"),
      getItem("busad", "6"),
      // getItem('Submenu', 'sub3', null, [getItem('Option 7', '7'), getItem('Option 8', '8')]),
    ]),
    getItem("Navigation Three", "sub4", <SettingOutlined />, [
      getItem("Option 9", "9"),
      getItem("Option 10", "10"),
      getItem("Option 11", "11"),
      getItem("Option 12", "12"),
    ]),
  ];
  const tabItems = [
    {
      key: "1",
      label: "Theme",
      children: <Theme />,
    },
    {
      key: "2",
      label: "Brand color",
      children: <Tools />,
    },
    {
      key: "3",
      label: "Theme christmas",
      children: <ThemeChristmas />,
    },
  ];
  const onChange = (key) => {
    // console.log(key);
  };
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
        <Layout>
          <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
            // breakpoint="lg"
            // collapsedWidth="0"
            // onBreakpoint={(broken) => {
            //   console.log(broken);
            // }}
            // onCollapse={(collapsed, type) => {
            //   console.log(collapsed, type);
            // }}
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
              mode="vertical"
              onClick={menuhandler}
              defaultSelectedKeys={["theme"]}
              items={mItems}
            />
          </Sider>
          <Layout>
            {/* <Header
              style={{
                padding: 0,
                background: colorBgContainer,
              }}
            /> */}
            <Content
              style={{
                margin: "24px 16px 0",
              }}
            >
              <div
                style={{
                  padding: 24,
                  minHeight: 900,
                  background: colorBgContainer,
                }}
              >
                {menuKey === "theme" ? (
                  <Tabs
                    defaultActiveKey="1"
                    items={tabItems}
                    onChange={onChange}
                  />
                ) : menuKey === "homeBanner" ? (
                  <HomeSlider />
                ) : null}
              </div>
            </Content>
            <Footer
              style={{
                textAlign: "center",
              }}
            >
              Mika urlan ©2023 Created by Mika
            </Footer>
          </Layout>
        </Layout>
      </LayoutSeven>
    </Fragment>
  );
};

export default Dashboard;
