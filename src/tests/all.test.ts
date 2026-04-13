import {
  getAllCountryDetails,
  getAllCountryData,
  getCountryData,
  getCountriesData,
  getAllCurrencyDetails,
  getAllCurrencyData,
  getCurrenciesData,
  getCurrencyData,
  getDisplayAmountOnCurrency,
  getDisplayAmountOnCurrencyCode,
  getFormattedAmount,
  getFormattedAmountOnCurrency,
  getFormattedAmountOnCurrencyCode,
  getFixedAmount,
  getFixedAmountOnCurrency,
  getFixedAmountOnCurrencyCode,
} from "..";

/*
  Country lookup functions
*/
test("Country lookup functions", () => {
  const all = getAllCountryData();
  expect(all.length).toBeGreaterThan(0);
  expect(all[0]).toHaveProperty("countryCode");
  expect(all[0]).toHaveProperty("name");
  expect(all[0]).toHaveProperty("currencyCode");

  const us = getCountryData("US");
  expect(us).toBeDefined();
  expect(us?.countryCode).toBe("US");
  expect(us?.name).toBe("United States");
  expect(us?.currencyCode).toBe("USD");

  const bd = getCountryData("BD");
  expect(bd).toBeDefined();
  expect(bd?.currencyCode).toBe("BDT");

  expect(getCountryData("INVALID")).toBeUndefined();

  const [usData, bdData] = getCountriesData(["US", "BD"]);
  expect(usData?.countryCode).toBe("US");
  expect(bdData?.countryCode).toBe("BD");
  expect(getCountriesData(["INVALID"])[0]).toBeUndefined();
});

/*
  Currency lookup functions
*/
test("Currency lookup functions", () => {
  const all = getAllCurrencyData();
  expect(all.length).toBeGreaterThan(0);
  expect(all[0]).toHaveProperty("currencyCode");
  expect(all[0]).toHaveProperty("decimals");
  expect(all[0]).toHaveProperty("digitGrouping");

  const usd = getCurrencyData("USD");
  expect(usd).toBeDefined();
  expect(usd?.currencyCode).toBe("USD");
  expect(usd?.decimals).toBe(2);
  expect(usd?.digitGrouping).toBe(3);

  expect(getCurrencyData("INVALID")).toBeUndefined();

  const [usdData, bdtData] = getCurrenciesData(["USD", "BDT"]);
  expect(usdData?.currencyCode).toBe("USD");
  expect(bdtData?.currencyCode).toBe("BDT");
  expect(getCurrenciesData(["INVALID"])[0]).toBeUndefined();
});

/*
  Check all currencies listed under country
  exists in currencies map
*/
test("country to currency match", () => {
  const allCountriesDetails = getAllCountryDetails();
  const allCurrenciesDetails = getAllCurrencyDetails();

  const leftOutCountryCodes: string[] = [];

  Object.keys(allCountriesDetails).forEach((countryCode) => {
    const countryDetails = allCountriesDetails[countryCode];
    if (!allCurrenciesDetails[countryDetails.currencyCode])
      leftOutCountryCodes.push(countryCode);
  });

  expect(leftOutCountryCodes.length).toBe(0);
});

/*
  Rounding amount test
*/
test("Test amount rounding", () => {
  expect(getFixedAmount(1234, 2)).toBe(1234);
  expect(getFixedAmount(1234.1, 2)).toBe(1234.1);
  expect(getFixedAmount(1.125, 2)).toBe(1.13);
  expect(getFixedAmount(1.123, 2)).toBe(1.13);
  expect(getFixedAmount(1.126, 2)).toBe(1.13);
  expect(getFixedAmount(1.126, 1)).toBe(1.2);
  expect(getFixedAmount(1.126, 0)).toBe(2);

  // floating point midpoint cases (x.xx5) — previously rounded wrong direction
  expect(getFixedAmount(1.005, 2, "round")).toBe(1.01);
  expect(getFixedAmount(1.015, 2, "round")).toBe(1.02);
  expect(getFixedAmount(1.025, 2, "round")).toBe(1.03);
  expect(getFixedAmount(1.035, 2, "round")).toBe(1.04);
  expect(getFixedAmount(1.045, 2, "round")).toBe(1.05);
  expect(getFixedAmount(1.055, 2, "round")).toBe(1.06);
  expect(getFixedAmount(1.065, 2, "round")).toBe(1.07);
  expect(getFixedAmount(1.075, 2, "round")).toBe(1.08);
  expect(getFixedAmount(1.085, 2, "round")).toBe(1.09);
  expect(getFixedAmount(1.095, 2, "round")).toBe(1.1);

  expect(getFixedAmount(1.125, 2, "round")).toBe(1.13);
  expect(getFixedAmount(1.123, 2, "round")).toBe(1.12);
  expect(getFixedAmount(1.126, 2, "round")).toBe(1.13);
  expect(getFixedAmount(1.126, 1, "round")).toBe(1.1);
  expect(getFixedAmount(1.15, 1, "round")).toBe(1.2);
  expect(getFixedAmount(1.12, 0, "round")).toBe(1);
  expect(getFixedAmount(1.56, 0, "round")).toBe(2);

  // floating point midpoint cases at decimals=3
  expect(getFixedAmount(1.0005, 3, "round")).toBe(1.001);
  expect(getFixedAmount(1.0045, 3, "round")).toBe(1.005);

  // negative values — ceil
  expect(getFixedAmount(-1234, 2)).toBe(-1234);
  expect(getFixedAmount(-1234.1, 1)).toBe(-1234.1);
  expect(getFixedAmount(-1.125, 2)).toBe(-1.12);

  // negative values — round (Math.round rounds toward +infinity, so asymmetric)
  expect(getFixedAmount(-1.005, 2, "round")).toBe(-1); // rounds toward +inf: -1.005 → -1.00
  expect(getFixedAmount(-1.125, 2, "round")).toBe(-1.12);
  expect(getFixedAmount(-1.126, 2, "round")).toBe(-1.13);
});

/*
  Rounding amount on currency test
*/
test("Test amount rounding on currency", () => {
  const USDCurrencyDetails = getCurrencyData("USD");
  const BDTCurrencyDetails = getCurrencyData("BDT");

  expect(USDCurrencyDetails).toBeDefined();
  expect(BDTCurrencyDetails).toBeDefined();
  if (!USDCurrencyDetails || !BDTCurrencyDetails) return;

  // USD check
  expect(getFixedAmountOnCurrency(1234, USDCurrencyDetails)).toBe(1234);
  expect(getFixedAmountOnCurrency(1.123, USDCurrencyDetails)).toBe(1.13);
  expect(
    getFixedAmountOnCurrency(1.123, USDCurrencyDetails, {
      roundingMethod: "round",
    }),
  ).toBe(1.12);
  expect(
    getFixedAmountOnCurrency(1.123, USDCurrencyDetails, {
      roundingMethod: "round",
      roundingDecimals: "compact",
    }),
  ).toBe(1.12);
  expect(getFixedAmountOnCurrency(-1.123, USDCurrencyDetails)).toBe(-1.12);
  expect(
    getFixedAmountOnCurrency(-1.123, USDCurrencyDetails, {
      roundingMethod: "round",
      roundingDecimals: "compact",
    }),
  ).toBe(-1.12);

  // BDT check
  expect(getFixedAmountOnCurrency(1234, BDTCurrencyDetails)).toBe(1234);
  expect(getFixedAmountOnCurrency(1.123, BDTCurrencyDetails)).toBe(1.13);
  expect(
    getFixedAmountOnCurrency(1.123, BDTCurrencyDetails, {
      roundingMethod: "round",
    }),
  ).toBe(1.12);
  expect(
    getFixedAmountOnCurrency(1.123, BDTCurrencyDetails, {
      roundingDecimals: "compact",
    }),
  ).toBe(2);
  expect(
    getFixedAmountOnCurrency(1.123, BDTCurrencyDetails, {
      roundingMethod: "round",
      roundingDecimals: "compact",
    }),
  ).toBe(1);
  expect(getFixedAmountOnCurrency(-1.123, BDTCurrencyDetails)).toBe(-1.12);
  expect(
    getFixedAmountOnCurrency(-1.123, BDTCurrencyDetails, {
      roundingDecimals: "compact",
    }),
  ).toBe(-1);
});

/*
  Formatting amount test
*/
test("Test amount formatting", () => {
  expect(getFormattedAmount(123, 2, 0)).toBe("123");
  expect(getFormattedAmount(1234, 2, 0)).toBe("1,234");
  expect(getFormattedAmount(12345, 2, 0)).toBe("12,345");
  expect(getFormattedAmount(123456, 2, 0)).toBe("1,23,456");
  expect(getFormattedAmount(1234567, 2, 0)).toBe("12,34,567");
  expect(getFormattedAmount(123456789, 2, 0)).toBe("12,34,56,789");
  expect(getFormattedAmount(12345678912, 2, 0)).toBe("12,34,56,78,912");
  expect(getFormattedAmount(-12, 2, 0)).toBe("-12");
  expect(getFormattedAmount(-123, 2, 0)).toBe("-123");
  expect(getFormattedAmount(-1234, 2, 0)).toBe("-1,234");
  expect(getFormattedAmount(-12345, 2, 0)).toBe("-12,345");
  expect(getFormattedAmount(-123456, 2, 0)).toBe("-1,23,456");

  expect(getFormattedAmount(123, 2, 2)).toBe("123.00");
  expect(getFormattedAmount(1234, 2, 2)).toBe("1,234.00");
  expect(getFormattedAmount(12345.1, 2, 2)).toBe("12,345.10");
  expect(getFormattedAmount(123456.12, 2, 2)).toBe("1,23,456.12");
  expect(getFormattedAmount(123456.1234, 2, 2)).toBe("1,23,456.12");
  expect(getFormattedAmount(123456.1299, 2, 2)).toBe("1,23,456.12");
  expect(getFormattedAmount(123456.1299123, 2, 3)).toBe("1,23,456.129");
  expect(getFormattedAmount(123456.1, 2, 5)).toBe("1,23,456.10000");
  expect(getFormattedAmount(-123, 2, 2)).toBe("-123.00");
  expect(getFormattedAmount(-1234, 2, 2)).toBe("-1,234.00");
  expect(getFormattedAmount(-12345.1, 2, 2)).toBe("-12,345.10");
  expect(getFormattedAmount(-123456.12, 2, 2)).toBe("-1,23,456.12");
  expect(getFormattedAmount(-123456.1234, 2, 2)).toBe("-1,23,456.12");
  expect(getFormattedAmount(-123456.1299, 2, 2)).toBe("-1,23,456.12");
  expect(getFormattedAmount(-123456.1299123, 2, 3)).toBe("-1,23,456.129");
  expect(getFormattedAmount(-123456.1, 2, 5)).toBe("-1,23,456.10000");

  expect(getFormattedAmount(0, 2, 0)).toBe("0");
  expect(getFormattedAmount(0, 2, 2)).toBe("0.00");
  // fixedDecimals omitted — shows all decimal places as-is (same as passing 0)
  expect(getFormattedAmount(123.456, 3)).toBe("123.456");
  expect(getFormattedAmount(123.4, 3)).toBe("123.4");
  expect(getFormattedAmount(123, 3)).toBe("123");
  expect(getFormattedAmount(0, 3, 0)).toBe("0");
  expect(getFormattedAmount(123, 3, 0)).toBe("123");
  expect(getFormattedAmount(1234, 3, 0)).toBe("1,234");
  expect(getFormattedAmount(12345, 3, 0)).toBe("12,345");
  expect(getFormattedAmount(123456, 3, 0)).toBe("123,456");
  expect(getFormattedAmount(1234567, 3, 0)).toBe("1,234,567");
  expect(getFormattedAmount(123456789, 3, 0)).toBe("123,456,789");
  expect(getFormattedAmount(12345678912, 3, 0)).toBe("12,345,678,912");
  expect(getFormattedAmount(-123, 3, 0)).toBe("-123");
  expect(getFormattedAmount(-1234, 3, 0)).toBe("-1,234");
  expect(getFormattedAmount(-12345, 3, 0)).toBe("-12,345");
  expect(getFormattedAmount(-123456, 3, 0)).toBe("-123,456");
  expect(getFormattedAmount(-1234567, 3, 0)).toBe("-1,234,567");
  expect(getFormattedAmount(-123456789, 3, 0)).toBe("-123,456,789");
  expect(getFormattedAmount(-12345678912, 3, 0)).toBe("-12,345,678,912");

  expect(getFormattedAmount(123, 3, 2)).toBe("123.00");
  expect(getFormattedAmount(1234, 3, 2)).toBe("1,234.00");
  expect(getFormattedAmount(12345.1, 3, 2)).toBe("12,345.10");
  expect(getFormattedAmount(123456.12, 3, 2)).toBe("123,456.12");
  expect(getFormattedAmount(-123, 3, 2)).toBe("-123.00");
  expect(getFormattedAmount(-1234, 3, 2)).toBe("-1,234.00");
  expect(getFormattedAmount(-12345.1, 3, 2)).toBe("-12,345.10");
  expect(getFormattedAmount(-123456.12, 3, 2)).toBe("-123,456.12");
});

/*
  Formatting amount on currency test
*/
test("Test amount formatting on currency", () => {
  const [USDCurrencyDetails, BDTCurrencyDetails] = getCurrenciesData([
    "USD",
    "BDT",
  ]);

  expect(USDCurrencyDetails).toBeDefined();
  expect(BDTCurrencyDetails).toBeDefined();
  if (!USDCurrencyDetails || !BDTCurrencyDetails) return;

  // USD check
  expect(getFormattedAmountOnCurrency(1.2, USDCurrencyDetails)).toBe("1.20");
  expect(getFormattedAmountOnCurrency(1.23, USDCurrencyDetails)).toBe("1.23");
  expect(getFormattedAmountOnCurrency(1.234, USDCurrencyDetails)).toBe("1.24");
  expect(
    getFormattedAmountOnCurrency(1.234, USDCurrencyDetails, {
      avoidRound: true,
    }),
  ).toBe("1.23");
  // avoidRound skips rounding but formatting still truncates to decimalsCompact
  expect(
    getFormattedAmountOnCurrency(123456.711, USDCurrencyDetails, {
      avoidRound: true,
    }),
  ).toBe("123,456.71");

  // BDT: avoidRound:true with decimalsCompact=0 — decimals bleed through because
  // fixedDecimals=0 is falsy and bypasses the truncation branch
  expect(
    getFormattedAmountOnCurrency(1.5, BDTCurrencyDetails, { avoidRound: true }),
  ).toBe("1.5");
  expect(
    getFormattedAmountOnCurrency(1.234, USDCurrencyDetails, {
      roundingMethod: "round",
    }),
  ).toBe("1.23");
  expect(getFormattedAmountOnCurrency(-1.2, USDCurrencyDetails)).toBe("-1.20");
  expect(getFormattedAmountOnCurrency(-1.23, USDCurrencyDetails)).toBe("-1.23");
  expect(getFormattedAmountOnCurrency(-1.234, USDCurrencyDetails)).toBe(
    "-1.23",
  );

  expect(getFormattedAmountOnCurrency(1234, USDCurrencyDetails)).toBe(
    "1,234.00",
  );
  expect(
    getFormattedAmountOnCurrency(1234, USDCurrencyDetails, {
      avoidRound: true,
    }),
  ).toBe("1,234.00");
  expect(
    getFormattedAmountOnCurrency(1234, USDCurrencyDetails, {
      previewDecimals: "compact",
    }),
  ).toBe("1,234.00");

  expect(getFormattedAmountOnCurrency(1234567, USDCurrencyDetails)).toBe(
    "1,234,567.00",
  );
  expect(getFormattedAmountOnCurrency(1234567, USDCurrencyDetails)).toBe(
    "1,234,567.00",
  );
  expect(getFormattedAmountOnCurrency(-1234, USDCurrencyDetails)).toBe(
    "-1,234.00",
  );
  expect(
    getFormattedAmountOnCurrency(-1234, USDCurrencyDetails, {
      avoidRound: true,
    }),
  ).toBe("-1,234.00");
  expect(
    getFormattedAmountOnCurrency(-1234, USDCurrencyDetails, {
      previewDecimals: "compact",
    }),
  ).toBe("-1,234.00");

  expect(getFormattedAmountOnCurrency(1.123, USDCurrencyDetails)).toBe("1.13");
  expect(
    getFormattedAmountOnCurrency(1.123, USDCurrencyDetails, {
      roundingMethod: "round",
    }),
  ).toBe("1.12");
  expect(getFormattedAmountOnCurrency(12345.123, USDCurrencyDetails, {})).toBe(
    "12,345.13",
  );
  expect(getFormattedAmountOnCurrency(12345, USDCurrencyDetails)).toBe(
    "12,345.00",
  );
  expect(getFormattedAmountOnCurrency(12345.2, USDCurrencyDetails)).toBe(
    "12,345.20",
  );
  expect(getFormattedAmountOnCurrency(-12345, USDCurrencyDetails)).toBe(
    "-12,345.00",
  );
  expect(getFormattedAmountOnCurrency(-12345.2, USDCurrencyDetails)).toBe(
    "-12,345.20",
  );

  // BDT check
  expect(getFormattedAmountOnCurrency(1234, BDTCurrencyDetails)).toBe("1,234");
  expect(getFormattedAmountOnCurrency(1234567, BDTCurrencyDetails)).toBe(
    "12,34,567",
  );
  expect(
    getFormattedAmountOnCurrency(1234567, BDTCurrencyDetails, {
      previewDecimals: "standard",
    }),
  ).toBe("12,34,567.00");
  expect(getFormattedAmountOnCurrency(1234567, BDTCurrencyDetails)).toBe(
    "12,34,567",
  );
  expect(getFormattedAmountOnCurrency(-1234, BDTCurrencyDetails)).toBe(
    "-1,234",
  );
  expect(getFormattedAmountOnCurrency(-1234567, BDTCurrencyDetails)).toBe(
    "-12,34,567",
  );

  expect(getFormattedAmountOnCurrency(123.1, BDTCurrencyDetails)).toBe("123.1");
  expect(getFormattedAmountOnCurrency(1.123, BDTCurrencyDetails)).toBe("1.13");
  expect(
    getFormattedAmountOnCurrency(1.123, BDTCurrencyDetails, {
      roundingDecimals: "compact",
    }),
  ).toBe("2");
  expect(
    getFormattedAmountOnCurrency(1.123, BDTCurrencyDetails, {
      roundingDecimals: "compact",
      roundingMethod: "round",
    }),
  ).toBe("1");
  expect(
    getFormattedAmountOnCurrency(-1.123, BDTCurrencyDetails, {
      roundingDecimals: "compact",
      roundingMethod: "round",
    }),
  ).toBe("-1");
});

/*
  Display amount on currency
*/
test("Test amount display on currency", () => {
  const USDCurrencyDetails = getCurrencyData("USD");
  const BDTCurrencyDetails = getCurrencyData("BDT");

  expect(USDCurrencyDetails).toBeDefined();
  expect(BDTCurrencyDetails).toBeDefined();
  if (!USDCurrencyDetails || !BDTCurrencyDetails) return;

  // USD
  expect(getDisplayAmountOnCurrency(1.123, USDCurrencyDetails)).toBe("$ 1.13");
  expect(getDisplayAmountOnCurrency(1234.12, USDCurrencyDetails)).toBe(
    "$ 1,234.12",
  );
  expect(
    getDisplayAmountOnCurrency(1234.12, USDCurrencyDetails, {
      avoidFormat: true,
    }),
  ).toBe("$ 1234.12");
  expect(
    getDisplayAmountOnCurrency(1234.1234, USDCurrencyDetails, {
      avoidFormat: true,
      avoidRound: true,
    }),
  ).toBe("$ 1234.1234");
  expect(getDisplayAmountOnCurrency(1234.1, USDCurrencyDetails)).toBe(
    "$ 1,234.10",
  );
  expect(getDisplayAmountOnCurrency(1234.1, USDCurrencyDetails, {})).toBe(
    "$ 1,234.10",
  );
  expect(
    getDisplayAmountOnCurrency(1234.1, USDCurrencyDetails, {
      avoidFormat: true,
    }),
  ).toBe("$ 1234.1");
  // negatives
  expect(getDisplayAmountOnCurrency(-1.123, USDCurrencyDetails)).toBe(
    "- $ 1.12",
  );
  expect(
    getDisplayAmountOnCurrency(-1234.1234, USDCurrencyDetails, {
      avoidFormat: true,
      avoidRound: true,
    }),
  ).toBe("- $ 1234.1234");

  // BDT
  expect(getDisplayAmountOnCurrency(1.123, BDTCurrencyDetails)).toBe("Tk 1.13");
  expect(
    getDisplayAmountOnCurrency(1.123, BDTCurrencyDetails, {
      roundingDecimals: "compact",
    }),
  ).toBe("Tk 2");
  expect(
    getDisplayAmountOnCurrency(1.123, BDTCurrencyDetails, {
      roundingDecimals: "compact",
      previewDecimals: "standard",
    }),
  ).toBe("Tk 2.00");
  expect(getDisplayAmountOnCurrency(1.123, BDTCurrencyDetails, {})).toBe(
    "Tk 1.13",
  );
  expect(
    getDisplayAmountOnCurrency(1.123, BDTCurrencyDetails, {
      isSymbolNative: true,
    }),
  ).toBe("Tk 1.13");
  expect(
    getDisplayAmountOnCurrency(1.123, BDTCurrencyDetails, {
      isSymbolStandard: true,
    }),
  ).toBe("৳ 1.13");
  expect(
    getDisplayAmountOnCurrency(1123, BDTCurrencyDetails, {
      isSymbolStandard: true,
    }),
  ).toBe("৳ 1,123");
  expect(
    getDisplayAmountOnCurrency(1123, BDTCurrencyDetails, { separator: "" }),
  ).toBe("Tk1,123");
  // negative
  expect(getDisplayAmountOnCurrency(-1.123, BDTCurrencyDetails)).toBe(
    "- Tk 1.12",
  );
  expect(
    getDisplayAmountOnCurrency(-1.123, BDTCurrencyDetails, {
      roundingDecimals: "compact",
    }),
  ).toBe("- Tk 1");
  expect(
    getDisplayAmountOnCurrency(-1.123, BDTCurrencyDetails, {
      roundingDecimals: "compact",
      previewDecimals: "standard",
    }),
  ).toBe("- Tk 1.00");
  expect(getDisplayAmountOnCurrency(-1.123, BDTCurrencyDetails, {})).toBe(
    "- Tk 1.12",
  );
  expect(
    getDisplayAmountOnCurrency(-1.123, BDTCurrencyDetails, {
      isSymbolNative: true,
    }),
  ).toBe("- Tk 1.12");
  expect(
    getDisplayAmountOnCurrency(-1.123, BDTCurrencyDetails, {
      isSymbolStandard: true,
    }),
  ).toBe("- ৳ 1.12");
  expect(
    getDisplayAmountOnCurrency(-1123, BDTCurrencyDetails, {
      isSymbolStandard: true,
    }),
  ).toBe("- ৳ 1,123");
  expect(
    getDisplayAmountOnCurrency(-1123, BDTCurrencyDetails, { separator: "" }),
  ).toBe("- Tk1,123");
  expect(
    getDisplayAmountOnCurrency(-1123, BDTCurrencyDetails, {
      separator: "-",
      avoidFormat: true,
    }),
  ).toBe("- Tk-1123");
});

/*
  undefined currencyData fallback paths
*/
test("Fallback when currencyData is undefined", () => {
  expect(getFixedAmountOnCurrency(1.123)).toBe(1.123);
  expect(getFormattedAmountOnCurrency(1.123)).toBe("1.123");
  expect(getDisplayAmountOnCurrency(1.123)).toBe("1.123");
});

/*
  Rounding amount on currency code test
*/
test("Test amount rounding on currency code", () => {
  // USD check
  expect(getFixedAmountOnCurrencyCode(1234, "USD")).toBe(1234);
  expect(getFixedAmountOnCurrencyCode(1.123, "USD")).toBe(1.13);
  expect(
    getFixedAmountOnCurrencyCode(1.123, "USD", { roundingMethod: "round" }),
  ).toBe(1.12);
  expect(
    getFixedAmountOnCurrencyCode(1.123, "USD", {
      roundingMethod: "round",
      roundingDecimals: "compact",
    }),
  ).toBe(1.12);
  expect(getFixedAmountOnCurrencyCode(-1.123, "USD")).toBe(-1.12);
  expect(
    getFixedAmountOnCurrencyCode(-1.123, "USD", {
      roundingMethod: "round",
      roundingDecimals: "compact",
    }),
  ).toBe(-1.12);

  // BDT check
  expect(getFixedAmountOnCurrencyCode(1234, "BDT")).toBe(1234);
  expect(getFixedAmountOnCurrencyCode(1.123, "BDT")).toBe(1.13);
  expect(
    getFixedAmountOnCurrencyCode(1.123, "BDT", { roundingMethod: "round" }),
  ).toBe(1.12);
  expect(
    getFixedAmountOnCurrencyCode(1.123, "BDT", {
      roundingDecimals: "compact",
    }),
  ).toBe(2);
  expect(
    getFixedAmountOnCurrencyCode(1.123, "BDT", {
      roundingMethod: "round",
      roundingDecimals: "compact",
    }),
  ).toBe(1);
  expect(getFixedAmountOnCurrencyCode(-1.123, "BDT")).toBe(-1.12);
  expect(
    getFixedAmountOnCurrencyCode(-1.123, "BDT", {
      roundingDecimals: "compact",
    }),
  ).toBe(-1);

  // Unknown currency code — falls back to returning amount unchanged
  expect(getFixedAmountOnCurrencyCode(1.123, "INVALID")).toBe(1.123);
});

/*
  Formatting amount on currency code test
*/
test("Test amount formatting on currency code", () => {
  // USD
  expect(getFormattedAmountOnCurrencyCode(1.2, "USD")).toBe("1.20");
  expect(getFormattedAmountOnCurrencyCode(1.234, "USD")).toBe("1.24");
  expect(
    getFormattedAmountOnCurrencyCode(1.234, "USD", { roundingMethod: "round" })
  ).toBe("1.23");
  expect(
    getFormattedAmountOnCurrencyCode(1.234, "USD", { avoidRound: true })
  ).toBe("1.23");
  expect(getFormattedAmountOnCurrencyCode(1234567, "USD")).toBe("1,234,567.00");
  expect(getFormattedAmountOnCurrencyCode(-1234, "USD")).toBe("-1,234.00");

  // BDT
  expect(getFormattedAmountOnCurrencyCode(1234567, "BDT")).toBe("12,34,567");
  expect(
    getFormattedAmountOnCurrencyCode(1234567, "BDT", {
      previewDecimals: "standard",
    })
  ).toBe("12,34,567.00");
  expect(
    getFormattedAmountOnCurrencyCode(1.123, "BDT", {
      roundingDecimals: "compact",
    })
  ).toBe("2");
  expect(
    getFormattedAmountOnCurrencyCode(1.123, "BDT", {
      roundingDecimals: "compact",
      roundingMethod: "round",
    })
  ).toBe("1");
  expect(getFormattedAmountOnCurrencyCode(-1234567, "BDT")).toBe("-12,34,567");

  // Unknown currency code — falls back to amount.toString()
  expect(getFormattedAmountOnCurrencyCode(1.123, "INVALID")).toBe("1.123");
});

/*
  Display amount on currency code
*/
test("Test amount display on currency code", () => {
  // USD
  expect(getDisplayAmountOnCurrencyCode(1.123, "USD")).toBe("$ 1.13");
  expect(getDisplayAmountOnCurrencyCode(1234.12, "USD")).toBe("$ 1,234.12");
  expect(
    getDisplayAmountOnCurrencyCode(1234.12, "USD", {
      avoidFormat: true,
    }),
  ).toBe("$ 1234.12");
  expect(
    getDisplayAmountOnCurrencyCode(1234.1234, "USD", {
      avoidFormat: true,
      avoidRound: true,
    }),
  ).toBe("$ 1234.1234");
  expect(getDisplayAmountOnCurrencyCode(1234.1, "USD")).toBe("$ 1,234.10");
  expect(getDisplayAmountOnCurrencyCode(1234.1, "USD")).toBe("$ 1,234.10");
  expect(
    getDisplayAmountOnCurrencyCode(1234.1, "USD", {
      avoidFormat: true,
    }),
  ).toBe("$ 1234.1");

  // BDT
  expect(getDisplayAmountOnCurrencyCode(1.123, "BDT")).toBe("Tk 1.13");
  expect(
    getDisplayAmountOnCurrencyCode(1.123, "BDT", {
      roundingDecimals: "compact",
    }),
  ).toBe("Tk 2");
  expect(
    getDisplayAmountOnCurrencyCode(1.123, "BDT", {
      isSymbolNative: true,
    }),
  ).toBe("Tk 1.13");
  expect(
    getDisplayAmountOnCurrencyCode(1.123, "BDT", {
      isSymbolStandard: true,
    }),
  ).toBe("৳ 1.13");

  expect(
    getDisplayAmountOnCurrencyCode(1123, "BDT", {
      isSymbolStandard: true,
    }),
  ).toBe("৳ 1,123");
  expect(getDisplayAmountOnCurrencyCode(1123, "BDT", { separator: "" })).toBe(
    "Tk1,123",
  );
  expect(
    getDisplayAmountOnCurrencyCode(1123, "BDT", {
      separator: "-",
      avoidFormat: true,
    }),
  ).toBe("Tk-1123");
});
