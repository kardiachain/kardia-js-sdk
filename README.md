# Welcome to Kardia Javascript SDK

---

Javascript library to interact with Kardia Chain.

## Development

### Source

- Source at `src` folder

### Test

- This project is using [jest framework](https://jestjs.io/)
- Run test: `npm run test` if you have a local node running or `npm run test-public` to test with public dev node

### Build

- Run `npm run build` to build
- CJS, ESModules, and UMD module formats are supported. 

### Release guideline

1.  Make sure pass all test case
2.  `npm run build` to create es5 version to support node and older browser. For more detail check [here](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#npm-run-build-fails-to-minify)
3.  Pump version by npm version https://docs.npmjs.com/cli/version
4.  Create pull request and wait for review and chain ready.

### Version guideline

- Syntax: https://docs.npmjs.com/cli/version
- Rule:
  - `Prerelease`: Development version
  - `Patch`: Improvement, bug fixing, P2, P3 features
  - `Minor`: alpha testnet version (version 1), beta testnet version (version 2)
  - `Major`: Launch main net or big refactor.

## Install

### npm

```bash
  npm install kardia-dx
```

### yarn

```bash
  yarn add kardia-dx
```

## Usage

### es2015/nodejs

```js
var KardiaClient = require('kardia-dx');
var kardiaClient = new KardiaClient('http://<host>:port');

// transaction module
var transaction = kardiaClient.transaction;

// account module
var account = kardiaClient.account;

// Kardia chain module
var account = kardiaClient.account;

// Kardia SMC module
var contract = kardiaClient.contract;

```

### es6

```js
import KardiaClient from 'kardia-dx';
const kardiaClient = new KardiaClient({ endpoint: 'http://<host>:port' });

// transaction module
const transaction = kardiaClient.transaction;

// account module
const account = kardiaClient.account;

// Kardia chain module
const account = kardiaClient.account;

// Kardia SMC module
const contract = kardiaClient.contract;

```

## Example

### Get account balance

```js
import KardiaClient from 'kardia-dx';
const kardiaClient = new KardiaClient({ endpoint: 'http://<host>:port' });

const latestBalance = await kardiaClient.account.getBalance(ADDRESS);

const balanceAtHeight = await kardiaClient.account.getBalance(ADDRESS, {blockHeight: 1});

const balanceAtHash = await kardiaClient.account.getBalance(ADDRESS, {blockHash: BLOCK_HASH});

```

### Create a transaction

```js
import KardiaClient from 'kardia-dx';
const kardiaClient = new KardiaClient({ endpoint: 'http://<host>:port' });

const nonce = await kardiaClient.account.getNonce(ADDRESS);

const txData = {
  receiver: RECEIVING_ADDRESS,
  gas: 29000, // Default gas limit is 29000
  nonce,
  gasPrice: 1, // Default gas price 1
  amount: '1000000000000000000' // Value in HYDRO (1 KAI = 1*10^18 HYDRO = 1*10^9 OXY)
};

const txHash = await kardiaClient.transaction.sendTransaction(
  txData,
  PRIVATE_KEY,
);
```
