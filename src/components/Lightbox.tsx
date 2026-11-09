"use client";
// 全站燈箱：任何帶 data-lb-src 的元素被點到就開啟；同一個 [data-lb-group] 內可左右切換
import { useCallback, useEffect, useRef, useState } from "react";

type Item = { src: string; cap: string };

export default function Lightbox() {
  const [items, setItems] = useState<Item[]>([]);
  const [i, setI] = useState(0);
  const last = useRef<HTMLElement | null>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const open = items.length > 0;

  const close = useCallback(() => { setItems([]); last.current?.focus(); }, []);
  const step = useCallback((d: number) => setI((v) => (v + d + items.length) % items.length), [items.length]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const t = (e.target as HTMLElement).closest<HTMLElement>("[data-lb-src]");
      if (!t) return;
      e.preventDefault();
      const group = t.closest("[data-lb-group]") ?? t.parentElement!;
      const nodes = Array.from(group.querySelectorAll<HTMLElement>("[data-lb-src]"));
      last.current = t;
      setItems(nodes.map((n) => ({ src: n.dataset.lbSrc!, cap: n.dataset.lbCap ?? "" })));
      setI(Math.max(0, nodes.indexOf(t)));
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    closeBtn.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "ArrowRight") step(1);
    };
    addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; removeEventListener("keydown", onKey); };
  }, [open, close, step]);

  const x0 = useRef<number | null>(null);
  if (!open) return null;
  const it = items[i];
  return (
    <div
      className="lb"
      role="dialog"
      aria-modal="true"
      aria-label="相片檢視"
      onClick={(e) => { if (e.target === e.currentTarget) close(); }}
      onTouchStart={(e) => (x0.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (x0.current == null) return;
        const dx = e.changedTouches[0].clientX - x0.current;
        if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
        x0.current = null;
      }}
    >
      <figure className="lb__fig" key={it.src}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={it.src} alt={it.cap} />
        <figcaption><b>{i + 1} / {items.length}</b> {it.cap}</figcaption>
      </figure>
      <button ref={closeBtn} className="lb__btn lb__x" onClick={close} aria-label="關閉">✕</button>
      {items.length > 1 && (
        <>
          <button className="lb__btn lb__prev" onClick={() => step(-1)} aria-label="上一張">←</button>
          <button className="lb__btn lb__next" onClick={() => step(1)} aria-label="下一張">→</button>
        </>
      )}
    </div>
  );
}
