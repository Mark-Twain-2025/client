"use client";
import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";
import { fetchDailyRank } from "@/service/fetchResult";
import getTodayStr from "@/utils/date";

type RankUser = {
  user_id: number;
  rank: number;
  name: string;
  todayLunch: number;
  returnRate: number;
};

export default function DailyRank() {
  const [data, setData] = useState<RankUser[]>([]);

  const today = getTodayStr();
  // const today = "2025-06-27"; // 테스트용

  useEffect(() => {
    fetchDailyRank(today).then((data) => {
      setData(data?.ranking ?? []);
    });
  }, []);

  return (
    <div style={{ margin: "2rem", width: "40rem", textAlign: "center" }}>
      {data.length === 0 ? (
        <div
          style={{
            height: "200px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#f8f9fa",
            borderRadius: "12px",
            fontSize: "1.2rem",
            color: "#888",
          }}
        >
          아직 랭킹 정보가 없습니다.
        </div>
      ) : (
        <Table>
          <thead>
            <tr>
              <th>순위</th>
              <th>이름</th>
              <th>보유 런치</th>
              <th>수익률</th>
            </tr>
          </thead>
          <tbody>
            {data.map((data) => (
              <tr key={data.user_id}>
                <td>{data.rank}</td>
                <td>{data.name}</td>
                <td>{data.todayLunch}</td>
                <td>{data.returnRate}%</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}
