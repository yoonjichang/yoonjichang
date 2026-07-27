import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Routine from './pages/Routine';
import WorkoutSession from './pages/WorkoutSession';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Routine />} />
        <Route path="/routine" element={<Routine />} />
        <Route path="/workout" element={<WorkoutSession />} />
      </Routes>
    </BrowserRouter>
  );
}