"use client";
import liveData from "../../assets/liveData.json" with { type: "json" };
import s from "./Live.module.css";
import { useEffect, useState } from "react";

export default function Live() {
  const INTERVAL = 800 as const;

  const [index, setIndex] = useState(0);

  useEffect(() => {
    let timeoutId: number;
    function stepData() {
      setIndex((curr) => (curr + 1) % liveData.length);
      timeoutId = setTimeout(stepData, INTERVAL);
    }
    stepData();
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <table id="live-data" className={s.liveData}>
      <tbody>
        <tr>
          <td>{liveData?.[index]?.[0]}</td>
          <td>{liveData?.[index]?.[1]}</td>
          <td>{liveData?.[index]?.[2]}</td>
        </tr>
      </tbody>
    </table>
  );
}
