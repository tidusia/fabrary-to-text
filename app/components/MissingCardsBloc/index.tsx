import React from "react";
import clsx from "clsx";
import { Card } from "../../../types";
import copyTextToClipboard from "../../../utils/copyTextToClipboard";

type Props = {
  className?: string;
  missingCards: Array<Card>;
};

export default function MissingCardsBloc({
  className,
  missingCards,
}: Props): React.ReactElement {
  const missingCardsText = missingCards.map((card) => {
    const showPitch = card.variations > 1;

    return `${card.missing} ${MKM_EXCEPTIONS[card.name] || card.name} ${
      showPitch ? card.pitch : ""
    }`;
  });

  return (
    <div>
      <button onClick={() => copyTextToClipboard(missingCardsText.join("\n"))}>
        Copy
      </button>
      <div className={clsx("border rounded border-black p-2", className)}>
        {missingCardsText.map((text) => {
          return (
            <div key={text} className="whitespace-nowrap">
              {text}
            </div>
          );
        })}
      </div>
    </div>
  );
}

const MKM_EXCEPTIONS: Record<string, string> = {
  "Aether Ashwing": "Aether Ashwing // Ash",
  "Invoke Azvolai": "Invoke Azvolai // Azvolai",
  "Invoke Cromai": "Invoke Cromai // Cromai",
  "Invoke Dominia": "Invoke Dominia // Dominia",
  "Invoke Kyloria": "Invoke Kyloria // Kyloria",
  "Invoke Miragai": "Invoke Miragai // Miragai",
  "Invoke Nekria": "Invoke Nekria // Nekria",
  "Invoke Ouvia": "Invoke Ouvia // Ouvia",
  "Invoke Themai": "Invoke Themai // Themai",
  "Invoke Tomeltai": "Invoke Tomeltai // Tomeltai",
  "Invoke Vynserakai": "Invoke Vynserakai // Vynserakai",
  "Invoke Yendurai": "Invoke Yendurai // Yendurai",
  "Invoke Dracona Optimai": "Invoke Dracona Optimai // Dracona Optimai",
};
