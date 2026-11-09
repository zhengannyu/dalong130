import type { Metadata, Viewport } from "next";
import "@fontsource-variable/fraunces/full.css";
import "@fontsource-variable/fraunces/full-italic.css";
import "@fontsource/noto-sans-tc/500.css";
import "@fontsource/noto-sans-tc/700.css";
import "@fontsource/noto-sans-tc/900.css";
import "./globals.css";
import SvgDefs from "@/components/SvgDefs";
import Header from "@/components/chrome/Header";
import Footer from "@/components/chrome/Footer";
import Motion from "@/components/Motion";
import Lightbox from "@/components/Lightbox";

export const metadata: Metadata = {
  title: { default: "大龍國小 130 週年校慶｜龍躍傳承・雙語國際啟新程", template: "%s｜大龍國小 130 週年校慶" },
  description: "臺北市大同區大龍國民小學創校 130 週年校慶網站：校史年表、老照片、校慶系列活動、紀念專區與典禮資訊。",
};
export const viewport: Viewport = { themeColor: "#FFFBE9" };

// 有開啟「減少動態效果」就不藏進場元素；3 秒內動態引擎沒啟動也會自動顯示
const motionBoot = `(function(d){if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;d.classList.add('motion');setTimeout(function(){if(!d.classList.contains('motion-ready'))d.classList.remove('motion')},3000)})(document.documentElement)`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hant" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionBoot }} />
      </head>
      <body id="top">
        <SvgDefs />
        <a href="#main" className="skip">跳到主要內容</a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <Motion />
        <Lightbox />
      </body>
    </html>
  );
}
