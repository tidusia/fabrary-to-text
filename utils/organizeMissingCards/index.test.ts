import organizeMissingCards from "./index";
import { Card } from "../../types";

const generateCollection = (nbOfCards: number): Array<Card> => {
  return Array(nbOfCards)
    .fill(undefined)
    .map((_, index) => ({
      id: `card-${index}`,
      name: `Card ${index}`,
      pitch: "",
      sets: new Set(),
      have: 0,
      missing: 3,
      setNumber: `card-${index}`,
    }));
};

describe("organizeMissingCards", () => {
  it("should return an empty array if given no cards", () => {
    expect(organizeMissingCards([])).toHaveLength(0);
  });

  it("should return 1 array if given less than 151 cards", () => {
    const collection = generateCollection(150);
    const result = organizeMissingCards(collection);
    expect(result).toHaveLength(1);
    expect(result[0]).toHaveLength(150);
  });

  it("should return 2 array if given 151 cards", () => {
    const collection = generateCollection(151);
    const result = organizeMissingCards(collection);
    expect(result).toHaveLength(2);
    expect(result[0]).toHaveLength(150);
    expect(result[1]).toHaveLength(1);
  });

  it("should return 2 array if given 300 cards", () => {
    const collection = generateCollection(300);
    const result = organizeMissingCards(collection);
    expect(result).toHaveLength(2);
    expect(result[0]).toHaveLength(150);
    expect(result[1]).toHaveLength(150);
  });

  it("should return 3 array if given 301 cards", () => {
    const collection = generateCollection(301);
    const result = organizeMissingCards(collection);
    expect(result).toHaveLength(3);
    expect(result[0]).toHaveLength(150);
    expect(result[1]).toHaveLength(150);
    expect(result[2]).toHaveLength(1);
  });

  it("should return 3 array if given 450 cards", () => {
    const collection = generateCollection(450);
    const result = organizeMissingCards(collection);
    expect(result).toHaveLength(3);
    expect(result[0]).toHaveLength(150);
    expect(result[1]).toHaveLength(150);
    expect(result[2]).toHaveLength(150);
  });
});
