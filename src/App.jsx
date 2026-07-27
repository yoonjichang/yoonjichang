import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
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
    <HashRouter>
      <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-color)', color: 'var(--text)' }}>
        {/* ☀️/🌙 테마 토글 버튼 */}
        <button
          onClick={toggleTheme}
          style={{
            position: 'fixed', 
            bottom: '30px', 
            right: '30px', 
            zIndex: 99999, 
            width: '60px', 
            height: '60px', 
            borderRadius: '30px',
            backgroundColor: '#ff5722', 
            color: '#ffffff', 
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

        {/* 메인 라우팅 */}
        <Routes>
          <Route path="/" element={<Routine />} />
          <Route path="/routine" element={<Routine />} />
          <Route path="/workout" element={<WorkoutSession />} />
          {/* 잘못된 경로 접속 시 메인으로 복구 */}
          <Route path="*" element={<Routine />} />
        </Routes>
      </div>
    </HashRouter>
  );
}