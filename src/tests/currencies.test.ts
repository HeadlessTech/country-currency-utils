import { COUNTRIES_DATA, currencyCodes } from "../countries";
import { CURRENCIES_DATA, CURRENCIES_MAP } from "../currencies";

/*
  Check all currencies listed under country
  exists in currencies map
*/
test("country to currency match", () => {
  const leftOutCurrencies: string[] = [];
  currencyCodes.forEach((currencyCode) => {
    if (!CURRENCIES_MAP[currencyCode]) leftOutCurrencies.push(currencyCode);
  });
  expect(leftOutCurrencies.length).toBe(0);
});

/*
  Check all currencies listed under currency map
  is used by any country
*/
test("country to currency match", () => {
  const extraCurrencies: string[] = [];
  const currencies = Object.keys(CURRENCIES_MAP);

  currencies.forEach((currency) => {
    if (
      !COUNTRIES_DATA.find(
        (countryData) => countryData.currencyCode === currency
      )
    ) {
      extraCurrencies.push(currency);
    }
  });

  expect(extraCurrencies.length).toBe(0);
});
