import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Routine() {
  const navigate = useNavigate();

  // 임시 루틴 데이터 (나중에 Supabase 데이터베이스와 연결할 예정입니다!)
  const [routines, setRoutines] = useState([
    { id: 1, title: '🔥 상체 파괴 3분할 (가슴/삼두)', exercises: ['벤치프레스', '인클라인 덤벨프레스', '딥스', '푸시업'] },
    { id: 2, title: '🦵 하체 & 코어 찢기', exercises: ['바벨 스쿼트', '레그 프레스', '레그 컬', '플랭크'] },
    { id: 3, title: '🦾 등 & 이두 철판 만들기', exercises: ['데드리프트', '랫 풀다운', '바벨 로우', '바벨 컬'] },
  ]);

  return (
    <div className="container" style={{ padding: '40px 20px', maxWidth: '800px' }}>
      {/* 상단 타이틀 및 루틴 추가 버튼 영역 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--text)', marginBottom: '8px' }}>
            나만의 루틴
          </h1>
          <p style={{ color: 'var(--sub)', margin: 0, fontSize: '0.95rem' }}>
            광고 없는 나만의 맞춤형 운동 루틴을 관리하세요.
          </p>
        </div>
        
        {/* 새 루틴 만들기 버튼 */}
        <button 
          className="btn"
          style={{ background: 'var(--primary)', color: '#fff', border: 'none' }}
          onClick={() => alert('새로운 루틴 만들기 기능은 다음 단계에서 연결합니다!')}
        >
          + 루틴 추가
        </button>
      </div>

      {/* 루틴 카드 리스트 영역 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {routines.map((routine) => (
          <div 
            key={routine.id}
            style={{ 
              backgroundColor: 'var(--surface)', 
              border: '1px solid var(--border)', 
              borderRadius: '14px', 
              padding: '24px',
              transition: 'transform 0.2s, border-color 0.2s',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.borderColor = 'var(--primary)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.borderColor = 'var(--border)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--text)' }}>{routine.title}</h3>
              <span style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: '600' }}>운동 시작하기 ➔</span>
            </div>
            
            {/* 포함된 운동 종목 태그들 */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {routine.exercises.map((ex, index) => (
                <span 
                  key={index}
                  style={{ 
                    backgroundColor: '#252525', 
                    color: '#ccc', 
                    padding: '6px 12px', 
                    borderRadius: '8px', 
                    fontSize: '0.85rem',
                    border: '1px solid #333'
                  }}
                >
                  {ex}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
