"use client";
import DailyRank from "@/components/ranking/DailyRank";
import WeeklyRank from "@/components/ranking/WeeklyRank";
import WeeklyTop from "@/components/ranking/WeeklyTop";
import React from "react";
import { Tab, Tabs } from "react-bootstrap";
export default function RankingPage() {
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
              justifyContent: "space-around",
              alignItems: "center",
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
