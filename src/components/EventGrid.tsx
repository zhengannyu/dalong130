"use client";
// 活動篩選：卡片由伺服器先畫好，這裡只負責切換顯示與重新排版（版面節奏依「可見順序」決定）
import { useEffect, useRef, useState, type ReactNode } from "react";
import gsap from "gsap";
import { CATS, type Cat } from "@/content/site";
import s from "./EventCard.module.css";
import { layoutPos } from "@/lib/layout";

type F = "全部" | Cat;



export default function EventGrid({ children, counts, limit, syncUrl = false }: { children: ReactNode; counts: Record<string, number>; limit?: string[]; syncUrl?: boolean }) {
  const [cat, setCat] = useState<F>("全部");
  const grid = useRef<HTMLDivElement>(null);
  const first = useRef(true);

  useEffect(() => {
    if (!syncUrl) return;
    // 進頁面、瀏覽器上一頁，或導覽列下拉選單切換分類時，都從網址的 ?cat= 同步
    const read = () => {
      const q = new URLSearchParams(location.search).get("cat") as F | null;
      setCat(q && (CATS as string[]).includes(q) ? q : "全部");
    };
    read();
    addEventListener("popstate", read);
    addEventListener("events-cat", read);
    return () => {
      removeEventListener("popstate", read);
      removeEventListener("events-cat", read);
    };
  }, [syncUrl]);

  useEffect(() => {
    const el = grid.current;
    if (!el) return;
    const cards = Array.from(el.querySelectorAll<HTMLElement>("[data-cat]"));
    let shown = 0;
    const vis: HTMLElement[] = [];
    const total = cards.filter((c) => {
      const slug = c.querySelector("a")?.getAttribute("href")?.split("/").filter(Boolean).pop() ?? "";
      return limit && cat === "全部" ? limit.includes(slug) : cat === "全部" || c.dataset.cat === cat;
    }).length;
    cards.forEach((c) => {
      const slug = c.querySelector("a")?.getAttribute("href")?.split("/").filter(Boolean).pop() ?? "";
      let ok = cat === "全部" || c.dataset.cat === cat;
      if (limit && cat === "全部") ok = limit.includes(slug);
      c.hidden = !ok;
      if (ok) { c.dataset.pos = String(layoutPos(shown, total)); vis.push(c); shown++; }
    });
    if (!first.current && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.fromTo(vis, { opacity: 0, y: 30, scale: 0.94 }, { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out(1.8)", stagger: 0.06, overwrite: true });
    }
    first.current = false;
    if (syncUrl) history.replaceState(null, "", cat === "全部" ? location.pathname : `${location.pathname}?cat=${encodeURIComponent(cat)}`);
  }, [cat, limit, syncUrl]);

  return (
    <>
      <div className={s.filters} role="group" aria-label="活動分類">
        {(["全部", ...CATS] as F[]).map((c) => (
          <button key={c} type="button" className={s.filter} aria-pressed={cat === c} onClick={() => setCat(c)}>
            {c}
            {!limit && <small className="display">{counts[c]}</small>}
          </button>
        ))}
      </div>
      <div className={s.grid} ref={grid}>{children}</div>
    </>
  );
}
