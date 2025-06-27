"use client";

import React, { useState, useEffect } from "react";

const LUNCH_KEY = "user_lunch";
const QUIZ_DATE_KEY = "quiz_date";
const ANSWER_KEY = "quiz_answer";
const QUIZ_DATA_KEY = "quiz_data"; // 오늘 푼 퀴즈 데이터 저장용

interface QuizData {
  id: number;
  question: string;
  choices: string[];
  answer_index: number;
  explanation: string;
}

export default function Quiz({
  lunch,
  setLunch,
}: {
  lunch?: number;
  setLunch?: (n: number) => void;
}) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [, setShowExplanation] = useState(false);
  const [quizDone, setQuizDone] = useState(false);
  const [userLunch, setUserLunch] = useState<number>(lunch ?? 1000);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [invalidState, setInvalidState] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<QuizData | null>(null);
  const [loading, setLoading] = useState(true);

  // 서버에서 랜덤 퀴즈 가져오기
  useEffect(() => {
    const fetchRandomQuiz = async () => {
      try {
        const response = await fetch("http://localhost:3001/quiz/random");
        if (response.ok) {
          const quizData = await response.json();
          setCurrentQuestion(quizData);
          // 오늘 푼 퀴즈 데이터를 localStorage에 저장
          localStorage.setItem(QUIZ_DATA_KEY, JSON.stringify(quizData));
        } else {
          console.error("퀴즈를 가져오는데 실패했습니다.");
        }
      } catch (error) {
        console.error("퀴즈 요청 중 오류:", error);
      } finally {
        setLoading(false);
      }
    };

    const today = new Date().toISOString().slice(0, 10);
    const lastQuizDate = localStorage.getItem(QUIZ_DATE_KEY);
    const savedQuizData = localStorage.getItem(QUIZ_DATA_KEY);

    // 오늘 이미 퀴즈를 풀었다면 저장된 퀴즈 데이터 사용
    if (lastQuizDate === today && savedQuizData) {
      try {
        const quizData = JSON.parse(savedQuizData);
        setCurrentQuestion(quizData);
        setLoading(false);
      } catch (error) {
        console.error("저장된 퀴즈 데이터 파싱 오류:", error);
        // 파싱 오류 시 새로운 퀴즈 가져오기
        fetchRandomQuiz();
      }
    } else {
      // 새로운 날짜이거나 저장된 데이터가 없으면 새로운 퀴즈 가져오기
      fetchRandomQuiz();
    }
  }, []);

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    const lastQuizDate = localStorage.getItem(QUIZ_DATE_KEY);
    const savedAnswer = localStorage.getItem(ANSWER_KEY);
    if (lastQuizDate === today) {
      if (savedAnswer !== null) {
        setQuizDone(true);
        setAnswered(true);
        setSelectedAnswer(Number(savedAnswer));
        setShowExplanation(true);
        const storedLunch = localStorage.getItem(LUNCH_KEY);
        if (storedLunch) setUserLunch(Number(storedLunch));
        // currentQuestion이 로드된 후에 정답 여부 확인
        if (currentQuestion) {
          setIsCorrect(Number(savedAnswer) === currentQuestion.answer_index);
        }
      } else {
        // 날짜는 있는데 답안이 없음(비정상 상태)
        setInvalidState(true);
      }
    }
  }, [currentQuestion]);

  useEffect(() => {
    if (lunch !== undefined) setUserLunch(lunch);
  }, [lunch]);

  // currentQuestion이 로드되지 않았거나 로딩 중일 때
  if (loading || !currentQuestion) {
    return (
      <div style={styles.container}>
        <div style={styles.quizCard}>
          <h1 style={styles.title}>퀴즈 로딩 중...</h1>
        </div>
      </div>
    );
  }

  const handleAnswerSelect = (answerIndex: number) => {
    if (answered) return;
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;
    const correct = selectedAnswer === currentQuestion.answer_index;
    setIsCorrect(correct);
    setAnswered(true);
    setShowExplanation(true);
    // 오늘 날짜로 응시 기록 저장
    const today = new Date().toISOString().slice(0, 10);
    localStorage.setItem(QUIZ_DATE_KEY, today);
    localStorage.setItem(ANSWER_KEY, String(selectedAnswer)); // 답안 저장 복원
    setQuizDone(true);
    // 정답 시 런치 지급
    if (correct) {
      const newLunch = userLunch + 30;
      setUserLunch(newLunch);
      localStorage.setItem(LUNCH_KEY, String(newLunch));
      if (setLunch) setLunch(newLunch);
    }
  };

  // 비정상 상태 안내
  if (invalidState) {
    return (
      <div style={styles.container}>
        <div style={styles.quizCard}>
          <h1 style={styles.title}>오류가 발생했습니다</h1>
          <p style={styles.message}>
            퀴즈 기록이 올바르지 않습니다. 브라우저 저장소를 삭제하거나 새로고침
            해보세요.
          </p>
        </div>
      </div>
    );
  }

  // 복습 화면
  if (quizDone && answered) {
    return (
      <div style={styles.container}>
        <div style={styles.quizCard}>
          <h1 style={styles.title}>오늘의 퀴즈 복습</h1>
          <div style={styles.questionContainer}>
            <h2 style={styles.question}>{currentQuestion.question}</h2>
            <div style={styles.optionsContainer}>
              {currentQuestion.choices.map((option, index) => {
                let optionStyle = { ...styles.option };
                if (selectedAnswer === index)
                  optionStyle = { ...optionStyle, ...styles.selectedOption };
                if (index === currentQuestion.answer_index)
                  optionStyle = { ...optionStyle, ...styles.correctOption };
                if (
                  selectedAnswer === index &&
                  index !== currentQuestion.answer_index
                )
                  optionStyle = { ...optionStyle, ...styles.wrongOption };
                // 오른쪽 텍스트 표시
                let rightLabel = "";
                if (
                  selectedAnswer === index &&
                  index === currentQuestion.answer_index
                ) {
                  rightLabel = "내가 고른 답 · 정답";
                } else if (selectedAnswer === index) {
                  rightLabel = "내가 고른 답";
                } else if (index === currentQuestion.answer_index) {
                  rightLabel = "정답";
                }
                return (
                  <button
                    key={index}
                    style={{
                      ...optionStyle,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                    disabled
                  >
                    <span>
                      {String.fromCharCode(65 + index)}. {option}
                    </span>
                    {rightLabel && (
                      <span
                        style={{
                          color: "#007bff",
                          fontWeight: 600,
                          fontSize: 14,
                          marginLeft: 12,
                        }}
                      >
                        {rightLabel}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
            <div style={styles.explanation}>
              <h3 style={styles.explanationTitle}>
                {isCorrect ? <>정답입니다!</> : "틀렸습니다!"}
              </h3>
              <p style={styles.explanationText}>
                {currentQuestion.explanation}
              </p>
            </div>
            <div style={{ fontSize: 20, fontWeight: 600, marginTop: 24 }}>
              <span style={{ color: "#FFA500", fontWeight: 700 }}>
                +30 런치
              </span>{" "}
              지급!
              <br />
              현재 보유 런치:{" "}
              <span style={{ color: "#007bff" }}>{userLunch} 런치</span>
            </div>
            <p style={styles.message}>내일 다시 도전해보세요.</p>
          </div>
        </div>
      </div>
    );
  }

  // 퀴즈 풀이 화면
  return (
    <div style={styles.container}>
      <div style={styles.quizCard}>
        <div style={styles.header}>
          <h1 style={styles.title}>금융 퀴즈</h1>
        </div>
        <div style={styles.questionContainer}>
          <h2 style={styles.question}>{currentQuestion.question}</h2>
          <div style={styles.optionsContainer}>
            {currentQuestion.choices.map((option, index) => {
              let optionStyle = { ...styles.option };
              if (selectedAnswer === index)
                optionStyle = { ...optionStyle, ...styles.selectedOption };
              if (answered && index === currentQuestion.answer_index)
                optionStyle = { ...optionStyle, ...styles.correctOption };
              if (
                answered &&
                selectedAnswer === index &&
                index !== currentQuestion.answer_index
              )
                optionStyle = { ...optionStyle, ...styles.wrongOption };
              // 오른쪽 텍스트 표시
              let rightLabel = "";
              if (
                answered &&
                selectedAnswer === index &&
                index === currentQuestion.answer_index
              ) {
                rightLabel = "내가 고른 답 · 정답";
              } else if (answered && selectedAnswer === index) {
                rightLabel = "내가 고른 답";
              } else if (answered && index === currentQuestion.answer_index) {
                rightLabel = "정답";
              }
              return (
                <button
                  key={index}
                  style={{
                    ...optionStyle,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={answered}
                >
                  <span>
                    {String.fromCharCode(65 + index)}. {option}
                  </span>
                  {rightLabel && (
                    <span
                      style={{
                        color: "#007bff",
                        fontWeight: 600,
                        fontSize: 14,
                        marginLeft: 12,
                      }}
                    >
                      {rightLabel}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
          <div style={styles.buttonContainer}>
            <button
              style={{
                ...styles.submitButton,
                ...(selectedAnswer === null && styles.disabledButton),
              }}
              onClick={handleSubmitAnswer}
              disabled={selectedAnswer === null || answered}
            >
              답안 제출
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    padding: "20px",
  },
  quizCard: {
    backgroundColor: "white",
    borderRadius: "16px",
    padding: "32px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
    maxWidth: "600px",
    width: "100%",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "24px",
  },
  title: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#333",
    margin: 0,
  },
  questionContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },
  question: {
    fontSize: "20px",
    fontWeight: "600",
    color: "#333",
    lineHeight: "1.5",
    margin: 0,
  },
  optionsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  option: {
    padding: "16px 20px",
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: "#e0e0e0",
    borderRadius: "12px",
    backgroundColor: "white",
    fontSize: "16px",
    textAlign: "left",
    cursor: "pointer",
    transition: "all 0.2s ease",
    fontWeight: "500",
  },
  selectedOption: {
    borderColor: "#007bff",
    backgroundColor: "#f8f9ff",
  },
  correctOption: {
    borderColor: "#28a745",
    backgroundColor: "#f8fff9",
  },
  wrongOption: {
    borderColor: "#dc3545",
    backgroundColor: "#fff8f8",
  },
  explanation: {
    padding: "20px",
    backgroundColor: "#f8f9fa",
    borderRadius: "12px",
    border: "1px solid #e9ecef",
  },
  explanationTitle: {
    fontSize: "18px",
    fontWeight: "600",
    margin: "0 0 12px 0",
    color: "#333",
  },
  explanationText: {
    fontSize: "16px",
    lineHeight: "1.6",
    color: "#555",
    margin: 0,
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: "16px",
  },
  submitButton: {
    padding: "14px 32px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background-color 0.2s ease",
  },
  disabledButton: {
    backgroundColor: "#ccc",
    cursor: "not-allowed",
  },
};
