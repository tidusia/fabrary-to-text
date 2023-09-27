import calculatePlaysetNumber from "./index";

describe("calculatePlaysetNumber", () => {
  it("should return 3 by default", () => {
    expect(calculatePlaysetNumber("absorb-in-aether-blue")).toBe(3);
  });

  it("should return 1 for a hero", () => {
    expect(calculatePlaysetNumber("katsu")).toBe(1);
  });

  it("should return 1 for a demi-hero", () => {
    expect(calculatePlaysetNumber("levia-redeemed")).toBe(1);
  });

  it("should return 1 for a Legendary", () => {
    expect(calculatePlaysetNumber("gorganian-tome")).toBe(1);
  });

  it("should return 1 for a equipment", () => {
    expect(calculatePlaysetNumber("snapdragon-scalers")).toBe(1);
  });

  it("should return 2 for a Mentor", () => {
    expect(calculatePlaysetNumber("chief-rukutan")).toBe(2);
  });

  it("should return 2 for a one-handed weapon", () => {
    expect(calculatePlaysetNumber("harmonized-kodachi")).toBe(2);
  });

  it("should return 1 for a two-handed weapon", () => {
    expect(calculatePlaysetNumber("dawnblade")).toBe(1);
  });
});
