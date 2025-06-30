"use client";
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { fetchInvestHis } from "@/service/fetchMypage";

const categoryMap: Record<number, string> = {
  1: "한식",
  2: "일식",
  3: "중식",
  4: "양식",
  5: "기타",
};

type InvestmentEntry = [string, number, number, number]; // [date, category_id, rank, actual_return]

export default function HistoryList() {
  const [history, setHistory] = useState<InvestmentEntry[]>([]);

  useEffect(() => {
    const user_id = Number(localStorage.getItem("user_id"));
    if (user_id) {
      fetchInvestHis(user_id).then((data) => {
        if (data && Array.isArray(data.investmentHistory)) {
          setHistory(data.investmentHistory);
        } else {
          setHistory([]);
        }
      });
    }
  }, []);

  return (
    <div
      style={{
        padding: "2rem",
        borderRadius: "12px",
        backgroundColor: "#fffae1",
        alignContent: "center",
      }}
    >
      <h4 className="pb-2">투자 히스토리</h4>
      <Table style={{ textAlign: "center" }}>
        <thead>
          <tr>
            <th>날짜</th>
            <th>투자 메뉴</th>
            <th>예측 성공</th>
            <th>수익</th>
          </tr>
        </thead>
        <tbody>
          {history.length > 0 ? (
            history.map(([date, category_id, rank, actual_return]) => {
              const category = categoryMap[category_id] || "알 수 없음";
              const isSuccess = category_id === rank ? "성공" : "실패";

              return (
                <tr key={`${date}-${category_id}`}>
                  <td>{date}</td>
                  <td>{category}</td>
                  <td>{isSuccess}</td>
                  <td>{actual_return}</td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={4}>기록이 없습니다.</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}
