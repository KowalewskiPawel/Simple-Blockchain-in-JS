import {
  getBlockchain,
  getTransactions,
  writeBlockchain,
  writeTransactions
} from './blockchain-helpers.js';

import sha256 from 'crypto-js/sha256.js';
// Add your code below

const ZEROS = "00";

const currentBlockchain = getBlockchain();
const currentTransactions = getTransactions();
const previousHash = currentBlockchain[currentBlockchain.length-1].hash;
let newHash = "";
let nonce = -1;

while(newHash.substring(0,2) !== ZEROS) {
  nonce++;
  newHash = sha256(nonce + previousHash + JSON.stringify(currentTransactions)).toString();
}
const newBlock = {
  hash: newHash,
  previousHash,
  nonce,
  transactions: currentTransactions
};

writeBlockchain([...currentBlockchain, newBlock]);
writeTransactions([]);