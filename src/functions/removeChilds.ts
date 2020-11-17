/**
 * @param  {HTMLElement} parent
 * @param  {string|null} selector
 * @returns void
 */
module.exports = function removeChilds(
  parent: HTMLElement,
  selector: string | null
): void {
  if (selector) {
    const div = document.querySelector(selector);
    if (!div) return;
    parent.removeChild(div);
  } else {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  }
  return;
};
