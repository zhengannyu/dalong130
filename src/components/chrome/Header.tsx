"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logotype from "../Logotype";
import { Star } from "../Art";
import s from "./chrome.module.css";

// 主選單：大龍校史／活動（下拉：慶祝、傳承、國際交流）／紀念；「校慶資訊」是右側的按鈕
// 「國際交流」在資料裡的分類名稱是「展望」，所以連結的 cat 用「展望」
const NAV: { href: string; label: string; en: string; sub?: { label: string; cat: string }[] }[] = [
  { href: "/history/", label: "大龍校史", en: "History" },
  {
    href: "/events/", label: "活動", en: "Events",
    sub: [
      { label: "慶祝", cat: "慶祝" },
      { label: "傳承", cat: "傳承" },
      { label: "國際交流", cat: "展望" },
    ],
  },
  { href: "/memorial/", label: "紀念", en: "Memorial" },
];

export default function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [stuck, setStuck] = useState(false);

  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    const on = () => setStuck(scrollY > 20);
    on();
    addEventListener("scroll", on, { passive: true });
    return () => removeEventListener("scroll", on);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const isOn = (href: string) => path.startsWith(href);

  // 已經在活動頁時，不重新載入頁面，直接通知活動列表切換分類
  const pickCat = (e: React.MouseEvent, cat: string) => {
    setOpen(false);
    if (path !== "/events/" && path !== "/events") return;
    e.preventDefault();
    history.pushState(null, "", `/events/?cat=${encodeURIComponent(cat)}`);
    window.dispatchEvent(new Event("events-cat"));
  };

  return (
    <header className={`${s.header} ${stuck ? s.stuck : ""}`}>
      <Link href="/" className={s.brand} aria-label="大龍國小 130 週年校慶 首頁">
        <Logotype crop="mark" className={s.mark} />
        <span className={s.brandTxt}>
          <b>大龍國小</b>
          <i className="script">since 1896</i>
        </span>
      </Link>
      <nav aria-label="主選單" className={`${s.nav} ${open ? s.open : ""}`} id="main-nav">
        <ul>
          {NAV.map((n) => (
            <li key={n.href} className={n.sub ? s.hasSub : undefined}>
              <Link href={n.href} className={isOn(n.href) ? s.on : undefined} aria-current={isOn(n.href) ? "page" : undefined} aria-haspopup={n.sub ? "true" : undefined}>
                <span>{n.label}</span>
                <em className="script">{n.en}</em>
              </Link>
              {n.sub && (
                <ul className={s.sub} aria-label={`${n.label}分類`}>
                  {n.sub.map((c) => (
                    <li key={c.cat}>
                      <Link href={`/events/?cat=${encodeURIComponent(c.cat)}`} onClick={(e) => pickCat(e, c.cat)}>
                        <span>{c.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
          <li className={s.navCta}>
            <Link href="/info/" className="btn btn--sm">校慶資訊 <span className="arrow">→</span></Link>
          </li>
        </ul>
        <Star className={`${s.menuStar} wobble`} color="#E64B2E" />
      </nav>
      <button className={s.burger} aria-expanded={open} aria-controls="main-nav" aria-label={open ? "關閉選單" : "開啟選單"} onClick={() => setOpen((v) => !v)}>
        <span /><span /><span />
      </button>
    </header>
  );
}
