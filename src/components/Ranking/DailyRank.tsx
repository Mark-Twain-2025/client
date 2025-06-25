"use client";
import React from "react";
import Table from "react-bootstrap/Table";

export default function DailyRank() {
  return (
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
        <tr>
          <td>1</td>
          <td>예경</td>
          <td>1000</td>
          <td>23%</td>
        </tr>
      </tbody>
    </Table>
  );
}
