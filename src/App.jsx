import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Routine from './pages/Routine';
import WorkoutSession from './pages/WorkoutSession';

export default function App() {
  // 🌙/☀️ 로컬스토리지에서 테마를 불러오거나 기본값 'dark' 설정
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('lifton_theme') || 'dark';
  });

  // 테마가 바뀔 때마다 HTML 최상단 속성(data-theme)과 로컬스토리지 업데이트
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('lifton_theme', theme);
  }, [theme]);

  // 테마 전환 토글 함수
  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <BrowserRouter>
      {/* ☀️/🌙 화면 우측 하단 플로팅 테마 변경 버튼 */}
      <button
        onClick={toggleTheme}
        style={{
          position: 'fixed', 
          bottom: '20px', 
          right: '20px', 
          zIndex: 9999,
          width: '56px', 
          height: '56px', 
          borderRadius: '28px',
          backgroundColor: 'var(--surface)', 
          color: 'var(--text)',
          border: '1px solid var(--border)', 
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
          fontSize: '1.8rem', 
          cursor: 'pointer', 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          transition: 'background-color 0.3s, color 0.3s'
        }}
        title="테마 변경"
      >
        {theme === 'dark' ? '☀️' : '🌙'}
      </button>

      {/* 라우터 설정 */}
      <Routes>
        <Route path="/" element={<Routine />} />
        <Route path="/routine" element={<Routine />} />
        <Route path="/workout" element={<WorkoutSession />} />
      </Routes>
    </BrowserRouter>
  );
}