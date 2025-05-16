import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AlbumList from "../pages/AlbumList";
import AlbumDetail from "../pages/AlbumDetail";
import UserList from "../pages/UserList";
import UserDetail from "../pages/UserDetail";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to="/albums?pageSize=20&current=1" replace />}
      />

      <Route path="/albums" element={<AlbumList />} />
      <Route path="/albums/:id" element={<AlbumDetail />} />
      <Route path="/users" element={<UserList />} />
      <Route path="/users/:id" element={<UserDetail />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;