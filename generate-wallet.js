import {
  getTransactions,
  writeTransactions,
  getWallets,
  writeWallets
} from './blockchain-helpers.js';

import EC from 'elliptic';
const ec = new EC.ec('p192');

const newWalletName = process.argv[2];
// Add your code below
const currentWallets = getWallets();
const currentTransactions = getTransactions();

const newPair = ec.genKeyPair();
const newPublicKey = newPair.getPublic("hex");
const newPrivateKey = newPair.getPrivate("hex");
const newWallet = {
  [newWalletName]: {
    "publicKey": newPublicKey,
    "privateKey": newPrivateKey
  }
};

const newTransaction = {
  buyerAddress: null,
  sellerAddress: newPublicKey,
  price: 40
};

writeWallets({ ...currentWallets, ...newWallet });
writeTransactions([...currentTransactions, newTransaction]);