/* 照片：顯示原色（不疊濾鏡）；live 時滑過輕微放大；lb 時可點開燈箱 */
type Props = { src: string; alt: string; className?: string; live?: boolean; lb?: boolean; cap?: string; tape?: boolean; style?: React.CSSProperties };

export default function PrintPhoto({ src, alt, className = "", live = true, lb = false, cap, tape = false, style }: Props) {
  const cls = `print-photo ${live ? "print-photo--live" : ""} ${tape ? "tape" : ""} ${className}`;
  const inner = (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} loading="lazy" decoding="async" />
  );
  if (lb)
    return (
      <button type="button" className={cls} style={style} data-lb-src={src} data-lb-cap={cap ?? alt} aria-label={`放大照片：${cap ?? alt}`}>
        {inner}
      </button>
    );
  return <figure className={cls} style={style}>{inner}</figure>;
}
