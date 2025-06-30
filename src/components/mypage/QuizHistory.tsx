"use client";
import React from "react";
import { useEffect, useState } from "react";
import { fetchQuizHis } from "@/service/fetchMypage";

const user_id = localStorage.getItem("user_id");

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
  const [his, setHis] = useState([]);
  useEffect(() => {
    fetchQuizHis(user_id).then((data) => {
      setHis(data);
      console.log(data);
    });
  }, []);

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
          <DonutChart value={his.correctCount} max={his.totalCount} />
        </div>
        <div className="align-middle">
          <div>출석</div>
          <h3>{his.totalCount}일</h3>
        </div>
      </div>
    </div>
  );
}
