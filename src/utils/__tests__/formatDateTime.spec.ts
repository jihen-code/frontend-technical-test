import { formatDateTime } from "../formatDateTime";

describe("Formatting timestamp from seconds to Date", () => {
    it("should return the correct format", () => {
        const timestamp = 1625648667;
        expect(formatDateTime(timestamp)).toEqual("07 juil. 21");
    });
});
