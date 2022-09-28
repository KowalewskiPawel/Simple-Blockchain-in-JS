import { writeBlockchain, writeTransactions } from './blockchain-helpers.js';
// Add your code below
const genesisBlock = { hash: 0, previousHash: null };

writeBlockchain([genesisBlock]);

writeTransactions([]);