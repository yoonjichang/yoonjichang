import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Routine from './pages/Routine';
import WorkoutSession from './pages/WorkoutSession';

export default function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('lifton_theme') || 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('lifton_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <BrowserRouter>
      {/* 🚀 CSS 변수 없이 강제로 색상을 넣은 플로팅 버튼 (절대 투명해질 수 없음) */}
      <button
        onClick={toggleTheme}
        style={{
          position: 'fixed', 
          bottom: '30px', 
          right: '30px', 
          zIndex: 99999, // 어떤 요소보다도 무조건 맨 위에 오도록 설정
          width: '60px', 
          height: '60px', 
          borderRadius: '30px',
          backgroundColor: '#ff5722', /* 강제 주황색 배경 */
          color: '#ffffff', /* 강제 흰색 아이콘 */
          border: '2px solid #ffffff', 
          boxShadow: '0 5px 15px rgba(0,0,0,0.5)',
          fontSize: '2rem', 
          cursor: 'pointer', 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
        }}
        title="테마 변경"
      >
        {theme === 'dark' ? '☀️' : '🌙'}
      </button>

      <Routes>
        <Route path="/" element={<Routine />} />
        <Route path="/routine" element={<Routine />} />
        <Route path="/workout" element={<WorkoutSession />} />
      </Routes>
    </BrowserRouter>
  );
}