"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const menuItems = [
  { label: "Home", icon: "/Nav_home.svg", href: "/" },
  { label: "My Page", icon: "/Nav_mypage.svg", href: "/mypage" },
  { label: "Result", icon: "/Nav_result.svg", href: "/result" },
  { label: "Ranking", icon: "/Nav_ranking.svg", href: "/ranking" },
  { label: "Quiz", icon: "/Nav_quiz.svg", href: "/quiz" },
];

export default function Navbar() {
  const router = useRouter();

  return (
    <aside style={styles.sidebar}>
      <div>
        <div style={styles.header}>
          🥭 <span style={styles.logoText}>LunchCoin</span>
        </div>

        <div style={styles.userCard}>
          <div style={styles.userInfo}>
            <Image style={styles.userImage} src="/default_bird.png" alt="user" width={25} height={25} />
            <div style={styles.userName}>User</div>
          </div>
          <div style={styles.coinText}>보유 코인 100런치</div>
        </div>

        <nav style={{ ...styles.menuList, marginTop: "32px" }}>
          {menuItems.map((item) => (
            <div
              key={item.label}
              style={styles.menuItem}
              onClick={() => router.push(item.href)}
            >
              <Image src={item.icon} alt={item.label} width={20} height={20} />
              <span style={styles.menuLabel}>{item.label}</span>
            </div>
          ))}
        </nav>
      </div>

      <button
        style={styles.logout}
        onClick={() => router.push("/")}
      >
        🔓 <span style={{ marginLeft: "8px" }}>Log out</span>
      </button>
      <button
        style={styles.logout}
        onClick={() => router.push("/login")}
      >
        🔓 <span style={{ marginLeft: "8px" }}>Log In</span>
      </button>
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
  userCard: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    marginBottom: "8px",
  },
  userInfo: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginTop: "30px",
  },
  userImage: {
    marginTop: "27px",
  },
  userName: {
    color: "#131313",
    fontSize: "14px",
    fontWeight: 600,
    marginTop: "30px",
  },
  coinText: {
    color: "#131313",
    fontSize: "14px",
    fontWeight: 600,
    marginLeft: "35px",
    marginTop: "10px",
  },
  login: {
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
  menuList: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
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
    transition: "background 0.2s",
  },
};
