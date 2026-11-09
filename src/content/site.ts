// 網站內容：文字、年表、活動、典禮資訊都在 site.json，改內容只要改那個檔案。
import raw from "./site.json";

export type Cat = "慶祝" | "傳承" | "展望";
export type Act = {
  slug: string; cat: Cat; t: string; s: string; date: string; venue: string; host: string;
  img?: string; sum: string; lead: string; body: string[]; q: string; gal: [string, string][];
};
export type Slot = { a: string; b: string; ch: string; n: string; pl: string; info: string };
export type Zone = { n: string; d: string; c: string[] };
export type Route = { l: string; t: string; eta: string; s: [string, string][] };

export const HIST_INTRO: string = raw.HIST_INTRO;
export const TIMELINE = raw.TIMELINE as unknown as [string, string, string][];
export const TL_PIC = raw.TL_PIC as unknown as string[];
export const ACTS = raw.ACTS as unknown as Act[];
export const FEATURED = raw.FEATURED as unknown as string[];
export const SCHED = raw.SCHED as unknown as Slot[];
export const ZONES = raw.ZONES as unknown as Record<string, Zone>;
export const TRANSPORT = raw.TRANSPORT as unknown as Record<string, Route>;
export const FAQ = raw.FAQ as unknown as [string, string][];
export const OLD = raw.OLD as unknown as string[];
const IMG = raw.IMG as unknown as Record<string, string>;

export const img = (k?: string) => (k ? IMG[k] : undefined);
export const CATS: Cat[] = ["慶祝", "傳承", "展望"];
export const CATNOTE: Record<Cat, string> = { 慶祝: "校慶活動", 傳承: "溯源與傳承", 展望: "國際交流" };
export const CAT_EN: Record<Cat, string> = { 慶祝: "Celebrate", 傳承: "Heritage", 展望: "Outlook" };
export const era = (y: string | number) => {
  const n = +y;
  if (n < 1912) return "明治" + (n - 1867);
  if (n < 1945) return "昭和" + (n - 1925);
  return "民國" + (n - 1911);
};
export const actTitle = (a: Act) => `${a.t} ${a.s}`;
export const CEREMONY = new Date("2026-11-21T08:30:00+08:00");
