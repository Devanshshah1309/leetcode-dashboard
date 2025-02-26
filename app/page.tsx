"use client";

import QuestionTable from "../components/question-table";

export default function MainPage() {
  return (
    <div
      style={{
        padding: "2rem",
        backgroundColor: "black",
        color: "white",
        minHeight: "100vh",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: "20px",
          fontSize: "1.5rem",
        }}
      >
        Leetcode Company-Wise Dashboard
      </h2>
      <p className="text-sky-500" style={{ textAlign: "center" }}>
        <a
          href="https://github.com/liquidslr/leetcode-company-wise-problems"
          target="_blank"
        >
          Data Source (last updated 14 Feb, 2025)
        </a>
      </p>
      <QuestionTable />
    </div>
  );
}
