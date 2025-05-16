import { useEffect, useState } from 'react';
import { Table, Avatar, Button, Layout, Typography, message, Spin } from 'antd';
import { Link, useSearchParams } from 'react-router-dom';
import { fetchAlbums, fetchUsers } from '../services/api';
import { EyeOutlined } from '@ant-design/icons';
import './style/AlbumList.css';

const { Header, Content } = Layout;

const AlbumList = () => {
  const [albums, setAlbums] = useState([]);
  const [users, setUsers] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  // Đọc current và pageSize từ URL, mặc định current=1, pageSize=10
  const current = parseInt(searchParams.get('current')) || 1;
  const [pageSize, setPageSize] = useState(parseInt(searchParams.get('pageSize')) || 10);

  // Load dữ liệu mỗi khi current hoặc pageSize thay đổi
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [albumsData, usersData] = await Promise.all([
          fetchAlbums(current, pageSize),
          fetchUsers(),
        ]);
        setAlbums(albumsData);
        
        // Chuyển đổi mảng users thành đối tượng để tra cứu nhanh hơn
        const usersObj = usersData.reduce((acc, user) => {
          acc[user.id] = user;
          return acc;
        }, {});
        
        setUsers(usersObj);
      } catch (error) {
        message.error("Có lỗi xảy ra khi tải dữ liệu.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [current, pageSize]);

  const getUser = (userId) => users[userId];

  const columns = [
    { title: 'ID', dataIndex: 'id' },
    { title: 'Title', dataIndex: 'title' },
    {
      title: 'User',
      render: (_, record) => {
        const user = getUser(record.userId);
        return user ? (
          <Link to={`/users/${user.id}`}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Avatar
                src={`https://ui-avatars.com/api/?background=random&rounded=true&name=${encodeURIComponent(user.name)}`}
                alt={user.name}
              />
              <span>{user.name}</span>
            </div>
          </Link>
        ) : null;
      },
    },
    {
      title: 'Actions',
      render: (_, record) => (
        <Link to={`/albums/${record.id}`}>
          <Button
            type="default"
            size="small"
            icon={<EyeOutlined />}
            className="glow-button"
            style={{ display: 'flex', alignItems: 'center', gap: 6 }}
          >
            Show
          </Button>
        </Link>
      ),
    },
  ];

  // Hàm xử lý khi đổi trang hoặc đổi pageSize: cập nhật URL luôn
  const onChangePagination = (page, newPageSize) => {
    setSearchParams({ current: page.toString(), pageSize: newPageSize.toString() });
    setPageSize(newPageSize);
  };

  return (
    <Layout>
      <Header
        style={{
          backgroundColor: '#fff',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 24px',
          height: 64,
          position: 'sticky',
          top: 0,
          zIndex: 1,
          boxShadow: '0 1px 4px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography.Title level={4} style={{ margin: 0 }}>
          Albums
        </Typography.Title>
      </Header>

      <Content style={{ padding: 24 }}>
        {loading ? (
          <Spin size="large" style={{ display: 'flex', justifyContent: 'center', marginTop: 48 }} />
        ) : (
          <Table
            className="glow-table"
            dataSource={albums}
            columns={columns}
            rowKey="id"
            pagination={{
              current,
              pageSize,
              total: 100,
              showSizeChanger: true,
              pageSizeOptions: ['10', '20', '50', '100'],
              onChange: onChangePagination,
              onShowSizeChange: onChangePagination,
              showTotal: (total) => `Total ${total} items`,
            }}
          />
        )}
      </Content>
    </Layout>
  );
};

export default AlbumList;