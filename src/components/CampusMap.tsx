"use client";
// 會場示意地圖：點編號或清單切換說明
import { useState } from "react";
import type { Zone } from "@/content/site";
import s from "@/app/info/info.module.css";

const B = "#8B421F", C = "#FFFBE9", G = "#FFBE16", M = "#F5AD00", R = "#E64B2E";
type Shape = { id: string; el: React.ReactNode; pin: [number, number]; label?: [number, number, string, number?] };

const SHAPES: Shape[] = [
  { id: "2", el: <rect x="40" y="44" width="560" height="96" rx="10" />, pin: [62, 64], label: [320, 78, "舊校舍・歷史迴廊"] },
  { id: "6", el: <rect x="624" y="44" width="136" height="236" rx="10" />, pin: [646, 64], label: [692, 104, "新校舍"] },
  { id: "5", el: <rect x="40" y="172" width="104" height="236" rx="12" />, pin: [62, 192], label: [92, 300, "活力廣場", 14] },
  { id: "3", el: <ellipse cx="368" cy="298" rx="196" ry="118" />, pin: [240, 228], label: [368, 304, "操　場", 22] },
  { id: "4", el: <rect x="578" y="262" width="34" height="72" rx="6" />, pin: [595, 298] },
  { id: "7", el: <rect x="624" y="308" width="136" height="150" rx="12" />, pin: [646, 328], label: [692, 396, "溫水游泳池", 14] },
  { id: "8", el: <rect x="212" y="428" width="196" height="46" rx="8" />, pin: [234, 451], label: [320, 457, "貴賓接待・醫護", 13] },
  { id: "1", el: <rect x="56" y="436" width="96" height="40" rx="8" />, pin: [74, 430], label: [116, 462, "校門", 14] },
];

export default function CampusMap({ zones }: { zones: Record<string, Zone> }) {
  const [on, setOn] = useState("3");
  const z = zones[on];
  return (
    <div className={s.mapGrid}>
      <div className={s.mapBox}>
        <svg viewBox="0 0 800 540" className={s.map} role="group" aria-label="大龍國小會場示意圖">
          <rect x="0" y="490" width="800" height="50" fill={M} />
          <text x="610" y="522" fill={B} style={{ font: "900 15px var(--cjk)", letterSpacing: ".3em" }}>哈 密 街</text>
          <rect x="14" y="16" width="772" height="470" rx="18" fill={C} stroke={B} strokeWidth="4" />
          {[70, 134, 198, 262, 326, 390, 454, 518].map((x) => (
            <path key={x} d={`M${x} 140V108a22 22 0 0 1 44 0V140Z`} fill={G} stroke={B} strokeWidth="3" pointerEvents="none" />
          ))}
          {SHAPES.map((sh) => (
            <g
              key={sh.id}
              className={`${s.zone} ${on === sh.id ? s.zoneOn : ""}`}
              tabIndex={0}
              role="button"
              aria-pressed={on === sh.id}
              aria-label={`${sh.id} ${zones[sh.id].n}`}
              onClick={() => setOn(sh.id)}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setOn(sh.id); } }}
            >
              <g className={s.zoneShape} stroke={B} strokeWidth="4">{sh.el}</g>
              {sh.label && (
                <text x={sh.label[0]} y={sh.label[1]} textAnchor="middle" fill={B} style={{ font: `900 ${sh.label[3] ?? 17}px var(--cjk)` }} pointerEvents="none">{sh.label[2]}</text>
              )}
              <g transform={`translate(${sh.pin[0]} ${sh.pin[1]})`} className={s.pin}>
                <circle r="16" fill={on === sh.id ? R : B} stroke={C} strokeWidth="3" />
                <text textAnchor="middle" dominantBaseline="central" fill={C} style={{ font: "900 16px var(--display)" }}>{sh.id}</text>
              </g>
            </g>
          ))}
          <path className={s.route} d="M104 476V392Q104 300 130 250L130 232M130 300Q150 318 190 318L205 318" pointerEvents="none" />
          <g transform="translate(500 452)" pointerEvents="none">
            <circle r="20" fill={G} stroke={B} strokeWidth="3" />
            <path d="M0 -14L6 6L0 2L-6 6Z" fill={B} />
          </g>
        </svg>
        <p className={s.mapNote}>示意圖・非實際比例・紅色虛線為建議動線</p>
      </div>
      <div>
        <div className={s.zoneCard} aria-live="polite" key={on}>
          <span className="display">Zone {on.padStart(2, "0")}</span>
          <h3 className="cjk-heavy">{z.n}</h3>
          <p>{z.d}</p>
          <div className={s.zoneChips}>{z.c.map((c) => <span key={c} className="chip">{c}</span>)}</div>
        </div>
        <ul className={s.legend}>
          {Object.entries(zones).map(([k, v]) => (
            <li key={k}>
              <button type="button" aria-pressed={on === k} onClick={() => setOn(k)}><i className="display">{k}</i>{v.n}</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
