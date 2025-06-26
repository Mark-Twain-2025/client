import React from "react";

interface CoinHistoryChartProps {
  data: number[]; // 예: [1000, 1100, 900, 1200, 1300]
  width?: number;
  height?: number;
  strokeColor?: string;
}
const CoinHistoryChart: React.FC<CoinHistoryChartProps> = ({
  data,
  strokeColor = "#f9e04c",
  height = 120,
}) => {
  if (data.length < 2) return null;

  const max = Math.max(...data);
  const min = Math.min(...data);
  const width = data.length * 80; // 포인트 간 간격 조절

  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((d - min) / (max - min)) * height;
    return { x, y };
  });

  // Cubic Bezier curve 경로 계산
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
  const end = points[points.length - 1];

  return (
    <div style={{ width: "100%", overflowX: "auto" }}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
        style={{ width: "100%", height: `${height}px` }}
      >
        <path
          d={pathD}
          fill="none"
          stroke={strokeColor}
          strokeWidth={3}
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

export default function HistoryGraph() {
  return (
    <div
      style={{
        padding: "2rem",
        borderRadius: "12px",
        backgroundColor: "#F4F5F7",
        alignContent: "center",
      }}
    >
      <h4>코인 히스토리</h4>
      <CoinHistoryChart data={[1000, 1200, 900, 1100, 1300, 1500]} />
    </div>
  );
}
