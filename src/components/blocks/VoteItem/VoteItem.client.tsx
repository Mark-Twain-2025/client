"use client";
import React, { useState } from "react";
import styles from "./VoteItem.module.css";
import CardModal from "@/components/ui/CardModal";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth/Auth";
import { useEffect } from "react";
import { fetchUserCoins, voteBefore, getTodayVoteBefore, patchVoteBeforeCategory, updateInvestmentCategory } from "@/service/vote";

const foodTypes = [
  { key: "korean", label: "한식", img: "/한식.png" },
  { key: "chinese", label: "일식", img: "/일식.png" },
  { key: "japanese", label: "중식", img: "/중식.png" },
  { key: "western", label: "양식", img: "/양식.png" },
  { key: "etc", label: "기타", img: "/한식.avif" },
];

interface VoteItemProps {
  onVote?: (vote: { type: string; amount: number }) => void;
}

const VoteItemClient = ({ onVote }: VoteItemProps) => {
  const [selected, setSelected] = useState<string | null>(null);
  const [amount, setAmount] = useState("");
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const firstRow = foodTypes.slice(0, 2);
  const secondRow = foodTypes.slice(2, 4);
  const thirdRow = foodTypes.slice(4);
  const [popupInfo, setPopupInfo] = useState<{label: string, amount: string, isEdit?: boolean} | null>(null);
  const { isLogIn } = useAuth();
  console.log("isLogIn:", isLogIn);

  // 코인 상태 및 유저 정보 fetch
  const [coins, setCoins] = useState<number>(0);

  const [alreadyVoted, setAlreadyVoted] = useState(false);
  const [voteBeforeId, setVoteBeforeId] = useState<string | null>(null);
  const [prevAmount, setPrevAmount] = useState<string>("");
  const [prevCategory, setPrevCategory] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;
    const getCoins = async () => {
      try {
        const coins = await fetchUserCoins(userId);
        setCoins(coins);
      } catch (err) {
        console.error("코인 정보 불러오기 실패:", err);
      }
    };
    getCoins();
  }, []);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;
    const date = getToday();
    const checkAlreadyVoted = async () => {
      try {
        const vote = await getTodayVoteBefore(userId, date);
        if (vote) {
          setAlreadyVoted(true);
          setVoteBeforeId(vote._id || vote.id);
          setPrevAmount(String(vote.amount));
          setPrevCategory(Object.keys(categoryMap).find(key => categoryMap[key] === String(vote.category_id)) || null);
          console.log("[투표내역조회] 이미 투표함:", vote);
        } else {
          console.log("[투표내역조회] 오늘 투표 없음");
        }
      } catch (err) {
        console.log("[투표내역조회] 에러", err);
      }
    };
    checkAlreadyVoted();
  }, []);

  useEffect(() => {
    console.log("[상태] selected:", selected, "/ amount:", amount, "/ editMode:", editMode, "/ alreadyVoted:", alreadyVoted);
  }, [selected, amount, editMode, alreadyVoted]);

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

  const handleVote = async () => {
    console.log("[투표시도] selected:", selected, "/ amount:", amount, "/ editMode:", editMode);
    if (alreadyVoted && !editMode) return; // 이미 투표했으면 투표 막기
    const investAmount = Number(amount);
    // 예외처리
    if (!selected) return alert("음식을 선택하세요!");
    if (!amount || investAmount < 1) return alert("1코인 이상 입력하세요!");
    if (investAmount > 1000) return alert("최대 1000코인까지만 투자할 수 있습니다!");
    if (!editMode && investAmount > coins) return alert("보유한 런치 코인보다 많이 투자할 수 없습니다!");
    const userId = localStorage.getItem("userId");
    if (!userId) return alert("로그인 정보가 없습니다.");
    const category_id = categoryMap[selected];
    const date = getToday();
    try {
      if (editMode && voteBeforeId) {
        if (selected === prevCategory) {
          console.log("[수정모드] 카테고리 변경 안됨");
          return alert("카테고리를 변경해야 수정할 수 있습니다.");
        }
        console.log("[수정모드] PATCH 요청", voteBeforeId, category_id);
        
        // 1. vote_before 업데이트
        await patchVoteBeforeCategory(voteBeforeId, category_id);
        
        // 2. investments 업데이트 (새로 추가)
        await updateInvestmentCategory(userId, date, category_id);
        
        setPopupInfo({
          label: foodTypes.find((f) => f.key === selected)?.label || "",
          amount: prevAmount,
          isEdit: true,
        });
        setOpen(true);
        setEditMode(false);
        setAlreadyVoted(false);
        return;
      } else {
        // 최초 투표: POST
        const result = await voteBefore({ userId, category_id, amount: investAmount, date });
        setPopupInfo({
          label: foodTypes.find((f) => f.key === selected)?.label || "",
          amount,
        });
        setOpen(true);
        setAmount("");
        setSelected(null);
      }
    } catch (err) {
      alert("투표 중 오류가 발생했습니다.");
      console.error("[투표에러]", err);
    }
  };

  // 이미 투표했을 때 팝업에서 수정하기 클릭
  const handleEdit = () => {
    setEditMode(true);
    setSelected(prevCategory);
    setAmount(prevAmount);
    setAlreadyVoted(false);
    console.log("[수정모드 진입] prevCategory:", prevCategory, "/ prevAmount:", prevAmount);
  };

  // 상태 초기화 함수
  const resetVoteState = () => {
    setAlreadyVoted(false);
    setEditMode(false);
    setVoteBeforeId(null);
    setPrevAmount("");
    setPrevCategory(null);
    setPopupInfo(null);
    setOpen(false);
    setSelected(null);
    setAmount("");
  };

  const handleClose = () => {
    resetVoteState();
    router.push("/");
  };

  const handleThanks = () => {

   resetVoteState();
setTimeout(() => {
  router.push("/");
}, 100); // 100ms 정도만 지연해도 충분

  };

  return (
    <div className={styles.votePageContainer}>
      <div className={styles.voteCard}>
        <h2 className={styles.title}>오늘의 점심 투자</h2>
        {/* 이미 투표했을 때 팝업 */}
        <CardModal
          open={alreadyVoted && !editMode && !open}
          onClose={() => {
            if (!editMode) {
            handleEdit(); // ← 수정모드 진입
          } else {
            handleThanks(); // 기본 닫기 동작
          }
        }}
          title={<span>오늘의 투표가 이미 완료되었습니다.<br/>다시 투표하시겠습니까?</span>}
          message={
            <span>
              <b>카테고리:</b> {foodTypes.find(f => f.key === prevCategory)?.label}<br/>
              <b>금액:</b> {prevAmount} 런치
            </span>
          }
          buttonText="수정하기"
          onButtonClick={handleEdit}
        />
        {/* 수정모드일 때 안내문구 */}
        {editMode && (
          <div style={{color:'#1976d2',textAlign:'center',marginBottom:'1rem',fontWeight:600}}>
            카테고리만 변경 가능합니다. (금액은 수정 불가)
          </div>
        )}
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
              onChange={(e) => {
                if (!editMode) {
                  setAmount(e.target.value.replace(/[^0-9]/g, ""));
                }
              }}
              className={styles.amountInput}
              readOnly={editMode} // 수정모드일 때 금액 입력 불가
              style={{ 
                backgroundColor: editMode ? '#f5f5f5' : '#fff',
                cursor: editMode ? 'not-allowed' : 'text'
              }}
            />
            <button
              className={styles.voteButton}
              onClick={handleVote}
              disabled={!selected || !amount }
              type="button"
            >
              {editMode ? "수정 완료" : selected
                ? `${foodTypes.find((f) => f.key === selected)?.label}에 투표하기`
                : "투표하기"}
            </button>
          </div>
          <div className={styles.lunchCount}>{coins} 런치 보유</div>
        </div>
        {/* 투표 완료 팝업 */}
        <CardModal
          open={open}
          onClose={handleClose}
          imageSrc="/coin.png"
          imageAlt="coin"
          title={
            popupInfo?.isEdit
              ? <span>🎉 <span style={{ color: '#FFA500' }}>수정 완료</span> 🎉</span>
              : <span>🎉 <span style={{ color: '#FFA500' }}>투표 완료</span> 🎉</span>
          }
          message={
            popupInfo?.isEdit
              ? <span>
                  <b>{popupInfo?.label}</b>로<br />
                  투표가 <b>수정</b>되었습니다!
                </span>
              : <span>
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
