import { Release } from "@flesh-and-blood/types";
import { cards } from "@flesh-and-blood/cards";

const SETS = new Set<Release>();

cards.forEach((card) => {
  card.sets.forEach((set) => SETS.add(set));
});

export const SORTED_SETS = Array.from(SETS).sort();
