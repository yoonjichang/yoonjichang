// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import MyPage from './pages/MyPage';
import Write from './pages/Write';
import Board from './pages/Board';
import PostDetail from './pages/PostDetail';
import Search from './pages/Search';
import Routine from './pages/Routine'; // 👈 1. Routine 페이지 임포트 추가

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/write" element={<Write />} />
        <Route path="/board" element={<Board />} />
        <Route path="/board/:id" element={<PostDetail />} />
        <Route path="/search" element={<Search />} />
        <Route path="/routine" element={<Routine />} /> {/* 👈 2. /routine 라우터 추가 */}
      </Routes>
    </BrowserRouter>
  );
}