import React from 'react';
import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Layout, Breadcrumb, Card, Avatar, Divider, Image, Row, Col, Spin, Typography, Button, message } from "antd";
import { EyeOutlined, ProfileOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import axios from "axios";
import './style/AlbumDetail.css';

const { Content, Header } = Layout;
const { Title } = Typography;

export default function AlbumDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [album, setAlbum] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const albumRes = await axios.get(`https://jsonplaceholder.typicode.com/albums/${id}`);
        setAlbum(albumRes.data);

        const [userRes, photosRes] = await Promise.all([
          axios.get(`https://jsonplaceholder.typicode.com/users/${albumRes.data.userId}`),
          axios.get(`https://jsonplaceholder.typicode.com/albums/${id}/photos`),
        ]);

        setUser(userRes.data);
        setPhotos(photosRes.data);
      } catch (error) {
        console.error(error);
        message.error("Có lỗi xảy ra khi tải dữ liệu.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return (
    <Layout>
      {/* Sticky Header */}
      <Header
        className="css-p8b6i"
        style={{
          backgroundColor: "rgb(255, 255, 255)",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          padding: "0px 24px",
          height: 64,
          position: "sticky",
          top: 0,
          zIndex: 1,
          boxShadow: "0 2px 8px #f0f1f2",
          transition: "box-shadow 0.3s ease", // Smooth transition for sticky effect
        }}
      >
      </Header>

      <Content style={{ padding: 24 }}>
        {/* Breadcrumb */}
        <Breadcrumb style={{ marginBottom: 16 }}>
          <Breadcrumb.Item>
            <ProfileOutlined style={{ marginRight: 4 }} />
            <Link to="/albums">Albums</Link>
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
            Show Album
          </Title>
        </div>

        {/* Content */}
        {loading ? (
          <Spin style={{ marginTop: 48 }} />
        ) : album && user ? (
          <Card style={{ marginTop: 24 }}>
            <Card.Meta
              avatar={
                <Avatar
                  src={`https://ui-avatars.com/api/?background=random&rounded=true&name=${encodeURIComponent(
                    user.name
                  )}`}
                />
              }
              title={<Link to={`/users/${user.id}`}>{user.name}</Link>}
              description={<a href={`mailto:${user.email}`}>{user.email}</a>}
            />

            <Divider />
            <Title level={4} style={{ marginBottom: 16 }}>
              {album.title}
            </Title>

            <Row
              gutter={[16, 16]}
              className={`photo-grid-container ${isHovered ? "glow" : ""}`}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {photos.map((photo) => (
                <Col key={photo.id} xs={12} sm={8} md={6} lg={4}>
                  <Image
                    className="image-hover"
                    width="100%"
                    src={photo.thumbnailUrl}
                    alt={photo.title}
                    preview={{ mask: <><EyeOutlined /> Preview</> }}
                  />
                </Col>
              ))}
            </Row>
          </Card>
        ) : null}
      </Content>
    </Layout>
  );
}