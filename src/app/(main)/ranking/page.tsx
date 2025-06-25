"use client";
import DailyRank from "@/components/Ranking/DailyRank";
import WeeklyRank from "@/components/Ranking/WeeklyRank";
import WeeklyTop from "@/components/Ranking/WeeklyTop";
import React from "react";
import { Col, Tab, Tabs } from "react-bootstrap";
export default function ExamplePopup() {
  return (
    <div>
      <Tabs defaultActiveKey="daily" id="ranking-tabs" fill>
        <Tab eventKey="daily" title="일간">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <DailyRank />
          </div>
        </Tab>
        <Tab eventKey="weekly" title="주간">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
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
