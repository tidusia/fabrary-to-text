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
    <ul className={clsx("border rounded border-black p-2", className)}>
      {missingCards.map((card) => (
        <li key={card.id}>
          {card.missing} {card.name} {card.pitch}
        </li>
      ))}
    </ul>
  );
}
