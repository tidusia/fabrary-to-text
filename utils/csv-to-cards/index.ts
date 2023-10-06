import { Card } from "../../types";
import Papa from "papaparse";
import calculatePlaysetNumber from "../calculatePlaysetNumber";
import { cards } from "fab-cards";

export default function csvToCards(csvString: string): Record<string, Card> {
  const parsed = Papa.parse(csvString);
  const lines = parsed.data;

  const result = new Map<string, Card>();

  delete lines[0]; // Remove the headers

  lines.forEach((line: any) => {
    const [
      id,
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
    ] = line;

    const name = rawName;
    const existingItem = result.get(id);
    const variations = cards.filter((card) => card.name === name).length;
    const newHave = (Number(have) || 0) + (existingItem?.have || 0);
    const playset = calculatePlaysetNumber(id);
    const missing = Math.max(playset - newHave, 0);

    if (existingItem) {
      result.set(id, {
        ...existingItem,
        have: newHave,
        missing,
        sets: existingItem.sets.add(set),
      });
    }

    if (!existingItem) {
      result.set(id, {
        id,
        name,
        sets: new Set([set]),
        have: newHave,
        setNumber,
        missing,
        pitch,
        variations,
        playset,
      });
    }
  });

  return Object.fromEntries(result);
}
