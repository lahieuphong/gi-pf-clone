import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Layout,
  Breadcrumb,
  Card,
  Avatar,
  Divider,
  Table,
  Spin,
  Typography,
  Button,
  message,
} from "antd";
import { IdcardOutlined, EyeOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import axios from "axios";
import './style/UserDetail.css';

const { Content, Header } = Layout;
const { Title } = Typography;

export default function UserDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [albums, setAlbums] = useState([]);
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingAlbums, setLoadingAlbums] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoadingUser(true);
        const userRes = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
        setUser(userRes.data);
      } catch (error) {
        console.error(error);
        setUser(null);
        message.error("Không thể tải thông tin người dùng.");
      } finally {
        setLoadingUser(false);
      }
    };

    fetchUser();
  }, [id]);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        setLoadingAlbums(true);
        const albumsRes = await axios.get(`https://jsonplaceholder.typicode.com/albums?userId=${id}`);
        setAlbums(albumsRes.data);
      } catch (error) {
        console.error(error);
        setAlbums([]);
        message.error("Không thể tải danh sách album.");
      } finally {
        setLoadingAlbums(false);
      }
    };

    fetchAlbums();
  }, [id]);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 80,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Actions",
      key: "actions",
      width: 100,
      render: (_, record) => (
        <Link to={`/albums/${record.id}`}>
          <Button icon={<EyeOutlined />} size="small" className="glow-button">
            Show
          </Button>
        </Link>
      ),
    },
  ];

  return (
    <Layout>
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
          boxShadow: "0 2px 8px #f0f1f2",
        }}
      />
      
      <Content style={{ padding: 24 }}>
        {/* Breadcrumb */}
        <Breadcrumb style={{ marginBottom: 16 }}>
          <Breadcrumb.Item>
            <IdcardOutlined style={{ marginRight: 4 }} />
            <Link to="/users">Users</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Show</Breadcrumb.Item>
        </Breadcrumb>

        {/* Back Button + Title */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: -15,
            gap: 12,
          }}
        >
          <Button
            type="text"
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate(-1)}
            aria-label="Back"
          />
          <Title level={4} style={{ margin: 0 }}>
            Show User
          </Title>
        </div>

        {/* Content */}
        {loadingUser ? (
          <Spin style={{ marginTop: 48 }} />
        ) : !user ? (
          <div style={{ textAlign: "center", marginTop: 48 }}>
            <Typography.Text type="danger">User not found.</Typography.Text>
            <Button type="link" onClick={() => navigate("/users")} style={{ marginTop: 16 }}>
              Go back to Users List
            </Button>
          </div>
        ) : (
          <Card className="fade-in-card" style={{ marginTop: 24 }}>
            <Card.Meta
              avatar={
                <Avatar
                  className="glow-avatar"
                  src={`https://ui-avatars.com/api/?background=random&rounded=true&name=${encodeURIComponent(user.name)}`}
                  size={64}
                />
              }
              title={user.name}
              description={<a href={`mailto:${user.email}`}>{user.email}</a>}
            />

            <Divider />
            <Title level={4} style={{ marginBottom: 16 }}>
              Albums
            </Title>

            {loadingAlbums ? (
              <Spin size="large" style={{ display: "flex", justifyContent: "center" }} />
            ) : (
              <Table
                rowKey="id"
                columns={columns}
                dataSource={albums}
                loading={loadingAlbums}
                pagination={{ pageSize: 5 }}
              />
            )}
          </Card>
        )}
      </Content>
    </Layout>
  );
}