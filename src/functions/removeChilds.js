module.exports = function removeChilds(element) {
  if (element.childElementCount < 1) return

  (element.childNodes).forEach((child) => {
    element.removeChild(child)
  })
}
