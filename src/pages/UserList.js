import { useEffect, useState, useCallback } from 'react';
import { Table, Avatar, Button, Layout, Typography, message, Spin } from 'antd';
import { Link } from 'react-router-dom';
import { fetchUsers } from '../services/api';
import { EyeOutlined } from '@ant-design/icons';
import './style/UserList.css';

const { Header, Content } = Layout;

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Hàm tải người dùng với xử lý lỗi
  const loadUsers = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchUsers();
      setUsers(data);
    } catch (error) {
      console.error(error);
      message.error('Không thể tải danh sách người dùng.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Tải người dùng khi component mount
  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: 'Avatar',
      render: (_, user) => (
        <Avatar
            className="glow-avatar"
            src={`https://ui-avatars.com/api/?background=random&rounded=true&name=${encodeURIComponent(user.name)}`}
            alt={`Avatar of ${user.name}`}
        />
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      render: (text, user) => (
        <Link to={`/users/${user.id}`} className="text-blue-500 hover:underline cursor-pointer">
          {text}
        </Link>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      render: (text) => <a href={`mailto:${text}`} className="underline text-blue-500">{text}</a>,
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      render: (text) => <a href={`tel:${text}`} className="underline text-blue-500">{text}</a>,
    },
    {
      title: 'Website',
      dataIndex: 'website',
      render: (text) => (
        <a
          href={`http://${text}`}
          target="_blank"
          rel="noopener noreferrer"
          className="underline text-blue-500"
        >
          {text}
        </a>
      ),
    },
    {
      title: 'Actions',
      render: (_, user) => (
        <Link to={`/users/${user.id}`}>
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
          Users
        </Typography.Title>
      </Header>

      <Content style={{ padding: 24 }}>
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 48 }}>
            <Spin size="large" />
          </div>
        ) : (
          <Table
            className="fade-in-table"
            dataSource={users}
            columns={columns}
            rowKey="id"
            loading={loading}
            pagination={{ pageSize: 10 }}
          />
        )}
      </Content>
    </Layout>
  );
};

export default UserList;