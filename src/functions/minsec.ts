/**
 * @param  {number} time
 * @returns string
 */
module.exports = function minsec(time: number): string {
  const mind: number = time % (60 * 60);
  const minutes: number = Math.floor(mind / 60);

  const secd: number = mind % 60;
  const seconds: number = Math.ceil(secd);

  return `${minutes}:${seconds}`;
};
