module.exports = function capitalize(word) {
  return `${word[0].toUpperCase()}${word.substr(1, word.length - 1)}`;
};
