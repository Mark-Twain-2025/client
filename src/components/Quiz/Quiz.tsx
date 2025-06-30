"use client";

import React, { useEffect, useState, useRef } from "react";
import { useAuth } from "@/components/auth/Auth";
import { useRouter } from "next/navigation";

const API_PREFIX = process.env.NEXT_PUBLIC_API_PREFIX || "";

interface QuizData {
  _id: string;
  id: number;
  question: string;
  choices: string[];
  answer_index: number;
  explanation: string;
}

interface QuizResult {
  isCorrect: boolean;
  explanation: string;
  reward: number;
  updatedCoins?: number;
}

export default function Quiz() {
  const { isLogIn } = useAuth();
  const router = useRouter();
  const [quiz, setQuiz] = useState<QuizData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const [answered, setAnswered] = useState(false);
  const alertShown = useRef(false);

  useEffect(() => {
    if (isLogIn === false && !alertShown.current) {
      alertShown.current = true;
      const goLogin = window.confirm(
        "로그인 후 이용가능합니다! 로그인 페이지로 이동하시겠습니까?"
      );
      if (goLogin) {
        router.push("/login");
      }
    }
  }, [isLogIn, router]);

  useEffect(() => {
    if (isLogIn !== true) return;

    // 오늘 이미 퀴즈를 풀었는지 확인
    const today = new Date().toISOString().slice(0, 10);
    const lastQuizDate = localStorage.getItem("quiz_date");
    const lastQuizAnswer = localStorage.getItem("quiz_answer");
    const lastQuizData = localStorage.getItem("quiz_data");

    if (lastQuizDate === today && lastQuizAnswer !== null && lastQuizData) {
      try {
        const quizData = JSON.parse(lastQuizData);
        const answer = parseInt(lastQuizAnswer);
        const isCorrect = answer === quizData.answer_index;

        setQuiz(quizData);
        setSelectedAnswer(answer);
        setAnswered(true);
        setQuizResult({
          isCorrect: isCorrect,
          explanation: quizData.explanation,
          reward: isCorrect ? 30 : 0,
        });
        setLoading(false);
        return;
      } catch (error) {
        console.error("저장된 퀴즈 데이터 파싱 오류:", error);
      }
    }

    const fetchQuiz = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_PREFIX}/quiz/random`, {
          credentials: "include",
        });
        if (!res.ok) throw new Error("퀴즈를 불러오지 못했습니다.");
        const data = await res.json();
        setQuiz(data);
        // 퀴즈 데이터를 localStorage에 저장
        localStorage.setItem("quiz_data", JSON.stringify(data));
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : "에러가 발생했습니다.";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };
    fetchQuiz();
  }, [isLogIn]);

  const handleAnswerSelect = (answerIndex: number) => {
    if (answered || submitting) return;
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = async () => {
    if (selectedAnswer === null || submitting || !quiz) return;

    setSubmitting(true);
    try {
      const response = await fetch(`${API_PREFIX}/quiz/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          selectedIndex: selectedAnswer,
          quizId: quiz.id,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        setQuizResult(result);
        setAnswered(true);

        // 오늘 날짜와 답안을 localStorage에 저장
        const today = new Date().toISOString().slice(0, 10);
        localStorage.setItem("quiz_date", today);
        localStorage.setItem("quiz_answer", selectedAnswer.toString());
      } else {
        const errorData = await response.json();
        if (errorData.error === "오늘 이미 퀴즈를 풀었습니다.") {
          alert("오늘 이미 퀴즈를 풀었습니다. 내일 다시 도전해보세요!");
        } else {
          alert(`퀴즈 실패: ${errorData.error}`);
        }
      }
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "퀴즈 제출 중 오류가 발생했습니다.";
      alert(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  if (isLogIn === false) {
    return null;
  }

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.quizCard}>
          <h1 style={styles.title}>퀴즈 로딩 중...</h1>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.container}>
        <div style={styles.quizCard}>
          <h1 style={styles.title}>에러 발생</h1>
          <p style={styles.message}>{error}</p>
        </div>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div style={styles.container}>
        <div style={styles.quizCard}>
          <h1 style={styles.title}>퀴즈가 없습니다.</h1>
        </div>
      </div>
    );
  }

  // 퀴즈 결과 화면
  if (answered && quizResult) {
    return (
      <div style={styles.container}>
        <div style={styles.quizCard}>
          <h1 style={styles.title}>퀴즈 결과</h1>
          <div style={styles.questionContainer}>
            <h2 style={styles.question}>{quiz.question}</h2>
            <div style={styles.optionsContainer}>
              {quiz.choices.map((option, index) => {
                let optionStyle = { ...styles.option };
                if (selectedAnswer === index) {
                  optionStyle = { ...optionStyle, ...styles.selectedOption };
                }
                if (index === quiz.answer_index) {
                  optionStyle = { ...optionStyle, ...styles.correctOption };
                }
                if (selectedAnswer === index && index !== quiz.answer_index) {
                  optionStyle = { ...optionStyle, ...styles.wrongOption };
                }

                let label = "";
                if (selectedAnswer === index && index === quiz.answer_index) {
                  label = "내가 고른 답 · 정답";
                } else if (selectedAnswer === index) {
                  label = "내가 고른 답";
                } else if (index === quiz.answer_index) {
                  label = "정답";
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
                    {label && <span style={styles.answerLabel}>{label}</span>}
                  </button>
                );
              })}
            </div>
            <div style={styles.explanation}>
              <h3 style={styles.explanationTitle}>
                {quizResult.isCorrect ? "정답입니다! 🎉" : "틀렸습니다! 😢"}
              </h3>
              <p style={styles.explanationText}>{quizResult.explanation}</p>
            </div>
            {quizResult.isCorrect && (
              <div style={styles.reward}>
                <span style={styles.rewardText}>
                  +{quizResult.reward} 코인 지급!
                </span>
                {quizResult.updatedCoins && (
                  <div style={styles.currentCoins}>
                    현재 보유 코인: {quizResult.updatedCoins} 코인
                  </div>
                )}
              </div>
            )}
            <p style={styles.message}>내일 다시 도전해보세요!</p>
          </div>
          <div style={styles.homeButtonContainer}>
            <button
              type="button"
              style={styles.prettyHomeButton}
              onClick={() => router.push("/")}
            >
              홈으로 이동
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 퀴즈 풀이 화면
  return (
    <div style={styles.container}>
      <div style={styles.quizCard}>
        <h1 style={styles.title}>금융 퀴즈</h1>
        <div style={styles.questionContainer}>
          <h2 style={styles.question}>{quiz.question}</h2>
          <div style={styles.optionsContainer}>
            {quiz.choices.map((option, index) => (
              <button
                key={index}
                style={{
                  ...styles.option,
                  ...(selectedAnswer === index && styles.selectedOption),
                }}
                onClick={() => handleAnswerSelect(index)}
                disabled={submitting}
              >
                {String.fromCharCode(65 + index)}. {option}
              </button>
            ))}
          </div>
          <div style={styles.buttonContainer}>
            <button
              style={{
                ...styles.submitButton,
                ...(selectedAnswer === null && styles.disabledButton),
              }}
              onClick={handleSubmitAnswer}
              disabled={selectedAnswer === null || submitting}
            >
              {submitting ? "제출 중..." : "답안 제출"}
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
  message: {
    fontSize: "16px",
    color: "#888",
    marginTop: "16px",
    textAlign: "center",
  },
  answerLabel: {
    fontSize: "12px",
    fontWeight: "500",
    color: "#888",
    marginLeft: "8px",
  },
  reward: {
    padding: "12px 20px",
    backgroundColor: "#f8f9fa",
    borderRadius: "12px",
    border: "1px solid #e9ecef",
    marginTop: "16px",
  },
  rewardText: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#28a745",
  },
  currentCoins: {
    fontSize: "14px",
    color: "#888",
    marginTop: "8px",
    textAlign: "center",
  },
  homeButtonContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "32px",
    marginBottom: "0px",
    width: "100%",
  },
  prettyHomeButton: {
    background: "#ffa500",
    color: "#fff",
    fontWeight: 700,
    fontSize: "20px",
    padding: "8px 48px",
    borderRadius: "2rem",
    border: "2px solid #ffa500",
    outline: "none",
    cursor: "pointer",
    margin: "0 auto",
    display: "block",
    boxShadow: "0 2px 8px rgba(255,165,0,0.10)",
    transition: "background 0.2s, color 0.2s, border 0.2s",
  },
};
