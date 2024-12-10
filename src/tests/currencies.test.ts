import { COUNTRIES_DATA, currencyCodes } from "../countries";
import { CURRENCIES_DATA, CURRENCIES_MAP } from "../currencies";
import {
  getCurrencyDetails,
  getFormattedAmount,
  getFormattedAmountOnCurrency,
  getRoundedAmount,
  getRoundedAmountOnCurrency,
} from "../utils";

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

/*
  Rounding amount test
*/
test("Test amount rounding", () => {
  expect(getRoundedAmount(1234, 2)).toBe(1234);
  expect(getRoundedAmount(1234.1, 2)).toBe(1234.1);
  expect(getRoundedAmount(1.125, 2)).toBe(1.13);
  expect(getRoundedAmount(1.123, 2)).toBe(1.13);
  expect(getRoundedAmount(1.126, 2)).toBe(1.13);
  expect(getRoundedAmount(1.126, 1)).toBe(1.2);
  expect(getRoundedAmount(1.126, 0)).toBe(2);

  expect(getRoundedAmount(1.125, 2, true)).toBe(1.13);
  expect(getRoundedAmount(1.123, 2, true)).toBe(1.12);
  expect(getRoundedAmount(1.126, 2, true)).toBe(1.13);
  expect(getRoundedAmount(1.126, 1, true)).toBe(1.1);
  expect(getRoundedAmount(1.15, 1, true)).toBe(1.2);
  expect(getRoundedAmount(1.12, 0, true)).toBe(1);
  expect(getRoundedAmount(1.56, 0, true)).toBe(2);
});

/*
  Rounding amount on currency test
*/
test("Test amount rounding on currency", () => {
  // USD check
  expect(getRoundedAmountOnCurrency(1234, "USD")).toBe(1234);
  expect(getRoundedAmountOnCurrency(1.123, "USD")).toBe(1.13);
  expect(
    getRoundedAmountOnCurrency(1.123, "USD", { isRoundMiddle: true })
  ).toBe(1.12);
  expect(
    getRoundedAmountOnCurrency(1.123, "USD", {
      isRoundMiddle: true,
      isDecimalsStandard: true,
    })
  ).toBe(1.12);

  // BDT check
  expect(getRoundedAmountOnCurrency(1234, "BDT")).toBe(1234);
  expect(getRoundedAmountOnCurrency(1.123, "BDT")).toBe(2);
  expect(
    getRoundedAmountOnCurrency(1.123, "BDT", { isRoundMiddle: true })
  ).toBe(1);
  expect(
    getRoundedAmountOnCurrency(1.123, "BDT", {
      isRoundMiddle: true,
      isDecimalsStandard: true,
    })
  ).toBe(1.12);
});

/*
  Formatting amount test
*/
test("Test amount formatting", () => {
  expect(getFormattedAmount(1234, 2, 0)).toBe("1,234");
  expect(getFormattedAmount(12345, 2, 0)).toBe("12,345");
  expect(getFormattedAmount(123456, 2, 0)).toBe("1,23,456");
  expect(getFormattedAmount(1234567, 2, 0)).toBe("12,34,567");
  expect(getFormattedAmount(123456789, 2, 0)).toBe("12,34,56,789");
  expect(getFormattedAmount(12345678912, 2, 0)).toBe("12,34,56,78,912");

  expect(getFormattedAmount(1234, 2, 2)).toBe("1,234.00");
  expect(getFormattedAmount(12345.1, 2, 2)).toBe("12,345.10");
  expect(getFormattedAmount(123456.12, 2, 2)).toBe("1,23,456.12");
  expect(getFormattedAmount(123456.1234, 2, 2)).toBe("1,23,456.12");
  expect(getFormattedAmount(123456.1299, 2, 2)).toBe("1,23,456.12");
  expect(getFormattedAmount(123456.1299123, 2, 3)).toBe("1,23,456.129");
  expect(getFormattedAmount(123456.1, 2, 5)).toBe("1,23,456.10000");

  expect(getFormattedAmount(1234, 3, 0)).toBe("1,234");
  expect(getFormattedAmount(12345, 3, 0)).toBe("12,345");
  expect(getFormattedAmount(123456, 3, 0)).toBe("123,456");
  expect(getFormattedAmount(1234567, 3, 0)).toBe("1,234,567");
  expect(getFormattedAmount(123456789, 3, 0)).toBe("123,456,789");
  expect(getFormattedAmount(12345678912, 3, 0)).toBe("12,345,678,912");

  expect(getFormattedAmount(1234, 3, 2)).toBe("1,234.00");
  expect(getFormattedAmount(12345.1, 3, 2)).toBe("12,345.10");
  expect(getFormattedAmount(123456.12, 3, 2)).toBe("123,456.12");
});

/*
  Formatting amount on currency test
*/
test("Test amount formatting on currency", () => {
  // USD check
  expect(getFormattedAmountOnCurrency(1234, "USD")).toBe("1,234.00");
  expect(getFormattedAmountOnCurrency(1234567, "USD")).toBe("1,234,567.00");
  expect(getFormattedAmountOnCurrency(1234567, "USD")).toBe("1,234,567.00");
  expect(
    getFormattedAmountOnCurrency(1234567, "USD", { avoidFixedDecimals: true })
  ).toBe("1,234,567");

  expect(getFormattedAmountOnCurrency(1.123, "USD")).toBe("1.13");
  expect(
    getFormattedAmountOnCurrency(1.123, "USD", { isRoundMiddle: true })
  ).toBe("1.12");
  expect(
    getFormattedAmountOnCurrency(1.123, "USD", {
      isRoundMiddle: true,
      isDecimalsStandard: true,
    })
  ).toBe("1.12");
  expect(
    getFormattedAmountOnCurrency(12345.123, "USD", {
      isRoundMiddle: true,
      isDecimalsStandard: true,
      avoidFixedDecimals: true,
    })
  ).toBe("12,345.12");
  expect(
    getFormattedAmountOnCurrency(12345, "USD", {
      isRoundMiddle: true,
      isDecimalsStandard: true,
      avoidFixedDecimals: true,
    })
  ).toBe("12,345");

  // BDT check
  expect(getFormattedAmountOnCurrency(1234, "BDT")).toBe("1,234");
  expect(getFormattedAmountOnCurrency(1234567, "BDT")).toBe("12,34,567");
  expect(
    getFormattedAmountOnCurrency(1234567, "BDT", { isDecimalsStandard: true })
  ).toBe("12,34,567.00");
  expect(
    getFormattedAmountOnCurrency(1234567, "BDT", {
      isDecimalsStandard: true,
      avoidFixedDecimals: true,
    })
  ).toBe("12,34,567");
  expect(
    getFormattedAmountOnCurrency(123.1, "BDT", {
      isDecimalsStandard: true,
      avoidFixedDecimals: true,
    })
  ).toBe("123.1");
  expect(getFormattedAmountOnCurrency(1.123, "BDT")).toBe("2");
  expect(
    getFormattedAmountOnCurrency(1.123, "BDT", { isRoundMiddle: true })
  ).toBe("1");
  expect(
    getFormattedAmountOnCurrency(1.123, "BDT", {
      isRoundMiddle: true,
      isDecimalsStandard: true,
    })
  ).toBe("1.12");
});
