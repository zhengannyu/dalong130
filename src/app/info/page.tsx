import type { Metadata } from "next";
import type { CSSProperties } from "react";
import PageHead from "@/components/PageHead";
import CampusMap from "@/components/CampusMap";
import TransportTabs from "@/components/TransportTabs";
import { DragonLong, Star, Wave } from "@/components/Art";
import { SCHED, ZONES, TRANSPORT, FAQ } from "@/content/site";
import s from "./info.module.css";

export const metadata: Metadata = {
  title: "典禮資訊",
  description: "115 年 11 月 21 日（六）大龍國小 130 週年校慶典禮：節目表、會場地圖、交通方式與常見問題。",
};

// 節目表時間軸的起訖（小時）
const T0 = 8;
const T1 = 16;

const toH = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return h + m / 60;
};

export default function InfoPage() {
  return (
    <>
      <PageHead
        crumbs={[["首頁", "/"], ["典禮資訊"]]}
        eng="See you 11.21"
        title="典禮資訊"
        lead={<p>謹訂於中華民國 115 年 11 月 21 日（星期六）上午 8:30，在本校舉行 130 週年校慶暨體育表演會，恭請蒞臨指導。</p>}
        tone="gold"
        art={<DragonLong />}
      />
      <nav className={`wrap ${s.subnav}`} aria-label="典禮資訊分區">
        <a href="#program">節目表</a>
        <a href="#transport">交通方式</a>
        <a href="#faq">常見問題</a>
      </nav>

      <section id="program" className={`wrap ${s.sec}`} aria-labelledby="prog-title">
        <div className={s.progHead}>
          <p className="eyebrow" data-reveal="up">
            Program
          </p>
          <h2 id="prog-title" className={`${s.h2} cjk-heavy`} data-reveal="up">
            11/21（六）典禮節目表
          </h2>
        </div>
        {/* 甘特圖：桌面版每張卡片的左緣＝開始時間、寬度＝時段長度，以底下 08:00–16:00 的時間軸為基準；手機版拿掉時間軸，卡片 100% 寬 */}
        <ol className={s.sched}>
          {SCHED.map((x) => {
            const l = (toH(x.a) - T0) / (T1 - T0),
              w = (toH(x.b) - toH(x.a)) / (T1 - T0);
            return (
              <li key={x.n} data-reveal="up" data-flat style={{ "--l": `${l * 100}%`, "--w": `${w * 100}%` } as CSSProperties}>
                <details className={s.slot}>
                  <summary>
                    <span className={`${s.time} display`}>
                      {x.a}
                      <i>–</i>
                      {x.b}
                    </span>
                    <span className={s.slotBody}>
                      <b className="cjk-heavy">{x.n}</b>
                    </span>
                    <span className={`chip ${s.place}`}>{x.pl}</span>
                    <span className={s.plus} aria-hidden="true">
                      +
                    </span>
                  </summary>
                  <p className={s.slotInfo}>
                    {x.ch && <em className={`chip chip--慶祝 ${s.ch}`}>{x.ch}</em>}
                    {x.info}
                  </p>
                </details>
              </li>
            );
          })}
        </ol>
        <p className={`${s.axis} display`} aria-hidden="true">
          <span>8:00</span>
          <span>12:00</span>
          <span>16:00</span>
        </p>
      </section>

      <Wave color="var(--mustard)" />
      <section id="transport" className={s.goSec} aria-labelledby="go-title">
        <div className={`wrap ${s.goGrid}`}>
          <div>
            <p className="eyebrow" data-reveal="up">
              Getting here
            </p>
            <h2 id="go-title" className={`${s.h2} cjk-heavy`} data-reveal="up">
              怎麼來？大眾運輸最輕鬆
            </h2>
            <TransportTabs routes={TRANSPORT} />
          </div>
          <aside className={s.addr} data-reveal="pop" data-rot="2">
            <Star className={`${s.addrStar} wobble`} color="#FFBE16" />
            <p className="display">Address</p>
            <h3 className="cjk-heavy">大龍國民小學</h3>
            <p>
              臺北市大同區哈密街 47 號<br />
              (02) 2594-1002
            </p>
            <a
              className="btn btn--mustard btn--sm"
              target="_blank"
              rel="noopener"
              href="https://www.google.com/maps/search/?api=1&query=%E8%87%BA%E5%8C%97%E5%B8%82%E5%A4%A7%E5%90%8C%E5%8D%80%E5%93%88%E5%AF%86%E8%A1%9747%E8%99%9F"
            >
              開啟地圖 <span className="arrow">↗</span>
            </a>
          </aside>
        </div>
      </section>
      <Wave color="var(--mustard)" flip />

      <section id="faq" className={`wrap ${s.sec} ${s.faqSec}`} aria-labelledby="faq-title">
        <p className="eyebrow" data-reveal="up">
          FAQ
        </p>
        <h2 id="faq-title" className={`${s.h2} cjk-heavy`} data-reveal="up">
          常見問題
        </h2>
        <div className={s.faq}>
          {FAQ.map(([q, a], i) => (
            <details key={q} className={s.q} data-reveal="up">
              <summary>
                <span className={`${s.qn} display`}>{String(i + 1).padStart(2, "0")}</span>
                <b className="cjk-heavy">{q}</b>
                <span className={s.plus} aria-hidden="true">
                  +
                </span>
              </summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
