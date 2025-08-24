import currenciesData from "../data/currencies.json";

// Currencies data in json format
// Hosted through this repo
// check data folder for JSON file
export const CURRENCIES_DETAILS_URL =
  "https://cdn.jsdelivr.net/gh/headlesstech/country-currency-utils@main/data/currencies.json";

/*
  Currency details
  Includes all data related to a currency
*/
export type TCurrencyDetails = {
  name: string; // Currency name
  demonym: string; // Currency demonym
  majorSingle: string; // Major unit name in singular form (e.g. Dollar)
  majorPlural: string; // Major unit name in plural form (e.g. Dollars)
  symbol: string; // Currency symbol (e.g. $, CA$)
  symbolNative: string; // Currency symbol in native language (e.g. $)
  symbolPreferred: string; // preferred currency symbol, used for display
  minorSingle: string; // Minor unit name in singular form (e.g. Cent)
  minorPlural: string; // Minor unit name in plural form (e.g. Cents)
  decimals: number; // Number of decimal places, used for standard display
  decimalsCompact: number; // Number of decimal places, used for compact display
  digitGrouping: 2 | 3; // Digit grouping for formatting (e.g. 2 for 1,00,000, 3 for 100,000)
};

// Currency data with currency code
export type TCurrencyData = TCurrencyDetails & {
  currencyCode: string;
};

/*
  Fetch all currency details (object format)
*/
export function getAllCurrencyDetails(): Record<string, TCurrencyDetails> {
  return currenciesData as Record<string, TCurrencyDetails>;
}

/*
  Fetch all currency data (array format)
*/
export function getAllCurrencyData(): TCurrencyData[] {
  const currencyDetails = getAllCurrencyDetails();
  return Object.keys(currencyDetails).map((currencyCode) => ({
    currencyCode,
    ...currencyDetails[currencyCode],
  }));
}

/*
  Fetch currency data on a single currency code
*/
export function getCurrencyData(
  currencyCode: string
): TCurrencyData | undefined {
  const allCurrencyDetails = getAllCurrencyDetails();
  const currencyDetails = allCurrencyDetails[currencyCode];

  if (!currencyDetails) return;

  return {
    currencyCode,
    ...currencyDetails,
  };
}

/*
  Fetch currencies on multiple currency codes
*/
export function getCurrenciesData(
  currencyCodes: string[]
): (TCurrencyData | undefined)[] {
  const allCurrencyDetails = getAllCurrencyDetails();

  return currencyCodes.map((currencyCode) => {
    const currencyDetails = allCurrencyDetails[currencyCode];
    if (!currencyDetails) return;

    return {
      currencyCode,
      ...currencyDetails,
    };
  });
}
