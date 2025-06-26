'use client'

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Main() {
  const router = useRouter();

  return (
    <div className="main-bg">
      <div className="main-content">
        <div className="main-icon">
          <Image src="/coin_no_bg.png" alt="coin" width={90} height={90} />
        </div>
        <h1>LunchCoin</h1>
        <p className="subtitle">점심 메뉴 기반 투자 서비스, LunchCoin에 오신 것을 환영합니다!</p>
        <div className="main-buttons">
          <button
            className="main-btn main-btn-primary"
            onClick={() => router.push('/vote')}
          >
            {/* <span className="icon">🍽️</span> */}
            투표하러 가기
          </button>
          <button
            className="main-btn main-btn-outline"
            onClick={() => router.push('/vote')}
          >
            {/* <span className="icon">📊</span> */}
            결과 보러 가기
          </button>
        </div>
      </div>
      {/*
      <div className="scroll-content">
        <div className="content-section">
          <h2>LunchCoin 소개</h2>
          <p>LunchCoin은 점심 메뉴 투표를 통해 사용자들이 함께 결정하는 혁신적인 서비스입니다.</p>
        </div>
        <div className="content-section">
          <h2>주요 기능</h2>
          <ul>
            <li>실시간 투표 시스템</li>
            <li>투표 결과 시각화</li>
            <li>랭킹 시스템</li>
            <li>사용자 프로필 관리</li>
          </ul>
        </div>
        <div className="content-section">
          <h2>사용 방법</h2>
          <p>1. 로그인 후 투표 페이지로 이동</p>
          <p>2. 원하는 메뉴에 투표</p>
          <p>3. 실시간 결과 확인</p>
          <p>4. 랭킹에서 순위 확인</p>
        </div>
      </div>
      */}
      <svg
        className="main-wave"
        viewBox="0 0 1500 150"
        preserveAspectRatio="none"
      >
        <path
          d="M0,100
            C300,50 600,150 900,100
            C1200,50 1350,150 1500,100
            L1500,150 L0,150 Z"
          style={{ stroke: "none", fill: "#fff" }}
        />
      </svg>
      <style jsx>{`
        .main-bg {
          background: #FFA500;
          min-height: 90vh;
          width: 100vw;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }
        .main-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
        }
        .main-icon {
          margin-bottom: 2.5rem;
        }
        h1 {
          font-size: 4rem;
          font-weight: 800;
          color: #fff;
          margin-bottom: 1.2rem;
        }
        .subtitle {
          color: #fff;
          font-size: 1.5rem;
          font-weight: 400;
          margin-bottom: 2.2rem;
        }
        .main-buttons {
          display: flex;
          gap: 1.2rem;
        }
        .main-btn {
          padding: 1rem 2.2rem;
          font-size: 1.1rem;
          border-radius: 2rem;
          font-weight: 700;
          border: none;
          cursor: pointer;
          transition: background 0.2s, color 0.2s, border 0.2s;
        }
        .main-btn-primary {
          background: #fff;
          color: #FFA500;
        }
        .main-btn-primary:hover {
          background: #ffe0a3;
          color: #FFA500;
        }
        .main-btn-outline {
          background: transparent;
          color: #fff;
          border: 2px solid #fff;
        }
        .main-btn-outline:hover {
          background: #fff;
          color: #FFA500;
        }
        .main-wave {
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          height: 120px;
          z-index: 2;
        }
      `}</style>
    </div>
  );
}
