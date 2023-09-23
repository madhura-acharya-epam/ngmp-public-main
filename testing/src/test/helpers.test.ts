import { SUPPORTED_COUNTRIES } from "../config";
import { validateInput, shortenPublicHoliday } from "./../helpers";

describe("Helpers", () => {
  test("[Mocks] should throw error if country is not supported", () => {
    expect(() => validateInput({ country: "Invalid" })).toThrow();
  });

  test("[Mocks] should throw error if year is not supported", () => {
    expect(() => validateInput({ year: 2000 })).toThrow();
  });

  test("[Mocks] Should return true for both valid country and year", () => {
    const response = validateInput({
      year: 2023,
      country: SUPPORTED_COUNTRIES[0],
    });

    expect(response).toBeTruthy();
  });

  test("[Mocks] should return name, localName and date", () => {
    const Holiday = {
      date: "date",
      localName: "Bangalore",
      name: "India",
      countryCode: "91",
      fixed: true,
      global: true,
      counties: null,
      launchYear: null,
      types: ["type"],
    };
    const response = shortenPublicHoliday(Holiday);
    expect(response.name).toEqual("India");
    expect(response.date).toEqual("date");
    expect(response.localName).toEqual("Bangalore");
  });
});
