import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// 🏋️‍♂️ 운동 중 추가/교체 시 고를 수 있는 전체 운동 도감
const EXERCISE_DATABASE = {
  '가슴': ['벤치프레스', '인클라인 벤치프레스', '디클라인 벤치프레스', '덤벨 프레스', '인클라인 덤벨 프레스', '덤벨 플라이', '딥스', '푸시업', '체스트 프레스 머신', '펙덱 플라이'],
  '등': ['데드리프트', '랫 풀다운', '바벨 로우', '시티드 로우', '턱걸이(풀업)', '원 암 덤벨 로우', '티바 로우', '랫 풀다운(언더그립)', '케이블 풀다운', '백 익스텐션'],
  '하체': ['바벨 스쿼트', '프론트 스쿼트', '레그 프레스', '레그 컬', '레그 익스텐션', '런지', '카프 레이즈', '불가리안 스플릿 스쿼트', '아파트 핵 스쿼트', '스탠딩 레그 컬'],
  '어깨': ['오버헤드 프레스', '사이드 레터럴 레이즈', '덤벨 숄더 프레스', '페이스 풀', '프론트 레이즈', '벤트오버 레이즈', 'ARNOLD 프레스', '업라이트 로우', '케이블 사이드 레터럴 레이즈'],
  '팔': ['바벨 컬', '덤벨 컬', '해머 컬', '프리처 컬', '트라이셉스 푸시다운', '라잉 트라이셉스 익스텐션', '오버헤드 덤벨 익스텐션', '케이블 오버헤드 익스텐션', '킥백'],
  '복근/코어': ['플랭크', '행잉 레그 레이즈', '크런치', '케이블 크런치', '앱휠(복근 롤아웃)', '러시안 트위스트', '레그 레이즈'],
  '유산소': ['런닝머신(인터벌)', '천국의 계단(스텝밀)', '사이클', '로잉 머신', '버피 테스트', '줄넘기']
};

export default function WorkoutSession() {
  const navigate = useNavigate();
  const location = useLocation();

  const routine = location.state?.routine || {
    title: '🔥 오늘의 프리웨이트 루틴',
    exercises: ['벤치프레스', '바벨 스쿼트', '데드리프트']
  };

  // 현재 진행 중인 운동 목록 상태 (운동 추가/교체 시 실시간으로 반영됨)
  const [exerciseList, setExerciseList] = useState(routine.exercises);

  // 세트 데이터 관리
  const [workoutData, setWorkoutData] = useState(() => {
    const initialData = {};
    routine.exercises.forEach((ex) => {
      initialData[ex] = [
        { set: 1, weight: '', reps: '', done: false },
        { set: 2, weight: '', reps: '', done: false },
        { set: 3, weight: '', reps: '', done: false },
      ];
    });
    return initialData;
  });

  // ⏱️ 휴식 타이머 상태
  const [restTimeSetting, setRestTimeSetting] = useState(60);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);

  // 🔄 운동 추가/교체 모달 상태
  const [isPickerModalOpen, setIsPickerModalOpen] = useState(false);
  const [pickerMode, setPickerMode] = useState('add'); // 'add' (추가) 또는 'replace' (교체)
  const [targetExerciseForReplace, setTargetExerciseForReplace] = useState(null); // 교체할 대상 운동 이름
  const [selectedCategory, setSelectedCategory] = useState('가슴');

  useEffect(() => {
    let timer = null;
    if (isTimerActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsTimerActive(false);
    }
    return () => clearInterval(timer);
  }, [isTimerActive, timeLeft]);

  // 무게/횟수 입력 핸들러
  const handleInputChange = (exerciseName, setIndex, field, value) => {
    const updated = { ...workoutData };
    updated[exerciseName][setIndex][field] = value;
    setWorkoutData(updated);
  };

  // ⚡ 무게 빠르게 더하고 빼는 함수 (+5kg, +10kg 등)
  const handleAddWeight = (exerciseName, setIndex, amount) => {
    const updated = { ...workoutData };
    const currentWeight = Number(updated[exerciseName][setIndex].weight) || 0;
    const newWeight = Math.max(0, currentWeight + amount);
    updated[exerciseName][setIndex].weight = newWeight === 0 ? '' : newWeight.toString();
    setWorkoutData(updated);
  };

  // 세트 완료 토글 + 휴식 타이머 자동 실행
  const toggleSetDone = (exerciseName, setIndex) => {
    const updated = { ...workoutData };
    const targetSet = updated[exerciseName][setIndex];
    targetSet.done = !targetSet.done;
    setWorkoutData(updated);

    if (targetSet.done) {
      setTimeLeft(restTimeSetting);
      setIsTimerActive(true);
    }
  };

  // 세트 추가하기
  const addSet = (exerciseName) => {
    const updated = { ...workoutData };
    const currentSets = updated[exerciseName];
    const newSetNumber = currentSets.length + 1;
    const lastSet = currentSets[currentSets.length - 1] || { weight: '', reps: '' };
    
    currentSets.push({
      set: newSetNumber,
      weight: lastSet.weight,
      reps: lastSet.reps,
      done: false
    });
    setWorkoutData(updated);
  };

  // 세트 삭제하기
  const removeSet = (exerciseName) => {
    const updated = { ...workoutData };
    const currentSets = updated[exerciseName];
    if (currentSets.length <= 1) {
      alert('최소 1개의 세트는 유지해야 합니다!');
      return;
    }
    currentSets.pop();
    setWorkoutData(updated);
  };

  // ❌ 운동 종목 삭제하기
  const removeExercise = (exerciseName) => {
    if (exerciseList.length <= 1) {
      alert('최소 1개 이상의 운동 종목은 유지해야 합니다!');
      return;
    }
    setExerciseList(exerciseList.filter((ex) => ex !== exerciseName));
    const updatedData = { ...workoutData };
    delete updatedData[exerciseName];
    setWorkoutData(updatedData);
  };

  // ➕ 운동 추가 모달 열기
  const openAddExerciseModal = () => {
    setPickerMode('add');
    setIsPickerModalOpen(true);
  };

  // 🔄 운동 교체 모달 열기
  const openReplaceExerciseModal = (exName) => {
    setPickerMode('replace');
    setTargetExerciseForReplace(exName);
    setIsPickerModalOpen(true);
  };

  // 운동 선택 완료 (추가 또는 교체 수행)
  const handleSelectExerciseFromPicker = (selectedEx) => {
    if (exerciseList.includes(selectedEx) && pickerMode === 'add') {
      alert('이미 루틴에 포함된 운동입니다!');
      return;
    }

    if (pickerMode === 'add') {
      // 새 운동 추가
      setExerciseList([...exerciseList, selectedEx]);
      setWorkoutData({
        ...workoutData,
        [selectedEx]: [
          { set: 1, weight: '', reps: '', done: false },
          { set: 2, weight: '', reps: '', done: false },
          { set: 3, weight: '', reps: '', done: false },
        ]
      });
    } else if (pickerMode === 'replace' && targetExerciseForReplace) {
      // 기존 운동 교체
      const newList = exerciseList.map((ex) => (ex === targetExerciseForReplace ? selectedEx : ex));
      setExerciseList(newList);

      const updatedData = { ...workoutData };
      updatedData[selectedEx] = updatedData[targetExerciseForReplace] || [
        { set: 1, weight: '', reps: '', done: false },
        { set: 2, weight: '', reps: '', done: false },
        { set: 3, weight: '', reps: '', done: false },
      ];
      delete updatedData[targetExerciseForReplace];
      setWorkoutData(updatedData);
    }

    setIsPickerModalOpen(false);
  };

  // 운동 완료 기록 저장
  const handleFinishWorkout = () => {
    const today = new Date().toISOString().split('T')[0];
    
    const workoutRecord = {
      id: Date.now(),
      date: today,
      title: routine.title,
      data: workoutData
    };

    const existingRecords = JSON.parse(localStorage.getItem('lifton_workout_history') || '[]');
    const updatedRecords = [workoutRecord, ...existingRecords];
    
    localStorage.setItem('lifton_workout_history', JSON.stringify(updatedRecords));

    alert('🎉 오늘 운동 기록이 캘린더에 안전하게 저장되었습니다!');
    navigate('/routine');
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="container" style={{ padding: '40px 20px', maxWidth: '800px', paddingBottom: '120px' }}>
      
      {/* ⏱️ 상단 고정 휴식 타이머 바 */}
      <div style={{
        backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '14px',
        padding: '16px 20px', marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--sub)', marginBottom: '2px' }}>휴식 타이머</div>
            <div style={{ fontSize: '1.5rem', fontWeight: '700', color: isTimerActive ? 'var(--primary)' : 'var(--text)' }}>
              {isTimerActive ? formatTime(timeLeft) : (timeLeft === 0 && isTimerActive === false ? '휴식 완료!' : formatTime(restTimeSetting))}
            </div>
          </div>
          {isTimerActive && (
            <button 
              onClick={() => setIsTimerActive(false)}
              style={{ background: '#333', border: 'none', color: '#fff', padding: '6px 12px', borderRadius: '6px', fontSize: '0.8rem', cursor: 'pointer' }}
            >
              타이머 일시정지
            </button>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--sub)' }}>휴식 설정:</span>
          <select 
            value={restTimeSetting}
            onChange={(e) => setRestTimeSetting(Number(e.target.value))}
            style={{
              backgroundColor: '#121212', color: 'var(--text)', border: '1px solid var(--border)',
              padding: '8px 12px', borderRadius: '8px', fontSize: '0.9rem', fontWeight: '600', cursor: 'pointer'
            }}
          >
            <option value={30}>30초</option>
            <option value={45}>45초</option>
            <option value={60}>60초 (1분)</option>
            <option value={90}>90초 (1분 30초)</option>
            <option value={120}>120초 (2분)</option>
            <option value={180}>180초 (3분)</option>
          </select>
        </div>
      </div>

      {/* 상단 헤더 및 타이틀 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '15px' }}>
        <div>
          <span 
            onClick={() => navigate('/routine')} 
            style={{ color: 'var(--sub)', cursor: 'pointer', fontSize: '0.9rem', display: 'inline-block', marginBottom: '8px' }}
          >
            ← 루틴 목록으로 돌아가기
          </span>
          <h1 style={{ fontSize: '1.8rem', fontWeight: '700', color: 'var(--text)' }}>
            {routine.title}
          </h1>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          {/* 운동 추가 버튼 */}
          <button 
            onClick={openAddExerciseModal}
            style={{ background: '#222', border: '1px solid var(--border)', color: 'var(--text)', padding: '12px 16px', borderRadius: '10px', fontWeight: '600', cursor: 'pointer', fontSize: '0.9rem' }}
          >
            + 운동 추가
          </button>

          <button 
            onClick={handleFinishWorkout}
            className="btn"
            style={{ background: 'var(--primary)', color: '#fff', border: 'none', padding: '12px 20px' }}
          >
            운동 완료하기 🎉
          </button>
        </div>
      </div>

      {/* 운동 종목별 세트 기록 카드 리스트 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {exerciseList.map((exName, idx) => (
          <div 
            key={idx}
            style={{ 
              backgroundColor: 'var(--surface)', 
              border: '1px solid var(--border)', 
              borderRadius: '16px', 
              padding: '24px' 
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
              <h3 style={{ fontSize: '1.3rem', color: 'var(--text)', display: 'flex', alignItems: 'center', gap: '10px', margin: 0 }}>
                <span style={{ color: 'var(--primary)' }}>#</span> {exName}
              </h3>
              
              <div style={{ display: 'flex', gap: '8px' }}>
                {/* 운동 교체 버튼 */}
                <button 
                  onClick={() => openReplaceExerciseModal(exName)}
                  style={{ background: 'transparent', border: '1px solid var(--border)', color: 'var(--sub)', padding: '6px 10px', borderRadius: '8px', fontSize: '0.8rem', cursor: 'pointer' }}
                >
                  운동 교체
                </button>
                {/* 운동 삭제 버튼 */}
                <button 
                  onClick={() => removeExercise(exName)}
                  style={{ background: 'transparent', border: '1px solid #ff4d4d', color: '#ff4d4d', padding: '6px 10px', borderRadius: '8px', fontSize: '0.8rem', cursor: 'pointer' }}
                >
                  운동 삭제
                </button>
                <button 
                  onClick={() => removeSet(exName)}
                  style={{ background: 'transparent', border: '1px solid #555', color: '#aaa', padding: '6px 10px', borderRadius: '8px', fontSize: '0.8rem', cursor: 'pointer' }}
                >
                  - 세트
                </button>
                <button 
                  onClick={() => addSet(exName)}
                  style={{ background: 'transparent', border: '1px solid var(--border)', color: 'var(--sub)', padding: '6px 10px', borderRadius: '8px', fontSize: '0.8rem', cursor: 'pointer' }}
                >
                  + 세트
                </button>
              </div>
            </div>

            {/* 테이블 헤더: 중량(kg)으로 변경됨 */}
            <div style={{ 
              display: 'grid', gridTemplateColumns: '60px 1.4fr 1fr 80px', gap: '10px', 
              marginBottom: '10px', fontSize: '0.85rem', color: 'var(--sub)', fontWeight: '600', textAlign: 'center' 
            }}>
              <div>세트</div>
              <div>중량 (kg)</div>
              <div>횟수 (rep)</div>
              <div>완료</div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {workoutData[exName]?.map((setItem, setIdx) => (
                <div 
                  key={setIdx}
                  style={{ 
                    display: 'grid', gridTemplateColumns: '60px 1.4fr 1fr 80px', gap: '10px', alignItems: 'center',
                    backgroundColor: setItem.done ? '#1a261a' : '#121212', 
                    padding: '12px', borderRadius: '8px', border: setItem.done ? '1px solid #2e7d32' : '1px solid var(--border)',
                    transition: '0.2s'
                  }}
                >
                  <div style={{ textAlign: 'center', fontWeight: '700', color: setItem.done ? '#4caf50' : 'var(--text)' }}>
                    {setItem.set}세트
                  </div>

                  {/* 무게 입력 및 +5kg, +10kg 빠른 조절 버튼 */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <input 
                      type="number" 
                      placeholder="0"
                      value={setItem.weight}
                      onChange={(e) => handleInputChange(exName, setIdx, 'weight', e.target.value)}
                      style={{ 
                        width: '100%', padding: '8px', borderRadius: '6px', backgroundColor: '#1a1a1a', 
                        border: '1px solid #333', color: '#fff', textAlign: 'center', fontSize: '1rem', fontWeight: '600' 
                      }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '4px' }}>
                      <button 
                        type="button" 
                        onClick={() => handleAddWeight(exName, setIdx, -5)}
                        style={{ flex: 1, backgroundColor: '#222', border: '1px solid #333', color: '#aaa', fontSize: '0.7rem', padding: '3px 0', borderRadius: '4px', cursor: 'pointer' }}
                      >
                        -5
                      </button>
                      <button 
                        type="button" 
                        onClick={() => handleAddWeight(exName, setIdx, 5)}
                        style={{ flex: 1, backgroundColor: '#222', border: '1px solid #333', color: 'var(--primary)', fontSize: '0.7rem', padding: '3px 0', borderRadius: '4px', cursor: 'pointer', fontWeight: '700' }}
                      >
                        +5
                      </button>
                      <button 
                        type="button" 
                        onClick={() => handleAddWeight(exName, setIdx, 10)}
                        style={{ flex: 1, backgroundColor: '#222', border: '1px solid #333', color: 'var(--primary)', fontSize: '0.7rem', padding: '3px 0', borderRadius: '4px', cursor: 'pointer', fontWeight: '700' }}
                      >
                        +10
                      </button>
                    </div>
                  </div>

                  {/* 횟수 입력 */}
                  <input 
                    type="number" 
                    placeholder="0"
                    value={setItem.reps}
                    onChange={(e) => handleInputChange(exName, setIdx, 'reps', e.target.value)}
                    style={{ 
                      width: '100%', padding: '10px', borderRadius: '6px', backgroundColor: '#1a1a1a', 
                      border: '1px solid #333', color: '#fff', textAlign: 'center', fontSize: '1rem', fontWeight: '600' 
                    }}
                  />

                  {/* 완료 체크 버튼 */}
                  <div style={{ textAlign: 'center' }}>
                    <button 
                      onClick={() => toggleSetDone(exName, setIdx)}
                      style={{ 
                        width: '100%', padding: '10px 0', borderRadius: '6px', cursor: 'pointer', fontWeight: '700',
                        backgroundColor: setItem.done ? '#4caf50' : '#2a2a2a',
                        color: setItem.done ? '#fff' : '#888',
                        border: 'none', transition: '0.2s'
                      }}
                    >
                      {setItem.done ? '✓ 완료' : '체크'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ➕ 운동 추가 / 🔄 교체용 종목 선택 팝업 모달 */}
      {isPickerModalOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, padding: '20px'
        }}>
          <div style={{
            backgroundColor: 'var(--surface)', padding: '30px', borderRadius: '16px',
            width: '100%', maxWidth: '550px', border: '1px solid var(--border)', boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
            maxHeight: '85vh', overflowY: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '1.4rem', color: 'var(--text)', margin: 0 }}>
                {pickerMode === 'add' ? '➕ 운동 추가하기' : '🔄 운동 교체하기'}
              </h2>
              <button 
                onClick={() => setIsPickerModalOpen(false)}
                style={{ background: 'transparent', border: 'none', color: '#888', fontSize: '1.2rem', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            {/* 부위별 탭 버튼 영역 */}
            <div style={{ display: 'flex', gap: '6px', marginBottom: '16px', overflowX: 'auto', paddingBottom: '4px' }}>
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

            {/* 해당 부위의 운동 종목 리스트 */}
            <div style={{ 
              display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', 
              maxHeight: '260px', overflowY: 'auto', padding: '4px' 
            }}>
              {EXERCISE_DATABASE[selectedCategory].map((ex, index) => (
                <div
                  key={index}
                  onClick={() => handleSelectExerciseFromPicker(ex)}
                  style={{
                    padding: '12px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.9rem',
                    backgroundColor: '#1a1a1a', border: '1px solid #2c2c2c', color: '#ddd',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    transition: '0.15s'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.borderColor = 'var(--primary)'}
                  onMouseOut={(e) => e.currentTarget.style.borderColor = '#2c2c2c'}
                >
                  <span>{ex}</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: '700' }}>선택 ➔</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}