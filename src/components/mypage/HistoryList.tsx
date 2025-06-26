import React from "react";
import Table from "react-bootstrap/Table";

export default function HistoryList() {
  return (
    <div
      style={{
        padding: "2rem",
        borderRadius: "12px",
        backgroundColor: "#fffae1",
        alignContent: "center",
      }}
    >
      <h4>투자 히스토리</h4>
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
          <tr>
            <td>2025-06-26</td>
            <td>양식</td>
            <td>성공</td>
            <td>200</td>
          </tr>
          <tr>
            <td>2025-06-27</td>
            <td>한식</td>
            <td>실패</td>
            <td>-10</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}
