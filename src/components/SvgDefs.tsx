// 全站共用 SVG 濾鏡：#rough 讓線條邊緣不平整；#misreg 把圖形染成朱紅，用來做套印錯位的那一層
export default function SvgDefs() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true" focusable="false">
      <defs>
        <filter id="rough" x="-8%" y="-8%" width="116%" height="116%">
          <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="3" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="5" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <filter id="misreg" x="-8%" y="-8%" width="116%" height="116%">
          <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="9" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="6" xChannelSelector="R" yChannelSelector="G" result="d" />
          <feFlood floodColor="#E64B2E" result="f" />
          <feComposite in="f" in2="d" operator="in" />
        </filter>
      </defs>
    </svg>
  );
}
