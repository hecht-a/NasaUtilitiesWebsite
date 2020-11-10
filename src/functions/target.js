module.exports = function target(parent) {
  const all = parent.querySelectorAll("a");
  all.forEach(a => {
    a.target = "_blank";
  });
};
