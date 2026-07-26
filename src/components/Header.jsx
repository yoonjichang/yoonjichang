import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();
  
  // 현재 로그인 상태인지 확인 (LocalStorage에 프로필이 있는지 체크)
  const isLoggedIn = !!localStorage.getItem('bboggl_profile');

  return (
    <header style={{ 
      display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
      padding: '16px 24px', borderBottom: '1px solid var(--border)', 
      backgroundColor: 'var(--surface)', position: 'sticky', top: 0, zIndex: 100 
    }}>
      {/* 🏋️‍♂️ 로고 영역: Bboggl -> LiftOn으로 변경 */}
      <div 
        onClick={() => navigate('/')} 
        style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--primary)', cursor: 'pointer', letterSpacing: '-0.5px' }}
      >
        LiftOn
      </div>

      {/* 🧭 메뉴 영역: 홈, 나만의 루틴, 나의 식단, 커뮤니티 4가지로 세팅 */}
      <nav style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
        
        {/* 1. 홈 메뉴 */}
        <span 
          onClick={() => navigate('/')} 
          style={{ cursor: 'pointer', fontWeight: '600', color: 'var(--text)', transition: 'color 0.2s' }}
          onMouseOver={(e) => e.target.style.color = 'var(--primary)'}
          onMouseOut={(e) => e.target.style.color = 'var(--text)'}
        >
          홈
        </span>

        {/* 2. 나만의 루틴 메뉴 (경로는 나중에 라우터에 맞춰 /routine 등으로 변경 가능) */}
        <span 
          onClick={() => navigate('/routine')} 
          style={{ cursor: 'pointer', fontWeight: '600', color: 'var(--text)', transition: 'color 0.2s' }}
          onMouseOver={(e) => e.target.style.color = 'var(--primary)'}
          onMouseOut={(e) => e.target.style.color = 'var(--text)'}
        >
          나만의 루틴
        </span>

        {/* 3. 나의 식단 메뉴 */}
        <span 
          onClick={() => navigate('/diet')} 
          style={{ cursor: 'pointer', fontWeight: '600', color: 'var(--text)', transition: 'color 0.2s' }}
          onMouseOver={(e) => e.target.style.color = 'var(--primary)'}
          onMouseOut={(e) => e.target.style.color = 'var(--text)'}
        >
          나의 식단
        </span>

        {/* 4. 커뮤니티 메뉴 */}
        <span 
          onClick={() => navigate('/board')} 
          style={{ cursor: 'pointer', fontWeight: '600', color: 'var(--text)', transition: 'color 0.2s' }}
          onMouseOver={(e) => e.target.style.color = 'var(--primary)'}
          onMouseOut={(e) => e.target.style.color = 'var(--text)'}
        >
          커뮤니티
        </span>

        {/* 로그인 상태에 따라 마이페이지 또는 로그인 버튼 보여주기 */}
        {isLoggedIn ? (
          <span 
            onClick={() => navigate('/mypage')} 
            style={{ cursor: 'pointer', fontWeight: '600', color: 'var(--text)', transition: 'color 0.2s' }}
            onMouseOver={(e) => e.target.style.color = 'var(--primary)'}
            onMouseOut={(e) => e.target.style.color = 'var(--text)'}
          >
            마이페이지
          </span>
        ) : (
          <button 
            onClick={() => navigate('/login')} 
            className="btn" 
            style={{ padding: '8px 16px', fontSize: '0.9rem' }}
          >
            로그인
          </button>
        )}
      </nav>
    </header>
  );
}