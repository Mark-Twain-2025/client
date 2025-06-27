// src/app/(ex)/ex_popup/page.tsx
"use client";
import React from "react";
// import PopupClient from "@/components/popup/popup.client";
// import Navbar from "@/components/Navbar/navbar.client";
import VoteItem from "@/components/blocks/VoteItem";
export default function ExamplePopup() {
  return (
    <div className="container mt-4">
      {/* 팝업 모달
      <PopupClient /> */}
      {/* <Navbar /> */}
      <VoteItem lunchCount={10} />
    </div>
  );
}
