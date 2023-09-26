import { Release } from "fab-cards/dist/interfaces";
import { cards } from "fab-cards";

const SETS = new Set<Release>();

cards.forEach((card) => {
  card.sets.forEach((set) => SETS.add(set));
});

export const SORTED_SETS = Array.from(SETS).sort();
