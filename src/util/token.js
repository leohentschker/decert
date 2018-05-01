const TOKEN_DECIMALS = 18

export const decimalizeToken = price =>
  price / (10 ** TOKEN_DECIMALS)

export const decimalizeTokenStr = (priceStr) => {
  const intValue = parseInt(priceStr, 10)
  return decimalizeToken(intValue)
}

export const undecimalizeToken = price =>
  price * (10 ** TOKEN_DECIMALS)
