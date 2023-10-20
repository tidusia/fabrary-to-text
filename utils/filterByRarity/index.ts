import { Rarity } from "@flesh-and-blood/types";

export default function filterByRarity(
  cardRarities: Array<Rarity>,
  filterRarities: Array<Rarity>,
): boolean {
  return cardRarities.some((cardRarity) => filterRarities.includes(cardRarity));
}
