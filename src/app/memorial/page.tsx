import type { Metadata } from "next";
import Link from "next/link";
import PageHead from "@/components/PageHead";
import PrintPhoto from "@/components/PrintPhoto";
import WishWall from "@/components/WishWall";
import { Envelope, Flower, Sun } from "@/components/Art";
import { img, OLD } from "@/content/site";
import s from "./memorial.module.css";

// 校友祝賀牆（留言區）先隱藏、程式碼保留；要恢復時把 SHOW_WALL 改成 true。
// 完整備份在專案根目錄 backup/memorial-2026-11-09/
const SHOW_WALL = false;

export const metadata: Metadata = { title: "紀念", description: SHOW_WALL ? "影像紀事與校友祝賀牆。" : "影像紀事。" };

export default function MemorialPage() {
  return (
    <>
      <PageHead
        crumbs={[["首頁", "/"], ["紀念"]]}
        eng="Keep in touch"
        title="留下給母校的紀念"
        lead={<p>{SHOW_WALL ? "翻閱影像紀事、在祝賀牆寫一句話，和我們一起迎接 130 歲。" : "翻閱影像紀事，和我們一起迎接 130 歲。"}</p>}
        tone="red"
        art={<div className={s.headArt}><Envelope className={`${s.env} wobble`} /><Flower className={`${s.flower} bob`} /></div>}
      />
      <nav className={`wrap ${s.subnav}`} aria-label="紀念分區">
        <a href="#records">影像紀事</a>{SHOW_WALL && <a href="#wall">校友祝賀牆</a>}
      </nav>

      <section id="records" className={`wrap ${s.sec}`} aria-labelledby="rec-title">
        <p className="eyebrow" data-reveal="up">Records</p>
        <h2 id="rec-title" className={`${s.h2} cjk-heavy`} data-reveal="up">影像紀事</h2>
        <div className={s.records}>
          <Link href="/history/" className={s.rec} data-reveal="up" data-flat>
            <PrintPhoto src={img("h10")!} alt="" className={s.recPic} />
            <span className={s.recBody}><b className="display">No.01</b><strong className="cjk-heavy">大龍校史</strong><span>1896–2026 年表與 {OLD.length} 張老照片。</span></span>
          </Link>
          <Link href="/history/#album" className={s.rec} data-reveal="up" data-flat data-delay="0.1">
            <PrintPhoto src={img("h08")!} alt="" className={s.recPic} />
            <span className={s.recBody}><b className="display">No.02</b><strong className="cjk-heavy">老照片牆</strong><span>操場、教室、校門口——那些年的我們都在這裡。</span></span>
          </Link>
          <div className={`${s.rec} ${s.soon}`} data-reveal="up" data-flat data-delay="0.2">
            <span className={s.recArt}><Sun className="spin-slow" /></span>
            <span className={s.recBody}><b className="display">No.03</b><strong className="cjk-heavy">更多影像紀事</strong><span>校慶活動紀錄整理中，陸續上架。</span></span>
          </div>
        </div>
      </section>

      {SHOW_WALL && (
        <section id="wall" className={s.wallSec} aria-labelledby="wall-title">
          <div className="wrap">
            <p className="eyebrow" data-reveal="up">Wishes</p>
            <h2 id="wall-title" className={`${s.h2} cjk-heavy`} data-reveal="up">校友祝賀牆</h2>
            <p className={s.lead} data-reveal="up">寫一句話給母校，它會變成牆上的一張小紙條。</p>
            <WishWall />
          </div>
        </section>
      )}
    </>
  );
}
