import { Card } from "../../types";

export default function csvToCards(csvString: string): Map<string, Card> {
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

    if (existingItem) {
      result.set(id, {
        ...existingItem,
        have: existingItem.have + Number(have) || 0,
      });
    }

    if (!existingItem) {
      result.set(id, {
        id: id.replace(/"/g, ""), // Remove the double quotes
        name: name.replace(/"/g, ""),
        set: set.replace(/"/g, ""),
        have: Number(have.replace(/"/g, "")) || 0,
        setNumber: setNumber.replace(/"/g, ""),
      });
    }
  });

  return result;
}
