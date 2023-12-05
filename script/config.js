// Déclaration des tableaux contenant les listes des mots proposés à l'utilisateur
// Déclaration des tableaux contenant les listes des phrases proposés à l'utilisateur

const listeMots = [
  "Cachalot",
  "Pétunia",
  "Serviette",
  "Astronaute",
  "Cuisinier",
];
const listePhrases = [
  "Pas de panique !",
  "On aime tous les chiens",
  "les chats, les autres",
  "La vie, l'univers et le reste",
  "Merci pour le poisson",
];

// Exemple d'utilisation pour obtenir un mot aléatoire
const motAleatoire = getRandomElement(listeMots);

// Exemple d'utilisation pour obtenir une phrase aléatoire
const phraseAleatoire = getRandomElement(listePhrases);
