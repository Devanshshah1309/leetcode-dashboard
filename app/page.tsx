"use client";

import QuestionTable from "../components/question-table";
import { useEffect } from "react";

export default function MainPage() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.googletagmanager.com/gtag/js?id=G-KD58YLN2SV";
    script.async = true;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    gtag("js", new Date());
    gtag("config", "G-KD58YLN2SV");
  }, []);

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
      <p style={{ textAlign: "center" }}>
        <a
          href="https://github.com/liquidslr/leetcode-company-wise-problems"
          target="_blank"
          className="text-sky-500"
        >
          Data Source (last updated 14 Feb, 2025)
        </a>
        {" and "}
        <a
          href="https://github.com/Devanshshah1309/leetcode-dashboard"
          className="text-sky-500"
        >
          Github Repository
        </a>
      </p>
      <QuestionTable />
    </div>
  );
}
