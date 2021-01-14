export const ABI = [
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'num',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [],
    name: 'retrieve',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'num',
        type: 'uint256',
      },
    ],
    name: 'store',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];

export const DEFAULT_PARAM = 3;

export const BYTECODES =
  '608060405234801561001057600080fd5b506040516101213803806101218339818101604052602081101561003357600080fd5b8101908080519060200190929190505050806000819055505060c78061005a6000396000f3fe6080604052348015600f57600080fd5b506004361060325760003560e01c80632e64cec11460375780636057361d146053575b600080fd5b603d607e565b6040518082815260200191505060405180910390f35b607c60048036036020811015606757600080fd5b81019080803590602001909291905050506087565b005b60008054905090565b806000819055505056fea26469706673582212206e4fc876565e6bf203036681d4a3b72c38052a1a66538827fb5d80f8da42bb1964736f6c63430006060033';
export const DEPLOYED_CONTRACT_ADDRESS =
  '0x76b5b7bf34529be81f810f94db66763db0ed4aaeda727721b5ac2ecaed38aef8';
