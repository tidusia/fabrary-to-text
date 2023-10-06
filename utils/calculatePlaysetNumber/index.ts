import { cards, Keyword, Subtype, Type } from "fab-cards";

export default function calculatePlaysetNumber(cardId: string): number {
  const card = cards.find((card) => card.cardIdentifier === cardId);

  if (card?.types.includes(Type.Hero)) return 1;
  if (card?.types.includes(Type.DemiHero)) return 1;
  if (card?.keywords?.includes(Keyword.Legendary)) return 1;
  if (card?.types?.includes(Type.Equipment)) return 1;

  if (card?.types?.includes(Type.Weapon)) {
    if (card?.subtypes.includes(Subtype.OneHanded)) return 2;
    return 1;
  }

  if (card?.types?.includes(Type.Token)) return 1;

  if (card?.types.includes(Type.Mentor)) return 2;

  return 3;
}
