"use client";
import React, { useEffect, useState } from "react";
import { fetchInvestHis } from "@/service/fetchMypage";

interface CoinHistoryChartProps {
  data: number[];
  width?: number;
  height?: number;
  strokeColor?: string;
}

const CoinHistoryChart: React.FC<CoinHistoryChartProps> = ({
  data,
  strokeColor = "#f59e0b",
  height = 120,
}) => {
  if (!Array.isArray(data) || data.length < 2) return null;

  const max = Math.max(...data);
  const min = Math.min(...data);

  const paddingX = 20;
  const paddingY = 20;
  const width = data.length * 80;

  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * (width - 2 * paddingX) + paddingX;
    const y =
      paddingY + ((max - d) / (max - min || 1)) * (height - 2 * paddingY);
    return { x, y };
  });

  const getSmoothPath = (pts: { x: number; y: number }[]) => {
    const path = [`M ${pts[0].x},${pts[0].y}`];
    for (let i = 1; i < pts.length; i++) {
      const prev = pts[i - 1];
      const curr = pts[i];
      const cx = (prev.x + curr.x) / 2;
      path.push(`C ${cx},${prev.y} ${cx},${curr.y} ${curr.x},${curr.y}`);
    }
    return path.join(" ");
  };

  const pathD = getSmoothPath(points);

  return (
    <div style={{ width: "100%", overflowX: "auto" }}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
        style={{ width: "100%", height: `${height}px` }}
      >
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
        </defs>
        <path
          d={pathD}
          fill="none"
          stroke="url(#lineGradient)"
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export default function HistoryGraph() {
  const [his, setHis] = useState<{ myLunchHistory: number[] } | null>(null);

  useEffect(() => {
    const user_id = Number(localStorage.getItem("user_id"));
    if (user_id) {
      fetchInvestHis(user_id).then((data) => {
        setHis(data);
      });
    }
  }, []);

  const hasEnoughData = his?.myLunchHistory && his.myLunchHistory.length >= 2;

  return (
    <div
      className="bg-white rounded-2xl p-6 border border-orange-100 transition-all duration-300 cursor-pointer"
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
        e.currentTarget.style.borderColor = "#fed7aa";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <div className="flex items-center mb-4">
        <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3">
          <span className="text-orange-600 text-sm">📈</span>
        </div>
        <h3 className="text-xl font-bold text-gray-800">코인 히스토리</h3>
      </div>

      {hasEnoughData ? (
        <CoinHistoryChart data={his!.myLunchHistory} height={140} />
      ) : (
        <div className="flex items-center justify-center h-32">
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-gray-400 text-2xl">📊</span>
            </div>
            <p className="text-gray-500 text-sm">
              코인 히스토리는 이틀차부터 표시됩니다.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
