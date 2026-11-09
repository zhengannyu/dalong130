import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ACTS, CAT_EN, CATNOTE, img } from "@/content/site";
import PrintPhoto from "@/components/PrintPhoto";
import { ActArt, TornPanel, Star, Sparkle, Confetti } from "@/components/Art";
import s from "./event.module.css";

export function generateStaticParams() {
  return ACTS.map((a) => ({ slug: a.slug }));
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const a = ACTS.find((x) => x.slug === slug);
  return a ? { title: `${a.t} ${a.s}`, description: a.sum } : {};
}

export default async function EventPage({ params }: Params) {
  const { slug } = await params;
  const i = ACTS.findIndex((x) => x.slug === slug);
  if (i < 0) notFound();
  const a = ACTS[i];
  const pv = ACTS[(i - 1 + ACTS.length) % ACTS.length];
  const nx = ACTS[(i + 1) % ACTS.length];
  const cover = img(a.img);

  return (
    <article>
      <header className={`wrap ${s.poster}`}>
        <TornPanel className={s.bg} color="#F5AD00" seed={i + 4} />
        <div className={s.text}>
          <nav aria-label="麵包屑">
            <ol className={s.crumbs}>
              <li><Link href="/">首頁</Link></li>
              <li><Link href="/events/">校慶活動</Link></li>
              <li><Link href={`/events/?cat=${a.cat}`}>{a.cat}</Link></li>
              <li><span aria-current="page">{a.t}</span></li>
            </ol>
          </nav>
          <p className={s.no} data-reveal="stamp" data-rot="-3">
            <b className="display">No.{String(i + 1).padStart(2, "0")}</b>
            <span className={`chip chip--${a.cat}`}>{a.cat}・{CATNOTE[a.cat]}</span>
          </p>
          <h1 className={`${s.title} cjk-heavy`} data-reveal="up">
            {a.t}
            <span className={s.sub}>{a.s}</span>
          </h1>
          <dl className={s.label} data-reveal="up">
            <div><dt className="display">Date</dt><dd>{a.date}</dd></div>
            <div><dt className="display">Venue</dt><dd>{a.venue}</dd></div>
            <div><dt className="display">Host</dt><dd>{a.host}</dd></div>
          </dl>
        </div>
        <div className={s.visual} data-reveal="pop" data-rot="2">
          {cover ? (
            <PrintPhoto src={cover} alt={`${a.t} ${a.s}`} className={s.cover} lb cap={`${a.t} ${a.s}`} />
          ) : (
            <div className={s.artBox}><ActArt slug={a.slug} cat={a.cat} className={`${s.art} wobble`} /></div>
          )}
          <span className={`${s.catEn} display`}>{CAT_EN[a.cat]}</span>
        </div>
        <Star className={`${s.star} wobble`} color="#E64B2E" />
        <Sparkle className={`${s.spark} bob`} color="#FFFBE9" />
      </header>

      <section className={`wrap ${s.story}`}>
        <p className={`${s.lead} cjk-heavy`} data-reveal="up">{a.lead}</p>
        <div className={s.body}>
          {a.body.map((p, k) => <p key={k} data-reveal="up">{p}</p>)}
        </div>
        <blockquote className={s.quote} data-reveal="stamp" data-rot="-2">
          <span className={`${s.qmark} display`} aria-hidden="true">“</span>
          <p className="cjk-heavy">{a.q}</p>
        </blockquote>
      </section>

      <section className={s.photos} aria-labelledby="photos-title">
        <div className="wrap">
          <p className="eyebrow" data-reveal="up">Photos</p>
          <h2 id="photos-title" className={`${s.photosTitle} cjk-heavy`} data-reveal="up">活動相片</h2>
          {a.gal.length ? (
            <div className={s.sheet} data-lb-group>
              {a.gal.map(([k, c], n) => (
                <figure key={k + n} className={s.frame} data-reveal="up" data-flat>
                  <PrintPhoto src={img(k)!} alt={c} lb cap={c} className={s.framePhoto} />
                  <figcaption>{c}</figcaption>
                </figure>
              ))}
            </div>
          ) : (
            <div className={s.empty} data-reveal="pop">
              <Confetti className={s.emptyConfetti} />
              <ActArt slug={a.slug} cat={a.cat} className={`${s.emptyArt} bob`} />
              <p className="cjk-heavy">相片整理中，敬請期待！</p>
              <p>活動結束後，花絮照片會陸續放上來。</p>
            </div>
          )}
        </div>
      </section>

      <nav className={`wrap ${s.pn}`} aria-label="上一篇、下一篇">
        <Link href={`/events/${pv.slug}/`} className={`${s.pnLink} ${s.prev}`}>
          <span className={s.pnArrow}>←</span>
          <span><small className="script">Previous</small><b className="cjk-heavy">{pv.t}</b><em>{pv.s}</em></span>
        </Link>
        <Link href="/events/" className="btn btn--cream">全部活動</Link>
        <Link href={`/events/${nx.slug}/`} className={`${s.pnLink} ${s.next}`}>
          <span><small className="script">Next</small><b className="cjk-heavy">{nx.t}</b><em>{nx.s}</em></span>
          <span className={s.pnArrow}>→</span>
        </Link>
      </nav>
    </article>
  );
}
