<h1>country-currency-utils</h1>

[![image](https://img.shields.io/badge/npm-2.0.0-blue)](https://www.npmjs.com/package/country-currency-utils)
[![image](https://img.shields.io/github/forks/HeadlessTech/country-currency-utils)](https://github.com/HeadlessTech/country-currency-utils/fork)
![image](https://img.shields.io/github/stars/HeadlessTech/country-currency-utils)

The `country-currency-utils` package provides functions to format amount with currency codes as well as utilities for managing country and currency data. Tasks involving currency and nation information are made easier by this package.

- [Installation](#installation)
- [Countries and Currencies data](#countries-and-currencies-data)
- [Country utilities](#country-utilities)
  - [Type references](#type-references)
  - [API references](#api-references)
- [Currencies utilities](#currencies-utilities)
  - [Type references](#type-references-1)
  - [API references](#api-references-1)
- [Setup for the development](#setup-for-the-development)
  - [Prerequisites](#prerequisites)
  - [Setup, Test, and Build](#setup-test-and-build)
- [License](#license)
- [Developed By](#developed-by)
- [Support](#support)
- [Contribution](#contribution)

## Installation

To install the package, run:

```bash
npm install country-currency-utils
```

or

```bash
yarn add country-currency-utils
```

---

## Countries and Currencies data

The country and currency data are hosted via the package Github repo through CDN.

URLS from package: **`COUNTRIES_DETAILS_URL`**, **`CURRENCIES_DETAILS_URL`**

The URLs are

```bash
# countries
https://cdn.jsdelivr.net/gh/headlesstech/country-currency-utils@main/data/countries.json

#currencies
https://cdn.jsdelivr.net/gh/headlesstech/country-currency-utils@main/data/currencies.json
```

---

## Country utilities

| **Function Name**                                        | **Description**                                    | **Arguments**           | **Returns**                              |
| -------------------------------------------------------- | -------------------------------------------------- | ----------------------- | ---------------------------------------- |
| <a href="#getAllCountryDetails">getAllCountryDetails</a> | Retrieves all country details in an object format  | <p align="center">-</p> | Promise<Record<string, TCountryDetails>> |
| <a href="#getAllCountryData">getAllCountryData</a>       | Retrieves all country details in an array format   | <p align="center">-</p> | Promise<TCountryData[]>                  |
| <a href="#getCountryData">getCountryData</a>             | Retrieves a country's data by country code         | String                  | Promise<TCountryData \| undefined>       |
| <a href="#getCountriesData">getCountriesData</a>         | Retrieves multiple country's data by country codes | String[]                | Promise<(TCountryData \| undefined)[]>   |

### Type references

```typescript
type TCountryDetails = {
  name: string; // Country name
  dialCode: string; // Country dial code
  currencyCode: string; // Country currency code
  flagEmoji: string; // Country flag emoji
};

type TCountryData = {
  name: string; // Country name
  dialCode: string; // Country dial code
  currencyCode: string; // Country currency code
  flagEmoji: string; // Country flag emoji
  countryCode: string; // ISO 3166 country code
};
```

### API references

- <h4 id="getAllCountryDetails">getAllCountryDetails</h4>

Retrieves all country details in an object format asynchronously. The `key` in object is Country Code (ISO 3166).

```typescript
getAllCountryDetails(): Promise<Record<string, TCountryDetails>>
```

> **Returns**

A `Promise` that resolves to an object where each key represents a country code (ISO 3166), and the corresponding value contains the country details of type `TCountryDetails`.

> **Example**

```typescript
const countriesDetails = await getAllCountryDetails();
```

```typescript
// countriesDetails [output]
{
  BD: {
    name: "Bangladesh",
    dialCode: "+880",
    currencyCode: "BDT",
    flagEmoji: "🇧🇩"
  },
  BE: {
    name: "Belgium",
    dialCode: "+32",
    currencyCode: "EUR",
    flagEmoji: "🇧🇪"
  },
  ...,
  MZ: {
    name: "Mozambique",
    dialCode: "+258",
    currencyCode: "MZN",
    flagEmoji: "🇲🇿"
  }
}
```

- <h4 id="#getAllCountryData">getAllCountryData</h4>

Asynchronously retrieves all country data in an array format. Unlike `getAllCountryDetails`, this function returns an array instead of an object with country codes as keys. Instead, Each object in the array includes the corresponding country code.

```typescript
getAllCountryData(): Promise<TCountryData[]>
```

> **Returns**

A `Promise` that resolves to an array of type `TCountryData`.

> **Example**

```typescript
const countriesData = await getAllCountryData();
```

```typescript
// countriesData [output]
[
  {
    name: "Bangladesh",
    dialCode: "+880",
    currencyCode: "BDT",
    flagEmoji: "🇧🇩",
    countryCode: "BD"
  },
  {
    name: "Belgium",
    dialCode: "+32",
    currencyCode: "EUR",
    flagEmoji: "🇧🇪",
    countryCode: "BE"
  },
  ...,
  {
    name: "Mozambique",
    dialCode: "+258",
    currencyCode: "MZN",
    flagEmoji: "🇲🇿",
    countryCode: "MZ"
  }
]
```

- <h4 id="#getCountryData">getCountryData</h4>

This function retrieves a particular country's data asynchronously. It accepts a string representing the country code as input and returns a `promise` that resolves with the country data as an object. If the provided country code is invalid, the Promise resolves to undefined.

```typescript
getCountryData(countryCode: string): Promise<TCountryData | undefined>
```

> **Arguments**

A `string` that represent a country code.

> **Returns**

A `Promise` that resolves to an object of type `TCountryData` or `undefined`.

> **Example**

```typescript
const countryData = await getCountryData("BD");
```

```typescript
// countryData [output]
{
  name: "Bangladesh",
  dialCode: "+880",
  currencyCode: "BDT",
  flagEmoji: "🇧🇩",
  countryCode: "BD"
}
```

- <h4 id="#getCountriesData">getCountriesData</h4>

Returns multiple countries data given array of country codes asynchronously. It takes an array of country codes as input and returns a `promise` that resolves with an array of country data objects. If a country code is invalid, the corresponding position in the output array will hold undefined.

```typescript
getCountriesData(countryCodes: string[]): Promise<(TCountryData | undefined)[]>
```

> **Arguments**

An array of `string` that represent a country codes.

> **Returns**

A `Promise` that resolves to an array of type `TCountryData` or `undefined`.

> **Example**

```typescript
const countriesData = await getCountriesData(["US", "BD"]);
```

```typescript
// countriesData [output]
[
  {
    name: "United States",
    dialCode: "+1",
    currencyCode: "USD",
    flagEmoji: "🇺🇸",
    countryCode: "US"
  }
  {
    name: "Bangladesh",
    dialCode: "+880",
    currencyCode: "BDT",
    flagEmoji: "🇧🇩",
    countryCode: "BD"
  },
]

```

---

## Currencies utilities

### Type references

```typescript
type TCurrencyDetails = {
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

type TCurrencyData = TCurrencyDetails & {
  currencyCode: string; // ISO 4217 currency codes
};
```

### API references

**getAllCurrencyDetails**

Reference

```typescript
getAllCurrencyDetails(): Promise<Record<string, TCurrencyDetails>>
```

Return all currency details in Object format. The `key` in object is Currency Code (ISO 4217).

**getAllCurrencyData**

Reference

```typescript
getAllCurrencyData(): Promise<TCurrencyData[]>
```

Return all currency data in array format.

**getCurrencyData**

Reference

```typescript
getCurrencyData(currencyCode: string): Promise<TCurrencyData | undefined>
```

Returns Currency data given a currency code

**Example:**

```typescript
const currencyData = getCurrencyData("BDT");
```

**getCurrenciesData**

Reference

```typescript
getCurrenciesData(currencyCodes: string[]): Promise<(TCurrencyData | undefined)[]>
```

Returns Currencies data given am array of currency codes

**Example:**

```typescript
const currenciesData = getCurrenciesData(["USD", "BDT"]);
```

---

There are many functions and utilities that may be required when handling monetory amounts.
Here are a list of functions:

**getRoundedAmount**

```typescript
getRoundedAmount(amount: number, decimals: number, isRoundMiddle?: boolean): number
```

The default behavior is to `ceil` the amount to the specified decimal places. This is because we want to maximize the monetory amount. However, use the `isRoundMiddle` param to use actual `rounding`

_Example:_

```typescript
const roundedAmount = getRoundedAmount(123.4517, 2); // 123.46
const roundedAmount = getRoundedAmount(123.4517, 2, true); // 123.45
```

**getRoundedAmountOnCurrency**

```typescript
getRoundedAmountOnCurrency(amount: number, currencyData?: TCurrencyData, options?: TCurrencyRoundOptions): number
```

```typescript
type TCurrencyRoundOptions = {
  isRoundMiddle?: boolean; // Default: Math.ceil, isRoundMiddle uses Math.round
  isDecimalsStandard?: boolean; // Default: compact decimals, This: standard decimals
};
```

This uses the `getRoundedAmount` function internally to round on details of a currency code. Default behavior is to use the `decimalsContact` decimal places, but this can be overridden using `isDecimalsStandard`

_Example:_

```typescript
const USDCurrencyData = await getCurrencyData("USD");
const BDTCurrencyData = await getCurrencyData("BDT");

const roundedAmount = getRoundedAmountOnCurrency(123.4567, USDCurrencyData); // 123.46
const roundedAmount = getRoundedAmountOnCurrency(123.45, BDTCurrencyData); // 124
const roundedAmount = getRoundedAmountOnCurrency(123.45, BDTCurrencyData, {
  isDecimalsStandard: true,
}); // 123.45
```

**Note**
You will notice that we are having to run a promise to get CurrencyData and then round/format/display monetary amount. When handling many countries and currencies, it is better to fetch data and then use it, rather that keeping a list of countries and currencies as data or as constant in code base. This keeps codebase light. However if you are handling single currency or just a few currencies. You can keep a list of currencies data and use it directly in function in stead of fetching through an async call.

**getFormattedAmount**

```typescript
getFormattedAmount(amount: number, digitGrouping: number, fixedDecimals?: number): string
```

Returns a string with comma separated amount. `digitGrouping` maybe 2 or 3. `fixedDecimals` pads the decimal places with 0s or truncates (does not round) extra decimal places.

_Example:_

```typescript
const formattedAmount = getFormattedAmount(123456.7, 2); // "1,23,456.7"
const formattedAmount = getFormattedAmount(123456.7, 3); // "123,456.7"
const formattedAmount = getFormattedAmount(123456.7, 2, 2); // "1,23,456.70"
const formattedAmount = getFormattedAmount(123456.789, 3, 2); // "123,456.78"
```

**getFormattedAmountOnCurrency**

```typescript
getFormattedAmountOnCurrency(amount: number, currencyData?: TCurrencyData, options?: TCurrencyFormatOptions): string
```

```typescript
type TCurrencyFormatOptions = TCurrencyRoundOptions & {
  avoidRound?: boolean; // avoids rounding amount
  avoidFixedDecimals?: boolean; // default behavior is to have fixed decimals
};
```

Formats the given amount according to the currency's standard decimal places and digit grouping and returns it as a string. The function by default rounds the number and formats on the currency definitions. The options inherits from rounding options. `avoidRound` avoids rounding the amount. `avoidFixedDecimals` avoids using fixed decimals defined from currency.

_Example:_

```typescript
const USDCurrencyData = await getCurrencyData("USD");
const BDTCurrencyData = await getCurrencyData("BDT");

const formattedAmount = getFormattedAmountOnCurrency(123456.7, USDCurrencyData); // "123,456.70"
const formattedAmount = getFormattedAmountOnCurrency(
  123456.7,
  USDCurrencyData,
  {
    avoidFixedDecimals: true,
  }
); // "123,456.7"
const formattedAmount = getFormattedAmountOnCurrency(123456.7, BDTCurrencyData); // "1,23,457"
const formattedAmount = getFormattedAmountOnCurrency(
  123456.7,
  BDTCurrencyData,
  {
    avoidRound: true,
  }
); // "1,23,456.7"
```

**getDisplayAmountOnCurrency**

```typescript
getDisplayAmountOnCurrency(amount: number, currencyData?: TCurrencyData, options?: TCurrencyFormatOptions): string
```

```typescript
type TCurrencyDisplayOptions = TCurrencyFormatOptions & {
  avoidFormat?: boolean; // Default: format amount
  isSymbolStandard?: boolean; // Default: preferredSymbol, isSymbolStandard: standard symbol
  isSymbolNative?: boolean; // Default: preferredSymbol, isSymbolNative: symbolNative
  separator?: string; // Default: space between symbol and amount, can be changed
};
```

Returns a displayable amount with currency symbol, rounded by default and uses proper digit grouping on currency. `avoidFormat` avoid formatting. `isSymbolStandard` and `isSymbolNative` defined the symbol to use, default is to use `preferredSymbol`. `separator` can be used define separator string between symbol and amount. The function inherits options for rounding and formatting

_Example:_

```typescript
const USDCurrencyData = await getCurrencyData("USD");
const BDTCurrencyData = await getCurrencyData("BDT");

const displayAmount = getDisplayAmountOnCurrency(123.4567, USDCurrencyData); // "$ 123.46"
const displayAmount = getDisplayAmountOnCurrency(123456.7, USDCurrencyData); // "$ 123,456.70"
const displayAmount = getDisplayAmountOnCurrency(123456.7, USDCurrencyData, {
  avoidFormat: true,
}); // "$ 123456.7"
const displayAmount = getDisplayAmountOnCurrency(123456.7, USDCurrencyData, {
  separator: "",
}); // "$123,456.70"
const displayAmount = getDisplayAmountOnCurrency(123.4567, BDTCurrencyData); // "Tk 124"
const displayAmount = getDisplayAmountOnCurrency(123.4567, BDTCurrencyData, {
  isSymbolStandard: true,
}); // "৳ 124"
```

**getDisplayAmountOnCurrencyCode**

```typescript
getDisplayAmountOnCurrencyCode(amount: number, currencyCode: string, options?: TCurrencyFormatOptions): Promise<string>
```

Returns a displayable amount with currency symbol, using the `getDisplayAmountOnCurrency` function and looks up currency details on currency code

_Example:_

```typescript
const displayAmount = await getDisplayAmountOnCurrencyCode(123.4567, "USD"); // "$ 123.46"
const displayAmount = await getDisplayAmountOnCurrencyCode(123456.7, "USD"); // "$ 123,456.70"
const displayAmount = await getDisplayAmountOnCurrencyCode(123456.7, "USD", {
  avoidFormat: true,
}); // "$ 123456.7"
const displayAmount = await getDisplayAmountOnCurrencyCode(123456.7, "USD", {
  separator: "",
}); // "$123,456.70"
const displayAmount = await getDisplayAmountOnCurrencyCode(123.4567, "BDT"); // "Tk 124"
const displayAmount = await getDisplayAmountOnCurrencyCode(123.4567, "BDT", {
  isSymbolStandard: true,
}); // "৳ 124"
```

## Setup for the development

Follow these instructions to set up a local copy of the project for development and testing.

### Prerequisites

This project requires NodeJS and Yarn, both of which are simple to install. To confirm that they are available on your machine, run the following command.

```bash
node -v && yarn -v
```

### Setup, Test, and Build

First clone the repository from the GitHub and run the following commands-

```bash
yarn # for installing the dependencies
```

All data and functions in this package have been thoroughly tested with Jest. To run tests during development, use the following command-

```bash
yarn test
```

To build the project, run the following command-

```bash
yarn build
```

## License

This project is licensed under the MIT License

## Developed By

Headless Technologies (<https://headless.ltd>)  
A software, hardware, and AI company building solutions on tech.

## Support

If you find this package useful, please consider starring the repository on GitHub to show your support!

## Contribution

Developers are welcome to create issues and pull requests.
