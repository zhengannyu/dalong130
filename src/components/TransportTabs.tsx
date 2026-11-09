"use client";
import { useRef, useState } from "react";
import type { Route } from "@/content/site";
import s from "@/app/info/info.module.css";

export default function TransportTabs({ routes }: { routes: Record<string, Route> }) {
  const keys = Object.keys(routes);
  const [k, setK] = useState(keys[0]);
  const refs = useRef<Record<string, HTMLButtonElement | null>>({});
  const r = routes[k];
  const move = (d: number) => {
    const n = keys[(keys.indexOf(k) + d + keys.length) % keys.length];
    setK(n);
    refs.current[n]?.focus();
  };
  return (
    <>
      <div className={s.tabs} role="tablist" aria-label="交通方式" onKeyDown={(e) => { if (e.key === "ArrowRight") move(1); if (e.key === "ArrowLeft") move(-1); }}>
        {keys.map((key) => (
          <button key={key} ref={(el) => { refs.current[key] = el; }} role="tab" id={`tab-${key}`} aria-selected={k === key} aria-controls="route-panel" tabIndex={k === key ? 0 : -1} className={s.tab} onClick={() => setK(key)}>
            {routes[key].l}
          </button>
        ))}
      </div>
      <div id="route-panel" role="tabpanel" aria-labelledby={`tab-${k}`} className={s.routePanel} key={k}>
        <h3 className="cjk-heavy">{r.t}<span className={s.eta}>{r.eta}</span></h3>
        <ol className={s.steps}>
          {r.s.map(([t, d]) => <li key={t}><b>{t}</b>{d}</li>)}
        </ol>
      </div>
    </>
  );
}
