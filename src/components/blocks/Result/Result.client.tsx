"use client";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ["한식", "중식", "일식", "양식", "기타"],
  datasets: [
    {
      label: "투표 수",
      data: [120, 90, 75, 60, 30], // 나중에 백엔드 api 값 연결하기
      backgroundColor: [
        "#FFD1DC", 
        "#B3E5FC", 
        "#FFF9C4", 
        "#C8E6C9", 
        "#E1BEE7", 
      ],
      borderColor: "#fff",
      borderWidth: 2,
      offset: [40, 0, 0, 0, 0],
      hoverOffset: 10,
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      position: "right" as const,
      labels: {
        font: {
          size: 16,
        },
        padding: 20,
      },
    },
  },
};

export default function ResultClient({ investItem, profitRate }: { investItem: string; profitRate: string }) {
  return (
    <div
      style={{
        width: "40%",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "2rem",
      }}
    >
      <h2 style={{ fontWeight: "700", fontSize: "24px", marginBottom: "1rem" }}>
        오늘의 점심 투표 결과
      </h2>
      <Doughnut data={data} options={options} />
      <div style={{ marginTop: "2rem", fontWeight: "700", fontSize: "22px", textAlign: "center" }}>
        오늘 <span style={{ color: "#1976d2" }}>[{investItem}]</span>에 투표하셔서<br />
        <span style={{ color: "#d32f2f" }}>[{profitRate}]</span>의 이득을 보셨어요
      </div>
    </div>
  );
}