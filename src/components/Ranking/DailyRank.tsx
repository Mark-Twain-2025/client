"use client";
import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";
import { fetchDailyRank } from "@/service/result";
import getTodayStr from "@/utils/date";

export default function DailyRank() {
  const [data, setData] = useState([]);
  const today = getTodayStr();

  useEffect(() => {
    fetchDailyRank(today).then((data) => {
      setData(data.ranking);
    });
  }, []);

  console.log(data);

  return (
    <div style={{ margin: "2rem", width: "40rem", textAlign: "center" }}>
      <Table>
        <thead>
          <tr>
            <th>순위</th>
            <th>이름</th>
            <th>보유 코인</th>
            <th>수익률</th>
          </tr>
        </thead>
        <tbody>
          {data.map((data) => {
            return (
              <tr key={data.user_id}>
                <td>{data.rank}</td>
                <td>{data.name}</td>
                <td>{data.todayLunch}</td>
                <td>{data.returnRate}%</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}
