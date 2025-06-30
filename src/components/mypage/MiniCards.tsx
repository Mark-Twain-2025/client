"use client";
import React, { useEffect, useState } from "react";
import { fetchAttendance } from "@/service/fetchMypage";

const user_id = localStorage.getItem("user_id");
const userLunch = localStorage.getItem("user_lunch");

export default function MiniCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <CurLunch />
      <AttendStreak />
      <TotalProfit />
    </div>
  );
}

function CurLunch() {
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
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium mb-1">보유 런치</p>
          <h2 className="text-3xl font-bold text-yellow-600">
            {userLunch || 0}
          </h2>
        </div>
        <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
          <span className="text-yellow-600 text-xl">💰</span>
        </div>
      </div>
    </div>
  );
}

function AttendStreak() {
  const [attendance, setAttendance] = useState([]);
  useEffect(() => {
    if (user_id) {
      fetchAttendance(parseInt(user_id)).then((data) => {
        setAttendance(data.dates);
      });
    }
  }, []);

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
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium mb-1">출석</p>
          <h2 className="text-3xl font-bold text-orange-600">
            {attendance.length}일
          </h2>
        </div>
        <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
          <span className="text-orange-600 text-xl">🔥</span>
        </div>
      </div>
    </div>
  );
}

function TotalProfit() {
  const profit = parseInt(userLunch || "0") - 1000;

  return (
    <div
      className="bg-white rounded-2xl p-6 border border-green-100 transition-all duration-300 cursor-pointer"
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
        e.currentTarget.style.borderColor = "#bbf7d0";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium mb-1">누적 수익</p>
          <h2 className="text-3xl font-bold text-green-600">{profit}</h2>
        </div>
        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
          <span className="text-green-600 text-xl">📈</span>
        </div>
      </div>
    </div>
  );
}
