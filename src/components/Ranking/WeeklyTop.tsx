"use client";
import React from "react";
import { useEffect, useState } from "react";
import { fetchWeeklyRank } from "@/service/result";
import getTodayStr from "@/utils/date";

const avatarUrl = [2, 1, 3];

export default function WeeklyTop() {
  const [users, setUsers] = useState([]);
  const today = getTodayStr();

  // 테스트용, 수정 필요
  const week = today === "2025-06-27" ? 1 : 2;

  useEffect(() => {
    fetchWeeklyRank(week).then((data) => {
      // setUsers(data.ranking.slice(0, 3));
      const top3 = data.ranking.slice(0, 3);
      const reordered = [top3[1], top3[0], top3[2]];
      setUsers(reordered);
      console.log("users", users);
    });
  }, []);
  const maxProfit = Math.max(...users.map((user) => user.rankValue));

  return (
    <div className="flex justify-center items-end gap-8 h-[300px] p-4 bg-white rounded-md shadow-md">
      {users.map((user, idx) => {
        const heightPercent = (user.rankValue / maxProfit) * 100;

        return (
          <div
            key={user.name}
            className="relative flex flex-col items-center w-24"
          >
            <div className="relative w-full h-[200px] rounded-md flex items-end justify-center">
              <div
                className="w-full bg-yellow-400 rounded-md flex flex-col items-center justify-end relative"
                style={{ height: `${heightPercent}%` }}
              >
                <div className="absolute -top-16 flex flex-col items-center">
                  <img
                    src={`profile${avatarUrl[idx]}.png`}
                    alt={user.name}
                    className="w-14 h-14 rounded-full border-2 border-white shadow object-contain"
                  />
                  <div className="mt-1 text-sm font-semibold bg-black text-white px-2 py-0.5 rounded-full">
                    {user.name}
                  </div>
                  <div className="text-2xl mt-2 text-white font-semibold">
                    {user.rank}
                  </div>
                  <div className="text-sm mb-2 text-white font-semibold">
                    {user.rankValue} 코인
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
