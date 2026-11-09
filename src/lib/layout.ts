/** 版面節奏（6 張一循環）：7+5 ／ 4+4+4 ／ 12（橫式）；最後不滿一列時補成整齊的組合 */
export function layoutPos(i: number, total: number) {
  const rem = total % 6;
  const tail = total - rem;
  if (i < tail || rem === 5) return i % 6;
  const j = i - tail;
  if (rem === 1) return 5;
  if (rem === 2) return j;
  if (rem === 3) return 2 + j;
  return j % 2; // rem 4 → 7+5、7+5
}
