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
      {/* 로고 영역 (클릭 시 홈으로 이동) */}
      <div 
        onClick={() => navigate('/')} 
        style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--primary)', cursor: 'pointer', letterSpacing: '-0.5px' }}
      >
        Bboggl
      </div>

      {/* 메뉴 영역 (src/components/Header.jsx의 nav 부분) */}
      <nav style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
        {/* 💡 새로 추가된 영양제 찾기 메뉴 */}
        <span 
          onClick={() => navigate('/search')} 
          style={{ cursor: 'pointer', fontWeight: '600', color: 'var(--text)', transition: 'color 0.2s' }}
          onMouseOver={(e) => e.target.style.color = 'var(--primary)'}
          onMouseOut={(e) => e.target.style.color = 'var(--text)'}
        >
          영양제 찾기
        </span>

        {/* 기존 커뮤니티 버튼 */}
        <span 
          onClick={() => navigate('/board')} 
          style={{ cursor: 'pointer', fontWeight: '600', color: 'var(--text)', transition: 'color 0.2s' }}
          onMouseOver={(e) => e.target.style.color = 'var(--primary)'}
          onMouseOut={(e) => e.target.style.color = 'var(--text)'}
        >
          커뮤니티
        </span>


        {/* 로그인 상태에 따라 다른 버튼 보여주기 */}
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

