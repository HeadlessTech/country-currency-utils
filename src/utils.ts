import {
  COUNTRIES_MAP,
  TCountryCode,
  TCountryData,
  TCurrencyCode,
} from "./countries";
import { CURRENCIES_MAP, TCurrencyData } from "./currencies";

export function getCountryDetails(countryCode: TCountryCode): TCountryData {
  return COUNTRIES_MAP[countryCode];
}

export function getCurrencyDetails(currencyCode: TCurrencyCode): TCurrencyData {
  return CURRENCIES_MAP[currencyCode];
}

function getRoundedAmountBasic(
  amount: number,
  decimals: number,
  isRoundUp = false
) {
  const factor = Math.pow(10, decimals);

  return isRoundUp
    ? Math.ceil(amount * factor) / factor
    : Math.round(amount * factor) / factor;
}

export function getRoundedAmount(
  amount: number,
  currencyCode: TCurrencyCode,
  isRoundUp = false
): number {
  const currencyDetails = getCurrencyDetails(currencyCode);
  const { decimals } = currencyDetails;

  return getRoundedAmountBasic(amount, decimals, isRoundUp);
}

function getFormattedAmountBasic(
  amount: number,
  decimals: number,
  digitGrouping: number,
  isRoundUp = false
) {
  const roundedAmount = getRoundedAmountBasic(amount, decimals, isRoundUp);

  let amountStr = roundedAmount.toString();
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

  return decimalPart ? integerPart + "." + decimalPart : integerPart;
}

export function getFormattedAmount(
  amount: number,
  currencyCode: TCurrencyCode,
  isRoundUp = false
): string {
  const currencyDetails = getCurrencyDetails(currencyCode);
  const { decimals, digitGrouping } = currencyDetails;

  return getFormattedAmountBasic(amount, decimals, digitGrouping, isRoundUp);
}

export function getDisplayAmount(
  amount: number,
  currencyCode: TCurrencyCode,
  isRoundUp = false
): string {
  const currencyDetails = getCurrencyDetails(currencyCode);
  const { decimals, digitGrouping, symbolPreferred } = currencyDetails;

  const formattedAmount = getFormattedAmountBasic(
    amount,
    decimals,
    digitGrouping,
    isRoundUp
  );

  return symbolPreferred + " " + formattedAmount;
}

export type TSymbolType = "standard" | "native";

export function getDisplayAmountWithSymbol(
  amount: number,
  currencyCode: TCurrencyCode,
  isRoundUp = false,
  symbolType: TSymbolType
): string {
  const currencyDetails = getCurrencyDetails(currencyCode);
  const { decimals, digitGrouping, symbol, symbolNative } = currencyDetails;

  const formattedAmount = getFormattedAmountBasic(
    amount,
    decimals,
    digitGrouping,
    isRoundUp
  );

  return (
    (symbolType === "standard" ? symbol : symbolNative) + " " + formattedAmount
  );
}
