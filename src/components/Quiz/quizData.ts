export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "복리 효과에 대한 설명으로 올바른 것은?",
    options: [
      "원금에만 이자가 붙는 방식",
      "원금과 이자에 모두 이자가 붙는 방식",
      "이자율이 매년 변하는 방식",
      "원금이 매년 증가하는 방식",
    ],
    correctAnswer: 1,
    explanation:
      "복리는 원금과 이자에 모두 이자가 붙는 방식으로, 시간이 지날수록 수익이 기하급수적으로 증가합니다.",
  },
  {
    id: 2,
    question: "주식 투자에서 '분산 투자'의 주된 목적은?",
    options: ["수익률 극대화", "세금 절감", "위험 분산", "거래 비용 감소"],
    correctAnswer: 2,
    explanation: "분산 투자는 여러 자산에 투자하여 위험을 줄이는 전략입니다.",
  },
  {
    id: 3,
    question: "다음 중 신용카드 사용 시 올바른 습관은?",
    options: [
      "최대한 할부로 결제한다",
      "결제일에 맞춰 전액 상환한다",
      "현금서비스를 자주 이용한다",
      "카드론을 적극 활용한다",
    ],
    correctAnswer: 1,
    explanation:
      "신용카드는 결제일에 맞춰 전액 상환하는 것이 신용 관리에 좋습니다.",
  },
  {
    id: 4,
    question: "'인플레이션'이란 무엇을 의미하는가?",
    options: [
      "물가가 전반적으로 상승하는 현상",
      "실업률이 증가하는 현상",
      "환율이 하락하는 현상",
      "금리가 하락하는 현상",
    ],
    correctAnswer: 0,
    explanation: "인플레이션은 물가가 전반적으로 상승하는 경제 현상입니다.",
  },
  {
    id: 5,
    question: "예금자 보호 한도는 얼마인가? (2024년 기준)",
    options: ["1,000만원", "2,000만원", "5,000만원", "1억원"],
    correctAnswer: 2,
    explanation: "예금자 보호 한도는 1인당 1금융기관 기준 5,000만원입니다.",
  },
  {
    id: 6,
    question: "'채권'의 특징으로 올바른 것은?",
    options: [
      "주식과 동일한 소유권을 가진다",
      "정기적으로 이자를 받을 수 있다",
      "만기가 없다",
      "배당금을 받는다",
    ],
    correctAnswer: 1,
    explanation: "채권은 정기적으로 이자를 받을 수 있는 투자 상품입니다.",
  },
  {
    id: 7,
    question: "'ETF'는 무엇의 약자인가?",
    options: [
      "Electronic Transfer Fund",
      "Exchange Traded Fund",
      "Equity Trust Fund",
      "Economic Trade Fund",
    ],
    correctAnswer: 1,
    explanation: "ETF는 'Exchange Traded Fund'(상장지수펀드)의 약자입니다.",
  },
  {
    id: 8,
    question: "'신용 점수'가 낮을 때 발생할 수 있는 일은?",
    options: [
      "대출 이자가 낮아진다",
      "신용카드 발급이 쉬워진다",
      "대출 한도가 줄어든다",
      "보험료가 인하된다",
    ],
    correctAnswer: 2,
    explanation:
      "신용 점수가 낮으면 대출 한도가 줄어들거나, 대출이 거절될 수 있습니다.",
  },
  {
    id: 9,
    question: "'적금'의 주요 특징은?",
    options: [
      "한 번에 큰 금액을 예치한다",
      "정기적으로 일정 금액을 저축한다",
      "주식에 투자한다",
      "환율 변동에 따라 수익이 달라진다",
    ],
    correctAnswer: 1,
    explanation: "적금은 정기적으로 일정 금액을 저축하는 금융 상품입니다.",
  },
  {
    id: 10,
    question: "'연금'의 주된 목적은?",
    options: [
      "단기 수익 추구",
      "노후 생활 자금 마련",
      "주택 구입 자금 마련",
      "사업 자금 마련",
    ],
    correctAnswer: 1,
    explanation: "연금은 노후 생활 자금을 마련하기 위한 장기 금융 상품입니다.",
  },
];
