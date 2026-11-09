import Link from "next/link";
import Logotype from "@/components/Logotype";
import { DragonLong, School, Cake, Flower, Book, Drum, Envelope, Ticket, Star, Sparkle, Squiggle, Arrow, TornPanel, RingText, Burst, Wave } from "@/components/Art";
import Countdown from "@/components/Countdown";
import Marquee from "@/components/Marquee";
import PrintPhoto from "@/components/PrintPhoto";
import EventCard from "@/components/EventCard";
import EventGrid from "@/components/EventGrid";
import { layoutPos } from "@/lib/layout";
import { ACTS, CATS, FEATURED, img, OLD } from "@/content/site";
import s from "./home.module.css";

const MILESTONES: [string, string][] = [
  ["1896", "借保安宮上課，大龍的第一堂課"],
  ["1904", "遷入哈密街現址"],
  ["1931", "佾舞隊首度擔任祭孔佾生"],
  ["1996", "創校百週年"],
  ["2021", "轉型雙語課程實驗學校"],
  ["2026", "建校一百三十週年"],
];

export default function Home() {
  const counts: Record<string, number> = { 全部: ACTS.length };
  CATS.forEach((c) => (counts[c] = ACTS.filter((a) => a.cat === c).length));
  const memPhotos = OLD.slice(0, 4);

  return (
    <>
      {/* ================= 主視覺：一張會動的海報 ================= */}
      <section className={s.hero} aria-labelledby="hero-title">
        <div className={`wrap ${s.heroTop}`}>
          <p className={s.meta} data-reveal="left">
            <b className="display">Vol.130</b>
            <span>1896 — 2026</span>
          </p>
          <div className={s.logoWrap}>
            <p className={`${s.hello} script`} data-reveal="pop" data-rot="-6">Happy 130th Birthday!</p>
            <h1 id="hero-title" className={s.logoH1} data-reveal="pop">
              <Logotype className={s.logo} />
            </h1>
          </div>
          <p className={`${s.meta} ${s.metaR}`} data-reveal="right">
            <b className="display">Taipei</b>
            <span>大同區・大龍峒</span>
          </p>
          <Star className={`${s.dec} ${s.decStar} wobble`} />
          <Sparkle className={`${s.dec} ${s.decSpark} bob`} />
          <Squiggle className={`${s.dec} ${s.decSquig}`} color="#8B421F" />
        </div>

        <div className={`wrap ${s.poster}`}>
          <TornPanel className={s.posterBg} color="#F5AD00" seed={3} />
          <span className={`${s.blob} ${s.blob1}`} aria-hidden="true" />
          <span className={`${s.blob} ${s.blob2}`} aria-hidden="true" />
          <span className={`${s.blob} ${s.blob3}`} aria-hidden="true" />

          <div className={s.posterHead}>
            <p className={`${s.date} display misreg distress`} data-reveal="stamp">11.21</p>
            <p className={s.dateSub}>
              <span className="display">SAT</span>
              <span>上午 08:30・大龍國小操場</span>
            </p>
            <p className={`${s.party} cjk-heavy`} data-reveal="up">一起過 130 歲生日！</p>
          </div>

          <div className={s.stage} aria-hidden="true">
            <div className={s.school} data-reveal="pop" data-delay="0.1"><School className="squash" /></div>
            <div className={s.dragon} data-reveal="pop"><DragonLong /></div>
            <div className={s.cake} data-reveal="pop" data-delay="0.3"><Cake /></div>
            <Sparkle className={`${s.sp1} bob`} color="#FFFBE9" />
            <Sparkle className={`${s.sp2} bob`} color="#E64B2E" />
            <Star className={`${s.st1} wobble`} color="#FFFBE9" />
          </div>

          <nav className={s.icons} aria-label="快速入口">
            {[
              { href: "/history/", A: Book, t: "校史年表", d: "1896 → 2026" },
              { href: "/events/", A: Drum, t: "系列活動", d: `${ACTS.length} 場一起玩` },
              { href: "/memorial/#signup", A: Envelope, t: "校友回娘家", d: "11/14 校友茶會" },
              { href: "/info/", A: Ticket, t: "典禮資訊", d: "節目・地圖・交通" },
            ].map(({ href, A, t, d }, i) => (
              <Link key={href} href={href} className={s.icon} data-reveal="up" data-delay={String(i * 0.08)}>
                <A className={s.iconArt} />
                <b className="cjk-heavy">{t}</b>
                <span>{d}</span>
              </Link>
            ))}
          </nav>

          <div className={s.cdWrap} data-reveal="up">
            <Countdown />
          </div>
        </div>
      </section>

      <Marquee items={["龍躍傳承", "雙語國際啟新程", "Happy 130th", "1896 — 2026", "大龍國小生日快樂"]} />

      {/* ================= 回憶：老照片 ================= */}
      <section className={s.memories} aria-labelledby="mem-title">
        <div className={`wrap ${s.memGrid}`}>
          <div className={s.memText}>
            <p className="eyebrow" data-reveal="up">Our memories</p>
            <h2 id="mem-title" className={`${s.memTitle} cjk-heavy`} data-reveal="up">
              一起走過的，<br />都是<span className={s.hl}>大龍的故事</span>。
            </h2>
            <p className={s.memLead} data-reveal="up">從 1896 到 2026，在老照片裡，找回熟悉的校園時光。認得照片裡的人嗎？歡迎告訴我們。</p>
            <div className={s.memCta} data-reveal="up">
              <Link href="/history/#album" className="btn">翻開回憶相簿 <span className="arrow">→</span></Link>
              <Arrow className={s.memArrow} />
            </div>
          </div>
          <div className={s.memPhotos} data-lb-group>
            {memPhotos.map((k, i) => (
              <div key={k} className={`${s.stamp} ${s[`stamp${i}`]}`} data-reveal="stamp" data-rot={String([-6, 5, 3, -4][i])} data-delay={String(i * 0.1)}>
                <PrintPhoto src={img(k)!} alt={`校史老照片 No.${i + 1}`} lb tape className={s.stampPhoto} />
              </div>
            ))}
            <Burst className={s.memBurst} color="#E64B2E">
              <b className="display">since</b>
              <b className="display">1896</b>
            </Burst>
          </div>
        </div>
      </section>

      {/* ================= 校史導讀 ================= */}
      <Wave color="var(--brown)" />
      <section className={s.years} aria-labelledby="years-title">
        <div className="wrap">
          <div className={s.yearRow}>
            <span className={`${s.y1} display misreg-gold distress`} data-reveal="left">1896</span>
            <Arrow className={s.yearArrow} color="#FFBE16" />
            <span className={`${s.y2} display distress`} data-reveal="right">2026</span>
          </div>
          <div className={s.yearsText}>
            <h2 id="years-title" className="cjk-heavy" data-reveal="up">一百三十年，讓故事繼續長大。</h2>
            <p data-reveal="up">大龍國小創立於 1896 年，是臺北市歷史最悠久的學校之一。走過不同時代，留下屬於每一代大龍人的校園記憶。</p>
            <Link href="/history/" className="btn btn--mustard" data-reveal="up">認識大龍校史 <span className="arrow">→</span></Link>
          </div>
          <ol className={s.miles}>
            {MILESTONES.map(([y, t], i) => (
              <li key={y} data-reveal="pop" data-rot={String([-3, 2, -1, 3, -2, 1][i])} data-delay={String(i * 0.06)}>
                <Link href={`/history/#y${y}`} className={s.mile}>
                  <b className="display">{y}</b>
                  <span>{t}</span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <Wave color="var(--brown)" flip />

      {/* ================= 系列活動 ================= */}
      <section className={s.events} aria-labelledby="ev-title">
        <div className="wrap">
          <header className={s.evHead}>
            <p className={`${s.evBig} display misreg`} data-reveal="stamp" aria-hidden="true">Let&rsquo;s Celebrate</p>
            <h2 id="ev-title" className={`${s.evTitle} cjk-heavy`} data-reveal="up">校慶系列活動</h2>
            <p data-reveal="up">2026 年 2 月到 11 月，活動陸續登場！</p>
            <Star className={`${s.evStar} wobble`} color="#E64B2E" />
          </header>
          <EventGrid counts={counts} limit={FEATURED}>
            {(() => {
              let k = 0;
              return ACTS.map((a, n) => {
                const on = FEATURED.includes(a.slug);
                return <EventCard key={a.slug} a={a} n={n} pos={on ? layoutPos(k++, FEATURED.length) : 0} hidden={!on} />;
              });
            })()}
          </EventGrid>
          <p className={s.more}>
            <Link href="/events/" className="btn btn--brown">看全部 {ACTS.length} 項活動 <span className="arrow">→</span></Link>
          </p>
        </div>
      </section>

      {/* ================= 紀念 ================= */}
      <section className={s.memorial} aria-labelledby="memo-title">
        <div className="wrap">
          <h2 id="memo-title" className={`${s.memoTitle} cjk-heavy`} data-reveal="up">
            留下<span className="display">給母校</span>的紀念
          </h2>
          <div className={s.badges}>
            {[
              { href: "/memorial/#records", ring: "RECORDS • 影像紀事 • SINCE 1896 • ", A: Book, t: "影像紀事", d: "翻閱一百三十年" },
              { href: "/memorial/#wall", ring: "WISHES • 校友祝賀牆 • HAPPY 130 • ", A: Flower, t: "校友祝賀牆", d: "寫一句話給母校" },
              { href: "/memorial/#signup", ring: "HOMECOMING • 回娘家 • WELCOME • ", A: Envelope, t: "回娘家報名", d: "11/14・11/21" },
            ].map(({ href, ring, A, t, d }, i) => (
              <Link key={href} href={href} className={s.badgeLink} data-reveal="pop" data-delay={String(i * 0.1)}>
                <RingText text={ring} className={s.badge} color="#FFFBE9">
                  <span className={s.badgeIn}><A className={s.badgeArt} /></span>
                </RingText>
                <b className="cjk-heavy">{t}</b>
                <span>{d}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
