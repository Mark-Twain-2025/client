"use client";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

// Chart.js 요소 등록
ChartJS.register(ArcElement, Tooltip, Legend);

// 원본 데이터
const voteCounts = [120, 90, 75, 60, 30];
const labels = ["한식", "중식", "일식", "양식", "기타"];
const colors = ["#FFD1DC", "#B3E5FC", "#FFF9C4", "#C8E6C9", "#E1BEE7"];

// 도넛 데이터 구성
const data = {
  labels,
  datasets: [
    {
      label: "투표 수",
      data: voteCounts,
      backgroundColor: colors,
      borderColor: "#fff",
      borderWidth: 2,
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "right" as const,
      labels: {
        font: { size: 14 },
        color: "#444",
      },
      onClick: () => {}, // 범례 수정 못하도록 수정 
    },
  },
};

// 컴포넌트
export default function ResultClient({
  investItem,
  profitRate,
}: {
  investItem: string;
  profitRate: string;
}) {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f6f8fb",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "16px",
          boxShadow: "0 6px 24px rgba(0,0,0,0.08)",
          padding: "2rem",
          width: "90%",
          maxWidth: "720px",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: "24px",
            fontWeight: 700,
            marginBottom: "1.5rem",
            color: "#22223b",
          }}
        >
          오늘의 점심 투표 결과
        </h2>

        <div style={{ height: "300px", marginBottom: "2rem" }}>
          <Doughnut data={data} options={options} />
        </div>

        <div
          style={{
            fontSize: "18px",
            fontWeight: 600,
            color: "#333",
            lineHeight: "1.6",
          }}
        >
          오늘 <span style={{ color: "#1976d2" }}>[{investItem}]</span>에
          투표하셔서
          <br />
          <span style={{ color: "#d32f2f" }}>[{profitRate}]</span>의 수익을
          얻으셨습니다!
        </div>
      </div>
    </div>
  );
}
