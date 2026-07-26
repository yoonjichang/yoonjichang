import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function WorkoutSession() {
  const navigate = useNavigate();
  const location = useLocation();

  // 이전 페이지(Routine.jsx)에서 전달받은 루틴 정보 (없으면 기본값 설정)
  const routine = location.state?.routine || {
    title: '🔥 오늘의 프리웨이트 루틴',
    exercises: ['벤치프레스', '바벨 스쿼트', '데드리프트']
  };

  // 각 운동별 세트 기록 상태 관리 (기본으로 각 운동마다 3세트씩 세팅)
  // 구조: { '벤치프레스': [{set: 1, weight: '', reps: '', done: false}, ...], ... }
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

  // 무게나 횟수 입력 핸들러
  const handleInputChange = (exerciseName, setIndex, field, value) => {
    const updated = { ...workoutData };
    updated[exerciseName][setIndex][field] = value;
    setWorkoutData(updated);
  };

  // 세트 완료(체크) 토글 핸들러
  const toggleSetDone = (exerciseName, setIndex) => {
    const updated = { ...workoutData };
    updated[exerciseName][setIndex].done = !updated[exerciseName][setIndex].done;
    setWorkoutData(updated);
  };

  // 세트 추가하기 핸들러
  const addSet = (exerciseName) => {
    const updated = { ...workoutData };
    const currentSets = updated[exerciseName];
    const newSetNumber = currentSets.length + 1;
    // 이전 세트의 무게/횟수를 복사해 주면 편합니다!
    const lastSet = currentSets[currentSets.length - 1] || { weight: '', reps: '' };
    
    currentSets.push({
      set: newSetNumber,
      weight: lastSet.weight,
      reps: lastSet.reps,
      done: false
    });
    setWorkoutData(updated);
  };

  // 운동 완료 버튼 누를 때
  const handleFinishWorkout = () => {
    alert('🎉 오늘 운동을 완벽하게 끝냈습니다! 고생하셨습니다.');
    navigate('/routine'); // 루틴 페이지로 돌아가기
  };

  return (
    <div className="container" style={{ padding: '40px 20px', maxWidth: '800px', paddingBottom: '100px' }}>
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
            {/* 운동 종목 이름 */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.3rem', color: 'var(--text)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ color: 'var(--primary)' }}>#</span> {exName}
              </h3>
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

            {/* 세트 테이블 헤더 */}
            <div style={{ 
              display: 'grid', gridTemplateColumns: '60px 1fr 1fr 80px', gap: '10px', 
              marginBottom: '10px', fontSize: '0.85rem', color: 'var(--sub)', fontWeight: '600', textAlign: 'center' 
            }}>
              <div>세트</div>
              <div>중량 (kg)</div>
              <div>횟수 (rep)</div>
              <div>완료</div>
            </div>

            {/* 세트별 입력 행들 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {workoutData[exName]?.map((setItem, setIdx) => (
                <div 
                  key={setIdx}
                  style={{ 
                    display: 'grid', gridTemplateColumns: '60px 1fr 1fr 80px', gap: '10px', alignItems: 'center',
                    backgroundColor: setItem.done ? '#1a261a' : '#121212', 
                    padding: '8px', borderRadius: '8px', border: setItem.done ? '1px solid #2e7d32' : '1px solid var(--border)',
                    transition: '0.2s'
                  }}
                >
                  {/* 세트 번호 */}
                  <div style={{ textAlign: 'center', fontWeight: '700', color: setItem.done ? '#4caf50' : 'var(--text)' }}>
                    {setItem.set}세트
                  </div>

                  {/* 무게 입력 */}
                  <input 
                    type="number" 
                    placeholder="0"
                    value={setItem.weight}
                    onChange={(e) => handleInputChange(exName, setIdx, 'weight', e.target.value)}
                    style={{ 
                      width: '100%', padding: '10px', borderRadius: '6px', backgroundColor: '#1a1a1a', 
                      border: '1px solid #333', color: '#fff', textAlign: 'center', fontSize: '1rem', fontWeight: '600' 
                    }}
                  />

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
    </div>
  );
}