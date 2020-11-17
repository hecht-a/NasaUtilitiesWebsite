/**
 * @param  {HTMLElement} parent
 * @returns void
 */
module.exports = function target(parent: HTMLElement): void {
  const all = parent.querySelectorAll("a");
  all.forEach(a => {
    console.log(`a: ${typeof a}`);
    a.target = "_blank";
  });
  return;
};
