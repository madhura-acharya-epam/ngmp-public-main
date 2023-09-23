import exp from "constants";
import { SUPPORTED_COUNTRIES } from "../config";
import {
  checkIfTodayIsPublicHoliday,
  getListOfPublicHolidays,
  getNextPublicHolidays,
} from "../services/public-holidays.service";

describe("Intergration Testing", () => {
  describe("Get Public Holidays", () => {
    test("Get list of public holidays by year and country", async () => {
      const response = await getListOfPublicHolidays(
        2023,
        SUPPORTED_COUNTRIES[0]
      );

      expect(response.length).toBeGreaterThan(0);
    });
  });
  describe("Is Today Holiday", () => {
    test("Should check if today is holiday", async () => {
      const response = await checkIfTodayIsPublicHoliday(
        SUPPORTED_COUNTRIES[0]
      );
      expect(response).toBeFalsy();
    });
  });
  describe("Next holiday", () => {
    test("get list of next holiday", async () => {
      const response = await getNextPublicHolidays(SUPPORTED_COUNTRIES[0]);

      expect(response.length).toBeGreaterThan(0);
    });
  });
});
