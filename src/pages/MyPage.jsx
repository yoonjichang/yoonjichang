import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient'; // 💡 백엔드 연동

// (영양제 데이터는 임시로 유지)
const DUMMY_SUPPLEMENTS = [
  { id: 1, brand: '고려은단', name: '비타민C 1000', tag: '피로회복' },
  { id: 2, brand: '종근당', name: '락토핏 생유산균 골드', tag: '장건강' },
  { id: 3, brand: '스포츠리서치', name: '오메가3 트리글리세라이드', tag: '혈행개선' },
];

export default function MyPage() {
  const [activeTab, setActiveTab] = useState('posts');
  const [profile, setProfile] = useState({ name: '', email: '' });
  const [myPosts, setMyPosts] = useState([]);
  const [mySupplements, setMySupplements] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem('bboggl_profile');
    if (!savedUser) {
      alert('로그인이 필요한 페이지입니다.');
      navigate('/login');
      return;
    }

    try {
      const parsedProfile = JSON.parse(savedUser);
      setProfile(parsedProfile);
      fetchMyPosts(parsedProfile.id); // 💡 서버에서 내 글 가져오기 함수 호출

      // 내 영양제는 일단 기존 로컬 스토리지 유지
      const savedSupplements = JSON.parse(localStorage.getItem('bboggl_my_supplements') || '[]');
      setMySupplements(savedSupplements);

    } catch (e) {
      navigate('/login');
    }
  }, [navigate]);

  // 💡 서버에서 내가 작성한 글만 가져오기
  const fetchMyPosts = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('user_id', userId) // 내 ID와 일치하는 글만 필터링
        .order('created_at', { ascending: false });
      
      if (!error && data) {
        setMyPosts(data);
      }
    } catch (error) {
      console.error('글을 불러오는 중 에러 발생:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut(); // 💡 서버에도 로그아웃 알림
    localStorage.removeItem('bboggl_profile');
    alert('로그아웃 되었습니다.');
    navigate('/');
  };

  const handleAddSupplement = (supplement) => {
    const isAlreadyAdded = mySupplements.find(item => item.id === supplement.id);
    if (isAlreadyAdded) return alert('이미 추가된 영양제입니다.');
    const updatedList = [...mySupplements, supplement];
    setMySupplements(updatedList);
    localStorage.setItem('bboggl_my_supplements', JSON.stringify(updatedList));
  };

  const handleRemoveSupplement = (id) => {
    const updatedList = mySupplements.filter(item => item.id !== id);
    setMySupplements(updatedList);
    localStorage.setItem('bboggl_my_supplements', JSON.stringify(updatedList));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
  };

  if (loading) return <div style={{ padding: '40px', textAlign: 'center' }}>데이터를 불러오는 중입니다...</div>;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg)' }}>
      <Header />
      <main className="container" style={{ padding: '40px 20px', maxWidth: '800px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <h1 style={{ fontSize: '2rem', margin: 0, color: 'var(--text)' }}>마이페이지</h1>
          <button onClick={handleLogout} style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid var(--border)', background: 'transparent', cursor: 'pointer', fontWeight: '500' }}>
            로그아웃
          </button>
        </div>
        
        <section style={{ display: 'flex', alignItems: 'center', gap: '24px', padding: '32px', border: '1px solid var(--border)', borderRadius: '16px', marginBottom: '32px', backgroundColor: 'var(--surface)' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'var(--border)', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'var(--sub)' }}>
            <svg className="icon" style={{ width: '40px', height: '40px' }} viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
          </div>
          <div style={{ flex: 1 }}>
            <h2 style={{ fontSize: '1.5rem', margin: '0 0 8px 0' }}>{profile.name}</h2>
            <p style={{ color: 'var(--sub)', margin: 0 }}>{profile.email}</p>
          </div>
        </section>

        <div style={{ display: 'flex', borderBottom: '1.5px solid var(--border)', marginBottom: '32px' }}>
          <div onClick={() => setActiveTab('posts')} style={{ padding: '12px 24px', cursor: 'pointer', fontWeight: '600', color: activeTab === 'posts' ? 'var(--primary)' : 'var(--sub)', borderBottom: activeTab === 'posts' ? '3px solid var(--primary)' : '3px solid transparent', marginBottom: '-1.5px', transition: '0.2s' }}>
            내가 쓴 글 ({myPosts.length})
          </div>
          <div onClick={() => setActiveTab('supplements')} style={{ padding: '12px 24px', cursor: 'pointer', fontWeight: '600', color: activeTab === 'supplements' ? 'var(--primary)' : 'var(--sub)', borderBottom: activeTab === 'supplements' ? '3px solid var(--primary)' : '3px solid transparent', marginBottom: '-1.5px', transition: '0.2s' }}>
            내 영양제 루틴
          </div>
        </div>

        {activeTab === 'posts' ? (
          <section>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {myPosts.length === 0 ? (
                <div style={{ padding: '40px', textAlign: 'center', color: 'var(--sub)', border: '1px solid var(--border)', borderRadius: '16px', backgroundColor: 'var(--surface)' }}>
                  작성한 게시글이 없습니다.
                </div>
              ) : (
                myPosts.map((post) => (
                  <div key={post.id} onClick={() => navigate(`/board/${post.id}`)} style={{ padding: '20px', border: '1px solid var(--border)', borderRadius: '12px', backgroundColor: 'var(--surface)', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h3 style={{ fontSize: '1.1rem', margin: '0 0 6px 0', color: 'var(--text)' }}>{post.title}</h3>
                      <p style={{ fontSize: '0.85rem', color: 'var(--sub)', margin: 0 }}>{formatDate(post.created_at)}</p>
                    </div>
                    <span style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: '600' }}>보기 →</span>
                  </div>
                ))
              )}
            </div>
          </section>
        ) : (
          <section>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '16px' }}>현재 섭취 중인 영양제</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '48px' }}>
              {mySupplements.length === 0 ? (
                <div style={{ padding: '40px', textAlign: 'center', color: 'var(--sub)', border: '1px solid var(--border)', borderRadius: '12px' }}>아직 등록된 영양제가 없습니다.</div>
              ) : (
                mySupplements.map(item => (
                  <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', border: '1px solid var(--primary)', borderRadius: '12px', backgroundColor: '#f0f8ff' }}>
                    <div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: '600', marginBottom: '4px' }}>{item.brand}</div>
                      <div style={{ fontSize: '1.1rem', fontWeight: '500', color: 'var(--text)' }}>{item.name}</div>
                    </div>
                    <button onClick={() => handleRemoveSupplement(item.id)} style={{ padding: '6px 12px', borderRadius: '8px', border: '1px solid #ff4d4f', color: '#ff4d4f', background: 'transparent', cursor: 'pointer' }}>빼기</button>
                  </div>
                ))
              )}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}