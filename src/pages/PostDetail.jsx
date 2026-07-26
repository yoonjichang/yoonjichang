import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient'; // 💡 백엔드 모듈 연동

export default function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]); // 좋아요 누른 유저들의 ID 배열
  const [currentUser, setCurrentUser] = useState(null);
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    const savedUser = localStorage.getItem('bboggl_profile');
    if (savedUser) setCurrentUser(JSON.parse(savedUser));
    
    fetchPostData();
  }, [id]);

  // 💡 1. 서버에서 게시글, 댓글, 좋아요 데이터 모두 가져오기
  const fetchPostData = async () => {
    // 게시글
    const { data: postData } = await supabase.from('posts').select('*').eq('id', id).single();
    if (postData) setPost(postData);

    // 댓글 (과거순 정렬)
    const { data: commentsData } = await supabase.from('comments').select('*').eq('post_id', id).order('created_at', { ascending: true });
    if (commentsData) setComments(commentsData);

    // 좋아요 내역
    const { data: likesData } = await supabase.from('likes').select('user_id').eq('post_id', id);
    if (likesData) setLikes(likesData.map(like => like.user_id));
  };

  // 💡 2. 서버에 좋아요 추가/취소하기
  const handleLike = async () => {
    if (!currentUser) return alert('로그인이 필요한 기능입니다.');

    const hasLiked = likes.includes(currentUser.id);
    
    if (hasLiked) {
      await supabase.from('likes').delete().match({ post_id: id, user_id: currentUser.id });
      setLikes(likes.filter(userId => userId !== currentUser.id)); // 화면 즉시 반영
    } else {
      await supabase.from('likes').insert([{ post_id: id, user_id: currentUser.id }]);
      setLikes([...likes, currentUser.id]); // 화면 즉시 반영
    }
  };

  // 💡 3. 서버에 댓글 저장하기
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) return alert('로그인이 필요한 기능입니다.');
    if (!commentText.trim()) return;

    const { data, error } = await supabase.from('comments').insert([{
      post_id: id,
      user_id: currentUser.id,
      author: currentUser.name,
      text: commentText.trim()
    }]).select();

    if (!error && data) {
      setComments([...comments, data[0]]); // 방금 쓴 댓글 화면에 즉시 추가
      setCommentText(''); // 입력창 비우기
    }
  };

  // 💡 4. 서버에서 게시글 삭제하기
  const handleDelete = async () => {
    if (window.confirm('정말 이 게시글을 삭제하시겠습니까?')) {
      await supabase.from('posts').delete().eq('id', id);
      alert('게시글이 삭제되었습니다.');
      navigate('/board');
    }
  };

  // 날짜 변환기
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
  };

  if (!post) return <div style={{ padding: '80px', textAlign: 'center' }}>게시글을 불러오는 중이거나 삭제된 글입니다.</div>;

  const hasLiked = currentUser && likes.includes(currentUser.id);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg)' }}>
      <Header />
      <main className="container" style={{ padding: '40px 20px', maxWidth: '700px' }}>
        <button onClick={() => navigate('/board')} style={{ marginBottom: '24px', padding: '8px 16px', borderRadius: '8px', border: '1px solid var(--border)', background: 'transparent', cursor: 'pointer', fontWeight: '500' }}>
          ← 목록으로 돌아가기
        </button>

        {/* 본문 영역 */}
        <article style={{ padding: '32px', border: '1px solid var(--border)', borderRadius: '16px', backgroundColor: 'var(--surface)', marginBottom: '24px' }}>
          <h1 style={{ fontSize: '1.75rem', margin: '0 0 16px 0', color: 'var(--text)' }}>{post.title}</h1>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '20px', marginBottom: '24px', borderBottom: '1px solid var(--border)', fontSize: '0.9rem', color: 'var(--sub)' }}>
            <span>작성자: <strong>{post.author}</strong></span>
            <span>{formatDate(post.created_at)}</span>
          </div>
          <div style={{ fontSize: '1.05rem', lineHeight: '1.6', color: 'var(--text)', whiteSpace: 'pre-wrap', marginBottom: '32px' }}>
            {post.content}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button onClick={handleLike} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', borderRadius: '20px', border: `1.5px solid ${hasLiked ? 'var(--primary)' : 'var(--border)'}`, background: hasLiked ? 'var(--primary)' : 'transparent', color: hasLiked ? '#fff' : 'var(--sub)', cursor: 'pointer', transition: '0.2s' }}>
              <svg className="icon" style={{ width: '18px', height: '18px', fill: hasLiked ? '#fff' : 'none', stroke: hasLiked ? '#fff' : 'currentColor' }} viewBox="0 0 24 24">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
              좋아요 {likes.length}
            </button>
            {currentUser && currentUser.id === post.user_id && (
              <button onClick={handleDelete} style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid #ff4d4f', color: '#ff4d4f', background: 'transparent', cursor: 'pointer', fontWeight: '500' }}>
                삭제하기
              </button>
            )}
          </div>
        </article>

        {/* 댓글 영역 */}
        <section style={{ padding: '32px', border: '1px solid var(--border)', borderRadius: '16px', backgroundColor: 'var(--surface)' }}>
          <h3 style={{ fontSize: '1.25rem', margin: '0 0 24px 0', color: 'var(--text)' }}>댓글 {comments.length}개</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '32px' }}>
            {comments.length === 0 ? (
              <div style={{ color: 'var(--sub)', fontSize: '0.95rem' }}>아직 댓글이 없습니다. 첫 댓글을 남겨보세요!</div>
            ) : (
              comments.map(comment => (
                <div key={comment.id} style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingBottom: '16px', borderBottom: '1px solid var(--border)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: '600', fontSize: '0.95rem' }}>{comment.author}</span>
                    <span style={{ color: 'var(--sub)', fontSize: '0.85rem' }}>{formatDate(comment.created_at)}</span>
                  </div>
                  <p style={{ margin: 0, color: 'var(--text)', fontSize: '0.95rem', lineHeight: '1.5' }}>{comment.text}</p>
                </div>
              ))
            )}
          </div>
          <form onSubmit={handleCommentSubmit} style={{ display: 'flex', gap: '12px' }}>
            <input type="text" value={commentText} onChange={(e) => setCommentText(e.target.value)} placeholder={currentUser ? "댓글을 남겨보세요..." : "로그인 후 댓글을 남길 수 있습니다."} disabled={!currentUser} style={{ flex: 1, padding: '12px 16px', borderRadius: '8px', border: '1.5px solid var(--border)', fontSize: '0.95rem', outline: 'none' }} />
            <button type="submit" className="btn" disabled={!currentUser} style={{ padding: '12px 24px', whiteSpace: 'nowrap' }}>등록</button>
          </form>
        </section>
      </main>
    </div>
  );
}