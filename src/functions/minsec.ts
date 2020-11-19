import addZero from "./addZero";

/**
 * @param  {number} time
 * @returns string
 */
export default function minsec(time: number): string {
  const mind: number = time % (60 * 60);
  const minutes = addZero(Math.floor(mind / 60));

  const secd: number = mind % 60;
  const seconds = addZero(Math.ceil(secd));

  return `${minutes}:${seconds}`;
}
