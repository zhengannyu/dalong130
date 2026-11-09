import Link from "next/link";
import type { Act } from "@/content/site";
import { CAT_EN, img } from "@/content/site";
import PrintPhoto from "./PrintPhoto";
import { ActArt } from "./Art";
import s from "./EventCard.module.css";

export default function EventCard({ a, n, pos, hidden = false }: { a: Act; n: number; pos: number; hidden?: boolean }) {
  const src = img(a.img);
  return (
    <div className={s.slot} data-cat={a.cat} data-pos={pos} hidden={hidden} data-reveal="up" data-flat>
      <Link href={`/events/${a.slug}/`} className={s.card}>
        <span className={s.band}>
          <b>No.{String(n + 1).padStart(2, "0")}</b>
          <span>{a.cat}・{CAT_EN[a.cat]}</span>
        </span>
        <span className={s.pic}>
          {src ? (
            <PrintPhoto src={src} alt={`${a.t} ${a.s}`} className={s.photo} />
          ) : (
            <span className={s.art}><ActArt slug={a.slug} cat={a.cat} className={s.artSvg} /></span>
          )}
        </span>
        <span className={s.body}>
          <span className={`${s.date} display`}>{a.date}</span>
          <span className={`${s.title} cjk-heavy`}>{a.t}<small>{a.s}</small></span>
          <span className={s.sum}>{a.sum}</span>
        </span>
        <span className={s.go} aria-hidden="true">→</span>
      </Link>
    </div>
  );
}
