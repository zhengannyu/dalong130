import type { Metadata } from "next";
import PageHead from "@/components/PageHead";
import PrintPhoto from "@/components/PrintPhoto";
import { School, DragonLong, Burst, Star, Squiggle } from "@/components/Art";
import { HIST_INTRO, TIMELINE, TL_PIC, OLD, era, img } from "@/content/site";
import s from "./history.module.css";

export const metadata: Metadata = {
  title: "校史",
  description: "大龍國小 1896–2026 校史年表與老照片牆，臺北市歷史最悠久的學校之一。",
};

export default function HistoryPage() {
  return (
    <>
      <PageHead
        crumbs={[["首頁", "/"], ["校史"]]}
        eng="Since 1896"
        title={
          <>
            一起走過的，
            <br />
            都是大龍的故事。
          </>
        }
        lead={<p>{HIST_INTRO}</p>}
        art={
          <div className={s.artClip}>
            <div className={s.headArt}>
              <div className={s.school}><School /></div>
              <div className={s.dragon}><DragonLong /></div>
            </div>
          </div>
        }
      />

      <section className={`wrap ${s.tl}`} aria-label="校史年表">
        <span className={s.line} aria-hidden="true">
          <span className={s.lineFill} data-scrub-line />
        </span>
        {TIMELINE.map(([y, t, d], i) => {
          const now = y === "2026";
          const side = i % 2 ? s.right : s.left;
          return (
            <div key={y} id={`y${y}`} className={`${s.row} ${side} ${now ? s.now : ""}`}>
              <div className={s.yearCol} data-reveal={i % 2 ? "right" : "left"}>
                <span className={`${s.year} display ${now ? "" : "distress"}`}>{y}</span>
                <span className={s.era}>{era(y)}</span>
                <h2 className={`${s.what} cjk-heavy`}>{t}</h2>
                {d && <p className={s.desc}>{d}</p>}
              </div>
              <span className={s.dot} aria-hidden="true" />
              {(now || TL_PIC[i]) && (
                <div className={s.picCol} data-reveal="stamp" data-rot={String(i % 2 ? -3 : 3)}>
                  {now ? (
                    <Burst className={s.burst} color="#E64B2E">
                      <b className="display">130</b>
                      <span className="cjk-heavy">生日快樂</span>
                    </Burst>
                  ) : (
                    <PrintPhoto src={img(TL_PIC[i])!} alt={`${y} ${t}`} className={s.pic} />
                  )}
                </div>
              )}
            </div>
          );
        })}
      </section>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/doodle-strip.webp" alt="手繪大龍峒：孔子像、操場、保安宮" className={s.strip} />

      <section id="album" className={s.album} aria-labelledby="album-title">
        <div className="wrap">
          <div className={s.albumHead}>
            <p className="eyebrow" data-reveal="up">
              Photo wall
            </p>
            <h2 id="album-title" className="cjk-heavy" data-reveal="up">
              老照片牆
            </h2>

            <Star className={`${s.albumStar} wobble`} color="#FFBE16" />
            <Squiggle className={s.albumSquig} color="#FFBE16" />
          </div>
          <div className={s.wall} data-lb-group>
            {OLD.map((k, i) => (
              <figure key={k} className={s.wallItem}>
                <PrintPhoto src={img(k)!} alt={`校史老照片 No.${i + 1}`} lb className={s.wallPhoto} />
                <figcaption className="display">No.{String(i + 1).padStart(2, "0")}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
