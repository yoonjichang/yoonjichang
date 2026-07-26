import React, { useState } from 'react';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient'; // 💡 서버 연결 모듈 불러오기

export default function Write() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    
    const savedUser = localStorage.getItem('bboggl_profile');
    if (!savedUser) {
      alert('로그인이 필요한 서비스입니다.');
      navigate('/login');
      return;
    }

    const user = JSON.parse(savedUser);
    setLoading(true);

    try {
      // 💡 LocalStorage 대신 Supabase DB에 데이터 저장하기
      const { error } = await supabase
        .from('posts')
        .insert([
          {
            title: title,
            content: content,
            author: user.name,
            user_id: user.id // 보안을 위해 작성자의 고유 ID도 함께 저장
          }
        ]);

      if (error) throw error;

      alert('게시글이 성공적으로 등록되었습니다!');
      navigate('/board');
    } catch (error) {
      alert('글 등록 중 오류가 발생했습니다: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg)' }}>
      <Header />
      
      <main className="container" style={{ padding: '40px 20px', maxWidth: '700px' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '24px', color: 'var(--text)' }}>새 글 작성하기</h1>

        <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--text)' }}>제목</label>
            <input 
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="제목을 입력해주세요"
              required
              style={{ padding: '12px 16px', borderRadius: '8px', border: '1.5px solid var(--border)', fontSize: '1rem', outline: 'none' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--text)' }}>내용</label>
            <textarea 
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="내용을 입력해주세요"
              required
              rows="10"
              style={{ padding: '12px 16px', borderRadius: '8px', border: '1.5px solid var(--border)', fontSize: '1rem', outline: 'none', resize: 'vertical', fontFamily: 'inherit' }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
            <button 
              type="button" 
              onClick={() => navigate('/board')}
              style={{ padding: '12px 24px', borderRadius: '8px', border: '1px solid var(--border)', background: 'transparent', cursor: 'pointer', fontWeight: '600' }}
            >
              취소
            </button>
            <button type="submit" className="btn" disabled={loading} style={{ padding: '12px 24px' }}>
              {loading ? '등록 중...' : '등록하기'}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}