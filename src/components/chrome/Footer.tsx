import Link from "next/link";
import Logotype from "../Logotype";
import { RingText, Wave } from "../Art";
import s from "./chrome.module.css";

// 網站地圖：標題與順序跟導覽列一致（大龍校史／活動／紀念／校慶資訊）。
// 「國際交流」在資料裡的分類名稱是「展望」；校友祝賀牆隱藏、回娘家報名已刪除，所以先不列。
const COLS = [
  { h: "大龍校史", links: [["年表 1896–2026", "/history/"], ["老照片牆", "/history/#album"]] },
  { h: "活動", links: [["慶祝", "/events/?cat=慶祝"], ["傳承", "/events/?cat=傳承"], ["國際交流", "/events/?cat=展望"]] },
  { h: "紀念", links: [["影像紀事", "/memorial/#records"]] },
  { h: "校慶資訊", links: [["節目表", "/info/#program"], ["交通方式", "/info/#transport"], ["常見問題", "/info/#faq"]] },
];

export default function Footer() {
  return (
    <footer className={s.footer}>
      <Wave color="var(--brown)" className={s.footWave} />
      <div className={s.footInner}>
        <div className={`wrap ${s.footGrid}`}>
          <div className={s.footBrand}>
            <Logotype className={s.footLogo} ink="var(--cream)" accent="var(--mustard)" text="var(--gold)" />
            <p className="cjk-heavy">臺北市大同區大龍國民小學</p>
            <p>臺北市大同區哈密街 47 號<br />(02) 2594-1002</p>
          </div>
          {COLS.map((c) => (
            <div key={c.h} className={s.footCol}>
              <h2 className="cjk-heavy">{c.h}</h2>
              <ul>
                {c.links.map(([t, h]) => (
                  <li key={h}><Link href={h}>{t}</Link></li>
                ))}
              </ul>
            </div>
          ))}
          <a href="#top" className={s.top} aria-label="回到頁首">
            <RingText text="BACK TO TOP • 回到頁首 • 1896–2026 • " className={s.topRing} color="#FFFBE9">
              <span className={s.topArrow}>↑</span>
            </RingText>
          </a>
        </div>
        <div className={`wrap ${s.legal}`}>
          <p>基於教育行政中立，候選人請勿穿著競選背心入校從事競選活動。</p>
          <p className="script">© 2026 Dalong Elementary School — 130 years &amp; counting</p>
        </div>
      </div>
    </footer>
  );
}
