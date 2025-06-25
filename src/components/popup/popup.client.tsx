// components/popup/PopupClient.tsx
"use client";
import React from "react";

export default function PopupClient() {
  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        background: "#fff",
        padding: "49.1px",
        borderRadius: "24.6px",
        border: "1.54px solid rgba(0, 0, 0, 0.10)",
        boxShadow: "30.7px 30.7px 30.7px rgba(0, 0, 0, 0.08)",
        width: "685px",
        textAlign: "center",
      }}
    >
      <h2
        style={{ fontSize: "36.85px", fontWeight: 600, marginBottom: "24px" }}
      >
        투표가 완료되었습니다!
      </h2>
      <div style={{ display: "flex", gap: "15.3px", justifyContent: "center" }}>
        <button
          style={{
            padding: "21.5px 30.7px",
            borderRadius: "12.3px",
            border: "1.54px solid #000",
            background: "#fff",
            fontSize: "24.5px",
            fontWeight: 500,
          }}
        >
          Undo
        </button>
        <button
          style={{
            padding: "21.5px 30.7px",
            borderRadius: "12.3px",
            border: "1.54px solid #000",
            background: "#000",
            color: "#f5f5f5",
            fontSize: "24.5px",
            fontWeight: 500,
          }}
        >
          Thanks!
        </button>
      </div>
    </div>
  );
}
