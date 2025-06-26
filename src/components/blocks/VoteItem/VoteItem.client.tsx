"use client";
import React, { useState } from "react";
import styles from "./VoteItem.module.css";

const foodTypes = [
  { key: "korean", label: "한식", img: "/한식.avif" },
  { key: "chinese", label: "중식", img: "/한식.avif" },
  { key: "japanese", label: "일식", img: "/한식.avif" },
  { key: "western", label: "양식", img: "/한식.avif" },
  { key: "etc", label: "기타", img: "/한식.avif" },
];

interface VoteItemProps {
  lunchCount: number;
  onVote?: (vote: { type: string; amount: number }) => void;
}

const VoteItemClient = ({ lunchCount, onVote }: VoteItemProps) => {
  const [selected, setSelected] = useState<string | null>(null);
  const [amount, setAmount] = useState("");

  const firstRow = foodTypes.slice(0, 3);
  const secondRow = foodTypes.slice(3, 5);

  const handleVote = () => {
    if (!selected) return alert("음식을 선택하세요!");
    if (!amount || Number(amount) <= 0) return alert("금액을 입력하세요!");
  
    onVote?.({ type: selected, amount: Number(amount) });
    setAmount("");
    setSelected(null);
  };
  

  return (
    <div className={styles.voteContainer}>
      <h2 className={styles.title}>오늘의 점심 투표</h2>

      <div className={styles.foodGrid}>
        {[firstRow, secondRow].map((row, idx) => (
          <div key={idx} className={styles.foodRow}>
            {row.map((food) => (
              <div
                key={food.key}
                className={`${styles.foodCard} ${selected === food.key ? styles.selected : ""}`}
                onClick={() => setSelected(food.key)}
                tabIndex={0}
                role="button"
              >
                <div className={styles.foodImgBox}>
                  {food.img ? (
                    <img src={food.img} alt={food.label} className={styles.foodImg} />
                  ) : (
                    <div className={styles.foodImgPlaceholder} />
                  )}
                </div>
                <div className={styles.foodLabel}>{food.label}</div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* 입력란과 투표 버튼을 한 줄에 */}
      <div className={styles.centerAlignBox}>
        <label className={styles.inputLabel}>투자금액</label>
        <input
          type="number"
          placeholder="최소 ~ 최대"
          value={amount}
          onChange={(e) => setAmount(e.target.value.replace(/[^0-9]/g, ""))}
          className={styles.amountInput}
        />
        <button
          className={styles.voteButton}
          onClick={handleVote}
          disabled={!selected || !amount}
          type="button"
        >
          {selected
            ? `${foodTypes.find((f) => f.key === selected)?.label}에 투표하기`
            : "투표하기"}
        </button>
      </div>

      <div className={styles.lunchCount}>{lunchCount} 런치 보유</div>
    </div>
  );
};

export default VoteItemClient;
