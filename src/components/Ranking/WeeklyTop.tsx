"use client";
import React from "react";
import { useEffect, useState } from "react";
import { fetchWeeklyRank } from "@/service/result";
import getTodayStr from "@/utils/date";

function getWeeklyTop() {
  const [data, setData] = useState([]);
  const [rank, setRank] = useState([]);
  const today = getTodayStr();
  const week = today === "2025-06-27" ? 1 : 2;

  useEffect(() => {
    fetchWeeklyRank(week).then((data) => {
      setData(data.ranking);
    });
  }, []);

  // 1,2,3위만 rank로 저장하는 로직 만들어야함
}

const users = [
  { name: "박00", avatarUrl: "profile2nd.png", profit: 800, rank: 2 },
  { name: "김00", avatarUrl: "profile1st.png", profit: 1000, rank: 1 },
  { name: "강00", avatarUrl: "profile3rd.png", profit: 500, rank: 3 },
];

//렌더링만
export default function WeeklyTop() {
  const maxProfit = Math.max(...users.map((user) => user.profit));

  return (
    <div className="flex justify-center items-end gap-8 h-[300px] p-4 bg-white rounded-md shadow-md">
      {users.map((user) => {
        const heightPercent = (user.profit / maxProfit) * 100;

        return (
          <div
            key={user.name}
            className="relative flex flex-col items-center w-24"
          >
            {/* 그래프 */}
            <div className="relative w-full h-[200px] rounded-md flex items-end justify-center">
              {/* 막대 */}
              <div
                className="w-full bg-yellow-400 rounded-md flex flex-col items-center justify-end relative"
                style={{ height: `${heightPercent}%` }}
              >
                {/* 이미지 + 텍스트*/}
                <div className="absolute -top-16 flex flex-col items-center">
                  <img
                    src={user.avatarUrl}
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
                    {user.profit} 코인
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
