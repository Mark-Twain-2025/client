"use client";
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { fetchWeeklyRank } from "@/service/fetchResult";
import dayjs from "dayjs";

export default function WeeklyRank() {
  const [data, setData] = useState([]);
  const [week, setWeek] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const now = dayjs();
    const openTime1 = dayjs("2025-07-04T14:00:00");
    // const openTime1 = dayjs("2025-06-29T14:00:00");
    const openTime2 = dayjs("2025-07-11T14:00:00");

    if (now.isBefore(openTime1)) {
      setWeek(null); // 공개 전
    } else if (now.isBefore(openTime2)) {
      setWeek(1); // 1주차 공개
    } else {
      setWeek(2); // 2주차 공개
    }
  }, []);

  useEffect(() => {
    if (week !== null) {
      fetchWeeklyRank(week).then((res) => {
        setData(res?.ranking ?? []);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [week]);

  return (
    <div style={{ margin: "2rem", textAlign: "center" }}>
      <h3 style={{ marginBottom: "1rem" }}>
        {week === null ? "주간 랭킹" : `제 ${week}주차 주간 랭킹`}
      </h3>

      {loading ? (
        <p>불러오는 중...</p>
      ) : week === null ? (
        <p style={{ color: "#888" }}>
          주간 랭킹은 7월 4일 오후 2시에 공개됩니다.
        </p>
      ) : data.length === 0 ? (
        <p style={{ color: "#aaa" }}>랭킹 데이터가 없습니다.</p>
      ) : (
        <Table style={{ width: "28rem", margin: "0 auto" }}>
          <thead>
            <tr>
              <th>순위</th>
              <th>이름</th>
              <th>주간 수익</th>
              <th>수익률</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.user_id}>
                <td>{item.rank}</td>
                <td>{item.name}</td>
                <td>{item.rankValue}</td>
                <td>{item.returnRate}%</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}
