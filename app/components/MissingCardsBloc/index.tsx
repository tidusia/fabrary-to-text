import React from "react";
import clsx from "clsx";
import { Card } from "../../../types";

type Props = {
  className?: string;
  missingCards: Array<Card>;
};

export default function MissingCardsBloc({
  className,
  missingCards,
}: Props): React.ReactElement {
  return (
    <div className={clsx("border rounded border-black p-2", className)}>
      {missingCards.map((card) => {
        const showPitch = card.variations > 1;

        return (
          <div key={card.id}>
            {card.missing} {card.name} {showPitch ? card.pitch : ""}
          </div>
        );
      })}
    </div>
  );
}
