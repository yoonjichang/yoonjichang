import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

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
    '리버스 덤벨 리스트 컬', '인클라인 덤벨 컬', '벤치 딥스', '리스트 롤러', '리버스 바벨 컬', 
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
    '쓰러스터', '버피', '케틀벨 스윙', '파머스 워크', '월볼 샷', '마운틴 클라이머', 
    '박스 점프', '점핑 잭', '바 머슬업', '링 머슬업', '배틀링 로프', '덤벨 버피', 
    '덤벨 쓰러스터', '인치웜', '스모 데드리프트 하이풀', '케틀벨 스모 하이풀', '터키쉬 겟업', 
    '스탠드 투 스탠드 브릿지', '풀 백 브릿지', '요가', '킥복싱', '타이슨 푸시업', 
    '원암 케틀벨 스윙', '데빌 프레스'
  ]
};

export default function WorkoutSession() {
  const navigate = useNavigate();
  const location = useLocation();

  const routine = location.state?.routine || {
    title: '🔥 오늘의 프리웨이트 루틴',
    exercises: ['벤치프레스', '바벨 스쿼트', '데드리프트']
  };

  const [exerciseList, setExerciseList] = useState(routine.exercises);

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

  // ↕️ 운동 순서 위로 이동
  const moveExerciseUp = (index) => {
    if (index === 0) return; // 맨 첫 번째면 불가
    const newList = [...exerciseList];
    const temp = newList[index];
    newList[index] = newList[index - 1];
    newList[index - 1] = temp;
    setExerciseList(newList);
  };

  // ↕️ 운동 순서 아래로 이동
  const moveExerciseDown = (index) => {
    if (index === exerciseList.length - 1) return; // 맨 마지막이면 불가
    const newList = [...exerciseList];
    const temp = newList[index];
    newList[index] = newList[index + 1];
    newList[index + 1] = temp;
    setExerciseList(newList);
  };

  const getLastWorkoutRecordForExercise = (exName) => {
    try {
      const history = JSON.parse(localStorage.getItem('lifton_workout_history') || '[]');
      for (const record of history) {
        if (record.data && record.data[exName]) {
          return {
            date: record.date,
            sets: record.data[exName]
          };
        }
      }
    } catch (e) {
      console.error(e);
    }
    return null;
  };

  const handleLoadLastRecord = (exName) => {
    const lastRecord = getLastWorkoutRecordForExercise(exName);
    if (!lastRecord || !lastRecord.sets) {
      alert('불러올 이전 기록이 없습니다!');
      return;
    }

    const clonedSets = lastRecord.sets.map((s, idx) => ({
      set: idx + 1,
      weight: s.weight || '',
      reps: s.reps || '',
      done: false
    }));

    setWorkoutData({
      ...workoutData,
      [exName]: clonedSets
    });

    alert(`📌 ${exName}의 직전 기록(${lastRecord.date})을 불러왔습니다!`);
  };

  const [restTimeSetting, setRestTimeSetting] = useState(60);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);

  const [isPickerModalOpen, setIsPickerModalOpen] = useState(false);
  const [pickerMode, setPickerMode] = useState('add');
  const [targetExerciseForReplace, setTargetExerciseForReplace] = useState(null);
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

  const handleInputChange = (exerciseName, setIndex, field, value) => {
    const updated = { ...workoutData };
    updated[exerciseName][setIndex][field] = value;
    setWorkoutData(updated);
  };

  const handleAddWeight = (exerciseName, setIndex, amount) => {
    const updated = { ...workoutData };
    const currentWeight = Number(updated[exerciseName][setIndex].weight) || 0;
    const newWeight = Math.max(0, currentWeight + amount);
    updated[exerciseName][setIndex].weight = newWeight === 0 ? '' : newWeight.toString();
    setWorkoutData(updated);
  };

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

  const openAddExerciseModal = () => {
    setPickerMode('add');
    setIsPickerModalOpen(true);
  };

  const openReplaceExerciseModal = (exName) => {
    setPickerMode('replace');
    setTargetExerciseForReplace(exName);
    setIsPickerModalOpen(true);
  };

  const handleSelectExerciseFromPicker = (selectedEx) => {
    if (exerciseList.includes(selectedEx) && pickerMode === 'add') {
      alert('이미 루틴에 포함된 운동입니다!');
      return;
    }

    if (pickerMode === 'add') {
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
        {exerciseList.map((exName, idx) => {
          const lastRecord = getLastWorkoutRecordForExercise(exName);

          return (
            <div 
              key={idx}
              style={{ 
                backgroundColor: 'var(--surface)', 
                border: '1px solid var(--border)', 
                borderRadius: '16px', 
                padding: '24px' 
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '10px' }}>
                
                {/* 운동 제목과 ↕️ 순서 변경 버튼 그룹 */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                  <h3 style={{ fontSize: '1.3rem', color: 'var(--text)', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
                    <span style={{ color: 'var(--primary)' }}>#</span> {exName}
                  </h3>
                  
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <button 
                      onClick={() => moveExerciseUp(idx)}
                      disabled={idx === 0}
                      style={{ 
                        backgroundColor: '#222', border: '1px solid #333', color: idx === 0 ? '#444' : '#ccc', 
                        padding: '4px 8px', borderRadius: '6px', fontSize: '0.75rem', cursor: idx === 0 ? 'not-allowed' : 'pointer' 
                      }}
                      title="위로 이동"
                    >
                      ▲ 위로
                    </button>
                    <button 
                      onClick={() => moveExerciseDown(idx)}
                      disabled={idx === exerciseList.length - 1}
                      style={{ 
                        backgroundColor: '#222', border: '1px solid #333', color: idx === exerciseList.length - 1 ? '#444' : '#ccc', 
                        padding: '4px 8px', borderRadius: '6px', fontSize: '0.75rem', cursor: idx === exerciseList.length - 1 ? 'not-allowed' : 'pointer' 
                      }}
                      title="아래로 이동"
                    >
                      ▼ 아래로
                    </button>
                  </div>
                </div>
                
                {/* 종목 관리 버튼들 */}
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button 
                    onClick={() => openReplaceExerciseModal(exName)}
                    style={{ background: 'transparent', border: '1px solid var(--border)', color: 'var(--sub)', padding: '6px 10px', borderRadius: '8px', fontSize: '0.8rem', cursor: 'pointer' }}
                  >
                    운동 교체
                  </button>
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

              {/* 직전 기록 안내 및 불러오기 바 */}
              {lastRecord && (
                <div style={{ 
                  backgroundColor: '#1a1a1a', border: '1px dashed #333', borderRadius: '8px', 
                  padding: '10px 14px', marginBottom: '16px', fontSize: '0.85rem', color: 'var(--sub)',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px'
                }}>
                  <div>
                    <span style={{ color: 'var(--primary)', fontWeight: '700', marginRight: '8px' }}>📌 직전 기록 ({lastRecord.date}):</span>
                    {lastRecord.sets.map((s, sIdx) => (
                      <span key={sIdx} style={{ backgroundColor: '#222', padding: '2px 6px', borderRadius: '4px', color: '#ccc', marginRight: '4px', display: 'inline-block', marginBottom: '2px' }}>
                        {s.set}세트: {s.weight || 0}kg / {s.reps || 0}회
                      </span>
                    ))}
                  </div>

                  <button 
                    type="button"
                    onClick={() => handleLoadLastRecord(exName)}
                    style={{
                      backgroundColor: 'var(--primary)', color: '#fff', border: 'none',
                      padding: '6px 12px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: '700', cursor: 'pointer',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    📥 이 기록 불러오기
                  </button>
                </div>
              )}

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
          );
        })}
      </div>

      {/* 운동 추가/교체 모달 */}
      {isPickerModalOpen && (
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

            <div style={{ 
              display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', 
              maxHeight: '300px', overflowY: 'auto', padding: '4px' 
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