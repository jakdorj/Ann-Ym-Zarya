import React, {Fragment} from "react";
import SEO from "../../components/seo";
import LayoutSeven from "../../layouts/LayoutSeven";
import {AppstoreOutlined, SettingOutlined} from "@ant-design/icons";
import {Layout, Menu, theme} from "antd";
import {useState} from "react";
import Items from "../../components/items";
const {Content, Footer, Sider} = Layout;
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
  const [menuKey, setMenuKey] = useState("theme");
  const {
    token: {colorBgContainer},
  } = theme.useToken();
  const menuhandler = (e) => {
    setMenuKey(e.key);
  };
  const mItems = [
    getItem("Items", "items", <SettingOutlined />),
    getItem("OrderHistory", "orderHistory", <AppstoreOutlined />),

    // getItem("Navigation Three", "sub4", <SettingOutlined />, [
    //   getItem("Option 9", "9"),
    // ]),
  ];

  return (
    <Fragment>
      <SEO
        titleTemplate="Product Page"
        description="Product Page of flone react minimalist eCommerce template."
      />

      <LayoutSeven headerTop="visible">
        {/* breadcrumb */}
        <div
          style={{width: "100%", height: "100px ", background: "#000"}}
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
                {menuKey === "items" ? <Items /> : null}
              </div>
            </Content>
            <Footer
              style={{
                textAlign: "center",
              }}
            >
              Bondooloi kids ©2023 Created by Bondooloi
            </Footer>
          </Layout>
        </Layout>
      </LayoutSeven>
    </Fragment>
  );
};

export default Dashboard;
