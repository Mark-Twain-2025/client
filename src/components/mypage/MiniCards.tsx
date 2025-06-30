"use client";
import React, { useEffect, useState } from "react";
import { fetchAttendance, fetchQuizHis } from "@/service/fetchMypage";

const user_id = localStorage.getItem("user_id");
const userLunch = localStorage.getItem("user_lunch");

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
      <h1>{userLunch}</h1>
    </div>
  );
}

function AttendStreak() {
  const [attendance, setAttendance] = useState([]);
  useEffect(() => {
    fetchAttendance(user_id).then((data) => {
      setAttendance(data.dates);
    });
  }, []);
  return (
    <div
      style={{
        padding: "1rem",
        borderRadius: "12px",
        backgroundColor: "#fffae1",
        alignContent: "center",
      }}
    >
      <div>출석</div>
      <h1>{attendance.length}일</h1>
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
      <h1>{userLunch - 1000}</h1>
    </div>
  );
}
