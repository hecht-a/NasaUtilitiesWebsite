/**
 * @param  {string} word
 * @returns string
 */
module.exports = function capitalize(word: string): string {
  return `${word[0].toUpperCase()}${word.substr(1, word.length - 1)}`;
};
