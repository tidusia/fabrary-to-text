import { Card } from "../../types";
import calculatePlaysetNumber from "../calculatePlaysetNumber";
import { cards } from "fab-cards";

export default function csvToCards(csvString: string): Record<string, Card> {
  const lines = csvString.trim().split(/\r?\n/);

  const result = new Map<string, Card>();

  delete lines[0]; // Remove the headers

  lines.forEach((line) => {
    const [
      rawId,
      rawName,
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
    const name = rawName.replace(/"/g, "");
    const existingItem = result.get(id);
    const variations = cards.filter((card) => card.name === name).length;
    const newHave =
      (Number(have.replace(/"/g, "")) || 0) + (existingItem?.have || 0);
    const playset = calculatePlaysetNumber(id);
    const missing = Math.max(playset - newHave, 0);

    if (existingItem) {
      result.set(id, {
        ...existingItem,
        have: newHave,
        missing,
        sets: existingItem.sets.add(set.replace(/"/g, "")),
      });
    }

    if (!existingItem) {
      result.set(id, {
        id,
        name: name.replace(/"/g, ""),
        sets: new Set([set.replace(/"/g, "")]),
        have: newHave,
        setNumber: setNumber.replace(/"/g, ""),
        missing,
        pitch: pitch.replace(/"/g, ""),
        variations,
        playset,
      });
    }
  });

  return Object.fromEntries(result);
}
