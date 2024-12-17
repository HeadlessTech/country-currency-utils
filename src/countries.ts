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
export async function getAllCountryDetails(): Promise<
  Record<string, TCountryDetails>
> {
  const response = await fetch(COUNTRIES_DETAILS_URL);
  return response.json();
}

/*
  Fetch all country data (array format)
*/
export async function getAllCountryData(): Promise<TCountryData[]> {
  const countryDetails = await getAllCountryDetails();
  return Object.keys(countryDetails).map((countryCode) => ({
    countryCode,
    ...countryDetails[countryCode],
  }));
}

/*
  Fetch country data on a single country code
*/
export async function getCountryData(
  countryCode: string
): Promise<TCountryData | undefined> {
  const allCountryDetails = await getAllCountryDetails();
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
export async function getCountriesData(
  countryCodes: string[]
): Promise<(TCountryData | undefined)[]> {
  const allCountryDetails = await getAllCountryDetails();

  return countryCodes.map((countryCode) => {
    const countryDetails = allCountryDetails[countryCode];
    if (!countryDetails) return;

    return {
      countryCode,
      ...countryDetails,
    };
  });
}
