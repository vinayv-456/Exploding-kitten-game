import { CHARATERS } from "../store/constants";

export const generateRandomCards = () => {
  const randomDeck = [];
  for (let i = 0; i < 5; i++) {
    // Math.random() * 4
    randomDeck.push(CHARATERS[Math.floor(0)]);
  }
  return randomDeck;
};
