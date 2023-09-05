export const getUnique = (array) => Math.floor(Math.random() * array.length);

export const checkEqual = (a, b) =>
  a.toLowerCase().trim() === b.toLowerCase().trim();

export const getHints = (current, wordSet) => {
  const hints = [current];
  while (hints.length < 3) {
    var candidateInt = Math.floor(Math.random() * wordSet.length - 1) + 1;
    if (hints.indexOf(candidateInt) === -1) hints.push(candidateInt);
  }
  return shuffleArray(hints);
};

export const shuffleArray = (unshuffled) =>
  unshuffled
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

export const getMode = (mode) => {
  if (!mode) return { from: "se", to: "la" };
  if (mode === 100) return { from: "la", to: "se" };

  return Math.floor(Math.random() * 2)
    ? { from: "se", to: "la" }
    : { from: "la", to: "se" };
};
