import { getCurrencyData, TCurrencyData } from "./currencies";

export type TRoundingMethod = "ceil" | "round";
export type TDecimalsOption = "standard" | "compact";
export type TDecimalsPreview = "fit" | "fix";

/* ======== Amount rounding ========= */

export function getFixedAmount(
  amount: number,
  decimals: number,
  roundingMethod: TRoundingMethod = "ceil" // Rounds with rounding instead of ceil
) {
  const factor = Math.pow(10, decimals);
  const multipliedAmount = amount * factor;

  return roundingMethod === "round"
    ? Math.round(multipliedAmount) / factor
    : Math.ceil(multipliedAmount) / factor;
}

export type TCurrencyRoundOptions = {
  roundingMethod?: TRoundingMethod; // Default behavior is Math.ceil
  roundingDecimals?: TDecimalsOption; // Default behavior is to use standard decimals, isDecimalsCompact uses compact decimals
};

export function getFixedAmountOnCurrency(
  amount: number,
  currencyData?: TCurrencyData,
  options?: TCurrencyRoundOptions
): number {
  if (!currencyData) return amount;

  const { decimals, decimalsCompact } = currencyData;
  const { roundingMethod, roundingDecimals } = options || {};

  const decimalsFinal =
    roundingDecimals === "compact" ? decimalsCompact : decimals;

  return getFixedAmount(amount, decimalsFinal, roundingMethod);
}

/* ======== Amount formatting ========= */

export function getFormattedAmount(
  amount: number,
  digitGrouping: 2 | 3, // Digit grouping - 2 or 3, for formatting
  fixedDecimals?: number // Adds 0s decimal padding or truncate extra decimal points
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
  avoidRound?: boolean; // avoids rounding amount
  previewDecimals?: TDecimalsOption; // default behavior is decimals compact
};

export function getFormattedAmountOnCurrency(
  amount: number,
  currencyData?: TCurrencyData,
  options?: TCurrencyFormatOptions
): string {
  if (!currencyData) return amount.toString();

  const { decimals, decimalsCompact, digitGrouping } = currencyData;
  const { roundingMethod, roundingDecimals, avoidRound, previewDecimals } =
    options || {};

  const roundToDecimals =
    roundingDecimals === "compact" ? decimalsCompact : decimals;

  amount = avoidRound
    ? amount
    : getFixedAmount(amount, roundToDecimals, roundingMethod);

  return getFormattedAmount(
    amount,
    digitGrouping,
    previewDecimals === "standard" ? decimals : decimalsCompact
  );
}

/* ======== Amount display ======== */

export type TCurrencyDisplayOptions = TCurrencyFormatOptions & {
  avoidFormat?: boolean; // Default behavior is to format amount
  isSymbolStandard?: boolean; // Default behavior is to use preferred symbol, isSymbolStandard uses standard symbol
  isSymbolNative?: boolean; // Default behavior is to use preferred symbol, isSymbolNative uses native symbol
  separator?: string; // Default separator is space between symbol and amount, can be changed to any string
};

export function getDisplayAmountOnCurrency(
  amount: number,
  currencyData?: TCurrencyData,
  options?: TCurrencyDisplayOptions
): string {
  if (!currencyData) return amount.toString();

  const {
    decimals,
    decimalsCompact,
    digitGrouping,
    symbolPreferred,
    symbolNative,
    symbol,
  } = currencyData;
  const {
    avoidRound,
    roundingMethod,
    roundingDecimals,
    avoidFormat,
    previewDecimals,
    isSymbolNative,
    isSymbolStandard,
    separator,
  } = options || {};

  const decimalsFinal =
    roundingDecimals === "compact" ? decimalsCompact : decimals;

  amount = avoidRound
    ? amount
    : getFixedAmount(amount, decimalsFinal, roundingMethod);

  const formattedAmount = avoidFormat
    ? amount
    : getFormattedAmount(
        amount,
        digitGrouping,
        previewDecimals === "standard" ? decimals : decimalsCompact
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

export async function getDisplayAmountOnCurrencyCode(
  amount: number,
  currencyCode: string,
  options?: TCurrencyDisplayOptions
): Promise<string> {
  const currencyData = await getCurrencyData(currencyCode);
  return getDisplayAmountOnCurrency(amount, currencyData, options);
}
