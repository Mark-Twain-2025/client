"use client";

import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ProgressBar from "react-bootstrap/ProgressBar";
import Badge from "react-bootstrap/Badge";
import Alert from "react-bootstrap/Alert";
import Image from "next/image";

interface FoodCategory {
  id: string;
  name: string;
  emoji: string;
  votes: number;
  color: string;
}

const foodCategories: FoodCategory[] = [
  { id: "korean", name: "한식", emoji: "🍚", votes: 45, color: "danger" },
  { id: "chinese", name: "중식", emoji: "🍜", votes: 32, color: "warning" },
  { id: "japanese", name: "일식", emoji: "🍣", votes: 28, color: "info" },
  { id: "western", name: "양식", emoji: "🍝", votes: 21, color: "primary" },
  { id: "others", name: "기타", emoji: "🍽️", votes: 15, color: "secondary" },
];

export default function LunchVoting() {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [investAmount, setInvestAmount] = useState<string>("");
  const [showAlert, setShowAlert] = useState(false);

  const totalVotes = foodCategories.reduce((sum, c) => sum + c.votes, 0);

  const handleVote = () => {
    if (selectedCategory && investAmount) {
      setShowAlert(true);
    }
  };

  return (
    <div className="container py-4">
      <h1 className="mb-4"></h1>

      {showAlert && (
        <Alert
          variant="success"
          onClose={() => setShowAlert(false)}
          dismissible
        >
          {foodCategories.find((c) => c.id === selectedCategory)?.name}에{" "}
          {investAmount}원 투자 완료!
        </Alert>
      )}

      <div
        className="d-grid gap-4 mb-5"
        style={{
          gridTemplateColumns: "repeat(3, 1fr)",
          display: "grid",
          justifyItems: "center",
        }}
      >
        {foodCategories.map((category) => {
          const isSelected = category.id === selectedCategory;
          return (
            <Card
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className="text-center shadow-sm"
              style={{
                width: "160px",
                height: "160px",
                cursor: "pointer",
                border: isSelected ? "3px solid purple" : "1px solid lightgray",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.5rem",
              }}
            >
              <div>
                <div style={{ fontSize: "2.5rem" }}>{category.emoji}</div>
                <div>{category.name}</div>
              </div>
            </Card>
          );
        })}
      </div>

      <Card className="mb-5">
        <Card.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label
                style={{
                  fontSize: "24px",
                  fontWeight: 600,
                  fontFamily: "Inter",
                }}
              >
                투자 금액 입력
              </Form.Label>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "20px", // 입력창과 버튼 사이 간격
                }}
              >
                <Form.Control
                  type="number"
                  value={investAmount}
                  onChange={(e) => setInvestAmount(e.target.value)}
                  placeholder="숫자를 입력하세요"
                  style={{
                    width: "300px",
                    padding: "12px 16px",
                    fontSize: "20px",
                    border: "1.5px solid #000",
                    borderRadius: "10px",
                  }}
                />

                <Button
                  onClick={handleVote}
                  disabled={!selectedCategory || !investAmount}
                  style={{
                    padding: "12px 24px",
                    fontSize: "20px",
                    borderRadius: "10px",
                    border: "1.5px solid #000",
                    backgroundColor:
                      selectedCategory && investAmount
                        ? "#000"
                        : "rgba(0, 0, 0, 0.3)",
                    color: "white",
                    fontWeight: 600,
                  }}
                >
                  투자하기
                </Button>
              </div>
            </Form.Group>

            <div
              style={{
                color: "#CCC",
                fontSize: "18px",
                fontWeight: 500,
                fontFamily: "Inter",
                marginTop: "12px",
              }}
            >
              2런치 보유
            </div>
          </Form>
        </Card.Body>
      </Card>

      <div className="d-flex justify-content-between">
        {/* <Badge bg="info" className="fs-6">
          총 투표수: {totalVotes}
        </Badge> */}
      </div>
    </div>
  );
}
