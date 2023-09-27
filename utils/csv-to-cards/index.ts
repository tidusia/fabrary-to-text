import { Card } from "../../types";
import calculatePlaysetNumber from "../calculatePlaysetNumber";

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
    const playsetForCard = calculatePlaysetNumber(id);
    const missing = Math.max(playsetForCard - newHave, 0);

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
      });
    }
  });

  return Object.fromEntries(result);
}
