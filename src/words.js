export const domains = ["Apparatus skeleton"];

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

export const testWords = [
  {
    domain: "Apparatus skeleton",
    words: [
      {
        group: "Cranium",
        subGroup: "Ossa cranii",
        la: "Os occipitale",
        se: "Nackben ",
      },
      {
        group: "Cranium",
        subGroup: "Ossa cranii",
        la: "Os parietale",
        se: "Hjässben",
      },
      {
        group: "Cranium",
        subGroup: "Ossa cranii",
        la: "Os frontale",
        se: "Pannben",
      },
      {
        group: "Cranium",
        subGroup: "Ossa cranii",
        la: "Orbita",
        se: "Ögonhåla",
      },
      {
        group: "Cranium",
        subGroup: "Ossa cranii",
        la: "Os temporale",
        se: "Tinningben",
      },
      {
        group: "Cranium",
        subGroup: "Ossa faciei",
        la: "Os nasale",
        se: "Näsben",
      },
      {
        group: "Cranium",
        subGroup: "Ossa faciei",
        la: "Os zygomaticum",
        se: "Okben",
      },
      {
        group: "Cranium",
        subGroup: "Ossa faciei",
        la: "Maxilla",
        se: "Överkäke",
      },
      {
        group: "Cranium",
        subGroup: "Ossa faciei",
        la: "Os incisivum",
        se: "Mellankäksben ",
      },
      {
        group: "Cranium",
        subGroup: "Ossa faciei",
        la: "Mandibula",
        se: "Underkäke",
      },

      {
        group: "Truncus",
        subGroup: "Columna vertebralis",
        la: "Vertebrae cervicales",
        se: "Halskotor",
      },
      {
        group: "Truncus",
        subGroup: "Columna vertebralis",
        la: "Atlas",
        se: "1:a halskotan",
      },
      {
        group: "Truncus",
        subGroup: "Columna vertebralis",
        la: "Axis",
        se: "2:a halskotan",
      },
      {
        group: "Truncus",
        subGroup: "Columna vertebralis",
        la: "Vertebrae thoracicae",
        se: "Bröstkotor",
      },
      {
        group: "Truncus",
        subGroup: "Columna vertebralis",
        la: "Vertebrae lumbales",
        se: "Ländkotor",
      },
      {
        group: "Truncus",
        subGroup: "Columna vertebralis",
        la: "Os sacrum",
        se: "Korsben",
      },
      {
        group: "Truncus",
        subGroup: "Columna vertebralis",
        la: "Vertebrae caudales",
        se: "Svanskotor",
      },
      {
        group: "Thorax",
        subGroup: "Costae",
        la: "Cartilago costalis",
        se: "Revbensbrosk",
      },
      {
        group: "Thorax",
        subGroup: "Costae",
        la: "Arcus costalis",
        se: "Revbensbåge",
      },
      {
        group: "Thorax",
        subGroup: "Sternum",
        la: "Apertura thoracis cranialis",
        se: "Främre bröstaperturen",
      },
      {
        group: "Thorax",
        subGroup: "Sternum",
        la: "Apertura thoracis caudalis",
        se: "Bakre bröstaperturen",
      },
      {
        group: "Skeleton appendiculare",
        subGroup: "",
        la: "Scapula",
        se: "Bogblad",
      },
      {
        group: "Skeleton appendiculare",
        subGroup: "",
        la: "Humerus",
        se: "Överarmsben",
      },
      {
        group: "Skeleton appendiculare",
        subGroup: "",
        la: "Radius",
        se: "Underarmsben",
      },
      {
        group: "Skeleton appendiculare",
        subGroup: "",
        la: "Ulna",
        se: "Armbågsben",
      },
      {
        group: "Skeleton appendiculare",
        subGroup: "",
        la: "Ossa carpi",
        se: "Karpalben",
      },
      {
        group: "Skeleton appendiculare",
        subGroup: "Ossa carpi",
        la: "Os carpi intermedioradiale",
        se: "Tillhör proximala raden ben",
      },
      {
        group: "Skeleton appendiculare",
        subGroup: "Ossa carpi",
        la: "Os carpi ulnare",
        se: "Tillhör proximala raden ben",
      },
      {
        group: "Skeleton appendiculare",
        subGroup: "Ossa carpi",
        la: "Os carpi accessorium",
        se: "Tillhör proximala raden ben",
      },
      {
        group: "Skeleton appendiculare",
        subGroup: "Ossa carpi",
        la: "Os carpale I-IV",
        se: "Tillhör distala raden ben",
      },
      /* 
      {
        group: "",
        subGroup: "",
        la: "",
        se: "",
      },
       */
    ],
  },
];
