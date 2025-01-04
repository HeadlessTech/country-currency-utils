<div align="center">
<img src="https://github.com/user-attachments/assets/c862ed40-f028-46ed-9170-919766b4ce5f" alt="Country Currency Utils" />
</div>

<h1>country-currency-utils</h1>

[![npm version](https://img.shields.io/npm/v/country-currency-utils)](https://www.npmjs.com/package/country-currency-utils)
[![image](https://img.shields.io/github/forks/HeadlessTech/country-currency-utils)](https://github.com/HeadlessTech/country-currency-utils/fork)
![image](https://img.shields.io/github/stars/HeadlessTech/country-currency-utils)

`country-currency-utils` is a comprehensive npm package providing country and currency data for all countries. It offers an extensive set of utilities for handling monetary amounts efficiently, including formatting, rounding, and accessing currency symbols. This package ensures accurate monetary representation and simplifies working with detailed country and currency information.

- :rocket: <a href="#installation"> Installation</a>
- :bookmark_tabs: <a href="#countries-and-currencies-data"> Countries and Currencies data</a>
- :triangular_flag_on_post: <a href="#countries-utilities"> Countries utilities</a>
  - [Type references](#type-references)
  - [API references](#api-references)
- :dollar: <a href="#currencies-utilities"> Currencies utilities</a>
  - [Type references](#type-references-1)
  - [API references](#api-references-1)
- :construction: <a href="#setup-for-the-development"> Setup for the development</a>
  - [Prerequisites](#prerequisites)
  - [Setup, Test, and Build](#setup-test-and-build)
- :pencil: <a href="#license"> License</a>
- :seedling: <a href="#support"> Support</a>
- :fire: <a href="#contribution"> Contribution</a>
- :zap: <a href="#developed-by"> Developed by</a>

<h2 id="installation">Installation</h2>

To install the package, run-

```bash
npm install country-currency-utils
```

or

```bash
yarn add country-currency-utils
```

<h2 id="countries-and-currencies-data">Countries and Currencies data</h2>

The package hosts country and currency data via CDN URLs:

`COUNTRIES_DETAILS_URL`, `CURRENCIES_DETAILS_URL`

- **Countries:** [Countries JSON](https://cdn.jsdelivr.net/gh/headlesstech/country-currency-utils@main/data/countries.json)
- **Currencies:** [Currencies JSON](https://cdn.jsdelivr.net/gh/headlesstech/country-currency-utils@main/data/currencies.json)

```bash
# Countries
https://cdn.jsdelivr.net/gh/headlesstech/country-currency-utils@main/data/countries.json

# Currencies
https://cdn.jsdelivr.net/gh/headlesstech/country-currency-utils@main/data/currencies.json
```

---

---

<h2 id="countries-utilities">Countries utilities</h2>

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

- <h4 id="getAllCountryDetails"><b>getAllCountryDetails</b></h4>

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

- <h4 id="#getAllCountryData"><b>getAllCountryData</b></h4>

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
];
```

- <h4 id="#getCountryData"><b>getCountryData</b></h4>

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

- <h4 id="#getCountriesData"><b>getCountriesData</b></h4>

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
];
```

<h2 id="currencies-utilities">Currencies utilities</h2>

| **Function Name**                                                            | **Description**                                                                                                            | **Returns**                             |
| ---------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| <a href="#getAllCurrencyDetails">getAllCurrencyDetails</a>                   | Retrieves all currency details in Object format                                                                            | Promise<Record<string, TCurrencyData>>  |
| <a href="#getAllCurrencyData">getAllCurrencyData</a>                         | Retrieves all currencies details in an array format                                                                        | Promise<TCurrencyData[]>                |
| <a href="#getCurrencyData">getCurrencyData</a>                               | Retrieves a currency's data by currency code                                                                               | Promise<TCurrencyData \| undefined>     |
| <a href="#getCurrenciesData">getCurrenciesData</a>                           | Retrieves multiple currency's data by currency codes                                                                       | Promise<(TCurrencyData \| undefined)[]> |
| <a href="#getRoundedAmount">getRoundedAmount</a>                             | Return the rounded amount                                                                                                  | number                                  |
| <a href="#getRoundedAmountOnCurrency">getRoundedAmountOnCurrency</a>         | Returns a string with comma separated amount                                                                               | number                                  |
| <a href="#getFormattedAmount">getFormattedAmount</a>                         | Formats the given amount according to the currency's standard decimal places and digit grouping and returns it as a string | string                                  |
| <a href="#getFormattedAmountOnCurrency">getFormattedAmountOnCurrency</a>     | Returns a displayable amount with currency symbol, rounded by default and uses proper digit grouping on currency.          | string                                  |
| <a href="#getDisplayAmountOnCurrency">getDisplayAmountOnCurrency</a>         | Returns a displayable amount with currency symbol, rounded by default and uses proper digit grouping on currency           | string                                  |
| <a href="#getDisplayAmountOnCurrencyCode">getDisplayAmountOnCurrencyCode</a> | Returns a displayable amount with currency symbol                                                                          | Promise\<string\>                       |

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

type TCurrencyData = {
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
  currencyCode: string; // ISO 4217 currency codes
};

type TCurrencyRoundOptions = {
  isRoundMiddle?: boolean; // Default: Math.ceil, isRoundMiddle uses Math.round
  isDecimalsStandard?: boolean; // Default: compact decimals, This: standard decimals
};

type TCurrencyFormatOptions = {
  isRoundMiddle?: boolean; // Default: Math.ceil, isRoundMiddle uses Math.round
  isDecimalsStandard?: boolean; // Default: compact decimals, This: standard decimals
  avoidRound?: boolean; // avoids rounding amount
  avoidFixedDecimals?: boolean; // default behavior is to have fixed decimals
};

type TCurrencyDisplayOptions = {
  isRoundMiddle?: boolean; // Default: Math.ceil, isRoundMiddle uses Math.round
  isDecimalsStandard?: boolean; // Default: compact decimals, This: standard decimals
  avoidRound?: boolean; // avoids rounding amount
  avoidFixedDecimals?: boolean; // default behavior is to have fixed decimals
  avoidFormat?: boolean; // Default: format amount
  isSymbolStandard?: boolean; // Default: preferredSymbol, isSymbolStandard: standard symbol
  isSymbolNative?: boolean; // Default: preferredSymbol, isSymbolNative: symbolNative
  separator?: string; // Default: space between symbol and amount, can be changed
};
```

### API references

- <h4 id="getAllCurrencyDetails">getAllCurrencyDetails</h4>

Retrieves all currency details in an object format asynchronously. The `key` in object is Currency Code Code (ISO 4217).

```typescript
getAllCurrencyDetails(): Promise<Record<string, TCurrencyDetails>>
```

> **Returns**

A `Promise` that resolves to an object where each key represents a currency code (ISO 4217), and the corresponding value contains the currency details of type `TCurrencyDetails`.

> **Example**

```typescript
const currenciesDetails = await getAllCurrencyDetails();
```

```typescript
// currenciesDetails [output]
{

  BDT: {
    name: "Bangladeshi Taka",
    demonym: "Bangladeshi",
    majorSingle: "Taka",
    majorPlural: "Taka",
    symbol: "৳",
    symbolNative: "Tk",
    symbolPreferred: "Tk",
    minorSingle: "Poisha",
    minorPlural: "Poisha",
    decimals: 2,
    decimalsCompact: 0,
    digitGrouping: 2
  },
  BGN: {
    name: "Bulgarian Lev",
    demonym: "Bulgarian",
    majorSingle: "Lev",
    majorPlural: "Leva",
    symbol: "лв.",
    symbolNative: "лв.",
    symbolPreferred: "лв.",
    minorSingle: "Stotinka",
    minorPlural: "Stotinki",
    decimals: 2,
    decimalsCompact: 2,
    digitGrouping: 3
  },
  ...,
  MZN: {
    name: "Mozambican Metical",
    demonym: "Mozambican",
    majorSingle: "Metical",
    majorPlural: "Meticais",
    symbol: "MTn",
    symbolNative: "MT",
    symbolPreferred: "MT",
    minorSingle: "Centavo",
    minorPlural: "Centavos",
    decimals: 2,
    decimalsCompact: 2,
    digitGrouping: 3
  }
}
```

- <h4 id="getAllCurrencyData">getAllCurrencyData</h4>

Asynchronously retrieves all currency data in an array format. Unlike `getAllCurrencyDetails`, this function returns an array instead of an object with currency codes as keys. Instead, Each object in the array includes the corresponding currency code.

```typescript
getAllCurrencyData(): Promise<TCurrencyData[]>
```

> **Returns**

A `Promise` that resolves to an array of type `TCurrencyDetails`.

> **Example**

```typescript
const currencyData = await getAllCurrencyData();
```

```typescript
// currencyData [output]
[
  {
    name: "Bangladeshi Taka",
    demonym: "Bangladeshi",
    majorSingle: "Taka",
    majorPlural: "Taka",
    symbol: "৳",
    symbolNative: "Tk",
    symbolPreferred: "Tk",
    minorSingle: "Poisha",
    minorPlural: "Poisha",
    decimals: 2,
    decimalsCompact: 0,
    digitGrouping: 2,
    currencyCode: "BDT",
  },
  {
    name: "Bulgarian Lev",
    demonym: "Bulgarian",
    majorSingle: "Lev",
    majorPlural: "Leva",
    symbol: "лв.",
    symbolNative: "лв.",
    symbolPreferred: "лв.",
    minorSingle: "Stotinka",
    minorPlural: "Stotinki",
    decimals: 2,
    decimalsCompact: 2,
    digitGrouping: 3,
    currencyCode: "BGN",
  },
  ...,
  {
    name: "Mozambican Metical",
    demonym: "Mozambican",
    majorSingle: "Metical",
    majorPlural: "Meticais",
    symbol: "MTn",
    symbolNative: "MT",
    symbolPreferred: "MT",
    minorSingle: "Centavo",
    minorPlural: "Centavos",
    decimals: 2,
    decimalsCompact: 2,
    digitGrouping: 3,
    currencyCode: "MZN",
  }
];
```

- <h4 id="getCurrencyData">getCurrencyData</h4>

This function retrieves a particular currency's data asynchronously. It accepts a string representing the currency code as input and returns a `promise` that resolves with the currency data as an object. If the provided currency code is invalid, the Promise resolves to undefined.

```typescript
getCurrencyData(currencyCode: string): Promise<TCurrencyData | undefined>
```

> **Arguments**

A `string` that represent a country code.

> **Returns**

A `Promise` that resolves to an object of type `TCurrencyData` or `undefined`.

> **Example**

```typescript
const currencyData = await getCurrencyData("BDT");
```

```typescript
// currencyData [output]
{
  name: "Bangladeshi Taka",
  demonym: "Bangladeshi",
  majorSingle: "Taka",
  majorPlural: "Taka",
  symbol: "৳",
  symbolNative: "Tk",
  symbolPreferred: "Tk",
  minorSingle: "Poisha",
  minorPlural: "Poisha",
  decimals: 2,
  decimalsCompact: 0,
  digitGrouping: 2,
  currencyCode: "BDT",
}
```

```typescript
// currencyData [output]
{
  name: "Bangladesh",
  dialCode: "+880",
  currencyCode: "BDT",
  flagEmoji: "🇧🇩",
  countryCode: "BD"
}
```

- <h4 id="getCurrenciesData">getCurrenciesData</h4>

Returns multiple currencies data given array of Currency codes asynchronously. It takes an array of Currency codes as input and returns a `promise` that resolves with an array of currency data objects. If a currency code is invalid, the corresponding position in the output array will hold undefined.

```typescript
getCurrenciesData(currencyCodes: string[]): Promise<(TCurrencyData | undefined)[]>
```

> **Arguments**

An array of `string` that represent a currency codes.

> **Returns**

A `Promise` that resolves to an array of type `TCurrencyData` or `undefined`.

> **Example**

```typescript
const currenciesData = await getCountriesData(["USD", "BDT"]);
```

```typescript
// currenciesData [output]
[
  {
    name: "United States Dollar",
    demonym: "US",
    majorSingle: "Dollar",
    majorPlural: "Dollars",
    symbol: "$",
    symbolNative: "$",
    symbolPreferred: "$",
    minorSingle: "Cent",
    minorPlural: "Cents",
    decimals: 2,
    decimalsCompact: 2,
    digitGrouping: 3,
    currencyCode: "USD",
  },
  {
    name: "Bangladeshi Taka",
    demonym: "Bangladeshi",
    majorSingle: "Taka",
    majorPlural: "Taka",
    symbol: "৳",
    symbolNative: "Tk",
    symbolPreferred: "Tk",
    minorSingle: "Poisha",
    minorPlural: "Poisha",
    decimals: 2,
    decimalsCompact: 0,
    digitGrouping: 2,
    currencyCode: "BDT",
  },
];
```

- <h4 id="getRoundedAmount">getRoundedAmount</h4>

Returns the rounded amount. The default behavior is to `ceil` the amount to the specified decimal places. This is because we want to maximize the monetary amount. However, use the `isRoundMiddle` param to use actual `rounding`.

```typescript
getRoundedAmount(amount: number, decimals: number, isRoundMiddle?: boolean): number
```

> **Example**

```typescript
const roundedAmount = getRoundedAmount(123.4517, 2); // 123.46
const roundedAmount = getRoundedAmount(123.4517, 2, true); // 123.45
```

- <h4 id="getRoundedAmountOnCurrency">getRoundedAmountOnCurrency</h4>

This uses the `getRoundedAmount` function internally to round on details of a currency code. Default behavior is to use the `decimalsContact` decimal places, but this can be overridden using `isDecimalsStandard`.

```typescript
getRoundedAmountOnCurrency(amount: number, currencyData?: TCurrencyData, options?: TCurrencyRoundOptions): number
```

> **Example**

```typescript
const USDCurrencyData = await getCurrencyData("USD");
const BDTCurrencyData = await getCurrencyData("BDT");

const roundedAmount = getRoundedAmountOnCurrency(123.4567, USDCurrencyData); // 123.46
const roundedAmount = getRoundedAmountOnCurrency(123.45, BDTCurrencyData); // 124
const roundedAmount = getRoundedAmountOnCurrency(123.45, BDTCurrencyData, {
  isDecimalsStandard: true,
}); // 123.45
```

**<u>Note:</u>**
You will notice that we are having to run a promise to get CurrencyData and then round/format/display monetary amount. When handling many countries and currencies, it is better to fetch data and then use it, rather that keeping a list of countries and currencies as data or as constant in code base. This keeps codebase light. However if you are handling single currency or just a few currencies. You can keep a list of currencies data and use it directly in function in stead of fetching through an async call.

- <h4 id="getFormattedAmount">getFormattedAmount</h4>

Returns a string with comma separated amount. `digitGrouping` maybe 2 or 3. `fixedDecimals` pads the decimal places with 0s or truncates (does not round) extra decimal places.

```typescript
getFormattedAmount(amount: number, digitGrouping: number, fixedDecimals?: number): string
```

> **Example**

```typescript
const formattedAmount = getFormattedAmount(123456.7, 2); // "1,23,456.7"
const formattedAmount = getFormattedAmount(123456.7, 3); // "123,456.7"
const formattedAmount = getFormattedAmount(123456.7, 2, 2); // "1,23,456.70"
const formattedAmount = getFormattedAmount(123456.789, 3, 2); // "123,456.78"
```

- <h4 id="getFormattedAmountOnCurrency">getFormattedAmountOnCurrency</h4>

Formats the given amount according to the currency's standard decimal places and digit grouping and returns it as a string. The function by default rounds the number and formats on the currency definitions. The options inherits from rounding options. `avoidRound` avoids rounding the amount. `avoidFixedDecimals` avoids using fixed decimals defined from currency.

```typescript
getFormattedAmountOnCurrency(amount: number, currencyData?: TCurrencyData,
      options?: TCurrencyFormatOptions): string
```

> **Example**

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

- <h4 id="getDisplayAmountOnCurrency">getDisplayAmountOnCurrency</h4>

Returns a displayable amount with currency symbol, rounded by default and uses proper digit grouping on currency. `avoidFormat` avoid formatting. `isSymbolStandard` and `isSymbolNative` defined the symbol to use, default is to use `preferredSymbol`. `separator` can be used define separator string between symbol and amount. The function inherits options for rounding and formatting.

```typescript
getDisplayAmountOnCurrency(amount: number, currencyData?: TCurrencyData,
      options?: TCurrencyFormatOptions): string
```

> **Example**

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

- <h4 id="getDisplayAmountOnCurrencyCode">getDisplayAmountOnCurrencyCode</h4>

Returns a displayable amount with currency symbol, using the `getDisplayAmountOnCurrency` function and looks up currency details on currency code

```typescript
getDisplayAmountOnCurrencyCode(amount: number, currencyCode: string,
      options?: TCurrencyFormatOptions): Promise<string>
```

> **Example**

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

<h2 id="setup-for-the-development">Setup for the development</h2>

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

<h2 id="license">License</h2>

This project is licensed under the MIT License.

<h2 id="support">Support</h2>

If you find this package useful, please consider starring the repository on GitHub to show your support!

<h2 id="contribution">Contribution</h2>

Developers are welcome to create issues and pull requests.

<h2 id="developed-by">Developed by</h2>

<div align="center">

**[Headless Technologies Limited](https://headless.ltd)**

A software, hardware, and AI company building solutions on tech.

<a href="https://headless.ltd" target="_blank" rel="noopener noreferrer">
<img src="https://github.com/user-attachments/assets/c822b6be-b9bb-4199-b34b-ea2efb79e7f9" alt="Headless Technologies Limited" width="280" height="auto">
</a>

</div>
