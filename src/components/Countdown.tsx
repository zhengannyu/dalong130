"use client";
import { useEffect, useState } from "react";
import s from "./bits.module.css";

const TARGET = new Date("2026-11-21T08:30:00+08:00").getTime();
const pad = (n: number) => String(n).padStart(2, "0");

export default function Countdown() {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const ms = now == null ? null : Math.max(0, TARGET - now);
  const sec = ms == null ? null : Math.floor(ms / 1000);
  const units: [string, string][] = sec == null
    ? [["--", "天"], ["--", "時"], ["--", "分"], ["--", "秒"]]
    : [[pad(Math.floor(sec / 86400)), "天"], [pad(Math.floor((sec % 86400) / 3600)), "時"], [pad(Math.floor((sec % 3600) / 60)), "分"], [pad(sec % 60), "秒"]];
  const started = ms === 0;
  return (
    <div className={s.countdown} role="timer" aria-live="off">
      <p className={s.cdLabel}>{started ? "校慶進行中，歡迎回家！" : "距離 11/21 校慶典禮還有"}</p>
      <div className={s.cdUnits}>
        {units.map(([v, u], i) => (
          <span key={u} className={s.cdUnit} style={{ rotate: `${[-3, 2, -2, 3][i]}deg` }}>
            <b className="display" key={v}>{v}</b>
            <em>{u}</em>
          </span>
        ))}
      </div>
    </div>
  );
}
