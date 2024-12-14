import {
  COUNTRIES_MAP,
  TCountryCode,
  TCountryDetailsData,
  TCurrencyCode,
} from "./countries";
import { CURRENCIES_MAP, TCurrencyDetailsData } from "./currencies";

export function getCountryDetails(
  countryCode: TCountryCode
): TCountryDetailsData {
  return COUNTRIES_MAP[countryCode];
}

export function getCurrencyDetails(
  currencyCode: TCurrencyCode
): TCurrencyDetailsData {
  return CURRENCIES_MAP[currencyCode];
}

/* ======== Amount rounding ========= */

export function getRoundedAmount(
  amount: number,
  decimals: number,
  isRoundMiddle = false
) {
  const factor = Math.pow(10, decimals);
  const multipliedAmount = amount * factor;

  return isRoundMiddle
    ? Math.round(multipliedAmount) / factor
    : Math.ceil(multipliedAmount) / factor;
}

export type TCurrencyRoundOptions = {
  isRoundMiddle?: boolean;
  isDecimalsStandard?: boolean;
};

export function getRoundedAmountOnCurrency(
  amount: number,
  currencyCode: TCurrencyCode,
  options?: TCurrencyRoundOptions
): number {
  const currencyDetails = getCurrencyDetails(currencyCode);
  const { decimals, decimalsCompact } = currencyDetails;
  const { isRoundMiddle, isDecimalsStandard } = options || {};

  const decimalsFinal = isDecimalsStandard ? decimals : decimalsCompact;

  return getRoundedAmount(amount, decimalsFinal, isRoundMiddle);
}

/* ======== Amount formatting ========= */

export function getFormattedAmount(
  amount: number,
  digitGrouping: number,
  fixedDecimals?: number
) {
  let amountStr = amount.toString();
  let [integerPart, decimalPart] = amountStr.split(".");

  if (digitGrouping === 2) {
    let lastThreeDigits = integerPart.slice(-3);
    let rest = integerPart.slice(0, -3);
    if (rest !== "") {
      rest = rest.replace(/\B(?=(\d{2})+(?!\d))/g, ",");
      integerPart = rest + "," + lastThreeDigits;
    }
  } else {
    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  if (fixedDecimals && fixedDecimals > 0) {
    if (decimalPart?.length > fixedDecimals) {
      decimalPart = decimalPart.substring(0, fixedDecimals);
    } else if (!decimalPart || decimalPart.length < fixedDecimals) {
      decimalPart =
        (decimalPart || "") +
        Array(fixedDecimals - (decimalPart?.length || 0) + 1).join("0");
    }
  }

  return decimalPart ? integerPart + "." + decimalPart : integerPart;
}

export type TCurrencyFormatOptions = TCurrencyRoundOptions & {
  avoidRound?: boolean;
  avoidFixedDecimals?: boolean;
};

export function getFormattedAmountOnCurrency(
  amount: number,
  currencyCode: TCurrencyCode,
  options?: TCurrencyFormatOptions
): string {
  const currencyDetails = getCurrencyDetails(currencyCode);
  const { decimals, decimalsCompact, digitGrouping } = currencyDetails;
  const { isRoundMiddle, isDecimalsStandard, avoidRound, avoidFixedDecimals } =
    options || {};

  const decimalsFinal = isDecimalsStandard ? decimals : decimalsCompact;

  amount = avoidRound
    ? amount
    : getRoundedAmount(amount, decimalsFinal, isRoundMiddle);

  return getFormattedAmount(
    amount,
    digitGrouping,
    avoidFixedDecimals ? undefined : decimalsFinal
  );
}

/* ======== Amount display ======== */

export type TCurrencyDisplayOptions = TCurrencyFormatOptions & {
  avoidFormat?: boolean;
  isSymbolStandard?: boolean;
  isSymbolNative?: boolean;
  separator?: string;
};

export function getDisplayAmountOnCurrency(
  amount: number,
  currencyCode: TCurrencyCode,
  options?: TCurrencyDisplayOptions
): string {
  const currencyDetails = getCurrencyDetails(currencyCode);
  const {
    decimals,
    decimalsCompact,
    digitGrouping,
    symbolPreferred,
    symbolNative,
    symbol,
  } = currencyDetails;
  const {
    avoidRound,
    isRoundMiddle,
    isDecimalsStandard,
    avoidFormat,
    avoidFixedDecimals,
    isSymbolNative,
    isSymbolStandard,
    separator,
  } = options || {};

  const decimalsFinal = isDecimalsStandard ? decimals : decimalsCompact;

  amount = avoidRound
    ? amount
    : getRoundedAmount(amount, decimalsFinal, isRoundMiddle);

  const formattedAmount = avoidFormat
    ? amount
    : getFormattedAmount(
        amount,
        digitGrouping,
        avoidFixedDecimals ? undefined : decimalsFinal
      );

  return (
    (isSymbolStandard
      ? symbol
      : isSymbolNative
      ? symbolNative
      : symbolPreferred) +
    (separator !== undefined ? separator : " ") +
    formattedAmount
  );
}
