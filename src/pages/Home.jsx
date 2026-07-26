import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient'; // 💡 백엔드 연동

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRecentPosts();
  }, []);

  // 💡 서버에서 최신 글 가져오기
  const fetchRecentPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false }); // 최신순 정렬

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('최신 글 목록을 불러오는 중 에러 발생:', error.message);
    } finally {
      setLoading(false);
    }
  };

  // 날짜 변환기
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
  };

  // 홈 화면 검색 필터
  const filteredPosts = posts.filter((post) => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg)' }}>
      <Header />
      
      <main className="container" style={{ padding: '60px 20px', maxWidth: '800px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '16px', color: 'var(--text)' }}>
            나에게 맞는 건강 루틴,<br />jichang에서 찾아보세요
          </h1>
          <p style={{ color: 'var(--sub)', fontSize: '1.1rem' }}>
            다른 사람들은 어떻게 건강을 관리하고 있을까요?
          </p>
        </div>

        {/* 홈 화면 메인 검색바 */}
        <div style={{ 
          display: 'flex', alignItems: 'center', gap: '12px', padding: '16px 24px', 
          border: '2px solid var(--primary)', borderRadius: '16px', 
          backgroundColor: 'var(--surface)', marginBottom: '48px',
          boxShadow: '0 8px 24px rgba(29, 155, 240, 0.12)'
        }}>
          <svg className="icon" style={{ width: '24px', height: '24px', color: 'var(--primary)' }} viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input 
            type="text" 
            placeholder="관심있는 건강 키워드를 검색해보세요 (예: 식단, 운동)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ 
              flex: 1, border: 'none', outline: 'none', background: 'transparent', 
              fontSize: '1.1rem', color: 'var(--text)', fontFamily: 'inherit'
            }}
          />
        </div>

        {/* 최신 글 목록 보여주기 */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '1.5rem', margin: 0 }}>최신 건강 꿀팁</h2>
          <span onClick={() => navigate('/board')} style={{ color: 'var(--primary)', cursor: 'pointer', fontWeight: '600', fontSize: '0.95rem' }}>
            더보기 →
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {loading ? (
            <div style={{ padding: '60px', textAlign: 'center', color: 'var(--sub)' }}>
              최신 글을 불러오는 중입니다...
            </div>
          ) : filteredPosts.length === 0 ? (
            <div style={{ padding: '60px', textAlign: 'center', color: 'var(--sub)', border: '1px solid var(--border)', borderRadius: '16px' }}>
              검색된 글이 없습니다. 첫 글의 주인공이 되어보세요!
            </div>
          ) : (
            // 최신 글 5개만 잘라서 보여주기
            filteredPosts.slice(0, 5).map((post) => (
              <div 
                key={post.id} 
                onClick={() => navigate(`/board/${post.id}`)}
                style={{ 
                  padding: '24px', border: '1px solid var(--border)', borderRadius: '16px', 
                  backgroundColor: 'var(--surface)', cursor: 'pointer', transition: '0.15s'
                }}
              >
                <h3 style={{ fontSize: '1.25rem', margin: '0 0 8px 0', color: 'var(--text)' }}>{post.title}</h3>
                <p style={{ color: 'var(--sub)', fontSize: '0.95rem', margin: '0 0 16px 0', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {post.content}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--sub)' }}>
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
