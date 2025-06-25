"use client";

import React from "react";
import Image from "next/image";
const menuItems = [
  { label: "Home", icon: "/Nav_home.svg" },
  { label: "My Page", icon: "/Nav_mypage.svg" },
  { label: "Result", icon: "/Nav_result.svg" },
  { label: "Ranking", icon: "/Nav_ranking.svg" },
  { label: "Quiz", icon: "/Nav_quiz.svg" },
];

export default function Navbar() {
  return (
    <aside style={styles.sidebar}>
      {/* 로고 */}
      <div style={styles.header}>
        🥭 <span style={styles.logoText}>LunchCoin</span>
      </div>

      {/* 메뉴 항목 */}
      <nav style={styles.menuList}>
        {menuItems.map((item) => (
          <div key={item.label} style={styles.menuItem}>
            <Image src={item.icon} alt={item.label} width={20} height={20} />
            <span style={styles.menuLabel}>{item.label}</span>
          </div>
        ))}
      </nav>

      {/* 유저 정보 + 로그아웃 */}
      <div style={styles.footer}>
        <div style={styles.userCard}>
          <div>
            <div style={styles.userName}>Gustavo Xavier</div>
            <div style={styles.userTag}>👑 Admin</div>
            <div style={styles.coinText}>💰 보유 코인 100런치</div>
          </div>
        </div>

        <button style={styles.logout}>
          🔓 <span style={{ marginLeft: "8px" }}>Log out</span>
        </button>
      </div>
    </aside>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  sidebar: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    minWidth: "264px",
    maxWidth: "320px",
    height: "100vh",
    padding: "24px",
    background: "#fff",
    boxShadow: "2px 0 8px rgba(0,0,0,0.05)",
    borderRadius: "0 24px 24px 0",
    fontFamily: "Pretendard, Inter, sans-serif",
  },
  header: {
    fontSize: "24px",
    fontWeight: 700,
    marginBottom: "24px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  logoText: {
    fontSize: "20px",
    fontWeight: 600,
    color: "#131313",
  },
  footer: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  userCard: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  avatar: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
  },
  userName: {
    fontSize: "14px",
    fontWeight: 600,
  },
  userTag: {
    fontSize: "12px",
    background: "#f2f2f2",
    borderRadius: "8px",
    padding: "2px 6px",
    display: "inline-block",
    marginTop: "4px",
  },
  coinText: {
    fontSize: "12px",
    color: "#888",
    marginTop: "4px",
  },
  logout: {
    display: "flex",
    alignItems: "center",
    background: "none",
    border: "none",
    color: "#D94B4B",
    fontSize: "14px",
    fontWeight: 600,
    cursor: "pointer",
    padding: "8px 0",
  },
  menuItem: {
    display: "flex",
    flexDirection: "row",
    gap: "20px",
    padding: "12px 20px",
    borderRadius: "24px",
    cursor: "pointer",
    color: "#131313",
    fontSize: "14px",
    letterSpacing: "-0.25px",
    fontWeight: 400,
  },
};
