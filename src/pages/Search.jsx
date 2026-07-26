import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';

// 💡 확장된 가짜 영양제 DB
const SUPPLEMENT_DB = [
  { id: 1, brand: '고려은단', name: '비타민C 1000', tag: '피로회복' },
  { id: 2, brand: '종근당', name: '락토핏 생유산균 골드', tag: '장건강' },
  { id: 3, brand: '스포츠리서치', name: '오메가3 트리글리세라이드', tag: '혈행개선' },
  { id: 4, brand: '얼라이브', name: '원스데일리 종합비타민', tag: '기초영양' },
  { id: 5, brand: '센트룸', name: '센트룸 포 맨/우먼', tag: '활력증진' },
  { id: 6, brand: '안국건강', name: '루테인 지아잔틴 플러스', tag: '눈건강' },
  { id: 7, brand: '나우푸드', name: '실리마린 밀크씨슬 추출물 300mg', tag: '간건강' },
  { id: 8, brand: '솔가', name: '칼슘 마그네슘 비타민D3', tag: '뼈/관절' },
  { id: 9, brand: 'CGN', name: '락토비프 프로바이오틱스 300억', tag: '장건강' },
  { id: 10, brand: '쏜리서치', name: '베이직 B 콤플렉스', tag: '피로회복' },
];

const TAGS = ['전체', '피로회복', '장건강', '혈행개선', '기초영양', '눈건강', '간건강', '뼈/관절'];

export default function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('전체');
  const [mySupplements, setMySupplements] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // 💡 화면이 켜질 때 내 루틴 목록을 불러와서, 어떤 영양제가 이미 담겼는지 확인합니다.
    const saved = JSON.parse(localStorage.getItem('bboggl_my_supplements') || '[]');
    setMySupplements(saved);
  }, []);

  // 영양제 루틴 추가 기능
  const handleAddSupplement = (supplement) => {
    const isLoggedIn = localStorage.getItem('bboggl_profile');
    if (!isLoggedIn) {
      alert('로그인이 필요한 기능입니다.');
      navigate('/login');
      return;
    }

    const updatedList = [...mySupplements, supplement];
    setMySupplements(updatedList);
    localStorage.setItem('bboggl_my_supplements', JSON.stringify(updatedList));
    alert(`${supplement.name}이(가) 내 루틴에 추가되었습니다!`);
  };

  // 검색어 & 태그 필터링 로직
  const filteredSupplements = SUPPLEMENT_DB.filter(item => {
    const matchSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        item.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchTag = selectedTag === '전체' || item.tag === selectedTag;
    return matchSearch && matchTag;
  });

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg)' }}>
      <Header />
      
      <main className="container" style={{ padding: '40px 20px', maxWidth: '1000px' }}>
        <h1 style={{ fontSize: '2rem', margin: '0 0 24px 0', color: 'var(--text)' }}>영양제 찾기</h1>
        
        {/* 메인 검색바 */}
        <div style={{ 
          display: 'flex', alignItems: 'center', gap: '12px', padding: '16px 24px', 
          border: '2px solid var(--primary)', borderRadius: '16px', 
          backgroundColor: 'var(--surface)', marginBottom: '32px'
        }}>
          <svg className="icon" style={{ width: '24px', height: '24px', color: 'var(--primary)' }} viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input 
            type="text" 
            placeholder="제품명이나 브랜드를 검색해보세요 (예: 고려은단, 비타민)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontSize: '1.1rem', color: 'var(--text)', fontFamily: 'inherit' }}
          />
        </div>

        {/* 태그(카테고리) 필터 버튼들 */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '40px' }}>
          {TAGS.map(tag => (
            <button 
              key={tag}
              onClick={() => setSelectedTag(tag)}
              style={{ 
                padding: '8px 16px', borderRadius: '20px', fontSize: '0.9rem', fontWeight: '600', cursor: 'pointer', transition: '0.2s',
                border: selectedTag === tag ? '1.5px solid var(--primary)' : '1px solid var(--border)',
                backgroundColor: selectedTag === tag ? 'var(--primary)' : 'var(--surface)',
                color: selectedTag === tag ? '#fff' : 'var(--sub)'
              }}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* 영양제 검색 결과 그리드 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '20px' }}>
          {filteredSupplements.length === 0 ? (
            <div style={{ gridColumn: '1 / -1', padding: '60px', textAlign: 'center', color: 'var(--sub)', border: '1px solid var(--border)', borderRadius: '16px' }}>
              조건에 맞는 영양제가 없습니다.
            </div>
          ) : (
            filteredSupplements.map(item => {
              const isAdded = mySupplements.some(my => my.id === item.id);
              return (
                <div key={item.id} style={{ padding: '24px', border: '1px solid var(--border)', borderRadius: '16px', backgroundColor: 'var(--surface)', display: 'flex', flexDirection: 'column' }}>
                  <span style={{ alignSelf: 'flex-start', padding: '4px 10px', borderRadius: '6px', backgroundColor: '#f0f8ff', color: 'var(--primary)', fontSize: '0.8rem', fontWeight: '700', marginBottom: '12px' }}>
                    {item.tag}
                  </span>
                  <div style={{ fontSize: '0.9rem', color: 'var(--sub)' }}>{item.brand}</div>
                  <div style={{ fontSize: '1.15rem', fontWeight: '700', color: 'var(--text)', marginBottom: '24px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', flex: 1 }}>
                    {item.name}
                  </div>
                  
                  {isAdded ? (
                    <button disabled style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid var(--border)', backgroundColor: 'var(--border)', color: 'var(--sub)', fontWeight: '600', cursor: 'not-allowed' }}>
                      루틴에 추가됨
                    </button>
                  ) : (
                    <button onClick={() => handleAddSupplement(item)} className="btn" style={{ width: '100%', padding: '12px' }}>
                      내 루틴에 추가 +
                    </button>
                  )}
                </div>
              );
            })
          )}
        </div>
      </main>
    </div>
  );
}