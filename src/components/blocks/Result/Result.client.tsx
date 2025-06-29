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

const API_PREFIX = process.env.NEXT_PUBLIC_API_PREFIX || ""; // 이거 따로 분리

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
  3: "중중식",
  4: "양식",
  5: "기타",
};

export default function ResultClient() {
  const [chartData, setChartData] = useState<any>(null);
  const [actualReturn, setActualReturn] = useState<number | null>(null);
  const [categoryName, setCategoryName] = useState<string>("");
  useEffect(() => {
    const fetchResults = async () => {
      try {
        const today = new Date().toISOString().slice(0, 10);
        const userId = localStorage.getItem("userId"); // 이 부분 나중에 수정 
        if (!userId) {
          console.warn("userId가 localStorage에 없습니다.");
          return;
        }
        
        const res = await fetch(`${API_PREFIX}/investments/result?date=${today}`);
        
        const result = await res.json();
        console.log("[result 응답]", result);
        if (!result?.categoryRankings) {
          console.warn("categoryRankings가 없음:", result);
          return;
        }
  
        const labels = result.categoryRankings.map((item: any) => item.category);
        const voteCounts = result.categoryRankings.map((item: any) => item.voteCount);
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

 // 2. 정산 정보
 const settleRes = await fetch(`${API_PREFIX}/investments/settlement/${userId}?date=${today}`);
 const settleData = await settleRes.json();
 console.log("[정산 응답]", settleData);

 if (settleData?.investments?.length > 0) {
   const first = settleData.investments[0];
   console.log("[내 투자 데이터]", first);
   setActualReturn(first.actual_return);
   setCategoryName(CATEGORY_MAP[first.category_id]);
 }

      } catch (error) {
        console.error("투표 결과 가져오기 실패:", error);
      }
    };
  
    fetchResults();
  }, []);
  

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
          {chartData ? (
            <Doughnut data={chartData} options={options} />
          ) : (
            <p>로딩 중...</p>
          )}
        </div>

        <div
          style={{
            fontSize: "18px",
            fontWeight: 600,
            color: "#333",
            lineHeight: "1.6",
          }}
        >
          {actualReturn !== null && categoryName ? (
            <>
              오늘 <span style={{ color: "#1976d2" }}>[{categoryName}]</span>에
              투표하셔서
              <br />
              <span style={{ color: "#d32f2f" }}>[{actualReturn} 런치]</span>의 수익을
              얻으셨습니다!
            </>
          ) : (
            <p>수익 정보를 불러오는 중...</p>
          )}
        </div>
      </div>
    </div>
  );
}
