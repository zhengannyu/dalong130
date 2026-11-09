/** 靜態匯出：npm run build 之後，out/ 資料夾可直接放到任何主機 */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
};
export default nextConfig;
