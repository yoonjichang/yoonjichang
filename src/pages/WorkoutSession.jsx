import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function WorkoutSession() {
  const navigate = useNavigate();
  const location = useLocation();

  const routine = location.state?.routine || {
    title: '🔥 오늘의 프리웨이트 루틴',
    exercises: ['벤치프레스', '바벨 스쿼트', '데드리프트']
  };

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

  // ⏱️ 타이머 및 휴식 시간 설정 상태
  const [restTimeSetting, setRestTimeSetting] = useState(60);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);

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

  // 🗑️ 세트 삭제하기
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

  // 💾 [핵심] 운동 완료 버튼 누를 때 캘린더 기록용으로 저장하기
  const handleFinishWorkout = () => {
    const today = new Date().toISOString().split('T')[0]; // 오늘 날짜 (YYYY-MM-DD)
    
    const workoutRecord = {
      id: Date.now(),
      date: today,
      title: routine.title,
      data: workoutData // 세트, 무게, 횟수, 완료 여부 데이터 통째로 저장
    };

    // 기존 기록 불러와서 맨 앞에 추가하기
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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
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

        <button 
          onClick={handleFinishWorkout}
          className="btn"
          style={{ background: 'var(--primary)', color: '#fff', border: 'none', padding: '12px 20px' }}
        >
          운동 완료하기 🎉
        </button>
      </div>

      {/* 운동 종목별 세트 기록 카드 리스트 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {routine.exercises.map((exName, idx) => (
          <div 
            key={idx}
            style={{ 
              backgroundColor: 'var(--surface)', 
              border: '1px solid var(--border)', 
              borderRadius: '16px', 
              padding: '24px' 
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.3rem', color: 'var(--text)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ color: 'var(--primary)' }}>#</span> {exName}
              </h3>
              
              <div style={{ display: 'flex', gap: '8px' }}>
                <button 
                  onClick={() => removeSet(exName)}
                  style={{ 
                    background: 'transparent', border: '1px solid #ff4d4d', color: '#ff4d4d', 
                    padding: '6px 12px', borderRadius: '8px', fontSize: '0.85rem', cursor: 'pointer' 
                  }}
                >
                  - 세트 삭제
                </button>
                <button 
                  onClick={() => addSet(exName)}
                  style={{ 
                    background: 'transparent', border: '1px solid var(--border)', color: 'var(--sub)', 
                    padding: '6px 12px', borderRadius: '8px', fontSize: '0.85rem', cursor: 'pointer' 
                  }}
                >
                  + 세트 추가
                </button>
              </div>
            </div>

            <div style={{ 
              display: 'grid', gridTemplateColumns: '60px 1.4fr 1fr 80px', gap: '10px', 
              marginBottom: '10px', fontSize: '0.85rem', color: 'var(--sub)', fontWeight: '600', textAlign: 'center' 
            }}>
              <div>세트</div>
              <div>중량 (kg) & 빠른 조절</div>
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
    </div>
  );
}