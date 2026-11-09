import type { Metadata } from "next";
import PageHead from "@/components/PageHead";
import EventCard from "@/components/EventCard";
import EventGrid from "@/components/EventGrid";
import { layoutPos } from "@/lib/layout";
import { Drum, Cake } from "@/components/Art";
import { ACTS, CATS } from "@/content/site";
import s from "./events.module.css";

export const metadata: Metadata = {
  title: "校慶活動",
  description: "大龍國小 130 週年校慶系列活動：慶祝、傳承、展望共 13 項活動。",
};

export default function EventsPage() {
  const counts: Record<string, number> = { 全部: ACTS.length };
  CATS.forEach((c) => (counts[c] = ACTS.filter((a) => a.cat === c).length));
  return (
    <>
      <PageHead
        crumbs={[["首頁", "/"], ["校慶活動"]]}
        eng="Let’s Celebrate"
        title="校慶系列活動"
        lead={<p>2026 年 2 月到 11 月，活動陸續登場！用慶祝、傳承、展望三種方式，一起迎接大龍的 130 歲。</p>}
        art={<div className={s.headArt}><Cake className={s.cake} /><Drum className={`${s.drum} wobble`} /></div>}
      />
      <section className={`wrap ${s.list}`}>
        <EventGrid counts={counts} syncUrl>
          {ACTS.map((a, n) => <EventCard key={a.slug} a={a} n={n} pos={layoutPos(n, ACTS.length)} />)}
        </EventGrid>
      </section>
    </>
  );
}
