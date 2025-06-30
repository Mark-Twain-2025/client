import MiniCards from "@/components/mypage/MiniCards";
import HistoryGraph from "@/components/mypage/HistoryGraph";
import HistoryList from "@/components/mypage/HistoryList";
import QuizHistory from "@/components/mypage/QuizHistory";

export default function MyPage() {
  return (
    <div
      className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 "
      style={{
        paddingTop: "2rem",
        paddingLeft: "6rem",
        paddingRight: "2rem",
        paddingBottom: "3rem",
      }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">My Page</h1>
          <p className="text-gray-600">
            나의 런치코인 투자 현황을 확인해보세요
          </p>
        </div>

        <div className="mb-8">
          <MiniCards />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <QuizHistory />
          <HistoryGraph />
        </div>

        <div>
          <HistoryList />
        </div>
      </div>
    </div>
  );
}
