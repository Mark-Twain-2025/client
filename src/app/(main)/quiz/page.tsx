import React from "react";
// import Navbar from "@/components/Navbar/navbar.client";
import Quiz from "@/components/Quiz";
import styles from "./QuizPage.module.css";

export default function QuizPage() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Quiz />
      </main>
    </div>
  );
}
