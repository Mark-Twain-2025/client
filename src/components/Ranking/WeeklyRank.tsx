"use client";
import React from "react";
import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";
import { fetchWeeklyRank } from "@/service/fetchResult";
import getTodayStr from "@/utils/date";

export default function WeeklyRank() {
  const [data, setData] = useState([]);
  const today = getTodayStr();

  // 테스트용
  const week = today === "2025-06-27" ? 1 : 2;

  useEffect(() => {
    fetchWeeklyRank(week).then((data) => {
      setData(data.ranking);
    });
  }, []);

  return (
    <div style={{ margin: "2rem", textAlign: "center" }}>
      <Table style={{ width: "28rem" }}>
        <thead>
          <tr>
            <th>순위</th>
            <th>이름</th>
            <th>주간 수익</th>
            <th>수익률</th>
          </tr>
        </thead>
        <tbody>
          {data.map((data) => {
            return (
              <tr key={data.user_id}>
                <td>{data.rank}</td>
                <td>{data.name}</td>
                <td>{data.rankValue}</td>
                <td>{data.returnRate}%</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}
