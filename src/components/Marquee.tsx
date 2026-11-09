import s from "./bits.module.css";

export default function Marquee({ items, tone = "brown" }: { items: string[]; tone?: "brown" | "red" | "gold" }) {
  const group = (k: string) => (
    <div className={s.group} key={k}>
      {items.map((t, i) => (
        <span key={i}>{t}<i>✸</i></span>
      ))}
    </div>
  );
  return (
    <div className={`${s.marquee} ${s[tone]}`}>
      <p className="sr-only">{items.join("・")}</p>
      <div className={s.track} aria-hidden="true">{[group("a"), group("b")]}</div>
    </div>
  );
}
