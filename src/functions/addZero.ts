/**
 * @param  {number} nbr
 * @returns number
 */
module.exports = function addZero(nbr: number): number {
  return nbr >= 10 ? nbr : parseInt(`0${nbr}`);
};
