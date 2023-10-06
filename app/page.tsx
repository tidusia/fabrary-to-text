"use client";

import { useMemo, useState } from "react";
import csvToCards from "../utils/csv-to-cards";
import { Release } from "fab-cards";
import organizeMissingCards from "../utils/organizeMissingCards";
import MissingCardsBloc from "./components/MissingCardsBloc";
import { Card } from "../types";

export default function Home() {
  const [text, setText] = useState<string>("");

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

  const collection = useMemo(
    () => Object.entries(csvToCards(text) || {}).map(([_, value]) => value),
    [text, csvToCards],
  );
  const totalPossessedCards = collection.reduce(
    (sum, card) => sum + Math.min(card.have, card.playset),
    0,
  );
  const totalMissingCards = collection.reduce(
    (sum, card) => sum + card.missing,
    0,
  );
  const totalCards = collection.reduce((sum, card) => sum + card.playset, 0);
  const completion = (totalPossessedCards / totalCards) * 100;
  const percentile = completion.toLocaleString("en", {
    maximumFractionDigits: 2,
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <input
        type="file"
        name="file"
        id="file"
        onChange={handleInputChange}
        accept=".csv"
      />

      <div>Collection cards possessed : {totalPossessedCards}</div>

      <div>Collection missing cards : {totalMissingCards}</div>
      <div>Total completion : {percentile}%</div>

      <EditionStats edition={Release.WelcomeToRathe} collection={collection} />
      <EditionStats edition={Release.ArcaneRising} collection={collection} />
      <EditionStats edition={Release.CrucibleOfWar} collection={collection} />
      <EditionStats edition={Release.Monarch} collection={collection} />
      <EditionStats edition={Release.TalesOfAria} collection={collection} />
      <EditionStats edition={Release.Everfest} collection={collection} />
      <EditionStats edition={Release.Uprising} collection={collection} />
      <EditionStats edition={Release.Dynasty} collection={collection} />
      <EditionStats edition={Release.Outsiders} collection={collection} />
      <EditionStats edition={Release.DuskTillDawn} collection={collection} />
      <EditionStats edition={Release.BrightLights} collection={collection} />
    </main>
  );
}

type EditionStatsProps = {
  edition: Release;
  collection: Array<Card>;
};

const EditionStats = ({ edition, collection }: EditionStatsProps) => {
  if (!collection.length) return null;
  const filtered = collection.filter((card) => card.sets.has(edition));
  const totalCards = filtered.reduce((sum, card) => sum + card.playset, 0);
  const haveCards = filtered.reduce(
    (sum, card) => sum + Math.min(card.playset, card.have),
    0,
  );
  const completion = (haveCards / totalCards) * 100;
  const percentile = completion.toLocaleString("en", {
    maximumFractionDigits: 2,
  });

  const missingCards = filtered.filter(
    (card) => card.sets.has(edition) && card.missing,
  );
  const organizedMissingCards = organizeMissingCards(missingCards);

  return (
    <div className="flex border-black border-2 gap-4 p-2">
      <h2>{edition}</h2>
      <h3>{percentile}% complete</h3>

      {organizedMissingCards.map((missingCards) => (
        <MissingCardsBloc missingCards={missingCards} />
      ))}
    </div>
  );
};
