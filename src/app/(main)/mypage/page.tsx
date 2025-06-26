import MiniCards from "@/components/mypage/MiniCards";
import HistoryGraph from "@/components/mypage/HistoryGraph";
import HistoryList from "@/components/mypage/HistoryList";
import QuizHistory from "@/components/mypage/QuizHistory";

export default function MyPage() {
  return (
    <div style={{ width: "600px" }}>
      <h1 className="pb-3">My Page</h1>
      <div className="pb-2">
        <MiniCards />
      </div>

      <div className="grid grid-cols-2 pb-3 gap-3 h-60">
        <QuizHistory />
        <HistoryGraph />
      </div>

      <div>
        <HistoryList />
      </div>
    </div>
  );
}
