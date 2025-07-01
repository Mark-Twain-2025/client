"use client";
import DailyRank from "@/components/Ranking/DailyRank";
import WeeklyRank from "@/components/Ranking/WeeklyRank";
import WeeklyTop from "@/components/Ranking/WeeklyTop";

import { Tab, Tabs } from "react-bootstrap";

import { useEffect, useState } from "react";

export default function RankingPage() {
  const [a, setA] = useState(false);
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
            <WeeklyTop />
            <WeeklyRank />
          </div>
        </Tab>
      </Tabs>
    </div>
  );
}
