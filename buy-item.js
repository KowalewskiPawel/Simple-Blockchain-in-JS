import {
  getAddressBalance,
  getTransactions,
  getItemPrice,
  writeTransactions
} from './blockchain-helpers.js';

import EC from 'elliptic';
const ec = new EC.ec('p192');

const buyerPrivateKey = process.argv[2];
const itemBought = process.argv[3];
// Add your code below
const currentTransactions = getTransactions();

const itemPrice = getItemPrice(itemBought);
const buyerKeypair = ec.keyFromPrivate(buyerPrivateKey);
const buyerAddress = buyerKeypair.getPublic('hex');

const signature = buyerKeypair.sign(buyerAddress + itemPrice + itemBought).toDER("hex");

const buyItemTransaction = {
  buyerAddress,
  sellerAddress: null,
  price: itemPrice,
  itemBought,
  signature
};

const isBalanceEnough = getAddressBalance(buyerAddress) >= itemPrice;

if(isBalanceEnough)
{
writeTransactions([...currentTransactions, buyItemTransaction]);
}