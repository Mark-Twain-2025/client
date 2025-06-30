"use client";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useEffect, useState } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

const API_PREFIX = process.env.NEXT_PUBLIC_API_PREFIX || "";

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
      onClick: () => {},
    },
  },
};
const CATEGORY_MAP: Record<number, string> = {
  1: "한식",
  2: "일식",
  3: "중식",
  4: "양식",
  5: "기타",
};

export default function ResultClient() {
  const [chartData, setChartData] = useState<any>(null);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const today = new Date().toISOString().slice(0, 10);
    if (!userId) return;

    // 1. 카테고리별 투표수
    fetch(`${API_PREFIX}/investments/result?date=${today}`)
      .then(res => res.json())
      .then(data => {
        if (data?.categoryRankings) {
          const labels = data.categoryRankings.map((item: any) => item.category);
          const voteCounts = data.categoryRankings.map((item: any) => item.voteCount);
          const colors = ["#FFD1DC", "#B3E5FC", "#FFF9C4", "#C8E6C9", "#E1BEE7"];
          setChartData({
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
          });
        }
      });

    // 2. 내 정산 결과
    fetch(`${API_PREFIX}/investments/settlement-result/${userId}?date=${today}`)
      .then(res => res.json())
      .then(data => {
        setResult(data);
        setLoading(false);
      })
      .catch(err => {
        setError("정산 결과를 불러오는 중 오류 발생");
        setLoading(false);
      });
  }, []);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f6f8fb 60%, #fffbe6 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem",
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "24px",
          boxShadow: "0 4px 32px rgba(0,0,0,0.10)",
          padding: "48px 40px 40px 40px",
          maxWidth: "540px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "36px",
        }}
      >
        <h2
          style={{
            fontSize: "2rem",
            fontWeight: 700,
            color: "#22223b",
            marginBottom: "0.7rem",
            textAlign: "center",
          }}
        >
          오늘의 점심 <span style={{ color: "#FFA500" }}>투표 결과</span>
        </h2>
        <div style={{ width: "100%", maxWidth: 340, height: 300, margin: "0 auto" }}>
          {chartData ? (
            <Doughnut
              data={chartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: "bottom" as const,
                    labels: { font: { size: 15 }, color: "#444" },
                    onClick: () => {},
                  },
                },
              }}
            />
          ) : (
            <p>투표 결과를 불러오는 중...</p>
          )}
        </div>
        <div
          style={{
            width: "100%",
            background: "#f6f8fb",
            borderRadius: "16px",
            padding: "1.5rem 1rem",
            marginTop: "1.5rem",
            boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
            fontSize: "1.08rem",
            fontWeight: 600,
            color: "#333",
            lineHeight: "1.8",
            textAlign: "center",
          }}
        >
          {result?.status === "settling" ? (
            <div style={{ color: "#1976d2" }}>{result.message}</div>
          ) : result?.error ? (
            <div style={{ color: "#d32f2f" }}>{result.message || "정산 결과가 없습니다."}</div>
          ) : (
            <div>
              <div>
                <span style={{ color: "#FFA500", fontWeight: 700 }}>
                  [{result?.category}]
                </span>{" "}
                <span style={{ color: "#1976d2" }}>{result?.rank}위</span>에 투자
              </div>
              <div>
                <b>투자 금액:</b> {result?.investment_amount} 런치
              </div>
              <div>
                <b>실제 수익:</b>{" "}
                <span style={{ color: "#d32f2f" }}>{result?.actual_return} 런치</span>
              </div>
              <div>
                <b>순수익:</b> {result?.profit} 런치
              </div>
              <div style={{ fontSize: "0.98rem", color: "#888", marginTop: "0.5rem" }}>
                정산 시각: {result?.settled_at ? new Date(result.settled_at).toLocaleString() : "-"}
              </div>
            </div>
          )}
        </div>
        {result?.status === "settling" && (
          <div
            style={{
              marginTop: "1.5rem",
              color: "#d32f2f",
              fontWeight: 500,
              fontSize: "1.08rem",
              background: "#fffbe6",
              borderRadius: "12px",
              padding: "1rem",
            }}
          >
            아직 정산이 완료되지 않아 투자금을 받을 수 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}
