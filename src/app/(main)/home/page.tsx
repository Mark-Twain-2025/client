// app/page.tsx
import React from 'react';
import Navbar from '@/components/Navbar/navbar.client';

export default function Home() {
  return (
    <div>
      <Navbar />
      <div style={{ padding: "2rem" }}>
        <h1>Welcome to LunchCoin!</h1>
        <p>왼쪽 메뉴를 눌러 이동해보세요.</p>
      </div>
    </div>
  );
}
