import React, { Fragment } from "react";
import SEO from "../../components/seo";
import LayoutSeven from "../../layouts/LayoutSeven";
import { DashboardOutlined } from "@ant-design/icons";
import { Layout, Menu, Tabs, theme } from "antd";
import Theme from "../../components/dashboard/Theme";
import Tools from "../../components/dashboard/tools";
import { useState } from "react";
const { Header, Content, Footer, Sider } = Layout;
const Dashboard = () => {
  const [menuItems, setMenuItems] = useState([
    { id: 0, label: "Theme", icon: DashboardOutlined },
    { id: 1, label: "Dashboard", icon: DashboardOutlined },
  ]);
  const [menuKey, setMenuKey] = useState("0");
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const menuhandler = (e) => {
    setMenuKey(e.key);
  };
  const items = [
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
      label: "Tab 3",
      children: "Content of Tab Pane 3",
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
              onClick={menuhandler}
              defaultSelectedKeys={["0"]}
              items={menuItems.map((e, i) => ({
                key: i,
                label: e.label,
                icon: React.createElement(e.icon),
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
                {menuKey === "0" ? (
                  <Tabs
                    defaultActiveKey="1"
                    items={items}
                    onChange={onChange}
                  />
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
