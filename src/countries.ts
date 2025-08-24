import countriesData from "../data/countries.json";

// Country data in json format
// Hosted through this repo
// check data folder for JSON file
export const COUNTRIES_DETAILS_URL =
  "https://cdn.jsdelivr.net/gh/headlesstech/country-currency-utils@main/data/countries.json";

export type TCountryDetails = {
  name: string; // Country name
  dialCode: string; // Country dial code
  currencyCode: string; // Country currency code
  flagEmoji: string; // Country flag emoji
};

// Country data with country code
export type TCountryData = TCountryDetails & {
  countryCode: string;
};

/*
  Fetch all country details (object format)
*/
export function getAllCountryDetails(): Record<string, TCountryDetails> {
  return countriesData as Record<string, TCountryDetails>;
}

/*
  Fetch all country data (array format)
*/
export function getAllCountryData(): TCountryData[] {
  const countryDetails = getAllCountryDetails();
  return Object.keys(countryDetails).map((countryCode) => ({
    countryCode,
    ...countryDetails[countryCode],
  }));
}

/*
  Fetch country data on a single country code
*/
export function getCountryData(countryCode: string): TCountryData | undefined {
  const allCountryDetails = getAllCountryDetails();
  const countryDetails = allCountryDetails[countryCode];

  if (!countryDetails) return;

  return {
    countryCode,
    ...countryDetails,
  };
}

/*
  Fetch countries on multiple country codes
*/
export function getCountriesData(
  countryCodes: string[]
): (TCountryData | undefined)[] {
  const allCountryDetails = getAllCountryDetails();

  return countryCodes.map((countryCode) => {
    const countryDetails = allCountryDetails[countryCode];
    if (!countryDetails) return;

    return {
      countryCode,
      ...countryDetails,
    };
  });
}
