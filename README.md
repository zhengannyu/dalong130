# 大龍國小 130 週年校慶網站｜復古版畫版

70 年代復古編輯風：芥末黃、金橘、焦棕、奶油白、朱紅五色；網版雙色照片、手繪角色插畫、套印錯位與油墨斑駁質感。

## 快速開始

```bash
npm install
npm run dev        # 本機開發：http://localhost:3000
npm run build      # 靜態匯出到 out/
npm run preview    # 預覽 out/（npx serve）
```

`out/` 是可以直接上傳任何主機的靜態網站（已附在這個資料夾）。**不能直接雙擊 html 開啟**，要透過網頁伺服器（例如 `npm run preview`）。
若網站不是放在網域根目錄（例如 `https://example.com/dalong130/`），請在 `next.config.mjs` 加上 `basePath: "/dalong130"` 後重新 build，圖片路徑也要一起加前綴。

## 技術

Next.js 15（App Router、靜態匯出）・React 19・TypeScript・CSS Modules・GSAP 3（ScrollTrigger）・字體自帶（@fontsource：Fraunces、Noto Sans TC），不依賴 Google Fonts。

## 結構

```
src/
├── app/
│   ├── layout.tsx            字體、頁首頁尾、動態引擎、燈箱
│   ├── globals.css           色票、字體、按鈕、網版照片、紙紋等共用樣式
│   ├── page.tsx              首頁（海報主視覺、回憶、年份、活動、紀念）
│   ├── history/              校史：年表＋老照片牆
│   ├── events/               活動列表（?cat=慶祝／傳承／展望）
│   ├── events/[slug]/        13 個活動內頁（generateStaticParams）
│   ├── memorial/             影像紀事、校友祝賀牆、回娘家報名
│   ├── info/                 典禮節目表、會場地圖、交通、FAQ
│   └── not-found.tsx         404
├── components/
│   ├── Art.tsx               手繪角色（大龍、校舍、蛋糕、鼓、書、鉛筆、地球、太陽、花、票券、信封）與裝飾
│   ├── Logotype.tsx          標準字（由 public/images/logotype-original.svg 轉出，可換色）
│   ├── Motion.tsx            GSAP 動態引擎（data-reveal、data-draw、data-drift、data-scrub-line）
│   ├── Lightbox.tsx          全站燈箱（data-lb-src／data-lb-group）
│   ├── EventCard / EventGrid 標籤式活動卡與篩選
│   └── …                     PageHead、PrintPhoto、Countdown、Marquee、WishWall、SignupForm、CampusMap、TransportTabs
├── content/site.json         ★ 所有文字、年表、活動、典禮資訊
└── lib/layout.ts             活動卡版面節奏
public/images/                照片（photo-*、guide-*、old-*）、手繪插圖（doodle-*）、標準字
```

## 常見修改

- **改文字或活動**：編輯 `src/content/site.json`。新增活動只要在 `ACTS` 加一筆，內頁會自動產生。
- **補活動照片**：圖片放到 `public/images/`，在 `IMG` 加代號，再到該活動填 `img` 與 `gal`。沒有照片的活動會自動顯示手繪角色（對應表在 `Art.tsx` 最下方的 `BY_SLUG`）。
- **加進場動畫**：任何元素加 `data-reveal="up|pop|stamp|left|right"`（可搭 `data-rot`、`data-delay`）。

## 配色與對比

| 色 | 用途 |
|---|---|
| `#FFFBE9` 奶油白 | 主底色 |
| `#F5AD00` 芥末黃 | 大色塊 |
| `#FFBE16` 金橘 | 次色塊、亮部 |
| `#8B421F` 焦棕 | 文字、框線、插畫 |
| `#E64B2E` 朱紅 | 按鈕、重點、套印錯位 |
| `#5A2A12` 深棕（衍生） | 黃色底上的小字 |

焦棕字在奶油底 7.0:1；在芥末黃底只有 3.8:1，所以黃底上的小字改用深棕（6.1:1），焦棕只用在大字。奶油字在朱紅按鈕上 3.7:1，按鈕字一律 19px 粗體（大字標準）。

## 動態與無障礙

- 有開啟「減少動態效果」時，所有進場、搖擺、跑馬燈動畫都會關閉。
- 進場元素在 JS 沒啟動時照常顯示（3 秒保險）。
- 篩選鈕、分頁、地圖、燈箱都可用鍵盤操作；FAQ 與節目表用原生 `<details>`。

## 待確認

- 活動內頁說明、承辦單位與照片說明為示意稿；日期依 content.js 與海報。
- 祝賀牆與回娘家報名沒有後端，資料只存在訪客瀏覽器（localStorage）。
- 1898 首任校長「小島由道」、「訊塘埔」用字請再核對。
- Fraunces 是 Cooper Black 的免費替代（開啟 SOFT／WONK 軸）；若有 Cooper Black 授權可在 `globals.css` 的 `--display` 換掉。
