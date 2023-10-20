"use client";

import { useMemo, useState } from "react";
import csvToCards from "../utils/csv-to-cards";
import { Rarity, Release } from "@flesh-and-blood/types";
import organizeMissingCards from "../utils/organizeMissingCards";
import MissingCardsBloc from "./components/MissingCardsBloc";
import { Card } from "../types";
import filterByRarity from "../utils/filterByRarity";

const ALL_RARITIES = [
  Rarity.Token,
  Rarity.Common,
  Rarity.Rare,
  Rarity.SuperRare,
  Rarity.Majestic,
  Rarity.Legendary,
  Rarity.Fabled,
  Rarity.Promo,
  Rarity.Marvel,
];

export default function Home() {
  const [text, setText] = useState<string>("");
  const [filters, setFilters] = useState<Array<Rarity>>(ALL_RARITIES);

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

  const filteredCollection = collection.filter((card) =>
    filterByRarity(card.rarities, filters),
  );

  return (
    <main className="p-4 max-w-screen-lg mx-auto">
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
      <div className="flex flex-wrap gap-2">
        <span>Filters:</span>
        {ALL_RARITIES.map((rarity) => (
          <label>
            <input
              type="checkbox"
              checked={filters.includes(rarity)}
              onChange={(event) => {
                if (event.target.checked) {
                  setFilters([...filters, rarity]);
                } else {
                  setFilters(filters.filter((r) => r !== rarity));
                }
              }}
            />
            {rarity}
          </label>
        ))}
      </div>

      <div className="flex flex-col gap-4">
        <EditionStats
          edition={Release.WelcomeToRathe}
          collection={filteredCollection}
        />
        <EditionStats
          edition={Release.ArcaneRising}
          collection={filteredCollection}
        />
        <EditionStats
          edition={Release.CrucibleOfWar}
          collection={filteredCollection}
        />
        <EditionStats
          edition={Release.Monarch}
          collection={filteredCollection}
        />
        <EditionStats
          edition={Release.TalesOfAria}
          collection={filteredCollection}
        />
        <EditionStats
          edition={Release.Everfest}
          collection={filteredCollection}
        />
        <EditionStats
          edition={Release.Uprising}
          collection={filteredCollection}
        />
        <EditionStats
          edition={Release.Dynasty}
          collection={filteredCollection}
        />
        <EditionStats
          edition={Release.Outsiders}
          collection={filteredCollection}
        />
        <EditionStats
          edition={Release.DuskTillDawn}
          collection={filteredCollection}
        />
        <EditionStats
          edition={Release.BrightLights}
          collection={filteredCollection}
        />
      </div>
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
  const totalUniqueMissingCards = missingCards.length;
  const totalMissingCards = missingCards.reduce(
    (sum, card) => sum + card.missing,
    0,
  );

  return (
    <div className="flex border-black border-2 gap-4 p-2">
      <h2>{edition}</h2>
      <h3>{percentile}% complete</h3>
      <h3>Total unique missing : {totalUniqueMissingCards} cards</h3>
      <h3>Total playset missing : {totalMissingCards} cards</h3>

      {organizedMissingCards.map((missingCards) => (
        <MissingCardsBloc missingCards={missingCards} />
      ))}
    </div>
  );
};
