import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'; // 💡 사라졌던 Home 컴포넌트 연결!
import Routine from './pages/Routine';
import WorkoutSession from './pages/WorkoutSession';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        {/* 접속 시 메인 홈 화면(Home.jsx)을 보여줍니다 */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/routine" element={<Routine />} />
        <Route path="/workout" element={<WorkoutSession />} />
        
        {/* 주소를 찾지 못하면 기본적으로 Home 화면으로 이동합니다 */}
        <Route path="*" element={<Home />} />
      </Routes>
    </HashRouter>
  );
}