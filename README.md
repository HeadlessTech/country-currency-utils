# country-currency-utils

`country-currency-utils` is an npm package that provides utilities for handling country and currency data.

## Countries

The package includes a list of countries, each represented with the following data structure:

```typescript
interface Country {
  name: string;
  code: string;
  currency: string;
}
```

You can find the list of countries in the `countries` file.

## Currencies

The package also includes a list of currencies, each represented with the following data structure:

```typescript
interface Currency {
  code: string;
  symbol: string;
  name: string;
}
```

You can find the list of currencies in the `currencies` file.

## Utils

The `utils` file contains several functions for working with amounts and currencies:

### `getRoundedAmount(amount: number, decimals: number): number`

Rounds the given amount to the specified number of decimal places.

**Example:**

```javascript
const roundedAmount = getRoundedAmount(123.4567, 2); // 123.46
```

### `getRoundedAmountOnCurrency(amount: number, currencyCode: string): number`

Rounds the given amount according to the currency's standard decimal places.

**Example:**

```javascript
const roundedAmount = getRoundedAmountOnCurrency(123.4567, "USD"); // 123.46
```

### `getFormattedAmount(amount: number, decimals: number): string`

Formats the given amount to the specified number of decimal places and returns it as a string.

**Example:**

```javascript
const formattedAmount = getFormattedAmount(123.4567, 2); // "123.46"
```

### `getFormattedAmountOnCurrency(amount: number, currencyCode: string): string`

Formats the given amount according to the currency's standard decimal places and returns it as a string.

**Example:**

```javascript
const formattedAmount = getFormattedAmountOnCurrency(123.4567, "USD"); // "123.46"
```

### `getDisplayAmountOnCurrency(amount: number, currencyCode: string): string`

Formats the given amount according to the currency's standard decimal places and adds the currency symbol.

**Example:**

```javascript
const displayAmount = getDisplayAmountOnCurrency(123.4567, "USD"); // "$123.46"
```

## Installation

To install the package, run:

```bash
npm install country-currency-utils
```

## Usage

Import the functions and use them as needed:

```javascript
import {
  getRoundedAmount,
  getRoundedAmountOnCurrency,
  getFormattedAmount,
  getFormattedAmountOnCurrency,
  getDisplayAmountOnCurrency,
} from "country-currency-utils";

// Example usage
const amount = 123.4567;
const currencyCode = "USD";

console.log(getRoundedAmount(amount, 2));
console.log(getRoundedAmountOnCurrency(amount, currencyCode));
console.log(getFormattedAmount(amount, 2));
console.log(getFormattedAmountOnCurrency(amount, currencyCode));
console.log(getDisplayAmountOnCurrency(amount, currencyCode));
```

## Example

Here's an example of how you can use the `country-currency-utils` package in a TypeScript project:

```typescript
import {
  getRoundedAmount,
  getRoundedAmountOnCurrency,
  getFormattedAmount,
  getFormattedAmountOnCurrency,
  getDisplayAmountOnCurrency,
} from "country-currency-utils";

const amount: number = 123.4567;
const currencyCode: string = "USD";

const roundedAmount: number = getRoundedAmount(amount, 2);
console.log(roundedAmount); // 123.46

const roundedAmountOnCurrency: number = getRoundedAmountOnCurrency(
  amount,
  currencyCode
);
console.log(roundedAmountOnCurrency); // 123.46

const formattedAmount: string = getFormattedAmount(amount, 2);
console.log(formattedAmount); // "123.46"

const formattedAmountOnCurrency: string = getFormattedAmountOnCurrency(
  amount,
  currencyCode
);
console.log(formattedAmountOnCurrency); // "123.46"

const displayAmountOnCurrency: string = getDisplayAmountOnCurrency(
  amount,
  currencyCode
);
console.log(displayAmountOnCurrency); // "$123.46"
```
