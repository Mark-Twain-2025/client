"use client";
import React, { useState } from "react";
import styles from "./VoteAfter.module.css"

import CardModal from "@/components/ui/CardModal";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth/Auth";
import { useEffect } from "react";
import {getTodayVoteAfter, voteAfter } from "@/service/vote";

const foodTypes = [
  { key: "korean", label: "한식", img: "/한식.avif" },
  { key: "chinese", label: "일식", img: "/한식.avif" },
  { key: "japanese", label: "중식", img: "/한식.avif" },
  { key: "western", label: "양식", img: "/한식.avif" },
  { key: "etc", label: "기타", img: "/한식.avif" },
];

const categoryMap: Record<string, string> = {
  korean: "1",
  japanese: "2",
  chinese: "3",
  western: "4",
  etc: "5",
};

function getToday() {
  return new Date().toISOString().slice(0, 10);
}

const API_PREFIX = process.env.NEXT_PUBLIC_API_PREFIX || "";

const VoteAfterClient = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [alreadyVoted, setAlreadyVoted] = useState(false);
  const [popupInfo, setPopupInfo] = useState<{label: string} | null>(null);
  const router = useRouter();

  // 이미 투표했는지 확인
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;
    const date = getToday();
    const checkAlreadyVoted = async () => {
      try {
        const vote = await getTodayVoteAfter(userId, date);
        if (vote) {
          setAlreadyVoted(true);
        }
      } catch (err) {
        // 무시
      }
    };
    checkAlreadyVoted();
  }, []);

  const handleVote = async () => {
    if (alreadyVoted) return alert("이미 투표하셨습니다.");
    if (!selected) return alert("음식을 선택하세요!");
    const userId = localStorage.getItem("userId");
    if (!userId) return alert("로그인 정보가 없습니다.");
    const category_id = categoryMap[selected];
    const date = getToday();
    try {
      await voteAfter({ userId, category_id, date });
      setPopupInfo({ label: foodTypes.find((f) => f.key === selected)?.label || "" });
      setOpen(true);
      setSelected(null);
    } catch (err) {
      alert("투표 중 오류가 발생했습니다.");
    }
  };

  const handleClose = () => {
    setOpen(false);
    router.push("/");
  };

  return (
    <div className={styles.votePageContainer}>
      <div className={styles.voteCard}>
        <h2 className={styles.title}>실제 투표</h2>
        <div className={styles.foodGrid}>
          <div className={styles.foodRow}>
            {foodTypes.slice(0, 2).map((food) => (
              <div
                key={food.key}
                className={`${styles.foodCard} ${selected === food.key ? styles.selected : ""}`}
                onClick={() => setSelected(food.key)}
                tabIndex={0}
                role="button"
              >
                <div className={styles.foodImgBox}>
                  {food.img && (
                    <img src={food.img} alt={food.label} className={styles.foodImg} />
                  )}
                </div>
                <div className={styles.foodLabel}>{food.label}</div>
              </div>
            ))}
          </div>
          <div className={styles.foodRow}>
            {foodTypes.slice(2, 4).map((food) => (
              <div
                key={food.key}
                className={`${styles.foodCard} ${selected === food.key ? styles.selected : ""}`}
                onClick={() => setSelected(food.key)}
                tabIndex={0}
                role="button"
              >
                <div className={styles.foodImgBox}>
                  {food.img && (
                    <img src={food.img} alt={food.label} className={styles.foodImg} />
                  )}
                </div>
                <div className={styles.foodLabel}>{food.label}</div>
              </div>
            ))}
          </div>
          <div className={styles.fullWidthRow}>
            <div
              className={`${styles.foodCard} ${selected === foodTypes[4].key ? styles.selected : ""} ${styles.fullWidthCard}`}
              onClick={() => setSelected(foodTypes[4].key)}
              tabIndex={0}
              role="button"
            >
              <div className={styles.foodLabel}>기타</div>
            </div>
          </div>
        </div>
        <div className={styles.centerAlignBox}>
          <button
            className={styles.voteButton}
            onClick={handleVote}
            disabled={!selected}
            type="button"
          >
            {selected
              ? `${foodTypes.find((f) => f.key === selected)?.label}에 실제 투표하기`
              : "실제 투표하기"}
          </button>
        </div>
        <CardModal
          open={open}
          onClose={handleClose}
          imageSrc="/coin.png"
          imageAlt="coin"
          title={<span>🎉 <span style={{ color: '#FFA500' }}>실제 투표 완료</span> 🎉</span>}
          message={<span><b>{popupInfo?.label}</b>에<br />실제 투표가 완료되었습니다!</span>}
          buttonText="확인"
        />
      </div>
    </div>
  );
};

export default VoteAfterClient;
