# country-currency-utils

[![npm version](https://img.shields.io/npm/v/country-currency-utils)](https://www.npmjs.com/package/country-currency-utils)

`country-currency-utils` is a comprehensive npm package providing country and currency data for all countries. It offers an extensive set of utilities for handling monetary amounts efficiently, including formatting, rounding, and accessing currency symbols. This package ensures accurate monetary representation and simplifies working with detailed country and currency information.

## Installation

To install the package, run:

```bash
npm install country-currency-utils
```

or

```bash
yarn add country-currency-utils
```

## Countries and Currencies data

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

## Country utilities

### Type references

```typescript
type TCountryDetails = {
  name: string; // Country name
  dialCode: string; // Country dial code
  currencyCode: string; // Country currency code
  flagEmoji: string; // Country flag emoji
};

type TCountryData = TCountryDetails & {
  countryCode: string; // ISO 3166 country code
};
```

### Available functions

#### `getAllCountryDetails`

_Reference_

```typescript
getAllCountryDetails(): Promise<Record<string, TCountryDetails>>
```

Return all country details in Object format. The `key` in object is Country Code (ISO 3166).

#### `getAllCountryData`

_Reference_

```typescript
getAllCountryData(): Promise<TCountryData[]>
```

Return all country data in array format.

#### `getCountryData`

_Reference_

```typescript
getCountryData(countryCode: string): Promise<TCountryData | undefined>
```

Return country data given a country code.

_Example:_

```typescript
const countryData = await getCountryData("BD");
```

#### `getCountriesData`

_Reference_

```typescript
getCountriesData(countryCodes: string[]): Promise<(TCountryData | undefined)[]>
```

Return multiple countries data given array of country codes.

_Example:_

```typescript
const countriesData = await getCountriesData(["US", "BD"]);
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

### Available functions

#### `getAllCurrencyDetails`

_Reference_

```typescript
getAllCurrencyDetails(): Promise<Record<string, TCurrencyDetails>>
```

Return all currency details in Object format. The `key` in object is Currency Code (ISO 4217).

#### `getAllCurrencyData`

_Reference_

```typescript
getAllCurrencyData(): Promise<TCurrencyData[]>
```

Return all currency data in array format.

#### `getCurrencyData`

_Reference_

```typescript
getCurrencyData(currencyCode: string): Promise<TCurrencyData | undefined>
```

Returns Currency data given a currency code

_Example:_

```typescript
const currencyData = await getCurrencyData("BDT");
```

#### `getCurrenciesData`

_Reference_

```typescript
getCurrenciesData(currencyCodes: string[]): Promise<(TCurrencyData | undefined)[]>
```

Returns Currencies data given am array of currency codes

_Example:_

```typescript
const currenciesData = await getCurrenciesData(["USD", "BDT"]);
```

---

## Amount Formatting Utilities

There are many functions and utilities that may be required when handling monetory amounts.
Here are a list of functions:

#### `getFixedAmount`

```typescript
getFixedAmount(amount: number, decimals: number, isRoundMiddle?: boolean): number
```

The default behavior is to `ceil` the amount to the specified decimal places. This is because we want to maximize the monetory amount. However, use the `roundingMethod` param to use actual `"ceil" | "round"` method to round the amount.

_Example:_

```typescript
const fixedAmount = getFixedAmount(123.4517, 2); // 123.46
const fixedAmount = getFixedAmount(123.4517, 2, "round"); // 123.45
```

#### `getFixedAmountOnCurrency`

```typescript
type TRoundingMethod = "ceil" | "round";
type TDecimalsOption = "standard" | "compact";

type TCurrencyRoundOptions = {
  roundingMethod?: TRoundingMethod; // Default behavior is Math.ceil
  roundingDecimals?: TDecimalsOption; // Default behavior is to use standard decimals, isDecimalsCompact uses compact decimals
};

getFixedAmountOnCurrency(amount: number, currencyData?: TCurrencyData, options?: TCurrencyRoundOptions): number
```

This uses the `getFixedAmount` function internally to ceil/round on details of a currency code. Default behavior is to use the `decimals` (standard) decimal places, but this can be overridden using `decimalsCompact`. `decimalsCompact` is usually a more compact number of decimal places which may be used in previews and in UI.

_Example:_

```typescript
const USDCurrencyData = await getCurrencyData("USD");
const BDTCurrencyData = await getCurrencyData("BDT");

const roundedAmount = getFixedAmountOnCurrency(123.4567, USDCurrencyData); // 123.46
const roundedAmount = getFixedAmountOnCurrency(123.45, BDTCurrencyData); // 123.45
const roundedAmount = getFixedAmountOnCurrency(123.45, BDTCurrencyData, {
  roundingDecimals: "compact",
}); // 124
```

**Note:**
You will notice that we are having to run a promise to get CurrencyData and then round/format/display monetory amount. When handling many countries and currencies, it is better to fetch data and then use it, rather that keeping a list of countries and currencies as data or as constant in code base. This keeps codebase light. However if you are handling single currency or just a few currencies. You can keep a list of currencies data and use it directly in function in stead of fetching through an async call.

#### `getFormattedAmount`

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

#### `getFormattedAmountOnCurrency`

```typescript
export type TCurrencyFormatOptions = TCurrencyRoundOptions & {
  avoidRound?: boolean; // avoids rounding amount
  previewDecimals?: TDecimalsOption; // default behavior is decimals compact
};

getFormattedAmountOnCurrency(amount: number, currencyData?: TCurrencyData, options?: TCurrencyFormatOptions): string
```

Formats the given amount according to the currency's standard decimal places and digit grouping and returns it as a string. The function by default ceils the number and formats on the currency definitions. The options inherits from rounding options. `avoidRound` avoids rounding the amount. `previewDecimals` tells how many decimal places should at least show up.

_Example:_

```typescript
const USDCurrencyData = await getCurrencyData("USD");
const BDTCurrencyData = await getCurrencyData("BDT");

const formattedAmount = getFormattedAmountOnCurrency(123456.7, USDCurrencyData); // "123,456.70"
const formattedAmount = getFormattedAmountOnCurrency(
  123456.711,
  USDCurrencyData,
  {
    avoidRound: true,
  }
); // "123,456.711"

const formattedAmount = getFormattedAmountOnCurrency(123456.7, BDTCurrencyData); // "1,23,456.7"
const formattedAmount = getFormattedAmountOnCurrency(
  123456.7,
  BDTCurrencyData,
  {
    roundingDecimals: "compact",
  }
); // "1,23,457"
const formattedAmount = getFormattedAmountOnCurrency(1, BDTCurrencyData); // "1"
const formattedAmount = getFormattedAmountOnCurrency(1.2, BDTCurrencyData); // "1.2"
const formattedAmount = getFormattedAmountOnCurrency(1.2, BDTCurrencyData, {
  previewDecimals: "standard",
}); // "1.20"
```

#### `getDisplayAmountOnCurrency`

```typescript
type TCurrencyDisplayOptions = TCurrencyFormatOptions & {
  avoidFormat?: boolean; // Default: format amount
  isSymbolStandard?: boolean; // Default: preferredSymbol, isSymbolStandard: standard symbol
  isSymbolNative?: boolean; // Default: preferredSymbol, isSymbolNative: symbolNative
  separator?: string; // Default: space between symbol and amount, can be changed
};

getDisplayAmountOnCurrency(amount: number, currencyData?: TCurrencyData, options?: TCurrencyFormatOptions): string
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
const displayAmount = getDisplayAmountOnCurrency(123.4567, BDTCurrencyData); // "Tk 123.46"
const displayAmount = getDisplayAmountOnCurrency(123, BDTCurrencyData, {
  isSymbolStandard: true,
}); // "৳ 123"
```

#### `getDisplayAmountOnCurrencyCode`

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
const displayAmount = await getDisplayAmountOnCurrencyCode(123.4567, "BDT"); // "Tk 123.46"
const displayAmount = await getDisplayAmountOnCurrencyCode(123, "BDT", {
  isSymbolStandard: true,
}); // "৳ 123"
```

## Testing

All data and functions have been tested using Jest.

## License

This project is licensed under the MIT License

## Developed By

<a href="https://headless.ltd" target="_blank" rel="noopener noreferrer">
<img src="https://github.com/user-attachments/assets/c822b6be-b9bb-4199-b34b-ea2efb79e7f9" alt="Headless Technologies Limited" width="280" height="auto">
</a>

**[Headless Technologies Limited](https://headless.ltd)**

A software, hardware, and AI company building solutions on tech.

## Support

If you find this package useful, please consider starring the repository on GitHub to show your support!

## Contribution

Developers are welcome to create issues and pull requests.
