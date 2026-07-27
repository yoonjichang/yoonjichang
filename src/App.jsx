import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Routine from './pages/Routine';
import WorkoutSession from './pages/WorkoutSession';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        {/* 정상적인 주소들 */}
        <Route path="/" element={<Routine />} />
        <Route path="/routine" element={<Routine />} />
        <Route path="/workout" element={<WorkoutSession />} />
        
        {/* 🚨 주소를 찾지 못해 길을 잃으면 무조건 홈 화면(Routine)으로 강제 이동! */}
        <Route path="*" element={<Routine />} />
      </Routes>
    </HashRouter>
  );
}