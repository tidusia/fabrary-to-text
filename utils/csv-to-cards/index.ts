import { Card } from "../../types";
// import { cards } from "fab-cards";

// const cardsDataObject = Object.fromEntries(
//   cards.map((card) => [card.cardIdentifier, card]),
// );

export default function csvToCards(csvString: string): Record<string, Card> {
  const lines = csvString.trim().split(/\r?\n/);

  const result = new Map<string, Card>();

  delete lines[0]; // Remove the headers

  lines.forEach((line) => {
    const [
      rawId,
      name,
      pitch,
      set,
      setNumber,
      edition,
      foiling,
      treatment,
      have,
      want,
      wantToBuy,
      extraForTrade,
      extraToSell,
    ] = line.split(",");

    const id = rawId.replace(/"/g, "");
    const existingItem = result.get(id);
    const newHave =
      (Number(have.replace(/"/g, "")) || 0) + (existingItem?.have || 0);
    const missing = Math.max(3 - newHave, 0);

    if (existingItem) {
      result.set(id, { ...existingItem, have: newHave, missing });
    }

    if (!existingItem) {
      result.set(id, {
        id: id.replace(/"/g, ""), // Remove the double quotes
        name: name.replace(/"/g, ""),
        set: set.replace(/"/g, ""),
        have: newHave,
        setNumber: setNumber.replace(/"/g, ""),
        missing,
      });
    }
  });

  return Object.fromEntries(result);
}
