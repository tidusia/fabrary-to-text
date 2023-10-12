import { Rarity } from "fab-cards";

export type Card = {
  id: string;
  name: string;
  sets: Set<string>;
  setNumber: string;
  have: number;
  missing: number;
  pitch?: string;
  variations: number;
  playset: number;
  rarities: Array<Rarity>;
};
