// src/app/(ex)/ex_popup/page.tsx
"use client";
import React, { useState } from "react";
import PopupClient from "@/components/popup/popup.client";
import Navbar from "@/components/Navbar/navbar.client";
export default function ExamplePopup() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="container mt-4">
      {/* 팝업 모달
      <PopupClient /> */}
      <Navbar />
    </div>
  );
}
