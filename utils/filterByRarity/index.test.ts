import filterByRarity from "./index";
import { Rarity } from "@flesh-and-blood/types";

describe("filterByRarity", () => {
  it("should return false if given no card rarities", () => {
    expect(filterByRarity([], [Rarity.Common])).toBe(false);
  });

  it("should return false if given no filter rarities", () => {
    expect(filterByRarity([Rarity.Common], [])).toBe(false);
  });

  it("should return true if given a card rarity that matches a filter rarity", () => {
    expect(filterByRarity([Rarity.Common], [Rarity.Common])).toBe(true);
    expect(
      filterByRarity([Rarity.Common, Rarity.Majestic], [Rarity.Common]),
    ).toBe(true);
    expect(
      filterByRarity([Rarity.Common], [Rarity.Common, Rarity.Majestic]),
    ).toBe(true);
    expect(
      filterByRarity(
        [Rarity.Common, Rarity.Majestic],
        [Rarity.Common, Rarity.Majestic],
      ),
    ).toBe(true);
    expect(
      filterByRarity(
        [Rarity.Common, Rarity.Majestic, Rarity.Promo],
        [Rarity.Rare, Rarity.Legendary, Rarity.Promo],
      ),
    ).toBe(true);
  });

  it("should return false if given a card rarity that does not match a filter rarity", () => {
    expect(filterByRarity([Rarity.Common], [Rarity.Rare])).toBe(false);
    expect(
      filterByRarity([Rarity.Common], [Rarity.Rare, Rarity.Majestic]),
    ).toBe(false);
    expect(
      filterByRarity(
        [Rarity.Common, Rarity.Majestic],
        [Rarity.Rare, Rarity.Promo],
      ),
    ).toBe(false);
  });
});
