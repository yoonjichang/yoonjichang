import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

  const [routines, setRoutines] = useState([
    { id: 1, title: '🔥 상체 파괴 3분할 (가슴/삼두)', exercises: ['벤치프레스', '인클라인 벤치프레스', '딥스'] },
    { id: 2, title: '🦵 하체 & 코어 찢기', exercises: ['바벨 스쿼트', '레그 프레스', '플랭크'] },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('가슴');
  const [selectedExercises, setSelectedExercises] = useState([]);

  // 📅 캘린더/기록 모달 상태
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [workoutHistory, setWorkoutHistory] = useState([]);

  // 기록 보기 모달 열 때 localStorage에서 데이터 불러오기
  const openHistoryModal = () => {
    const savedHistory = JSON.parse(localStorage.getItem('lifton_workout_history') || '[]');
    setWorkoutHistory(savedHistory);
    setIsHistoryModalOpen(true);
  };

  const toggleExercise = (ex) => {
    if (selectedExercises.includes(ex)) {
      setSelectedExercises(selectedExercises.filter((item) => item !== ex));
    } else {
      setSelectedExercises([...selectedExercises, ex]);
    }
  };

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
      
      {/* 상단 타이틀 및 버튼 그룹 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', flexWrap: 'wrap', gap: '15px' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--text)', marginBottom: '8px' }}>
            나만의 루틴 & 기록
          </h1>
          <p style={{ color: 'var(--sub)', margin: 0, fontSize: '0.95rem' }}>
            광고 없이 맞춤형 루틴을 관리하고 지난 운동 기록을 확인하세요.
          </p>
        </div>
        
        <div style={{ display: 'flex', gap: '10px' }}>
          {/* 📅 과거 운동 기록 캘린더 보기 버튼 */}
          <button 
            onClick={openHistoryModal}
            style={{ 
              background: 'transparent', border: '1px solid var(--border)', color: 'var(--text)', 
              padding: '10px 16px', borderRadius: '10px', fontWeight: '600', cursor: 'pointer', fontSize: '0.9rem' 
            }}
          >
            📅 운동 기록 캘린더
          </button>

          <button 
            className="btn"
            style={{ background: 'var(--primary)', color: '#fff', border: 'none' }}
            onClick={() => setIsModalOpen(true)}
          >
            + 루틴 추가
          </button>
        </div>
      </div>

      {/* 루틴 카드 리스트 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {routines.map((routine) => (
          <div 
            key={routine.id}
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

      {/* 📅 과거 운동 기록 조회 모달 창 */}
      {isHistoryModalOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, padding: '20px'
        }}>
          <div style={{
            backgroundColor: 'var(--surface)', padding: '30px', borderRadius: '16px',
            width: '100%', maxWidth: '600px', border: '1px solid var(--border)', boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
            maxHeight: '85vh', overflowY: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '1.5rem', color: 'var(--text)', margin: 0 }}>📅 나의 운동 기록 캘린더</h2>
              <button 
                onClick={() => setIsHistoryModalOpen(false)}
                style={{ background: 'transparent', border: 'none', color: '#888', fontSize: '1.2rem', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            {workoutHistory.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--sub)' }}>
                <p style={{ fontSize: '1rem', marginBottom: '8px' }}>아직 저장된 운동 기록이 없습니다.</p>
                <p style={{ fontSize: '0.85rem' }}>운동을 완료하고 기록을 남겨보세요!</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {workoutHistory.map((record) => (
                  <div key={record.id} style={{ backgroundColor: '#181818', border: '1px solid #2c2c2c', borderRadius: '12px', padding: '18px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                      <span style={{ backgroundColor: 'var(--primary)', color: '#fff', padding: '4px 10px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: '700' }}>
                        {record.date}
                      </span>
                      <h3 style={{ fontSize: '1.1rem', color: 'var(--text)', margin: 0 }}>{record.title}</h3>
                    </div>

                    {/* 기록된 운동별 세부 세트 내용 */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
                      {Object.entries(record.data || {}).map(([exName, sets]) => (
                        <div key={exName} style={{ backgroundColor: '#121212', padding: '10px', borderRadius: '8px', border: '1px solid #222' }}>
                          <div style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--primary)', marginBottom: '6px' }}># {exName}</div>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                            {sets.map((s, sIdx) => (
                              <span key={sIdx} style={{ fontSize: '0.8rem', backgroundColor: s.done ? '#1a261a' : '#222', color: s.done ? '#4caf50' : '#aaa', padding: '4px 8px', borderRadius: '4px', border: s.done ? '1px solid #2e7d32' : '1px solid #333' }}>
                                {s.set}세트: {s.weight || 0}kg / {s.reps || 0}회 {s.done ? '✓' : ''}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* 새 루틴 추가 모달 창 (기존 동일) */}
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
                            e.stopPropagation();
                            toggleExercise(ex);
                          }} 
                          style={{ cursor: 'pointer', fontWeight: 'bold' }}
                        >×</span>
                      </span>
                    ))
                  )}
                </div>
              </div>

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