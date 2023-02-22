const readline = require("readline");
const BigNumber = require("bignumber.js");

const rl = readline.createInterface({
  input: process.stdin,
});

let btcusd, ethusd, dogeusd;
let ethSale, saleDp, purchaseCurr, purchaseAmt;

let counter = 0;
// Read exchange rates for BTC, ETH and DOGE
rl.on("line", (line) => {
  if (counter == 0) {
    [btcusd, ethusd, dogeusd] = line.split(" ").map(Number);
  } else {
    [ethSale, saleDp, purchaseCurr, purchaseAmt] = line.split(" ").map(String);
    computeSaleAmount(ethSale, saleDp, purchaseCurr, purchaseAmt);
  }
  counter++;
});

function computeSaleAmount(
  ethSale,
  saleDecimal,
  purchaseCurrency,
  purchaseAmount
) {
  let purchaseEth = new BigNumber();
  ethSale = new BigNumber(ethSale);
  purchaseAmount = new BigNumber(purchaseAmount);
  let dpTotal = new BigNumber();

  let dp = BigNumber(Math.pow(10, saleDecimal));
  switch (purchaseCurrency) {
    case "BTC":
      purchaseEth = btcusd / ethusd;
      total = ethSale.times(purchaseEth).times(purchaseAmount);
      dpTotal = total.toFixed(parseInt(saleDecimal), BigNumber.ROUND_FLOOR);
      console.log(dpTotal);
      break;
    case "ETH":
      purchaseEth = purchaseAmount;
      total = ethSale.times(purchaseEth);
      dpTotal = total.toFixed(parseInt(saleDecimal), BigNumber.ROUND_FLOOR);
      console.log(dpTotal);

      break;
    case "DOGE":
      purchaseEth = dogeusd / ethusd;
      total = ethSale.times(purchaseEth).times(purchaseAmount);
      dpTotal = total.toFixed(parseInt(saleDecimal), BigNumber.ROUND_FLOOR);
      console.log(dpTotal);
      break;
    default:
      throw new Error("Invalid purchase currency");
  }
}
