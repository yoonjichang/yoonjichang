import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient'; // 💡 서버 연결 모듈 불러오기

export default function Board() {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
  }, []);

  // 💡 Supabase DB에서 게시글 가져오기
  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false }); // 최신글이 먼저 오도록 정렬

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('글 목록을 불러오는 중 오류 발생:', error.message);
    } finally {
      setLoading(false);
    }
  };

  // 서버에서 온 날짜(created_at)를 예쁘게 바꿔주는 함수
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
  };

  // 검색 필터 로직
  const filteredPosts = posts.filter((post) => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg)' }}>
      <Header />
      
      <main className="container" style={{ padding: '40px 20px', maxWidth: '800px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div>
            <h1 style={{ fontSize: '2rem', margin: '0 0 8px 0', color: 'var(--text)' }}>커뮤니티</h1>
            <p style={{ color: 'var(--sub)', margin: 0 }}>서로의 이야기를 자유롭게 나눠보세요.</p>
          </div>
          <button className="btn" onClick={() => navigate('/write')} style={{ padding: '10px 20px' }}>
            글쓰기
          </button>
        </div>

        {/* 검색바 영역 */}
        <div style={{ 
          display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 20px', 
          border: '1.5px solid var(--border)', borderRadius: '12px', 
          backgroundColor: 'var(--surface)', marginBottom: '32px',
        }}>
          <svg className="icon" style={{ width: '20px', height: '20px', color: 'var(--sub)' }} viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input 
            type="text" 
            placeholder="제목이나 내용을 검색해보세요"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ 
              flex: 1, border: 'none', outline: 'none', background: 'transparent', 
              fontSize: '1rem', color: 'var(--text)', fontFamily: 'inherit'
            }}
          />
        </div>

        {/* 게시글 목록 카드 영역 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {loading ? (
            <div style={{ padding: '60px', textAlign: 'center', color: 'var(--sub)' }}>게시글을 불러오는 중입니다...</div>
          ) : filteredPosts.length === 0 ? (
            <div style={{ padding: '60px', textAlign: 'center', color: 'var(--sub)', border: '1px solid var(--border)', borderRadius: '16px', backgroundColor: 'var(--surface)' }}>
              {searchTerm ? '검색 결과가 없습니다.' : '아직 작성된 글이 없습니다. 첫 글을 남겨보세요!'}
            </div>
          ) : (
            filteredPosts.map((post) => (
              <div 
                key={post.id} 
                onClick={() => navigate(`/board/${post.id}`)}
                style={{ 
                  padding: '24px', border: '1px solid var(--border)', borderRadius: '16px', 
                  backgroundColor: 'var(--surface)', cursor: 'pointer', transition: '0.15s',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
                }}
              >
                <h2 style={{ fontSize: '1.25rem', margin: '0 0 12px 0', color: 'var(--text)' }}>{post.title}</h2>
                <p style={{ color: 'var(--sub)', fontSize: '0.95rem', margin: '0 0 16px 0', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {post.content}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem', color: 'var(--sub)' }}>
                  <span>작성자: {post.author}</span>
                  <span>{formatDate(post.created_at)}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}