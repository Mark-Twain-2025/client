"use client";
import React, { useEffect, useState } from "react";
import { fetchQuizHis } from "@/service/fetchMypage";

interface QuizHistoryData {
  correctCount: number;
  totalCount: number;
}

interface DonutChartProps {
  value: number;
  max: number;
  size?: number;
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
  bgColor = "#f3f4f6",
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
        fill="#1f2937"
        fontWeight="bold"
      >
        {Math.round((value / max) * 100)}%
      </text>
    </svg>
  );
};

export default function QuizHistory() {
  const [his, setHis] = useState<QuizHistoryData>({
    correctCount: 0,
    totalCount: 0,
  });
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const idStr = localStorage.getItem("userId");
    const id = idStr ? parseInt(idStr, 10) : null;
    setUserId(id);
  }, []);

  useEffect(() => {
    if (userId !== null) {
      fetchQuizHis(userId).then((data) => {
        setHis(data);
      });
    }
  }, [userId]);

  return (
    <div
      className="bg-white rounded-2xl p-6 border border-yellow-100 transition-all duration-300 cursor-pointer"
      style={{
        boxShadow:
          "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow =
          "0 25px 50px -12px rgba(251, 191, 36, 0.25)";
        e.currentTarget.style.borderColor = "#fb923c";
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow =
          "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)";
        e.currentTarget.style.borderColor = "#fef3c7";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <div className="flex items-center mb-4">
        <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
          <span className="text-yellow-600 text-sm">📊</span>
        </div>
        <h3 className="text-xl font-bold text-gray-800">퀴즈 히스토리</h3>
      </div>

      <div className="grid grid-cols-2 items-center">
        <div className="flex justify-center">
          <DonutChart value={his.correctCount} max={his.totalCount || 1} />
        </div>
        <div className="text-center">
          <p className="text-gray-600 text-sm font-medium mb-1">출석</p>
          <h3 className="text-2xl font-bold text-yellow-600">
            {his.totalCount}일
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            정답률: {his.correctCount}/{his.totalCount}
          </p>
        </div>
      </div>
    </div>
  );
}
