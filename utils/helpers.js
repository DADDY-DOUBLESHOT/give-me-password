function getRandomNoun() {
  const nouns = [
    "apple",
    "banana",
    "cherry",
    "dog",
    "elephant",
    "flamingo",
    "grape",
    "horse",
    "iguana",
    "jellyfish",
    "kiwi",
    "lemon",
    "monkey",
    "noodle",
    "orange",
    "panda",
    "quokka",
    "rabbit",
    "strawberry",
    "tiger",
    "umbrella",
    "vulture",
    "watermelon",
    "xylophone",
    "yak",
    "zebra",
  ];

  return nouns[Math.floor(Math.random() * nouns.length)];
}

function generateRandomString(length) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }

  return result;
}

export function generateMemorableString(ref) {
  const noun = ref || getRandomNoun();
  const randomString = generateRandomString(3); // Adjust the length as needed

  return `${noun}-${randomString}`;
}

const crypto = require("crypto");

function generateHash(input) {
  const hash = crypto.createHash("sha256");
  hash.update(input);
  return hash.digest("hex");
}

const cache = new Map();

export function encodeString(input) {
  if (cache.has(input)) {
    return cache.get(input);
  }

  const hash = generateHash(input);
  cache.set(input, hash);

  return hash;
}
