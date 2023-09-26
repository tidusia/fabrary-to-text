"use client";

import { useState } from "react";
import csvToCards from "../utils/csv-to-cards";
import { Release } from "fab-cards/dist/interfaces";
import { SORTED_SETS } from "../constants";

export default function Home() {
  const [text, setText] = useState<string>("");
  const [editionFilter, setEditionFilter] = useState<Release>(
    "Welcome to Rathe" as Release,
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.files?.[0];
    if (input) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const text = e.target?.result;
        setText(String(text || ""));
      };
      reader.readAsText(input);
    }
  };

  const collection = Object.entries(csvToCards(text) || {}).map(
    ([key, value]) => value,
  );
  let missings: Array<string> = [];
  if (collection) {
    collection.forEach((card) => {
      if (card.sets.has(editionFilter) && card.missing) {
        missings.push(`${card.missing} ${card.name} ${card.pitch}`);
      }
    });
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <input
        type="file"
        name="file"
        id="file"
        onChange={handleInputChange}
        accept=".csv"
      />

      <div>
        Collection cards possessed :{" "}
        {collection.reduce((sum, card) => sum + card.have, 0)}
      </div>

      <div>
        Collection missing cards :{" "}
        {collection.reduce((sum, card) => sum + card.missing, 0)}
      </div>

      <div>
        Filter by edition:{" "}
        <select
          name="edition"
          id="edition"
          onChange={(event) => setEditionFilter(event.target.value as Release)}
        >
          <option value="">Select an edition</option>
          {SORTED_SETS.map((set) => (
            <option value={set}>{set}</option>
          ))}
        </select>
      </div>

      <div className="my-4">
        {missings.map((missing) => (
          <p>{missing}</p>
        ))}
      </div>
    </main>
  );
}
