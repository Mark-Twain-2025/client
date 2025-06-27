"use client";
import React from "react";
import Table from "react-bootstrap/Table";
// import { Card } from "react-bootstrap";

export default function WeeklyRank() {
  return (
    <div style={{ margin: "2rem", textAlign: "center" }}>
      {/* <Card
        style={{
          width: "25rem",
          padding: "2rem",
          borderRadius: "20px",
          textAlign: "center",
        }}
      > */}
      <Table style={{ width: "28rem" }}>
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
            <td>지연</td>
            <td>2000</td>
            <td>43%</td>
          </tr>
          <tr>
            <td>1</td>
            <td>지연</td>
            <td>2000</td>
            <td>43%</td>
          </tr>
          <tr>
            <td>1</td>
            <td>지연</td>
            <td>2000</td>
            <td>43%</td>
          </tr>
        </tbody>
      </Table>
      {/* </Card> */}
    </div>
  );
}
