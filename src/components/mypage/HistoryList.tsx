"use client";
import React, { useEffect, useState } from "react";
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
      <div className="flex items-center mb-6">
        <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
          <span className="text-yellow-600 text-sm">📋</span>
        </div>
        <h3 className="text-xl font-bold text-gray-800">투자 히스토리</h3>
      </div>

      {history.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full text-center">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                  날짜
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                  투자 메뉴
                </th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-600">
                  예측 성공
                </th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-600">
                  수익
                </th>
              </tr>
            </thead>
            <tbody>
              {history.map(
                ([date, category_id, rank, actual_return], index) => {
                  const category = categoryMap[category_id] || "알 수 없음";
                  const isSuccess = category_id === rank;
                  const isPositive = actual_return > 0;

                  return (
                    <tr
                      key={`${date}-${category_id}`}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-3 px-4 text-sm text-gray-700">
                        {date}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-700">
                        {category}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            isSuccess
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {isSuccess ? "성공" : "실패"}
                        </span>
                      </td>
                      <td
                        className={`py-3 px-4 text-sm font-medium text-center ${
                          isPositive ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {actual_return > 0 ? "+" : ""}
                        {actual_return}
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex items-center justify-center h-32">
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-gray-400 text-2xl">📝</span>
            </div>
            <p className="text-gray-500 text-sm">아직 투자 기록이 없습니다.</p>
          </div>
        </div>
      )}
    </div>
  );
}
