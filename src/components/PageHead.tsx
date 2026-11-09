import Link from "next/link";
import type { ReactNode } from "react";
import { TornPanel, Star, Sparkle } from "./Art";
import s from "./PageHead.module.css";

type Props = {
  crumbs: [string, string?][];
  eng: string;
  title: ReactNode;
  lead?: ReactNode;
  art?: ReactNode;
  tone?: "mustard" | "gold" | "red";
};

const FILL = { mustard: "#F5AD00", gold: "#FFBE16", red: "#E64B2E" };

export default function PageHead({ crumbs, eng, title, lead, art, tone = "mustard" }: Props) {
  return (
    <section className={`${s.head} ${s[tone]}`}>
      <div className={`wrap ${s.inner}`}>
        <TornPanel className={s.bg} color={FILL[tone]} seed={eng.length} />
        <div className={s.text}>
          <nav aria-label="麵包屑">
            <ol className={s.crumbs}>
              {crumbs.map(([t, h], i) => (
                <li key={i}>{h ? <Link href={h}>{t}</Link> : <span aria-current="page">{t}</span>}</li>
              ))}
            </ol>
          </nav>
          <p className={`${s.eng} display misreg`} data-reveal="stamp" aria-hidden="true">{eng}</p>
          <h1 className={`${s.title} cjk-heavy`} data-reveal="up">{title}</h1>
          {lead && <div className={s.lead} data-reveal="up">{lead}</div>}
        </div>
        {art && <div className={s.art} data-reveal="pop" aria-hidden="true">{art}</div>}
        <Star className={`${s.star} wobble`} color="#FFFBE9" />
        <Sparkle className={`${s.spark} bob`} color="#8B421F" />
      </div>
    </section>
  );
}
