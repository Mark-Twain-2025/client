import React from "react";

interface DonutChartProps {
  value: number; // 예: 12000
  max: number; // 예: 20000
  size?: number; // 원의 크기(px)
  strokeWidth?: number;
  color?: string;
  bgColor?: string;
}
const DonutChart: React.FC<DonutChartProps> = ({
  value,
  max,
  size = 120,
  strokeWidth = 10,
  color = "#FFB800",
  bgColor = "#ccc",
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(value / max, 1);
  const offset = circumference * (1 - progress);

  return (
    <svg width={size} height={size}>
      <circle
        stroke={bgColor}
        fill="transparent"
        strokeWidth={strokeWidth}
        r={radius}
        cx={size / 2}
        cy={size / 2}
      />
      <circle
        stroke={color}
        fill="transparent"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        r={radius}
        cx={size / 2}
        cy={size / 2}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      <text
        x="50%"
        y="50%"
        dominantBaseline="central"
        textAnchor="middle"
        fontSize="25"
        fill="#222"
        fontWeight="bold"
      >
        {Math.round((value / max) * 100)}%
      </text>
    </svg>
  );
};

export default function QuizHistory() {
  return (
    <div
      style={{
        padding: "2rem",
        borderRadius: "12px",
        backgroundColor: "#fffae1",
        alignContent: "center",
      }}
    >
      <h4>퀴즈 히스토리</h4>
      <div className="grid grid-cols-[2fr_1fr]">
        <div>
          <DonutChart value={3} max={4} />
        </div>
        <div className="align-middle">
          <div>연속 출석</div>
          <h3>1일</h3>
        </div>
      </div>
    </div>
  );
}
