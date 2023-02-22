const readline = require("readline");
const BigNumber = require("bignumber.js");

const rl = readline.createInterface({
  input: process.stdin,
});

let btcusd, ethusd, dogeusd;
let ethSale, saleDp, purchaseCurr, purchaseAmt;

// Read exchange rates for BTC, ETH and DOGE
rl.on("line", (line) => {
  if (line == "CURRENT") {
    var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    const apiEndpoint =
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum%2Cdogecoin&vs_currencies=usd";
    const currencyType = "usd";

    const xhr = new XMLHttpRequest();
    xhr.open("GET", apiEndpoint, false);
    xhr.send();

    if (xhr.status === 200) {
      const data = JSON.parse(xhr.responseText);

      btcusd = data["bitcoin"][currencyType];
      ethusd = data["ethereum"][currencyType];
      dogeusd = data["dogecoin"][currencyType];

      console.log(`Bitcoin price: ${btcusd} ${currencyType.toUpperCase()}`);
      console.log(`Ethereum price: ${ethusd} ${currencyType.toUpperCase()}`);
      console.log(`Dogecoin price: ${dogeusd} ${currencyType.toUpperCase()}`);
    } else {
      console.error("Error retrieving cryptocurrency prices:", xhr.status);
    }
  } else {
    [ethSale, saleDp, purchaseCurr, purchaseAmt] = line.split(" ").map(String);
    computeSaleAmount(ethSale, saleDp, purchaseCurr, purchaseAmt);
  }
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
