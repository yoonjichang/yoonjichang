import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// 🏋️‍♂️ 헬스장 필수 종목 꽉꽉 채워 넣은 대용량 운동 도감
const EXERCISE_DATABASE = {
  '가슴': [
    '벤치프레스', '인클라인 벤치프레스', '디클라인 벤치프레스', 
    '덤벨 프레스', '인클라인 덤벨 프레스', '덤벨 플라이', 
    '딥스', '푸시업', '체스트 프레스 머신', '펙덱 플라이'
  ],
  '등': [
    '데드리프트', '랫 풀다운', '바벨 로우', '시티드 로우', 
    '턱걸이(풀업)', '원 암 덤벨 로우', '티바 로우', 
    '랫 풀다운(언더그립)', '케이블 풀다운', '백 익스텐션'
  ],
  '하체': [
    '바벨 스쿼트', '프론트 스쿼트', '레그 프레스', '레그 컬', 
    '레그 익스텐션', '런지', '카프 레이즈', '불가리안 스플릿 스쿼트', 
    '아파트 핵 스쿼트', '스탠딩 레그 컬'
  ],
  '어깨': [
    '오버헤드 프레스', '사이드 레터럴 레이즈', '덤벨 숄더 프레스', 
    '페이스 풀', '프론트 레이즈', '벤트오버 레이즈', 
    'ARNOLD 프레스', '업라이트 로우', '케이블 사이드 레터럴 레이즈'
  ],
  '팔': [
    '바벨 컬', '덤벨 컬', '해머 컬', '프리처 컬', 
    '트라이셉스 푸시다운', '라잉 트라이셉스 익스텐션', '오버헤드 덤벨 익스텐션', 
    '케이블 오버헤드 익스텐션', '킥백'
  ],
  '복근/코어': [
    '플랭크', '행잉 레그 레이즈', '크런치', '케이블 크런치', 
    '앱휠(복근 롤아웃)', '러시안 트위스트', '레그 레이즈'
  ],
  '유산소': [
    '런닝머신(인터벌)', '천국의 계단(스텝밀)', '사이클', 
    '로잉 머신', '버피 테스트', '줄넘기'
  ]
};

export default function Routine() {
  const navigate = useNavigate();

  // 기존 루틴 리스트
  const [routines, setRoutines] = useState([
    { id: 1, title: '🔥 상체 파괴 3분할 (가슴/삼두)', exercises: ['벤치프레스', '인클라인 벤치프레스', '딥스'] },
    { id: 2, title: '🦵 하체 & 코어 찢기', exercises: ['바벨 스쿼트', '레그 프레스', '플랭크'] },
  ]);

  // 모달 창 열림/닫힘 상태
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 새로 만드는 루틴 상태
  const [newTitle, setNewTitle] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('가슴'); // 현재 선택된 부위 탭
  const [selectedExercises, setSelectedExercises] = useState([]); // 내가 골라담은 운동들

  // 운동 종목 선택/해제 토글 함수
  const toggleExercise = (ex) => {
    if (selectedExercises.includes(ex)) {
      setSelectedExercises(selectedExercises.filter((item) => item !== ex));
    } else {
      setSelectedExercises([...selectedExercises, ex]);
    }
  };

  // 루틴 저장 핸들러
  const handleAddRoutine = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) {
      alert('루틴 이름을 입력해 주세요!');
      return;
    }
    if (selectedExercises.length === 0) {
      alert('최소 1개 이상의 운동 종목을 선택해 주세요!');
      return;
    }

    const newRoutineObj = {
      id: Date.now(),
      title: newTitle,
      exercises: selectedExercises,
    };

    setRoutines([newRoutineObj, ...routines]);
    setNewTitle('');
    setSelectedExercises([]);
    setIsModalOpen(false);
  };

  return (
    <div className="container" style={{ padding: '40px 20px', maxWidth: '800px', position: 'relative' }}>
      {/* 상단 타이틀 및 루틴 추가 버튼 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--text)', marginBottom: '8px' }}>
            나만의 루틴
          </h1>
          <p style={{ color: 'var(--sub)', margin: 0, fontSize: '0.95rem' }}>
            광고 없는 나만의 맞춤형 운동 루틴을 관리하세요.
          </p>
        </div>
        
        <button 
          className="btn"
          style={{ background: 'var(--primary)', color: '#fff', border: 'none' }}
          onClick={() => setIsModalOpen(true)}
        >
          + 루틴 추가
        </button>
      </div>

      {/* 루틴 카드 리스트 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {routines.map((routine) => (
          <div 
            key={routine.id}
            // 👇 [3단계 핵심] 카드를 누르면 /workout 페이지로 이동하면서 해당 루틴 데이터를 통째로 전달합니다!
            onClick={() => navigate('/workout', { state: { routine } })}
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

      {/* 🏋️‍♂️ 번핏 스타일 운동 선택형 모달 창 */}
      {isModalOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, padding: '20px'
        }}>
          <div style={{
            backgroundColor: 'var(--surface)', padding: '30px', borderRadius: '16px',
            width: '100%', maxWidth: '600px', border: '1px solid var(--border)', boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
            maxHeight: '90vh', overflowY: 'auto'
          }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '20px', color: 'var(--text)' }}>새 루틴 만들기</h2>
            
            <form onSubmit={handleAddRoutine} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* 루틴 이름 입력 */}
              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.9rem', color: 'var(--sub)' }}>루틴 이름</label>
                <input 
                  type="text" 
                  placeholder="예: 월요일 가슴/삼두 뿌시기"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  style={{
                    width: '100%', padding: '12px', borderRadius: '8px', backgroundColor: '#121212',
                    border: '1px solid var(--border)', color: 'var(--text)', fontSize: '1rem'
                  }}
                />
              </div>

              {/* 내가 선택한 운동 목록 미리보기 뱃지 */}
              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.9rem', color: 'var(--sub)' }}>
                  선택된 운동 ({selectedExercises.length}개)
                </label>
                <div style={{ 
                  minHeight: '45px', padding: '8px', backgroundColor: '#121212', border: '1px solid var(--border)', 
                  borderRadius: '8px', display: 'flex', flexWrap: 'wrap', gap: '6px', alignItems: 'center' 
                }}>
                  {selectedExercises.length === 0 ? (
                    <span style={{ color: '#666', fontSize: '0.85rem', paddingLeft: '4px' }}>아래 목록에서 운동을 터치하여 골라주세요</span>
                  ) : (
                    selectedExercises.map((ex, idx) => (
                      <span key={idx} style={{ 
                        backgroundColor: 'var(--primary)', color: '#fff', padding: '4px 10px', 
                        borderRadius: '6px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px' 
                      }}>
                        {ex} 
                        <span 
                          onClick={(e) => {
                            e.stopPropagation(); // 카드 전체 클릭 이벤트 버블링 방지
                            toggleExercise(ex);
                          }} 
                          style={{ cursor: 'pointer', fontWeight: 'bold' }}
                        >×</span>
                      </span>
                    ))
                  )}
                </div>
              </div>

              {/* 부위별 탭 버튼 영역 */}
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--sub)' }}>부위별 운동 종목 선택</label>
                <div style={{ display: 'flex', gap: '6px', marginBottom: '12px', overflowX: 'auto', paddingBottom: '4px' }}>
                  {Object.keys(EXERCISE_DATABASE).map((category) => (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setSelectedCategory(category)}
                      style={{
                        padding: '8px 14px', borderRadius: '8px', fontWeight: '600', fontSize: '0.85rem', cursor: 'pointer',
                        backgroundColor: selectedCategory === category ? 'var(--primary)' : '#222',
                        color: selectedCategory === category ? '#fff' : '#aaa',
                        border: selectedCategory === category ? 'none' : '1px solid var(--border)',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {category}
                    </button>
                  ))}
                </div>

                {/* 해당 부위의 운동 종목 리스트 (클릭 시 선택/해제) */}
                <div style={{ 
                  display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', 
                  maxHeight: '220px', overflowY: 'auto', padding: '4px' 
                }}>
                  {EXERCISE_DATABASE[selectedCategory].map((ex, index) => {
                    const isSelected = selectedExercises.includes(ex);
                    return (
                      <div
                        key={index}
                        onClick={() => toggleExercise(ex)}
                        style={{
                          padding: '10px 12px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.9rem',
                          backgroundColor: isSelected ? '#331a14' : '#1a1a1a',
                          border: isSelected ? '1px solid var(--primary)' : '1px solid #2c2c2c',
                          color: isSelected ? 'var(--primary)' : '#ddd',
                          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                          transition: '0.15s'
                        }}
                      >
                        <span>{ex}</span>
                        <span style={{ fontSize: '0.8rem', fontWeight: '700' }}>{isSelected ? '✓ 선택됨' : '+'}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 하단 취소/저장 버튼 */}
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  style={{
                    flex: 1, padding: '12px', borderRadius: '8px', backgroundColor: 'transparent',
                    border: '1px solid var(--border)', color: 'var(--sub)', fontWeight: '600', cursor: 'pointer'
                  }}
                >
                  취소
                </button>
                <button 
                  type="submit" 
                  style={{
                    flex: 1, padding: '12px', borderRadius: '8px', backgroundColor: 'var(--primary)',
                    border: 'none', color: '#fff', fontWeight: '600', cursor: 'pointer'
                  }}
                >
                  루틴 저장하기
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}