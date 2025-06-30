"use client";
import React, { useEffect, useState } from "react";
import { fetchWeeklyRank } from "@/service/fetchResult";
import dayjs from "dayjs";

const avatarUrl = [2, 1, 3];

type RankUser = {
  user_id: number;
  name: string;
  rank: number;
  rankValue: number;
  returnRate: number;
};

export default function WeeklyTop() {
  const [users, setUsers] = useState<RankUser[]>([]);
  const [week, setWeek] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const now = dayjs();
    // const openTime1 = dayjs("2025-07-04T14:00:00");
    const openTime1 = dayjs("2025-06-29T14:00:00");
    const openTime2 = dayjs("2025-07-11T14:00:00");

    if (now.isBefore(openTime1)) {
      setWeek(null); // 비공개 상태
    } else if (now.isBefore(openTime2)) {
      setWeek(1); // 1주차 공개
    } else {
      setWeek(2); // 2주차 공개
    }
  }, []);

  useEffect(() => {
    if (week !== null) {
      fetchWeeklyRank(week).then((data) => {
        const top3 = data?.ranking?.slice(0, 3) ?? [];
        const reordered =
          top3.length === 3 ? [top3[1], top3[0], top3[2]] : top3;
        setUsers(reordered);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [week]);

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-500">불러오는 중...</div>
    );
  }

  if (week === null) {
    return (
      <div className="text-center py-10 text-gray-500">
        주간 TOP 3는 7월 4일 오후 2시에 공개됩니다.
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="text-center py-10 text-gray-400">
        아직 TOP 3 데이터가 없습니다.
      </div>
    );
  }

  const maxProfit = Math.max(...users.map((user) => user.rankValue ?? 0));

  return (
    <div className="flex justify-center items-end gap-8 h-[300px] p-4 bg-white rounded-md shadow-md">
      {users.map((user, idx) => {
        const rankValue = user.rankValue ?? 0;
        const heightPercent = maxProfit > 0 ? (rankValue / maxProfit) * 100 : 0;

        return (
          <div
            key={user.name ?? idx}
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
                    alt={user.name ?? "유저"}
                    className="w-14 h-14 rounded-full border-2 border-white shadow object-contain"
                  />
                  <div className="mt-1 text-sm font-semibold bg-black text-white px-2 py-0.5 rounded-full">
                    {user.name ?? "?"}
                  </div>
                  <div className="text-2xl mt-2 text-white font-semibold">
                    {user.rank ?? "?"}
                  </div>
                  <div className="text-sm mb-2 text-white font-semibold">
                    {rankValue} 코인
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
