import Link from "next/link";
import { Dragon, Sparkle } from "@/components/Art";

export default function NotFound() {
  return (
    <section className="wrap" style={{ display: "grid", justifyItems: "center", textAlign: "center", padding: "clamp(40px,8vw,100px) 0", gap: 14 }}>
      <Dragon className="wobble" />
      <p className="display misreg" style={{ fontSize: "clamp(90px,16vw,200px)", color: "var(--mustard)" }}>404</p>
      <h1 className="cjk-heavy" style={{ fontSize: "clamp(28px,4vw,46px)" }}>這條走廊好像走錯了</h1>
      <p>大龍找不到這一頁，回首頁看看吧。</p>
      <Link href="/" className="btn">回首頁 <span className="arrow">→</span></Link>
      <Sparkle className="bob" />
    </section>
  );
}
