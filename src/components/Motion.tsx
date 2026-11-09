"use client";
// GSAP 動態引擎：伺服器元件只要加 data 屬性，這裡統一處理
//   data-reveal="up|pop|stamp|left|right"  捲動進場（data-rot 最終角度、data-delay 延遲）
//   data-draw                                SVG 線條捲動時畫出來
//   data-drift="-60"                         捲動時輕微位移（單位 px）
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Motion() {
  const pathname = usePathname();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        const type = el.dataset.reveal || "up";
        const rot = Number(el.dataset.rot || 0);
        const flat = el.hasAttribute("data-flat"); // 整齊排列的元素：進場不帶角度，全程水平
        const from: gsap.TweenVars = { opacity: 0, y: 46, rotate: flat ? 0 : rot + gsap.utils.random(-5, 5) };
        let ease = "power3.out";
        if (type === "pop") { Object.assign(from, { scale: 0.55, y: 24, rotate: rot + gsap.utils.random(-16, 16) }); ease = "back.out(2.2)"; }
        if (type === "stamp") { Object.assign(from, { scale: 1.5, y: 0, rotate: rot - 10 }); ease = "back.out(1.6)"; }
        if (type === "left") Object.assign(from, { x: -90, y: 0 });
        if (type === "right") Object.assign(from, { x: 90, y: 0 });
        gsap.fromTo(el, from, {
          opacity: 1, x: 0, y: 0, scale: 1, rotate: rot,
          duration: type === "stamp" ? 0.55 : 0.95,
          ease,
          delay: Number(el.dataset.delay || 0),
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        });
      });

      gsap.utils.toArray<SVGPathElement>("[data-draw]").forEach((p) => {
        const len = p.getTotalLength();
        gsap.fromTo(p, { strokeDasharray: len, strokeDashoffset: len }, {
          strokeDashoffset: 0, duration: 1.2, ease: "power2.inOut",
          scrollTrigger: { trigger: p.ownerSVGElement ?? p, start: "top 85%", once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-drift]").forEach((el) => {
        gsap.to(el, {
          y: Number(el.dataset.drift), ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.6 },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-scrub-line]").forEach((el) => {
        gsap.fromTo(el, { scaleY: 0 }, {
          scaleY: 1, ease: "none", transformOrigin: "top center",
          scrollTrigger: { trigger: el.parentElement ?? el, start: "top 60%", end: "bottom 60%", scrub: 0.4 },
        });
      });
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set("[data-reveal]", { opacity: 1 });
    });

    document.documentElement.classList.add("motion-ready");
    requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => mm.revert();
  }, [pathname]);

  return null;
}
