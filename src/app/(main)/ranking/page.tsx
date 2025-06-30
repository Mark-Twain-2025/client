"use client";
import DailyRank from "@/components/ranking/DailyRank";
import WeeklyRank from "@/components/ranking/WeeklyRank";
import WeeklyTop from "@/components/ranking/WeeklyTop";
import React, { useEffect, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";

export default function RankingPage() {
  const [isWeeklyVisible, setIsWeeklyVisible] = useState(false);

  useEffect(() => {
    const now = new Date();
    const kst = new Date(
      now.toLocaleString("en-US", { timeZone: "Asia/Seoul" })
    );
    const revealTime = new Date("2025-07-04T14:00:00+09:00"); // KST

    setIsWeeklyVisible(kst >= revealTime);
  }, []);

  return (
    <div style={{ marginTop: "2rem", marginLeft: "6rem" }}>
      <h1 className="pb-3">Ranking</h1>
      <Tabs defaultActiveKey="daily" id="ranking-tabs" fill>
        <Tab eventKey="daily" title="일간">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <DailyRank />
          </div>
        </Tab>
        <Tab eventKey="weekly" title="주간">
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
              marginTop: "4rem",
              minHeight: "300px",
            }}
          >
            {isWeeklyVisible ? (
              <>
                <WeeklyTop />
                <WeeklyRank />
              </>
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "300px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#f8f9fa",
                  color: "#888",
                  fontSize: "1.5rem",
                  borderRadius: "12px",
                }}
              >
                주간 랭킹은 금요일 오후에 공개됩니다!
              </div>
            )}
          </div>
        </Tab>
      </Tabs>
    </div>
  );
}
