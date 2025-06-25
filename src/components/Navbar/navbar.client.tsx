// "use client";

// import React from "react";
// import Image from "next/image";

// const menuItems = [
//   { label: "Home", icon: "/Nav_home.svg" },
//   { label: "My Page", icon: "/Nav_mypage.svg" },
//   { label: "Result", icon: "/Nav_result.svg" },
//   { label: "Ranking", icon: "/Nav_ranking.svg" },
//   { label: "Quiz", icon: "/Nav_quiz.svg" },
// ];

// export default function Navbar() {
//   return (
//     <aside style={styles.sidebar}>
//       {/* 상단 헤더 + 유저 */}
//       <div>
//         {/* 로고 */}
//         <div style={styles.header}>
//           🥭 <span style={styles.logoText}>LunchCoin</span>
//         </div>

//         {/* 유저 정보 */}
//         <div style={styles.userCard}>
//           <div>
//             <div style={styles.userName}>User</div>
//             <div style={styles.coinText}>💰 보유 코인 100런치</div>
//           </div>
//         </div>

//         {/* 메뉴 항목 */}
//         <nav style={{ ...styles.menuList, marginTop: "32px" }}>
//           {menuItems.map((item) => (
//             <div key={item.label} style={styles.menuItem}>
//               <Image src={item.icon} alt={item.label} width={20} height={20} />
//               <span style={styles.menuLabel}>{item.label}</span>
//             </div>
//           ))}
//         </nav>

//         {/* 로그아웃 */}
//         <button style={styles.logout}>
//           🔓 <span style={{ marginLeft: "8px" }}>Log out</span>
//         </button>
//       </div>
//     </aside>
//   );
// }

// const styles: { [key: string]: React.CSSProperties } = {
//   sidebar: {
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "space-between",
//     minWidth: "264px",
//     maxWidth: "320px",
//     height: "100vh",
//     padding: "24px",
//     background: "#fff",
//     boxShadow: "2px 0 8px rgba(0,0,0,0.05)",
//     borderRadius: "0 24px 24px 0",
//     fontFamily: "Pretendard, Inter, sans-serif",
//   },
//   header: {
//     fontSize: "24px",
//     fontWeight: 700,
//     marginBottom: "24px",
//     display: "flex",
//     alignItems: "center",
//     gap: "8px",
//   },
//   logoText: {
//     fontSize: "20px",
//     fontWeight: 600,
//     color: "#131313",
//   },
//   userCard: {
//     display: "flex",
//     alignItems: "center",
//     gap: "12px",
//     marginBottom: "8px",
//   },
//   userName: {
//     display: "flex",
//     alignItems: "center",
//     background: "none",
//     border: "none",
//     color: "#131313",
//     fontSize: "14px",
//     fontWeight: 600,
//     cursor: "pointer",
//     padding: "8px 0",
//   },
//   coinText: {
//     display: "flex",
//     alignItems: "center",
//     background: "none",
//     border: "none",
//     color: "#131313",
//     fontSize: "14px",
//     fontWeight: 600,
//     cursor: "pointer",
//     padding: "8px 0",
//   },
//   logout: {
//     display: "flex",
//     alignItems: "center",
//     background: "none",
//     border: "none",
//     color: "#D94B4B",
//     fontSize: "14px",
//     fontWeight: 600,
//     cursor: "pointer",
//     padding: "8px 0",
//   },
//   menuList: {
//     display: "flex",
//     flexDirection: "column",
//     gap: "12px",
//   },
//   menuItem: {
//     display: "flex",
//     flexDirection: "row",
//     gap: "20px",
//     padding: "12px 20px",
//     borderRadius: "24px",
//     cursor: "pointer",
//     color: "#131313",
//     fontSize: "14px",
//     letterSpacing: "-0.25px",
//     fontWeight: 400,
//   },
// };


// "use client";

// import React from "react";
// import Image from "next/image";

// const menuItems = [
//   { label: "Home", icon: "/Nav_home.svg" },
//   { label: "My Page", icon: "/Nav_mypage.svg" },
//   { label: "Result", icon: "/Nav_result.svg" },
//   { label: "Ranking", icon: "/Nav_ranking.svg" },
//   { label: "Quiz", icon: "/Nav_quiz.svg" },
// ];

// export default function Navbar() {
//   return (
//     <aside style={styles.sidebar}>
//       {/* 상단 컨텐츠: 로고, 유저 정보, 메뉴 */}
//       <div>
//         {/* 로고 */}
//         <div style={styles.header}>
//           🥭 <span style={styles.logoText}>LunchCoin</span>
//         </div>

//         {/* 유저 정보 */}
//         <div style={styles.userCard}>
//           <div>
//             <Image src="/default_bird.png" alt="user" width={25} height={25}></Image>
//             <div style={styles.userName}>User</div>
//             <div style={styles.coinText}>💰 보유 코인 100런치</div>
//           </div>
//         </div>

//         {/* 메뉴 항목 */}
//         <nav style={{ ...styles.menuList, marginTop: "32px" }}>
//           {menuItems.map((item) => (
//             <div key={item.label} style={styles.menuItem}>
//               <Image src={item.icon} alt={item.label} width={20} height={20} />
//               <span style={styles.menuLabel}>{item.label}</span>
//             </div>
//           ))}
//         </nav>
//       </div>

//       {/* 하단 로그아웃 버튼 */}
//       <button style={styles.logout}>
//         🔓 <span style={{ marginLeft: "8px" }}>Log out</span>
//       </button>
//     </aside>
//   );
// }

// const styles: { [key: string]: React.CSSProperties } = {
//   sidebar: {
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "space-between",
//     minWidth: "264px",
//     maxWidth: "320px",
//     height: "100vh",
//     padding: "24px",
//     background: "#fff",
//     boxShadow: "2px 0 8px rgba(0,0,0,0.05)",
//     borderRadius: "0 24px 24px 0",
//     fontFamily: "Pretendard, Inter, sans-serif",
//   },
//   header: {
//     fontSize: "24px",
//     fontWeight: 700,
//     marginBottom: "24px",
//     display: "flex",
//     alignItems: "center",
//     gap: "8px",
//   },
//   logoText: {
//     fontSize: "20px",
//     fontWeight: 600,
//     color: "#131313",
//   },
//   userCard: {
//     display: "flex",
//     alignItems: "center",
//     gap: "12px",
//     marginBottom: "8px",
//   },
//   userName: {
//     display: "flex",
//     alignItems: "center",
//     color: "#131313",
//     fontSize: "14px",
//     fontWeight: 600,
//     padding: "8px 0",
//   },
//   coinText: {
//     display: "flex",
//     alignItems: "center",
//     color: "#131313",
//     fontSize: "14px",
//     fontWeight: 600,
//     padding: "8px 0",
//   },
//   logout: {
//     display: "flex",
//     alignItems: "center",
//     background: "none",
//     border: "none",
//     color: "#D94B4B",
//     fontSize: "14px",
//     fontWeight: 600,
//     cursor: "pointer",
//     padding: "8px 0",
//   },
//   menuList: {
//     display: "flex",
//     flexDirection: "column",
//     gap: "12px",
//   },
//   menuItem: {
//     display: "flex",
//     flexDirection: "row",
//     gap: "20px",
//     padding: "12px 20px",
//     borderRadius: "24px",
//     cursor: "pointer",
//     color: "#131313",
//     fontSize: "14px",
//     letterSpacing: "-0.25px",
//     fontWeight: 400,
//   },
// };


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
      {/* 상단 컨텐츠: 로고, 유저 정보, 메뉴 */}
      <div>
        {/* 로고 */}
        <div style={styles.header}>
          🥭 <span style={styles.logoText}>LunchCoin</span>
        </div>

        {/* 유저 정보 */}
        <div style={styles.userCard}>
          <div style={styles.userInfo}>
            <Image style={styles.userImage} src="/default_bird.png" alt="user" width={25} height={25} />
            <div style={styles.userName}>User</div>
          </div>
          <div style={styles.coinText}>보유 코인 100런치</div>
        </div>

        {/* 메뉴 항목 */}
        <nav style={{ ...styles.menuList, marginTop: "32px" }}>
          {menuItems.map((item) => (
            <div key={item.label} style={styles.menuItem}>
              <Image src={item.icon} alt={item.label} width={20} height={20} />
              <span style={styles.menuLabel}>{item.label}</span>
            </div>
          ))}
        </nav>
      </div>

      {/* 하단 로그아웃 버튼 */}
      <button style={styles.logout}>
        🔓 <span style={{ marginLeft: "8px" }}>Log out</span>
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
    marginTop: "30px"
  },
  userImage: {
    marginTop: "27px"
  },
  userName: {
    color: "#131313",
    fontSize: "14px",
    fontWeight: 600,
    marginTop: "30px"
  },
  coinText: {
    color: "#131313",
    fontSize: "14px",
    fontWeight: 600,
    marginLeft: "35px",
    marginTop: "10px"
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
  },
};
