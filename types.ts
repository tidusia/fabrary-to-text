export type Card = {
  id: string;
  name: string;
  sets: Set<string>;
  setNumber: string;
  have: number;
  missing: number;
  pitch?: string;
};
