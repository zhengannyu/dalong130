"use client";
// 校友祝賀牆：留言只存在訪客自己的瀏覽器（localStorage），正式上線需接後端或表單服務
import { useEffect, useState } from "react";
import gsap from "gsap";
import s from "@/app/memorial/memorial.module.css";

type Wish = { n: string; m: string; ex?: boolean };
const KEY = "dalong130-wishes";
const SEED: Wish[] = [
  { n: "78 學年度校友", m: "謝謝當年在拱廊下陪我聊天的導師。大龍生日快樂！", ex: true },
  { n: "在校家長", m: "孩子每天都說學校像城堡，謝謝老師們讓他愛上上學。", ex: true },
  { n: "佾舞隊學姐", m: "孔廟秋祭的鼓聲到現在都還記得。祝學弟妹跳得比我們更好！", ex: true },
];
const TONES = [s.noteCream, s.noteGold, s.noteRed, s.noteMustard];

export default function WishWall() {
  const [mine, setMine] = useState<Wish[]>([]);
  const [n, setN] = useState("");
  const [m, setM] = useState("");
  const [err, setErr] = useState("");

  useEffect(() => {
    try { setMine(JSON.parse(localStorage.getItem(KEY) || "[]")); } catch { /* 無痕模式等情況 */ }
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!n.trim() || !m.trim()) { setErr("署名和祝福都要寫喔！"); return; }
    const next = [{ n: n.trim(), m: m.trim() }, ...mine];
    setMine(next);
    try { localStorage.setItem(KEY, JSON.stringify(next)); } catch { /* ignore */ }
    setN(""); setM(""); setErr("");
    requestAnimationFrame(() => {
      const el = document.querySelector(`.${s.notes} > :first-child`);
      if (el && !matchMedia("(prefers-reduced-motion: reduce)").matches)
        gsap.fromTo(el, { scale: 0.3, rotate: -30, opacity: 0 }, { scale: 1, rotate: 0, opacity: 1, duration: 0.7, ease: "back.out(2)", clearProps: "transform" });
    });
  };

  const all = [...mine, ...SEED];
  return (
    <div className={s.wishGrid}>
      <form className={s.wishForm} onSubmit={submit} noValidate>
        <p className={`${s.formTitle} display`}>Dear Dalong,</p>
        <label className={s.field}>
          <span>署名</span>
          <input value={n} onChange={(e) => setN(e.target.value)} maxLength={20} placeholder="例如：85 學年度 王小龍" />
        </label>
        <label className={s.field}>
          <span>給大龍的話 <small>{m.length}/80</small></span>
          <textarea value={m} onChange={(e) => setM(e.target.value)} maxLength={80} rows={4} placeholder="最多 80 字" />
        </label>
        {err && <p className={s.err} role="alert">{err}</p>}
        <button className="btn" type="submit">貼上祝福 <span className="arrow">✸</span></button>
      </form>
      <ul className={s.notes} aria-live="polite">
        {all.map((w, i) => (
          <li key={`${w.n}-${i}-${w.m.length}`} className={`${s.note} ${TONES[i % TONES.length]}`} style={{ rotate: `${[-3, 2, -1.5, 2.5, -2, 1][i % 6]}deg` }}>
            <p>{w.m}</p>
            <footer>— {w.n}{w.ex && <em>範例</em>}</footer>
          </li>
        ))}
      </ul>
    </div>
  );
}
