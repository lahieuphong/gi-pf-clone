import { Layout } from "antd";
import { Outlet } from "react-router-dom";

const { Header, Content } = Layout;

const AppLayout = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sticky Header */}
      <Header
        style={{
          backgroundColor: "#fff",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          padding: "0 24px",
          height: 64,
          position: "sticky",
          top: 0,
          zIndex: 1,
        }}
      >
        {/* Optional right-aligned controls like user avatar, notifications */}
      </Header>

      {/* Main content */}
      <Content style={{ padding: "24px" }}>
        <div style={{ minHeight: 360 }}>
          <Outlet />
        </div>
      </Content>
    </Layout>
  );
};

export default AppLayout;