import csvToCards from "./index";
import { realDataCsv } from "../../fixtures/real-data-csv";

describe("csvToCards", () => {
  it("should match snapshot", () => {
    expect(csvToCards(realDataCsv)).toMatchSnapshot();
  });
});
