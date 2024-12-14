# country-currency-utils

`country-currency-utils` is an npm package that provides utilities for handling country and currency data and functions to format amounts with currency codes.

## Installation

To install the package, run:

```bash
npm install country-currency-utils
```

or

```bash
yarn add country-currency-utils
```

## Countries

Import Data as needed:

```typescript
import {
  COUNTRIES_DETAILS, COUNTRIES_DATA ...
} from "country-currency-utils";
```

**Type references:**

```typescript
type TCountryDetails = {
  name: string; // Country name
  dialCode: TDialCode; // Country dial code
  currencyCode: TCurrencyCode; // Country currency code
  flagEmoji: string; // Country flag emoji
};

type TCountryData = TCountryDetails & {
  countryCode: TCountryCode;
};
```

**Available data:**

`COUNTRIES_DETAILS (Record<TCountryCode, TCountryDetails>)`: A key, value object that use Country codes to defined country related details

`COUNTRIES_DATA (TCountryData[])`: An array for object with country related data.

`countryNames (string[])`: Array of country names
`countryFlags (string[])`: Array of country flags emojis
`dialCodes (TDialCode[])`: Array of dial codes
`currencyCodes (TCurrencyCode)`: Array of currency codes

**Available functions:**

`getCountryDetails(countryCode: TCountryCode): TCountryDetails`: Return country details on country code

**Example:**

```typescript
const countryDetails = getCountryDetails("BD");
```

---

## Currencies

Currency related data and functionalities.

**Type references**

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
  currencyCode: TCurrencyCode;
};
```

**Available data:**

`CURRENCIES_DETAILS (Record<TCurrencyCode, TCurrencyDetails>)`: A key, value object that use Currency codes to defined currency related details

`CURRENCIES_DATA (TCurrencyData[])`: An array for object with currency related data.

**Available functions:**

`getCurrencyDetails(currencyCode: TCurrencyCode): TCurrencyDetails`: Return currency details on currency code

**Example:**

```typescript
const countryDetails = getCountryDetails("BD");
```

---

## Currency Utils

There are many functions and utilities that may be required when handling monetory amounts.
Here are a list of functions:

**getRoundedAmount**

```typescript
getRoundedAmount(amount: number, decimals: number, isRoundMiddle?: boolean): number
```

The default behavior is to `ceil` the amount to the specified decimal places. This is because we want to maximize the monetory amount. However, use the `isRoundMiddle` param to use actual `rounding`

**Example:**

```typescript
const roundedAmount = getRoundedAmount(123.4517, 2); // 123.46
const roundedAmount = getRoundedAmount(123.4517, 2, true); // 123.45
```

`getRoundedAmountOnCurrency(amount: number, currencyCode: TCurrencyCode, options?: TCurrencyRoundOptions): number`

```typescript
type TCurrencyRoundOptions = {
  isRoundMiddle?: boolean; // Default: Math.ceil, isRoundMiddle uses Math.round
  isDecimalsStandard?: boolean; // Default: compact decimals, This: standard decimals
};
```

This uses the `getRoundedAmount` function internally to round on details of a currency code. Default behavior is to use the `decimalsContact` decimal places, but this can be overridden using `isDecimalsStandard`

**Example:**

```typescript
const roundedAmount = getRoundedAmountOnCurrency(123.4567, "USD"); // 123.46
const roundedAmount = getRoundedAmountOnCurrency(123.45, "BDT"); // 124
const roundedAmount = getRoundedAmountOnCurrency(123.45, "BDT", {
  isDecimalsStandard: true,
}); // 123.45
```

`getFormattedAmount(amount: number, digitGrouping: number, fixedDecimals?: number): string`

Returns a string with comma separated amount. `digitGrouping` maybe 2 or 3. `fixedDecimals` pads the decimal places with 0s or truncates (does not round) extra decimal places.

**Example:**

```typescript
const formattedAmount = getFormattedAmount(123456.7, 2); // "1,23,456.7"
const formattedAmount = getFormattedAmount(123456.7, 3); // "123,456.7"
const formattedAmount = getFormattedAmount(123456.7, 2, 2); // "1,23,456.70"
const formattedAmount = getFormattedAmount(123456.789, 3, 2); // "123,456.78"
```

`getFormattedAmountOnCurrency(amount: number, currencyCode: TCurrencyCode, options?: TCurrencyFormatOptions): string`

```typescript
type TCurrencyFormatOptions = TCurrencyRoundOptions & {
  avoidRound?: boolean; // avoids rounding amount
  avoidFixedDecimals?: boolean; // default behavior is to have fixed decimals
};
```

Formats the given amount according to the currency's standard decimal places and digit grouping and returns it as a string. The function by default rounds the number and formats on the currency definitions. The options inherits from rounding options. `avoidRound` avoids rounding the amount. `avoidFixedDecimals` avoids using fixed decimals defined from currency.

**Example:**

```typescript
const formattedAmount = getFormattedAmountOnCurrency(123456.7, "USD"); // "123,456.70"
const formattedAmount = getFormattedAmountOnCurrency(123456.7, "USD", {
  avoidFixedDecimals: true,
}); // "123,456.7"
const formattedAmount = getFormattedAmountOnCurrency(123456.7, "BDT"); // "1,23,457"
const formattedAmount = getFormattedAmountOnCurrency(123456.7, "BDT", {
  avoidRound: true,
}); // "1,23,456.7"
```

`getDisplayAmountOnCurrency(amount: number, currencyCode: TCurrencyCode, options?: TCurrencyFormatOptions): string`

```typescript
type TCurrencyDisplayOptions = TCurrencyFormatOptions & {
  avoidFormat?: boolean; // Default: format amount
  isSymbolStandard?: boolean; // Default: preferredSymbol, isSymbolStandard: standard symbol
  isSymbolNative?: boolean; // Default: preferredSymbol, isSymbolNative: symbolNative
  separator?: string; // Default: space between symbol and amount, can be changed
};
```

Returns a displayable amount with currency symbol, rounded by default and uses proper digit grouping on currency. `avoidFormat` avoid formatting. `isSymbolStandard` and `isSymbolNative` defined the symbol to use, default is to use `preferredSymbol`. `separator` can be used define separator string between symbol and amount. The function inherits options for rounding and formatting

**Example:**

```typescript
const displayAmount = getDisplayAmountOnCurrency(123.4567, "USD"); // "$ 123.46"
const displayAmount = getDisplayAmountOnCurrency(123456.7, "USD"); // "$ 123,456.70"
const displayAmount = getDisplayAmountOnCurrency(123456.7, "USD", {
  avoidFormat: true,
}); // "$ 123456.7"
const displayAmount = getDisplayAmountOnCurrency(123456.7, "USD", {
  separator: "",
}); // "$123,456.70"
const displayAmount = getDisplayAmountOnCurrency(123.4567, "BDT"); // "Tk 124"
const displayAmount = getDisplayAmountOnCurrency(123.4567, "BDT", {
  isSymbolStandard: true,
}); // "৳ 124"
```

## Testing

All data and functions have been tested using Jest.

## License

This project is licensed under the MIT License

## Developed By

Headless Technologies Limited (https://headless.ltd)  
A software, hardware, and AI company building solutions on tech.

## Support

If you find this package useful, please consider starring the repository on GitHub to show your support!

## Contribution

Developers are welcome to create issues and pull requests.
