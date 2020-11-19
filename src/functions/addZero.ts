/**
 * @param  {number} nbr
 * @returns number
 */
export default function addZero(nbr: number): number | string {
  return nbr >= 10 ? nbr : `0${nbr}`;
}
