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

    return `${card.missing} ${card.name} ${showPitch ? card.pitch : ""}`;
  });

  return (
    <div>
      <button onClick={() => copyTextToClipboard(missingCardsText.join("\n"))}>
        Copy
      </button>
      <div className={clsx("border rounded border-black p-2", className)}>
        {missingCardsText.map((text) => {
          return <div key={text}>{text}</div>;
        })}
      </div>
    </div>
  );
}
