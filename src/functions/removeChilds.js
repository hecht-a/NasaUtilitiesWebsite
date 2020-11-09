module.exports = function removeChilds(parent, selector = "") {
  if (selector) {
    const div = document.querySelector(selector);
    if (!div) return;
    parent.removeChild(div);
  } else {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  }
};
