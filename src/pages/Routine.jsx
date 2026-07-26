import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EXERCISE_DATABASE = {
  '가슴': [
    '벤치프레스', '스미스머신 벤치프레스', '스미스머신 인클라인 벤치프레스', '덤벨 벤치프레스', 
    '인클라인 덤벨 벤치프레스', '덤벨 플라이', '스탠딩 케이블 플라이', '인클라인 벤치프레스', 
    '딥스', '중량 딥스', '인클라인 덤벨 플라이', '푸시업', '중량 푸시업', '힌두 푸시업', 
    '아처 푸시업', '클로즈그립 푸시업', '체스트 프레스 머신', '펙덱 플라이 머신', 
    '인클라인 벤치프레스 머신', '덤벨 풀오버', '시티드 딥스 머신', '로우 풀리 케이블 플라이', 
    '해머 벤치프레스', '스포토 벤치프레스', '어시스트 딥스 머신', '디클라인 벤치프레스', 
    '바벨 플로어 프레스', '클랩 푸시업', '디클라인 덤벨 플라이', '디클라인 푸시업', 
    '인클라인 푸시업', '무릎 푸시업', '파이크 푸시업', '디클라인 체스트 프레스 머신', 
    '인클라인 덤벨 트위스트 프레스', '인클라인 케이블 플라이', '덤벨 스퀴즈 프레스'
  ],
  '등': [
    '굿모닝 엑서사이즈', '풀업', '중량 풀업', '친업', '중량 친업', '바벨 로우', 
    '펜들레이 로우', '바벨 인클라인 로우', '덤벨 인클라인 로우', '인버티드 로우', 
    '덤벨 로우', '원 암 덤벨 로우', '바벨 풀오버', '시티드 로우 머신', '시티드 케이블 로우', 
    '랫풀다운', '하이퍼 익스텐션', '중량 하이퍼 익스텐션', '백 익스텐션', '티바 로우 머신', 
    '맥그립 랫풀다운', '패러럴그립 랫풀다운', '언더그립 랫풀다운', '스미스머신 로우', 
    '케이블 암 풀다운', '정지 바벨 로우', '어시스트 풀업 머신', '플로어 시티드 케이블 로우', 
    '언더그립 바벨 로우', '라잉 바벨 로우', '비하인드 넥 풀다운', '원암 케이블 풀다운', 
    '원암 레터럴 와이드 풀다운', '로우 로우 머신', '원암 로우 로우 머신', '하이 로우 머신', 
    '언더그립 하이 로우 머신', '원암 하이 로우 머신', '원암 시티드 케이블 로우', '랙풀', 
    '스미스머신 랙풀', '미드 로우 머신', '백 익스텐션 머신', '패러럴그립 풀업', '원암 풀업', 
    '원암 케이블 랫풀다운', '스탠딩 케이블 로우', '트랩바 로우', 'DY 로우 머신', 
    '원암 케틀벨 로우', '하이풀리 케이블 로우', '클로즈그립 랫풀다운', '하이풀리 원암 케이블 로우', 
    '로우풀리 원암 케이블 로우', '로우풀리 케이블 로프 로우', '체스트 서포티드 티바 로우', 
    '프론트 풀다운 머신', '케이블 풀오버', '풀오버 머신', '케이블 이지바 푸시 다운', '리니어 로우 머신'
  ],
  '하체': [
    '바벨 백스쿼트', '프론트 스쿼트', '저처 스쿼트', '바벨 불가리안 스플릿 스쿼트', 
    '덤벨 불가리안 스플릿 스쿼트', '덤벨 고블릿 스쿼트', '맨몸 스플릿 스쿼트', '에어 스쿼트', 
    '점프 스쿼트', '덤벨 스플릿 스쿼트', '케틀벨 고블릿 스쿼트', '컨벤셔널(바벨) 데드리프트', 
    '루마니안 데드리프트', '스모 데드리프트', '레그 프레스', '레그 컬', 
    '레그 익스텐션', '스탠딩 카프 레이즈', '힙 어덕션 머신', '힙 어브덕션 머신', 
    '런지', '덤벨 런지', '스텝업', '중량 스텝업', '힙 쓰러스트', '바벨 힙 쓰러스트', 
    '브이 스쿼트', '리버스 브이 스쿼트', '글루트 킥백 머신', '시티드 카프 레이즈', 
    '정지 백 스쿼트', '트랩바 데드리프트', '스미스머신 스플릿 스쿼트', '스미스머신 데드리프트', 
    '스미스머신 스쿼트', '케이블 힙 어브덕션', '핵 스쿼트 머신', '정지 데드리프트', 
    '정지 스모 데드리프트', '바벨 박스 스쿼트', '바벨 프론트 랙 런지', '바벨 점프 스쿼트', 
    '바벨 런지', '바벨 레터럴 런지', '바벨 스플릿 스쿼트', '바벨 스탠딩 카프 레이즈', 
    '스티프 레그 데드리프트', '맨몸 오버헤드 스쿼트', '덤벨 스모 스쿼트', '덤벨 레그 컬', 
    '덤벨 스쿼트', '바벨 핵 스쿼트', '시티드 레그 컬', '힙 쓰러스트 머신', '맨몸 카프 레이즈', 
    '글루트 브릿지', '덤벨 루마니안 데드리프트', '라잉 힙 어브덕션', '싱글 레그 글루트 브릿지', 
    '피스톨 박스 스쿼트', '사이드 라잉 클램', '맨몸 원레그 데드리프트', '바벨 원레그 데드리프트', 
    '덤벨 원레그 데드리프트', '케틀벨 데드리프트', '케틀벨 스모 데드리프트', '덤벨 스모 데드리프트', 
    '덤벨 스티프 레그 데드리프트', '덤벨 레터럴 런지', '케틀벨 레터럴 런지', '맨몸 레터럴 런지', 
    '원레그 익스텐션', '원레그 컬', '원레그 프레스', '수평 레그 프레스', '수평 원레그 프레스', 
    '시티드 원레그 컬', '노르딕 햄스트링 컬', '바벨 스모 스쿼트', '케틀벨 스모 스쿼트', 
    '스모 에어 스쿼트', '피스톨 스쿼트', '덩키 킥', '케이블 킥백', '데피싯 데드리프트', 
    '런지 트위스트', '케틀벨 런지 트위스트', '케이블 풀 스루', '몬스터 글루트 머신', 
    '펜듈럼 스쿼트 머신', '리니어 핵 스쿼트 머신', '스미스머신 카프 레이즈', '덤벨 스탠딩 카프 레이즈', 
    '바벨 백워드 런지', '케틀벨 백워드 런지', '맨몸 백워드 런지', '스탠딩 햄스트링 컬 머신', 
    '글루트 햄 레이즈', '스미스머신 불가리안 스플릿 스쿼트', '벨트 스쿼트 머신', '세이프티바 스쿼트', 
    '스미스머신 힙 쓰러스트', '덩키 카프 레이즈', '트랩바 스쿼트', '덤벨 프론트 스쿼트', 
    '보수볼 원레그 데드리프트', '보수볼 덤벨 원레그 데드리프트', '레버리지 스쿼트 머신', 
    '파이어 하이드런트', '와이드 에어 스쿼트', '스탠딩 힙 어브덕션', '로터리 카프 머신', 
    '케틀벨 원레그 데드리프트', '바벨 오버헤드 스쿼트', '시시 스쿼트', '중량 시시 스쿼트', 
    '스미스머신 핵 스쿼트', '덤벨 워킹 런지'
  ],
  '어깨': [
    '오버헤드 프레스', '스미스머신 오버헤드 프레스', '스미스머신 슈러그', '덤벨 숄더 프레스', 
    '덤벨 레터럴 레이즈', '벤트오버 덤벨 레터럴 레이즈', '아놀드 덤벨 프레스', '숄더 프레스 머신', 
    '비하인드 넥 프레스', '덤벨 프론트 레이즈', '덤벨 슈러그', '바벨 슈러그', '페이스 풀', 
    '핸드스탠드', '핸드스탠드 푸시업', '케이블 리버스 플라이', '바벨 업라이트 로우', 
    '덤벨 업라이트 로우', '이지바 업라이트 로우', '푸시 프레스', '리어 델토이드 플라이 머신', 
    '레터럴 레이즈 머신', '케이블 레터럴 레이즈', '케이블 프론트 레이즈', '이지바 프론트 레이즈', 
    '시티드 덤벨 리어 레터럴 레이즈', '숄더 탭', '시티드 바벨 숄더 프레스', '시티드 덤벨 숄더 프레스', 
    '플레이트 숄더 프레스', 'Y 레이즈', '덤벨 Y 레이즈', '슈러그 머신', '케이블 슈러그', 
    '케이블 인터널 로테이션', '케이블 익스터널 로테이션', '원암 케이블 레터럴 레이즈', 
    '랜드마인 프레스', '원암 랜드마인 프레스'
  ],
  '팔': [
    '바벨 컬', '이지바 컬', '덤벨 컬', '덤벨 해머 컬', '클로즈 그립 벤치프레스', 
    '덤벨 트라이셉 익스텐션', '시티드 덤벨 트라이셉 익스텐션', '케이블 트라이셉 익스텐션', 
    '덤벨 킥백', '바벨 리스트 컬', '이지바 리스트 컬', '덤벨 리스트 컬', '스컬 크러셔', 
    '바벨 라잉 트라이셉 익스텐션', '케이블 푸시 다운', '덤벨 프리쳐 컬', '바벨 프리쳐 컬', 
    '이지바 프리쳐 컬', '프리쳐 컬 머신', '암 컬 머신', '케이블 해머컬', 
    '케이블 오버헤드 트라이셉 익스텐션', '케이블 라잉 트라이셉 익스텐션', '리버스 바벨 리스트 컬', 
    '리버스 덤벨 리스트 컬', '인클라인 덤벨 컬', '벤치 딥s', '리스트 롤러', '리버스 바벨 컬', 
    '트라이셉 익스텐션 머신'
  ],
  '복근': [
    '싯업', '브이 업', '크런치', '힐 터치', '레그 레이즈', '행잉 레그 레이즈', 
    '러시안 트위스트', '할로우 락', '할로우 포지션', '플랭크', '덤벨 사이드 벤드', 
    '복근 롤아웃', '복근 에어 바이크', '토즈투 바', '행잉 니 레이즈', '복근 크런치 머신', 
    '케이블 크런치', '필라테스 잭나이프', '리버스 크런치', '사이드 플랭크', '45도 사이드 벤드', 
    'RKC 플랭크', '케이블 사이드 벤드', '디클라인 크런치', '중량 디클라인 크런치', 
    '디클라인 리버스 크런치', '디클라인 싯업', '중량 디클라인 싯업', '사이드 크런치', 
    '케이블 트위스트', '업도미널 힙 쓰러스트', '중량 업도미널 힙 쓰러스트', '토르소 로테이션 머신', 
    '시티드 니업', '복근 코스터 머신', '플랭크 트위스트', '데드버그', '버드독', 
    '캡틴스 체어 니 레이즈', '캣 카우 스트레치'
  ],
  '역도': [
    '클린', '클린 & 저크', '저크', '스내치', '덤벨 스내치', '케틀벨 스내치', 
    '스내치 밸런스', '중량 행잉 니 레이즈', '행 클린', '행 스내치', '클린 하이풀', '스내치 하이풀'
  ],
  '유산소': [
    '트레드밀', '싸이클', '로잉 머신', '계단 오르기', '줄넘기', '이단 뛰기', 
    '하이니 스킵', '어썰트 바이크', '스텝밀', '일립티컬 머신', '걷기', '달리기', 
    '수영', '스키 머신'
  ],
  '기타': [
    '쓰러스터', '버피', '케틀벨 SWing', '파머스 워크', '월볼 샷', '마운틴 클라이머', 
    '박스 점프', '점핑 잭', '바 머슬업', '링 머슬업', '배틀링 로프', '덤벨 버피', 
    '덤벨 쓰러스터', '인치웜', '스모 데드리프트 하이풀', '케틀벨 스모 하이풀', '터키쉬 겟업', 
    '스탠드 투 스탠드 브릿지', '풀 백 브릿지', '요가', '킥복싱', '타이슨 푸시업', 
    '원암 케틀벨 스윙', '데빌 프레스'
  ]
};

export default function Routine() {
  const navigate = useNavigate();

  const [routines, setRoutines] = useState([
    { id: 1, title: '🔥 상체 파괴 3분할 (가슴/삼두)', exercises: ['벤치프레스', '인클라인 벤치프레스', '딥스'] },
    { id: 2, title: '🦵 하체 & 코어 찢기', exercises: ['바벨 백스쿼트', '레그 프레스', '플랭크'] },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRoutineId, setEditingRoutineId] = useState(null);
  
  const [newTitle, setNewTitle] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('가슴');
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');

  const [selectedRoutineForDetail, setSelectedRoutineForDetail] = useState(null);
  
  // 📅 운동 기록 캘린더 관련 상태
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [workoutHistory, setWorkoutHistory] = useState([]);
  const [editingRecord, setEditingRecord] = useState(null); // 수정 중인 운동 기록 객체

  const openHistoryModal = () => {
    const savedHistory = JSON.parse(localStorage.getItem('lifton_workout_history') || '[]');
    setWorkoutHistory(savedHistory);
    setEditingRecord(null);
    setIsHistoryModalOpen(true);
  };

  // 🗑️ 과거 운동 기록 삭제 핸들러
  const handleDeleteRecord = (id) => {
    if (window.confirm('이 운동 기록을 정말 삭제하시겠습니까?')) {
      const updated = workoutHistory.filter((item) => item.id !== id);
      setWorkoutHistory(updated);
      localStorage.setItem('lifton_workout_history', JSON.stringify(updated));
    }
  };

  // ✏️ 과거 운동 기록 수정 저장 핸들러
  const handleSaveEditedRecord = (e) => {
    e.preventDefault();
    const updatedHistory = workoutHistory.map((item) => item.id === editingRecord.id ? editingRecord : item);
    setWorkoutHistory(updatedHistory);
    localStorage.setItem('lifton_workout_history', JSON.stringify(updatedHistory));
    setEditingRecord(null);
    alert('✏️ 운동 기록이 수정되었습니다!');
  };

  // 기록 내 세트 중량/횟수 변경 핸들러
  const handleRecordSetChange = (exName, setIdx, field, value) => {
    const updatedData = { ...editingRecord.data };
    updatedData[exName][setIdx][field] = value;
    setEditingRecord({ ...editingRecord, data: updatedData });
  };

  const toggleExercise = (ex) => {
    if (selectedExercises.includes(ex)) {
      setSelectedExercises(selectedExercises.filter((item) => item !== ex));
    } else {
      setSelectedExercises([...selectedExercises, ex]);
    }
  };

  const handleSaveRoutine = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) {
      alert('루틴 이름을 입력해 주세요!');
      return;
    }
    if (selectedExercises.length === 0) {
      alert('최소 1개 이상의 운동 종목을 선택해 주세요!');
      return;
    }

    if (editingRoutineId) {
      setRoutines(routines.map((r) => r.id === editingRoutineId ? { ...r, title: newTitle, exercises: selectedExercises } : r));
      alert('✏️ 루틴이 성공적으로 수정되었습니다!');
    } else {
      const newRoutineObj = {
        id: Date.now(),
        title: newTitle,
        exercises: selectedExercises,
      };
      setRoutines([newRoutineObj, ...routines]);
      alert('✨ 새 루틴이 추가되었습니다!');
    }

    closeModal();
  };

  const handleDeleteRoutine = (e, id) => {
    e.stopPropagation();
    if (window.confirm('정말 이 루틴을 삭제하시겠습니까?')) {
      setRoutines(routines.filter((r) => r.id !== id));
      if (selectedRoutineForDetail?.id === id) {
        setSelectedRoutineForDetail(null);
      }
    }
  };

  const openEditModal = (e, routine) => {
    e.stopPropagation();
    setEditingRoutineId(routine.id);
    setNewTitle(routine.title);
    setSelectedExercises([...routine.exercises]);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingRoutineId(null);
    setNewTitle('');
    setSelectedExercises([]);
    setSearchKeyword('');
  };

  const getFilteredExercises = () => {
    if (searchKeyword.trim() !== '') {
      const allExercises = Object.values(EXERCISE_DATABASE).flat();
      return allExercises.filter((ex) => ex.toLowerCase().includes(searchKeyword.toLowerCase()));
    }
    return EXERCISE_DATABASE[selectedCategory] || [];
  };

  const currentExerciseList = getFilteredExercises();

  return (
    <div className="container" style={{ padding: '40px 20px', maxWidth: '800px', position: 'relative' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', flexWrap: 'wrap', gap: '15px' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--text)', marginBottom: '8px' }}>
            나만의 루틴
          </h1>
          <p style={{ color: 'var(--sub)', margin: 0, fontSize: '0.95rem' }}>
            나만의 맞춤형 운동 루틴과 지난 운동 기록을 관리하세요.
          </p>
        </div>
        
        <div style={{ display: 'flex', gap: '10px' }}>
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
            onClick={() => {
              setEditingRoutineId(null);
              setNewTitle('');
              setSelectedExercises([]);
              setIsModalOpen(true);
            }}
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
            onClick={() => setSelectedRoutineForDetail(routine)}
            style={{ 
              backgroundColor: 'var(--surface)', 
              border: '1px solid var(--border)', 
              borderRadius: '14px', 
              padding: '24px',
              transition: 'transform 0.2s, border-color 0.2s',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
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
            <div>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--text)', margin: '0 0 6px 0' }}>{routine.title}</h3>
              <div style={{ fontSize: '0.85rem', color: 'var(--sub)' }}>
                포함된 운동: {routine.exercises.length}개 종목
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px' }} onClick={(e) => e.stopPropagation()}>
              <button 
                onClick={(e) => openEditModal(e, routine)}
                style={{ backgroundColor: '#222', border: '1px solid var(--border)', color: '#ccc', padding: '6px 12px', borderRadius: '8px', fontSize: '0.85rem', cursor: 'pointer' }}
              >
                수정
              </button>
              <button 
                onClick={(e) => handleDeleteRoutine(e, routine.id)}
                style={{ backgroundColor: '#222', border: '1px solid #ff4d4d', color: '#ff4d4d', padding: '6px 12px', borderRadius: '8px', fontSize: '0.85rem', cursor: 'pointer' }}
              >
                삭제
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 루틴 상세 보기 모달 */}
      {selectedRoutineForDetail && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, padding: '20px'
        }}>
          <div style={{
            backgroundColor: 'var(--surface)', padding: '30px', borderRadius: '16px',
            width: '100%', maxWidth: '500px', border: '1px solid var(--border)', boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
            maxHeight: '85vh', overflowY: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <h2 style={{ fontSize: '1.4rem', color: 'var(--text)', margin: 0 }}>{selectedRoutineForDetail.title}</h2>
              <button 
                onClick={() => setSelectedRoutineForDetail(null)}
                style={{ background: 'transparent', border: 'none', color: '#888', fontSize: '1.2rem', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '30px' }}>
              {selectedRoutineForDetail.exercises.map((ex, idx) => (
                <div key={idx} style={{ 
                  backgroundColor: '#181818', border: '1px solid #2c2c2c', padding: '12px 16px', 
                  borderRadius: '10px', color: '#fff', fontSize: '0.95rem', fontWeight: '600',
                  display: 'flex', alignItems: 'center', gap: '10px'
                }}>
                  <span style={{ color: 'var(--primary)' }}>#</span> {ex}
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button 
                onClick={() => setSelectedRoutineForDetail(null)}
                style={{
                  flex: 1, padding: '12px', borderRadius: '8px', backgroundColor: 'transparent',
                  border: '1px solid var(--border)', color: 'var(--sub)', fontWeight: '600', cursor: 'pointer'
                }}
              >
                닫기
              </button>
              <button 
                onClick={() => navigate('/workout', { state: { routine: selectedRoutineForDetail } })}
                style={{
                  flex: 1.5, padding: '12px', borderRadius: '8px', backgroundColor: 'var(--primary)',
                  border: 'none', color: '#fff', fontWeight: '700', cursor: 'pointer'
                }}
              >
                운동 시작하기 🚀
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 📅 운동 기록 캘린더 및 수정/삭제 모달 */}
      {isHistoryModalOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, padding: '20px'
        }}>
          <div style={{
            backgroundColor: 'var(--surface)', padding: '30px', borderRadius: '16px',
            width: '100%', maxWidth: '650px', border: '1px solid var(--border)', boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
            maxHeight: '85vh', overflowY: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '1.5rem', color: 'var(--text)', margin: 0 }}>
                {editingRecord ? '✏️ 운동 기록 수정하기' : '📅 나의 운동 기록 캘린더'}
              </h2>
              <button 
                onClick={() => {
                  if (editingRecord) setEditingRecord(null);
                  else setIsHistoryModalOpen(false);
                }}
                style={{ background: 'transparent', border: 'none', color: '#888', fontSize: '1.2rem', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            {/* 기록 수정 폼 */}
            {editingRecord ? (
              <form onSubmit={handleSaveEditedRecord} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ fontSize: '0.9rem', color: 'var(--primary)', fontWeight: '700' }}>
                  날짜: {editingRecord.date} | 루틴명: {editingRecord.title}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxHeight: '50vh', overflowY: 'auto' }}>
                  {Object.entries(editingRecord.data || {}).map(([exName, sets]) => (
                    <div key={exName} style={{ backgroundColor: '#121212', padding: '14px', borderRadius: '10px', border: '1px solid #2c2c2c' }}>
                      <div style={{ fontSize: '1rem', fontWeight: '600', color: 'var(--text)', marginBottom: '10px' }}># {exName}</div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {sets.map((s, sIdx) => (
                          <div key={sIdx} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem', color: '#ccc' }}>
                            <span style={{ width: '50px', fontWeight: '700' }}>{s.set}세트</span>
                            <input 
                              type="number"
                              value={s.weight}
                              onChange={(e) => handleRecordSetChange(exName, sIdx, 'weight', e.target.value)}
                              placeholder="중량"
                              style={{ width: '80px', padding: '6px', backgroundColor: '#222', border: '1px solid #444', color: '#fff', borderRadius: '6px', textAlign: 'center' }}
                            /> kg / 
                            <input 
                              type="number"
                              value={s.reps}
                              onChange={(e) => handleRecordSetChange(exName, sIdx, 'reps', e.target.value)}
                              placeholder="횟수"
                              style={{ width: '80px', padding: '6px', backgroundColor: '#222', border: '1px solid #444', color: '#fff', borderRadius: '6px', textAlign: 'center' }}
                            /> 회
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button 
                    type="button"
                    onClick={() => setEditingRecord(null)}
                    style={{ flex: 1, padding: '10px', backgroundColor: 'transparent', border: '1px solid var(--border)', color: 'var(--sub)', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}
                  >
                    취소
                  </button>
                  <button 
                    type="submit"
                    style={{ flex: 1, padding: '10px', backgroundColor: 'var(--primary)', border: 'none', color: '#fff', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}
                  >
                    수정 완료
                  </button>
                </div>
              </form>
            ) : (
              // 기록 목록 뷰
              workoutHistory.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--sub)' }}>
                  <p style={{ fontSize: '1rem', marginBottom: '8px' }}>아직 저장된 운동 기록이 없습니다.</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {workoutHistory.map((record) => (
                    <div key={record.id} style={{ backgroundColor: '#181818', border: '1px solid #2c2c2c', borderRadius: '12px', padding: '18px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                        <span style={{ backgroundColor: 'var(--primary)', color: '#fff', padding: '4px 10px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: '700' }}>
                          {record.date}
                        </span>
                        
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <h3 style={{ fontSize: '1.1rem', color: 'var(--text)', margin: 0 }}>{record.title}</h3>
                          {/* ✏️ 수정 / 🗑️ 삭제 버튼 */}
                          <div style={{ display: 'flex', gap: '6px' }}>
                            <button 
                              onClick={() => setEditingRecord(record)}
                              style={{ backgroundColor: '#222', border: '1px solid var(--border)', color: '#ccc', padding: '4px 8px', borderRadius: '6px', fontSize: '0.75rem', cursor: 'pointer' }}
                            >
                              수정
                            </button>
                            <button 
                              onClick={() => handleDeleteRecord(record.id)}
                              style={{ backgroundColor: '#222', border: '1px solid #ff4d4d', color: '#ff4d4d', padding: '4px 8px', borderRadius: '6px', fontSize: '0.75rem', cursor: 'pointer' }}
                            >
                              삭제
                            </button>
                          </div>
                        </div>
                      </div>

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
              )
            )}
          </div>
        </div>
      )}

      {/* 새 루틴 생성 / 수정 통합 모달 */}
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
            <h2 style={{ fontSize: '1.5rem', marginBottom: '20px', color: 'var(--text)' }}>
              {editingRoutineId ? '✏️ 루틴 수정하기' : '✨ 새 루틴 만들기'}
            </h2>
            
            <form onSubmit={handleSaveRoutine} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
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
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--sub)' }}>운동 종목 검색 및 선택</label>
                
                <input 
                  type="text"
                  placeholder="🔍 찾으시는 운동 이름을 검색하세요"
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  style={{
                    width: '100%', padding: '10px 14px', borderRadius: '8px', backgroundColor: '#121212',
                    border: '1px solid var(--primary)', color: 'var(--text)', fontSize: '0.9rem', marginBottom: '12px'
                  }}
                />

                {!searchKeyword.trim() && (
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
                )}

                <div style={{ 
                  display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', 
                  maxHeight: '220px', overflowY: 'auto', padding: '4px' 
                }}>
                  {currentExerciseList.length === 0 ? (
                    <div style={{ gridColumn: 'span 2', textAlign: 'center', padding: '20px', color: '#777', fontSize: '0.85rem' }}>
                      검색 결과가 없습니다.
                    </div>
                  ) : (
                    currentExerciseList.map((ex, index) => {
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
                          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{ex}</span>
                          <span style={{ fontSize: '0.8rem', fontWeight: '700', flexShrink: 0, marginLeft: '6px' }}>{isSelected ? '✓' : '+'}</span>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button 
                  type="button" 
                  onClick={closeModal}
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
                  {editingRoutineId ? '수정 완료' : '루틴 저장하기'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}