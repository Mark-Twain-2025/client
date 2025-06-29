"use client";
import React, { useState } from "react";
import styles from "./VoteItem.module.css";
import CardModal from "@/components/ui/CardModal";
import { useRouter } from "next/navigation";
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
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const firstRow = foodTypes.slice(0, 2);
  const secondRow = foodTypes.slice(2, 4);
  const thirdRow = foodTypes.slice(4);
  const [popupInfo, setPopupInfo] = useState<{label: string, amount: string} | null>(null);


  const FoodCard = ({ food, selected, onSelect }: { food: typeof foodTypes[0]; selected: string | null; onSelect: (key: string) => void }) => (
    <div
      className={`${styles.foodCard} ${selected === food.key ? styles.selected : ""}`}
      onClick={() => onSelect(food.key)}
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
  );

  const handleVote = () => {
    if (!selected) return alert("음식을 선택하세요!");
    if (!amount || Number(amount) <= 0) return alert("금액을 입력하세요!");

    onVote?.({ type: selected, amount: Number(amount) });
    setPopupInfo({
      label: foodTypes.find((f) => f.key === selected)?.label || "",
      amount,
    });
    setOpen(true);

    setAmount("");
    setSelected(null);
  };

  const handleClose = () => {
    setOpen(false);
    router.push("/");
  };

  return (
    <div className={styles.votePageContainer}>
      <div className={styles.voteCard}>
        <h2 className={styles.title}>오늘의 점심 투자</h2>

        <div className={styles.foodGrid}>
          <div className={styles.foodRow}>
            {firstRow.map((food) => (
              <FoodCard key={food.key} food={food} selected={selected} onSelect={setSelected} />
            ))}
          </div>
          <div className={styles.foodRow}>
            {secondRow.map((food) => (
              <FoodCard key={food.key} food={food} selected={selected} onSelect={setSelected} />
            ))}
          </div>
          <div className={styles.fullWidthRow}>
            <div
              className={`${styles.foodCard} ${selected === thirdRow[0].key ? styles.selected : ""} ${styles.fullWidthCard}`}
              onClick={() => setSelected(thirdRow[0].key)}
              tabIndex={0}
              role="button"
            >
              <div className={styles.foodLabel}>기타</div>
            </div>
          </div>
        </div>

        <div className={styles.centerAlignBox}>
          <div className={styles.inputRow}>
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
        {/* 투표 완료 팝업 */}
        <CardModal
          open={open}
          onClose={handleClose}
          imageSrc="/coin.png"
          imageAlt="coin"
          title={
            <span>
              🎉 <span style={{ color: '#FFA500' }}>투표 완료</span> 🎉
            </span>
          }
          message={
            <span>
              <b>{popupInfo?.label}</b>에 <b>{popupInfo?.amount}</b> 런치<br />
              투표가 완료되었습니다!
            </span>
          }
          buttonText="확인"
        />
      </div>
    </div>
  );
};

export default VoteItemClient;
