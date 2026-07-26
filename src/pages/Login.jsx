import React, { useState } from 'react';
import Header from '../components/Header';
import '../styles/globals.css';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient'; // 💡 백엔드 연결 모듈 불러오기

export default function Login() {
  const [isSignUp, setIsSignUp] = useState(false); // 로그인/회원가입 모드 전환
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        // 💡 1. 회원가입 로직
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { name: nickname } // 유저 메타데이터에 닉네임 저장
          }
        });
        
        if (error) throw error;
        
        alert('회원가입이 성공적으로 완료되었습니다! 이제 로그인해 주세요.');
        setIsSignUp(false); // 가입 후 로그인 화면으로 전환
        setPassword(''); // 비밀번호 초기화
        
      } else {
        // 💡 2. 로그인 로직
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        // 기존 마이페이지/게시판 코드가 깨지지 않도록 로컬 스토리지에도 프로필 세팅
        const user = data.user;
        const profile = {
          id: user.id,
          email: user.email,
          name: user.user_metadata.name || user.email.split('@')[0]
        };
        localStorage.setItem('bboggl_profile', JSON.stringify(profile));

        alert('로그인 성공! 환영합니다.');
        navigate('/');
      }
    } catch (error) {
      alert('오류가 발생했습니다: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg)' }}>
      <Header />
      
      <main className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '80px 20px' }}>
        <div style={{ 
          width: '100%', maxWidth: '400px', border: '1px solid var(--border)', 
          borderRadius: '16px', padding: '40px 32px', backgroundColor: 'var(--surface)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '1.75rem', color: 'var(--text)', marginBottom: '8px' }}>
              {isSignUp ? '새로 시작하기' : '환영합니다!'}
            </h1>
            <p style={{ color: 'var(--sub)', fontSize: '0.95rem' }}>
              {isSignUp ? '계정을 만들고 건강 루틴을 관리하세요.' : '이메일과 비밀번호로 로그인하세요.'}
            </p>
          </div>

          <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* 회원가입일 때만 닉네임 입력창 표시 */}
            {isSignUp && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text)' }}>닉네임</label>
                <input 
                  type="text" 
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  placeholder="예: 건강최고"
                  required={isSignUp}
                  style={{ padding: '12px 16px', borderRadius: '8px', border: '1.5px solid var(--border)', outline: 'none', fontFamily: 'inherit', fontSize: '1rem' }} 
                />
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text)' }}>이메일</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@bboggl.com"
                required
                style={{ padding: '12px 16px', borderRadius: '8px', border: '1.5px solid var(--border)', outline: 'none', fontFamily: 'inherit', fontSize: '1rem' }} 
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text)' }}>비밀번호 (6자 이상)</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호를 입력해주세요"
                required
                minLength="6"
                style={{ padding: '12px 16px', borderRadius: '8px', border: '1.5px solid var(--border)', outline: 'none', fontFamily: 'inherit', fontSize: '1rem' }} 
              />
            </div>

            <button type="submit" className="btn" disabled={loading} style={{ marginTop: '8px', width: '100%', padding: '14px' }}>
              {loading ? '처리 중...' : (isSignUp ? '회원가입 하기' : '로그인')}
            </button>
          </form>

          <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '0.9rem', color: 'var(--sub)' }}>
            {isSignUp ? '이미 계정이 있으신가요? ' : '아직 계정이 없으신가요? '}
            <span 
              onClick={() => { setIsSignUp(!isSignUp); setPassword(''); }} 
              style={{ color: 'var(--primary)', fontWeight: '600', cursor: 'pointer' }}
            >
              {isSignUp ? '로그인하기' : '회원가입하기'}
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}