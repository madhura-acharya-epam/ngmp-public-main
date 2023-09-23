import axios from "axios";
import * as helpers from "./../helpers";
import {
  checkIfTodayIsPublicHoliday,
  getListOfPublicHolidays,
  getNextPublicHolidays,
} from "./../services/public-holidays.service";
import { PublicHoliday } from "../types";
import { SUPPORTED_COUNTRIES } from "../config";

const HOLIDAY_LIST: Array<PublicHoliday> = [
  {
    date: "date",
    localName: "Bangalore",
    name: "India",
    countryCode: "91",
    fixed: true,
    global: true,
    counties: null,
    launchYear: null,
    types: ["type"],
  },
];
describe("Unit Test Cases", () => {
  describe("Public Holiday Service", () => {
    test("[Mocks] Get List of public holidays by year and country", async () => {
      jest
        .spyOn(axios, "get")
        .mockImplementation(() => Promise.resolve({ data: HOLIDAY_LIST }));

      jest.spyOn(helpers, "validateInput").mockImplementation();
      jest.spyOn(helpers, "shortenPublicHoliday").mockReturnValue({
        name: "India",
        date: "date",
        localName: "Bangalore",
      });

      const getResponse = await getListOfPublicHolidays(2023, "India");

      expect(getResponse[0].name).toEqual("India");
      expect(getResponse[0].date).toEqual("date");
      expect(getResponse[0].localName).toEqual("Bangalore");
    });

    test("[Mocks] Get List of public holiday should return empty array if fails", async () => {
      jest.spyOn(axios, "get").mockRejectedValue("Internal Server Error");
      jest.spyOn(helpers, "validateInput").mockImplementation();

      const getResponse = await getListOfPublicHolidays(2023, "India");
      expect(getResponse.length).toEqual(0);
    });

    test("[Mocks] should return True if today is public holiday", async () => {
      jest
        .spyOn(axios, "get")
        .mockImplementation(() =>
          Promise.resolve({ data: HOLIDAY_LIST, status: 200 })
        );

      const getResponse = await checkIfTodayIsPublicHoliday("India");
      expect(getResponse).toBeTruthy();
    });
    test("[Mocks] should return False if today is not public holiday", async () => {
      jest
        .spyOn(axios, "get")
        .mockImplementation(() =>
          Promise.resolve({ data: HOLIDAY_LIST, status: 400 })
        );

      const getResponse = await checkIfTodayIsPublicHoliday("India");
      expect(getResponse).toBeFalsy();
    });
    test("[Mocks] should return False if API fails", async () => {
      jest
        .spyOn(axios, "get")
        .mockImplementation(() => Promise.reject("Internal Server Error"));

      const getResponse = await checkIfTodayIsPublicHoliday("India");
      expect(getResponse).toBeFalsy();
    });
    test("[Mocks] should get list of next public holidays", async () => {
      jest.spyOn(axios, "get").mockResolvedValue({ data: HOLIDAY_LIST });
      jest.spyOn(helpers, "validateInput").mockImplementation();
      jest.spyOn(helpers, "shortenPublicHoliday").mockReturnValue({
        name: "India",
        date: "date",
        localName: "Bangalore",
      });

      const getResponse = await getNextPublicHolidays("India");

      expect(getResponse[0].name).toEqual("India");
      expect(getResponse[0].date).toEqual("date");
      expect(getResponse[0].localName).toEqual("Bangalore");
    });
    test("[Mocks] should get empty list if API fails", async () => {
      jest.spyOn(axios, "get").mockRejectedValue("Internal Server Error");
      jest.spyOn(helpers, "validateInput").mockImplementation();

      const getResponse = await getNextPublicHolidays("India");

      expect(getResponse.length).toEqual(0);
    });
    afterEach(() => {
      jest.clearAllMocks();
    });
  });
});
