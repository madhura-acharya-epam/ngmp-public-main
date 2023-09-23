import request from "supertest";

const API_END_POINT = "https://date.nager.at/api/v3";

describe("/CountryInfo", () => {
  test("should return 200 and country details", async () => {
    const { status, body } = await request(API_END_POINT).get(
      "/CountryInfo/GB"
    );

    expect(status).toEqual(200);
    expect(body).toEqual({
      commonName: expect.any(String),
      officialName: expect.any(String),
      countryCode: expect.any(String),
      region: expect.any(String),
      borders: expect.any(Array<String>),
    });
  });
});

describe("/AvailableCountries", () => {
  test("should return 200 and list of available countries", async () => {
    const { status, body } = await request(API_END_POINT).get(
      "/AvailableCountries"
    );

    expect(status).toEqual(200);
  });
});
