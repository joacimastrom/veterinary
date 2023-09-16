export const getUnique = (array) => Math.floor(Math.random() * array.length);

export const checkEqual = (a, b) =>
  a.toLowerCase().trim() === b.toLowerCase().trim();

export const getAlternatives = (current, wordSet) => {
  const hints = [current];
  while (hints.length < 3) {
    var candidateInt = Math.floor(Math.random() * wordSet.length - 1) + 1;
    if (hints.indexOf(candidateInt) === -1) hints.push(candidateInt);
  }
  return shuffleArray(hints);
};

export const getHint = (word, length) => word.substring(0, length);

export const getHintLength = (current, toWord) => {
  if (toWord[current] === " ") return current + 2;
  return current + 1;
};

export const checkPartOfWord = (value, word) =>
  word.toLowerCase().trim().indexOf(value.toLowerCase()) === 0;

export const shuffleArray = (unshuffled) =>
  unshuffled
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

export const getMode = (mode) => {
  if (!mode) return { from: "sv", to: "la" };
  if (mode === 100) return { from: "la", to: "sv" };

  return Math.floor(Math.random() * 2)
    ? { from: "sv", to: "la" }
    : { from: "la", to: "sv" };
};

export const checkIfWordIsSaved = (domain, wordIndex) => {
  const savedWords = JSON.parse(localStorage.getItem("savedWords")) ?? {};
  return savedWords[domain]?.indexOf(wordIndex) > -1;
};

export const saveWordToLocalStorage = (domain, wordIndex) => {
  let savedWords = JSON.parse(localStorage.getItem("savedWords")) ?? {};

  if (!savedWords[domain]) {
    savedWords[domain] = [];
  }
  savedWords[domain] = [...savedWords[domain], wordIndex];

  localStorage.setItem("savedWords", JSON.stringify(savedWords));
};

export const removeWordFromLocalStorage = (domain, wordIndex) => {
  const savedWords = JSON.parse(localStorage.getItem("savedWords"));
  const savedWordIndex = savedWords[domain].indexOf(wordIndex);
  if (savedWordIndex > -1) {
    savedWords[domain].splice(savedWordIndex, 1);
  }

  localStorage.setItem("savedWords", JSON.stringify(savedWords));
};

export const getSavedWordsOrFalse = (domain) => {
  if (!domain) return false;
  const savedWords = JSON.parse(localStorage.getItem("savedWords")) ?? {};
  const domainWords = savedWords[domain];
  return domainWords?.length ? domainWords : false;
};

export const getActualIndex = (domain, word) =>
  domain.words.findIndex(({ sv }) => sv === word?.sv);
