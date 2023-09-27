import { Card } from "../../types";

const CARDMARKET_MAX_CARDS_PER_WISHLIST = 150;

export default function organizeMissingCards(
  collection: Array<Card>,
): Array<Array<Card>> {
  let result: Array<Array<Card>> = [];

  if (!collection.length) return result;

  const howManySplits = Math.ceil(
    collection.length / CARDMARKET_MAX_CARDS_PER_WISHLIST,
  );

  for (let i = 0; i < howManySplits; i++) {
    const start = i * CARDMARKET_MAX_CARDS_PER_WISHLIST;
    const end = start + CARDMARKET_MAX_CARDS_PER_WISHLIST;
    result.push(collection.slice(start, end));
  }

  return result;
}
