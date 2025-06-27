import React from "react";
// import { Card } from "react-bootstrap";

export default function MiniCards() {
  return (
    <div className="grid grid-cols-3 gap-3 h-40">
      <CurLunch />
      <AttendStreak />
      <TotalProfit />
    </div>
  );
}

function CurLunch() {
  return (
    <div
      style={{
        padding: "1rem",
        borderRadius: "12px",
        backgroundColor: "#F4F5F7",
        alignContent: "center",
      }}
    >
      <div>보유 런치</div>
      <h1>1000</h1>
    </div>
  );
}
function AttendStreak() {
  return (
    <div
      style={{
        padding: "1rem",
        borderRadius: "12px",
        backgroundColor: "#fffae1",
        alignContent: "center",
      }}
    >
      <div>연속 출석</div>
      <h1>2일</h1>
    </div>
  );
}

function TotalProfit() {
  return (
    <div
      style={{
        padding: "1rem",
        borderRadius: "12px",
        backgroundColor: "#F4F5F7",
        alignContent: "center",
      }}
    >
      <div>누적 수익</div>
      <h1>400</h1>
    </div>
  );
}
