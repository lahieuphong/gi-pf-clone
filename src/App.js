import { BrowserRouter, Link, useLocation } from "react-router-dom";
import { Layout, Menu } from "antd";
import { IdcardOutlined, ProfileOutlined } from "@ant-design/icons";
import AppRoutes from "./routes/AppRoutes";

const { Content, Sider } = Layout;

const AppLayout = () => {
  const location = useLocation();

  const selectedKey =
    location.pathname === "/" || location.pathname.startsWith("/albums")
      ? "/albums"
      : location.pathname.startsWith("/users")
      ? "/users"
      : "";

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        width={200}
        style={{
          backgroundColor: "#fff",
          borderRight: "1px solid #eee",
          position: "fixed",
          left: 0,
          top: 0,
          height: "100vh",
          zIndex: 999,
        }}
      >
        <div
          style={{
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 16px",
          }}
        >
          <Link to="/">
            <img
              src="https://geekup.vn/Icons/geekup-logo-general.svg"
              alt="GEEK Up Logo"
              style={{ height: 24 }}
            />
          </Link>
        </div>
        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
          style={{ height: "calc(100% - 64px)", borderRight: 0 }}
        >
          <Menu.Item key="/albums" icon={<ProfileOutlined />}>
            <Link to="/albums">Albums</Link>
          </Menu.Item>
          <Menu.Item key="/users" icon={<IdcardOutlined />}>
            <Link to="/users">Users</Link>
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout style={{ marginLeft: 200 }}>
        <Content style={{ padding: "0", minHeight: 280 }}>
          <AppRoutes />
        </Content>
      </Layout>
    </Layout>
  );
};

const App = () => (
  <BrowserRouter>
    <AppLayout />
  </BrowserRouter>
);

export default App;