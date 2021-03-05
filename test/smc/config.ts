export const DEFAULT_PARAM = 3;

export const SMC1 = {
  ABI: [
    {
      constant: true,
      inputs: [
        {
          name: '',
          type: 'uint256',
        },
      ],
      name: 'proposals',
      outputs: [
        {
          name: 'name',
          type: 'string',
        },
        {
          name: 'proposer',
          type: 'address',
        },
        {
          name: 'startTime',
          type: 'uint256',
        },
        {
          name: 'endTime',
          type: 'uint256',
        },
        {
          name: 'totalVote',
          type: 'uint256',
        },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: true,
      inputs: [
        {
          name: '_proposalID',
          type: 'uint256',
        },
      ],
      name: 'getProposalDetail',
      outputs: [
        {
          name: '',
          type: 'string',
        },
        {
          name: '',
          type: 'uint256',
        },
        {
          name: '',
          type: 'uint256',
        },
        {
          name: '',
          type: 'address[]',
        },
        {
          name: '',
          type: 'address[]',
        },
        {
          name: '',
          type: 'uint256',
        },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: true,
      inputs: [],
      name: 'proposalsCount',
      outputs: [
        {
          name: '',
          type: 'uint256',
        },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: false,
      inputs: [
        {
          name: '_name',
          type: 'string',
        },
        {
          name: '_startTime',
          type: 'uint256',
        },
        {
          name: '_endTimne',
          type: 'uint256',
        },
      ],
      name: 'addProposal',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      constant: false,
      inputs: [
        {
          name: '_amount',
          type: 'uint256',
        },
      ],
      name: 'emergencyWithdrawalKAI',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      constant: false,
      inputs: [
        {
          name: '_proposalID',
          type: 'uint256',
        },
        {
          name: '_options',
          type: 'uint8',
        },
      ],
      name: 'vote',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      constant: true,
      inputs: [
        {
          name: '_proposalID',
          type: 'uint256',
        },
      ],
      name: 'numberOfVoteForProposal',
      outputs: [
        {
          name: '',
          type: 'uint256',
        },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'constructor',
    },
    {
      payable: true,
      stateMutability: 'payable',
      type: 'fallback',
    },
  ],
  BYTECODES:
    '608060405234801561001057600080fd5b5060018054600160a060020a03191633179055610d93806100326000396000f3fe6080604052600436106100825763ffffffff7c0100000000000000000000000000000000000000000000000000000000600035041663013cf08b811461008457806307a9f02d146101545780630a9f46ad14610291578063316738ec146102b85780638f970ea214610370578063943e82161461039a578063affa6f19146103cd575b005b34801561009057600080fd5b506100ae600480360360208110156100a757600080fd5b50356103f7565b604051808060200186600160a060020a0316600160a060020a03168152602001858152602001848152602001838152602001828103825287818151815260200191508051906020019080838360005b838110156101155781810151838201526020016100fd565b50505050905090810190601f1680156101425780820380516001836020036101000a031916815260200191505b50965050505050505060405180910390f35b34801561016057600080fd5b5061017e6004803603602081101561017757600080fd5b50356104cb565b6040518080602001878152602001868152602001806020018060200185815260200184810384528a818151815260200191508051906020019080838360005b838110156101d55781810151838201526020016101bd565b50505050905090810190601f1680156102025780820380516001836020036101000a031916815260200191505b508481038352875181528751602091820191808a01910280838360005b8381101561023757818101518382015260200161021f565b50505050905001848103825286818151815260200191508051906020019060200280838360005b8381101561027657818101518382015260200161025e565b50505050905001995050505050505050505060405180910390f35b34801561029d57600080fd5b506102a66106f4565b60408051918252519081900360200190f35b3480156102c457600080fd5b50610082600480360360608110156102db57600080fd5b8101906020810181356401000000008111156102f657600080fd5b82018360208201111561030857600080fd5b8035906020019184600183028401116401000000008311171561032a57600080fd5b91908080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525092955050823593505050602001356106fb565b34801561037c57600080fd5b506100826004803603602081101561039357600080fd5b5035610813565b3480156103a657600080fd5b50610082600480360360408110156103bd57600080fd5b508035906020013560ff1661085b565b3480156103d957600080fd5b506102a6600480360360208110156103f057600080fd5b5035610ad7565b600080548290811061040557fe5b60009182526020918290206007919091020180546040805160026001841615610100026000190190931692909204601f81018590048502830185019091528082529193509183919083018282801561049e5780601f106104735761010080835404028352916020019161049e565b820191906000526020600020905b81548152906001019060200180831161048157829003601f168201915b505050506001830154600284015460038501546006909501549394600160a060020a039092169390925085565b6060600080606080600080878154811015156104e357fe5b906000526020600020906007020160000160008881548110151561050357fe5b90600052602060002090600702016002015460008981548110151561052457fe5b90600052602060002090600702016003015460008a81548110151561054557fe5b906000526020600020906007020160040160008b81548110151561056557fe5b906000526020600020906007020160050160008c81548110151561058557fe5b600091825260209182902060066007909202010154865460408051601f6002600019610100600187161502019094169390930492830185900485028101850190915281815291928891908301828280156106205780601f106105f557610100808354040283529160200191610620565b820191906000526020600020905b81548152906001019060200180831161060357829003601f168201915b505050505095508280548060200260200160405190810160405280929190818152602001828054801561067c57602002820191906000526020600020905b8154600160a060020a0316815260019091019060200180831161065e575b50505050509250818054806020026020016040519081016040528092919081815260200182805480156106d857602002820191906000526020600020905b8154600160a060020a031681526001909101906020018083116106ba575b5050505050915095509550955095509550955091939550919395565b6000545b90565b6040805160e0810182528481523360208083019190915291810184905260608181018490526080820181905260a08201819052600060c0830181905280546001810180835591805283518051939592949360079092027f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e563019261078392849290910190610c30565b5060208281015160018301805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a039092169190911790556040830151600283015560608301516003830155608083015180516107e39260048501920190610cae565b5060a082015180516107ff916005840191602090910190610cae565b5060c0820151816006015550505050505050565b600154600160a060020a0316331461082a57600080fd5b604051339082156108fc029083906000818181858888f19350505050158015610857573d6000803e3d6000fd5b5050565b4260008381548110151561086b57fe5b906000526020600020906007020160030154111515156108ec57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601060248201527f54686520766f74696e6720656e64656400000000000000000000000000000000604482015290519081900360640190fd5b6108f68233610b00565b15156001141561096757604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600960248201527f566f746564207965730000000000000000000000000000000000000000000000604482015290519081900360640190fd5b6109718233610b9e565b1515600114156109e257604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600860248201527f566f746564206e6f000000000000000000000000000000000000000000000000604482015290519081900360640190fd5b8060018111156109ee57fe5b1515610a44576000805483908110610a0257fe5b600091825260208083206004600790930201919091018054600181018255908352912001805473ffffffffffffffffffffffffffffffffffffffff1916331790555b806001811115610a5057fe5b60011415610aa8576000805483908110610a6657fe5b600091825260208083206005600790930201919091018054600181018255908352912001805473ffffffffffffffffffffffffffffffffffffffff1916331790555b6001600083815481101515610ab957fe5b60009182526020909120600660079092020101805490910190555050565b60008082815481101515610ae757fe5b9060005260206000209060070201600601549050919050565b6000805b6000805485908110610b1257fe5b906000526020600020906007020160040180549050811015610b925782600160a060020a0316600085815481101515610b4757fe5b906000526020600020906007020160040182815481101515610b6557fe5b600091825260209091200154600160a060020a03161415610b8a576001915050610b98565b600101610b04565b50600090505b92915050565b6000805b6000805485908110610bb057fe5b906000526020600020906007020160050180549050811015610b925782600160a060020a0316600085815481101515610be557fe5b906000526020600020906007020160050182815481101515610c0357fe5b600091825260209091200154600160a060020a03161415610c28576001915050610b98565b600101610ba2565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10610c7157805160ff1916838001178555610c9e565b82800160010185558215610c9e579182015b82811115610c9e578251825591602001919060010190610c83565b50610caa929150610d1c565b5090565b828054828255906000526020600020908101928215610d10579160200282015b82811115610d10578251825473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a03909116178255602090920191600190910190610cce565b50610caa929150610d36565b6106f891905b80821115610caa5760008155600101610d22565b6106f891905b80821115610caa57805473ffffffffffffffffffffffffffffffffffffffff19168155600101610d3c56fea165627a7a723058209512a24825a4514598ee810ec27032e5e3ecb5896c93f81ed7ca8507fcf50b3b0029',
  DEFAULT_PARAM: [],
  FUNCTION_TO_TEST: {
    name: 'proposalsCount',
    param: [],
  },
  EXPECTED_RESULT: 0,
};

export const SMC2 = {
  ABI: [
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
  ],
  BYTECODES:
    '608060405234801561001057600080fd5b506040516100f23803806100f28339818101604052602081101561003357600080fd5b505160005560ac806100466000396000f3fe6080604052348015600f57600080fd5b506004361060325760003560e01c80632e64cec11460375780636057361d14604f575b600080fd5b603d606b565b60408051918252519081900360200190f35b606960048036036020811015606357600080fd5b50356071565b005b60005490565b60005556fea2646970667358221220cb80c2bf7f77c197e344c1f9f972ee361442a9deffd8a86133a210958114c6d964736f6c634300060c0033',
  DEFAULT_PARAM: [3],
  FUNCTION_TO_TEST: {
    name: 'retrieve',
    param: [],
  },
  EXPECTED_RESULT: 3,
};

export const SMC3 = {
  ABI: [
    {
      constant: false,
      inputs: [
        {
          internalType: 'uint256',
          name: '_downtimeJailDuration',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: '_slashFractionDowntime',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: '_unbondingTime',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: '_slashFractionDoubleSign',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: '_signedBlockWindow',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: '_minSignedPerWindow',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: '_minStake',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: '_minValidatorStake',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: '_minAmountChangeName',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: '_minSelfDelegation',
          type: 'uint256',
        },
      ],
      name: 'setValidatorParams',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      constant: false,
      inputs: [],
      name: 'startValidator',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      constant: true,
      inputs: [],
      name: 'minter',
      outputs: [
        {
          internalType: 'contract Minter',
          name: '',
          type: 'address',
        },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: false,
      inputs: [],
      name: 'mint',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      constant: false,
      inputs: [
        {
          internalType: 'address',
          name: 'previousProposer',
          type: 'address',
        },
      ],
      name: 'setPreviousProposer',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      constant: true,
      inputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      name: 'ownerOf',
      outputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: true,
      inputs: [],
      name: 'totalSupply',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: false,
      inputs: [
        {
          internalType: 'uint256',
          name: '_maxValidators',
          type: 'uint256',
        },
      ],
      name: 'setMaxProposers',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      constant: true,
      inputs: [
        {
          internalType: 'address',
          name: 'delAddr',
          type: 'address',
        },
      ],
      name: 'getValidatorsByDelegator',
      outputs: [
        {
          internalType: 'address[]',
          name: '',
          type: 'address[]',
        },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: false,
      inputs: [
        {
          internalType: 'address',
          name: 'signerAddr',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'votingPower',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'distributionHeight',
          type: 'uint256',
        },
      ],
      name: 'doubleSign',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      constant: true,
      inputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      name: 'valOf',
      outputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: true,
      inputs: [],
      name: 'totalBonded',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: false,
      inputs: [],
      name: 'sumVotingPowerProposer',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      constant: false,
      inputs: [
        {
          internalType: 'address',
          name: '_params',
          type: 'address',
        },
      ],
      name: 'setParams',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      constant: false,
      inputs: [],
      name: 'setProposalFail',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      constant: true,
      inputs: [],
      name: 'getValidatorSets',
      outputs: [
        {
          internalType: 'address[]',
          name: '',
          type: 'address[]',
        },
        {
          internalType: 'uint256[]',
          name: '',
          type: 'uint256[]',
        },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: true,
      inputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      name: 'allVals',
      outputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: false,
      inputs: [
        {
          internalType: 'bytes32',
          name: 'name',
          type: 'bytes32',
        },
        {
          internalType: 'uint256',
          name: 'rate',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'maxRate',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'maxChangeRate',
          type: 'uint256',
        },
      ],
      name: 'createValidator',
      outputs: [
        {
          internalType: 'address',
          name: 'val',
          type: 'address',
        },
      ],
      payable: true,
      stateMutability: 'payable',
      type: 'function',
    },
    {
      constant: false,
      inputs: [
        {
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
      ],
      name: 'undelegate',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      constant: true,
      inputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      name: 'vote',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: true,
      inputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      name: 'balanceOf',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: false,
      inputs: [
        {
          internalType: 'address',
          name: 'delAddr',
          type: 'address',
        },
      ],
      name: 'addDelegation',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      constant: false,
      inputs: [],
      name: 'renounceOwnership',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      constant: true,
      inputs: [],
      name: 'proposal',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: false,
      inputs: [
        {
          internalType: 'uint256',
          name: '_maxValidators',
          type: 'uint256',
        },
      ],
      name: 'proposalMaxProposers',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      constant: true,
      inputs: [],
      name: 'allValsLength',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: true,
      inputs: [],
      name: 'owner',
      outputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: true,
      inputs: [],
      name: 'totalSlashedToken',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: false,
      inputs: [
        {
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
      ],
      name: 'delegate',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      constant: true,
      inputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      name: 'valSets',
      outputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: false,
      inputs: [
        {
          internalType: 'address',
          name: 'signerAddr',
          type: 'address',
        },
      ],
      name: 'updateSigner',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      constant: false,
      inputs: [
        {
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'reason',
          type: 'uint256',
        },
      ],
      name: 'burn',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      constant: true,
      inputs: [],
      name: 'totalVoted',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: false,
      inputs: [],
      name: 'addVote',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      constant: false,
      inputs: [
        {
          internalType: 'address[]',
          name: '_signers',
          type: 'address[]',
        },
        {
          internalType: 'uint256[]',
          name: '_votingPower',
          type: 'uint256[]',
        },
        {
          internalType: 'bool[]',
          name: '_signed',
          type: 'bool[]',
        },
      ],
      name: 'finalize',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      constant: false,
      inputs: [],
      name: 'removeFromSets',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      constant: true,
      inputs: [],
      name: 'params',
      outputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: false,
      inputs: [],
      name: 'deposit',
      outputs: [],
      payable: true,
      stateMutability: 'payable',
      type: 'function',
    },
    {
      constant: false,
      inputs: [
        {
          internalType: 'address payable',
          name: 'to',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
      ],
      name: 'withdrawRewards',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      constant: false,
      inputs: [
        {
          internalType: 'uint256',
          name: '_inflationRateChange',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: '_goalBonded',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: '_blocksPerYear',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: '_inflationMax',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: '_inflationMin',
          type: 'uint256',
        },
      ],
      name: 'setMintParams',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      constant: false,
      inputs: [
        {
          internalType: 'address',
          name: 'delAddr',
          type: 'address',
        },
      ],
      name: 'removeDelegation',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      constant: false,
      inputs: [
        {
          internalType: 'address',
          name: 'newOwner',
          type: 'address',
        },
      ],
      name: 'transferOwnership',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'constructor',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'previousOwner',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'newOwner',
          type: 'address',
        },
      ],
      name: 'OwnershipTransferred',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'bytes32',
          name: '_name',
          type: 'bytes32',
        },
        {
          indexed: false,
          internalType: 'address payable',
          name: '_valAddr',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: '_commissionRate',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: '_commissionMaxRate',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: '_commissionMaxChangeRate',
          type: 'uint256',
        },
      ],
      name: 'CreatedValidator',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'address',
          name: 'from',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'reason',
          type: 'uint256',
        },
      ],
      name: 'Burn',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
      ],
      name: 'Mint',
      type: 'event',
    },
  ],
  BYTECODES:
    '60806040526402540be4006001556b1027e72f1f128130880000006008553480156200002a57600080fd5b506040516200003990620000db565b604051809103906000f08015801562000056573d6000803e3d6000fd5b50601080546001600160a01b0319166001600160a01b0392831617908190556040519116906200008690620000e9565b6001600160a01b03909116815260405190819003602001906000f080158015620000b4573d6000803e3d6000fd5b50600f80546001600160a01b0319166001600160a01b0392909216919091179055620000f7565b610bff806200760b83390190565b611158806200820a83390190565b61750480620001076000396000f3fe6080604052600436106200028a5760003560e01c806370a996a91162000157578063b390c0ab11620000c7578063cff0ab961162000085578063cff0ab961462000a83578063d0e30db01462000a9b578063d6ef7af01462000aa5578063e2d5f71c1462000ae2578063f0466c731462000b28578063f2fde38b1462000b5f576200028a565b8063b390c0ab14620008d9578063b3a2273f146200090d578063b5e3909e1462000925578063b648887d146200093d578063bd3bb1c71462000a6b576200028a565b80638da5cb5b11620001155780638da5cb5b146200081657806394fbdee5146200082e5780639fa6dd3514620008465780639feeb6741462000874578063a7ecd37e14620008a2576200028a565b806370a996a91462000769578063715018a614620007a0578063753ec10314620007b857806377aa0a3614620007d05780638c3ce26014620007fe576200028a565b8063439b5e4111620001ff5780635e5a3cb611620001bd5780635e5a3cb614620005a45780636272a2b414620006595780636759d88f14620006875780636c68c0e114620006b95780636dd7d8ea14620006e757806370a082311462000732576200028a565b8063439b5e4114620004ee57806344d96e9514620005255780634a5367bb146200053d5780634e49acac14620005555780635de22ea0146200058c576200028a565b806314afd79e116200024d57806314afd79e14620003a557806318160ddd14620003dc5780633195a4e714620003f457806332bb15ba14620004225780633a68ee0314620004ab576200028a565b806306afbf94146200028f578063072df4cb14620002f85780630754617214620003105780631249c58b1462000344578063135973fb146200036e575b600080fd5b3480156200029c57600080fd5b50620002f66004803603610140811015620002b657600080fd5b5080359060208101359060408101359060608101359060808101359060a08101359060c08101359060e08101359061010081013590610120013562000b96565b005b3480156200030557600080fd5b50620002f662000caf565b3480156200031d57600080fd5b506200032862000f78565b604080516001600160a01b039092168252519081900360200190f35b3480156200035157600080fd5b506200035c62000f87565b60408051918252519081900360200190f35b3480156200037b57600080fd5b50620002f6600480360360208110156200039457600080fd5b50356001600160a01b0316620010b4565b348015620003b257600080fd5b506200032860048036036020811015620003cb57600080fd5b50356001600160a01b03166200113a565b348015620003e957600080fd5b506200035c62001155565b3480156200040157600080fd5b50620002f6600480360360208110156200041a57600080fd5b50356200115b565b3480156200042f57600080fd5b5062000459600480360360208110156200044857600080fd5b50356001600160a01b0316620012a2565b60408051602080825283518183015283519192839290830191858101910280838360005b83811015620004975781810151838201526020016200047d565b505050509050019250505060405180910390f35b348015620004b857600080fd5b50620002f660048036036060811015620004d157600080fd5b506001600160a01b03813516906020810135906040013562001369565b348015620004fb57600080fd5b5062000328600480360360208110156200051457600080fd5b50356001600160a01b03166200144a565b3480156200053257600080fd5b506200035c62001465565b3480156200054a57600080fd5b506200035c6200146b565b3480156200056257600080fd5b50620002f6600480360360208110156200057b57600080fd5b50356001600160a01b03166200155b565b3480156200059957600080fd5b50620002f6620015e1565b348015620005b157600080fd5b50620005bc6200164f565b604051808060200180602001838103835285818151815260200191508051906020019060200280838360005b8381101562000602578181015183820152602001620005e8565b50505050905001838103825284818151815260200191508051906020019060200280838360005b838110156200064357818101518382015260200162000629565b5050505090500194505050505060405180910390f35b3480156200066657600080fd5b5062000328600480360360208110156200067f57600080fd5b50356200177c565b62000328600480360360808110156200069f57600080fd5b5080359060208101359060408101359060600135620017a4565b348015620006c657600080fd5b50620002f660048036036020811015620006df57600080fd5b503562001c2e565b348015620006f457600080fd5b506200071e600480360360208110156200070d57600080fd5b50356001600160a01b031662001c90565b604080519115158252519081900360200190f35b3480156200073f57600080fd5b506200035c600480360360208110156200075857600080fd5b50356001600160a01b031662001ca5565b3480156200077657600080fd5b50620002f6600480360360208110156200078f57600080fd5b50356001600160a01b031662001cb7565b348015620007ad57600080fd5b50620002f662001d3b565b348015620007c557600080fd5b506200035c62001de9565b348015620007dd57600080fd5b50620002f660048036036020811015620007f657600080fd5b503562001def565b3480156200080b57600080fd5b506200035c62001e58565b3480156200082357600080fd5b506200032862001e5e565b3480156200083b57600080fd5b506200035c62001e6d565b3480156200085357600080fd5b50620002f6600480360360208110156200086c57600080fd5b503562001e73565b3480156200088157600080fd5b5062000328600480360360208110156200089a57600080fd5b503562001ed5565b348015620008af57600080fd5b50620002f660048036036020811015620008c857600080fd5b50356001600160a01b031662001ee3565b348015620008e657600080fd5b50620002f660048036036040811015620008ff57600080fd5b508035906020013562001fef565b3480156200091a57600080fd5b506200035c6200205a565b3480156200093257600080fd5b50620002f662002060565b3480156200094a57600080fd5b50620002f6600480360360608110156200096357600080fd5b8101906020810181356401000000008111156200097f57600080fd5b8201836020820111156200099257600080fd5b80359060200191846020830284011164010000000083111715620009b557600080fd5b919390929091602081019035640100000000811115620009d457600080fd5b820183602082011115620009e757600080fd5b8035906020019184602083028401116401000000008311171562000a0a57600080fd5b91939092909160208101903564010000000081111562000a2957600080fd5b82018360208201111562000a3c57600080fd5b8035906020019184602083028401116401000000008311171562000a5f57600080fd5b50909250905062002128565b34801562000a7857600080fd5b50620002f6620022ed565b34801562000a9057600080fd5b506200032862002425565b620002f662000f76565b34801562000ab257600080fd5b50620002f66004803603604081101562000acb57600080fd5b506001600160a01b03813516906020013562002434565b34801562000aef57600080fd5b50620002f6600480360360a081101562000b0857600080fd5b5080359060208101359060408101359060608101359060800135620024c6565b34801562000b3557600080fd5b50620002f66004803603602081101562000b4e57600080fd5b50356001600160a01b0316620025a9565b34801562000b6c57600080fd5b50620002f66004803603602081101562000b8557600080fd5b50356001600160a01b031662002629565b6000546001600160a01b0316158062000bb957506000546001600160a01b031633145b62000bfa576040805162461bcd60e51b81526020600482018190526024820152600080516020620073fd833981519152604482015290519081900360640190fd5b60105460408051632174ed2760e01b8152600481018d9052602481018c9052604481018b9052606481018a90526084810189905260a4810188905260c4810187905260e481018690526101048101859052610124810184905290516001600160a01b0390921691632174ed27916101448082019260009290919082900301818387803b15801562000c8a57600080fd5b505af115801562000c9f573d6000803e3d6000fd5b5050505050505050505050505050565b336000908152600560205260409020546001600160a01b031662000d055760405162461bcd60e51b8152600401808060200182810382526024815260200180620074ac6024913960400191505060405180910390fd5b601060009054906101000a90046001600160a01b03166001600160a01b031663b0c9569a6040518163ffffffff1660e01b815260040160206040518083038186803b15801562000d5457600080fd5b505afa15801562000d69573d6000803e3d6000fd5b505050506040513d602081101562000d8057600080fd5b5051600d54101562000dd457600d80546001810182556000919091527fd7b6990105719101dabeb77144f2a3385c8033acd3af97e9423a695e81ad1eb50180546001600160a01b0319163317905562000f76565b60008060066000600d60008154811062000dea57fe5b60009182526020808320909101546001600160a01b0316835282019290925260400181205491505b600d5481101562000edb57336001600160a01b0316600d828154811062000e3557fe5b6000918252602090912001546001600160a01b0316141562000e5657600080fd5b8160066000600d848154811062000e6957fe5b60009182526020808320909101546001600160a01b03168352820192909252604001902054101562000ed25780925060066000600d838154811062000eaa57fe5b60009182526020808320909101546001600160a01b0316835282019290925260400190205491505b60010162000e12565b5033600090815260066020526040902054811062000f2b5760405162461bcd60e51b81526004018080602001828103825260238152602001806200741d6023913960400191505060405180910390fd5b62000f36826200272f565b33600d838154811062000f4557fe5b9060005260206000200160006101000a8154816001600160a01b0302191690836001600160a01b0316021790555050505b565b600f546001600160a01b031681565b600080546001600160a01b0316158062000fab57506000546001600160a01b031633145b62000fec576040805162461bcd60e51b81526020600482018190526024820152600080516020620073fd833981519152604482015290519081900360640190fd5b600f5460408051631249c58b60e01b815290516000926001600160a01b031691631249c58b91600480830192602092919082900301818787803b1580156200103357600080fd5b505af115801562001048573d6000803e3d6000fd5b505050506040513d60208110156200105f57600080fd5b505160085490915062001079908263ffffffff620027a216565b6008556040805182815290517f07883703ed0e86588a40d76551c92f8a4b329e3bf19765e0e6749473c1a846659181900360200190a1905090565b6000546001600160a01b03161580620010d757506000546001600160a01b031633145b62001118576040805162461bcd60e51b81526020600482018190526024820152600080516020620073fd833981519152604482015290519081900360640190fd5b600280546001600160a01b0319166001600160a01b0392909216919091179055565b6004602052600090815260409020546001600160a01b031681565b60085481565b6000546001600160a01b031615806200117e57506000546001600160a01b031633145b620011bf576040805162461bcd60e51b81526020600482018190526024820152600080516020620073fd833981519152604482015290519081900360640190fd5b6003620011cb6200146b565b60020281620011d657fe5b04600b5410156200122e576040805162461bcd60e51b815260206004820152601960248201527f496e73756666696369656e7420766f74696e6720706f77657200000000000000604482015290519081900360640190fd5b6010546040805163081eb12960e41b81526004810184905290516001600160a01b03909216916381eb12909160248082019260009290919082900301818387803b1580156200127c57600080fd5b505af115801562001291573d6000803e3d6000fd5b505050506200129f62002806565b50565b6001600160a01b0381166000908152600e6020526040812060609190620012c99062002887565b9050606081604051908082528060200260200182016040528015620012f8578160200160208202803883390190505b50905060005b828110156200135f576001600160a01b0385166000908152600e6020526040902062001331908263ffffffff6200289416565b8282815181106200133e57fe5b6001600160a01b0390921660209283029190910190910152600101620012fe565b509150505b919050565b6000546001600160a01b031615806200138c57506000546001600160a01b031633145b620013cd576040805162461bcd60e51b81526020600482018190526024820152600080516020620073fd833981519152604482015290519081900360640190fd5b6001600160a01b03808416600090815260046020819052604080832054815162c3a67160e71b81529283018790526024830186905290519316926361d338809260448084019391929182900301818387803b1580156200142c57600080fd5b505af115801562001441573d6000803e3d6000fd5b50505050505050565b6005602052600090815260409020546001600160a01b031681565b60095481565b600080805b600d5481101562001555576007600060056000600d85815481106200149157fe5b60009182526020808320909101546001600160a01b039081168452838201949094526040928301822054909316845291830193909352910190205460ff161515600114156200152f576200152560015460066000600d8581548110620014f357fe5b60009182526020808320909101546001600160a01b031683528201929092526040019020549063ffffffff620028a216565b600b805490910190555b6200154860015460066000600d8581548110620014f357fe5b9091019060010162001470565b50905090565b6000546001600160a01b031615806200157e57506000546001600160a01b031633145b620015bf576040805162461bcd60e51b81526020600482018190526024820152600080516020620073fd833981519152604482015290519081900360640190fd5b601080546001600160a01b0319166001600160a01b0392909216919091179055565b6000546001600160a01b031615806200160457506000546001600160a01b031633145b62001645576040805162461bcd60e51b81526020600482018190526024820152600080516020620073fd833981519152604482015290519081900360640190fd5b62000f7662002806565b600d546040805182815260208084028201019091526060918291829082801562001683578160200160208202803883390190505b509050606082604051908082528060200260200182016040528015620016b3578160200160208202803883390190505b50905060005b8381101562001771576000600d8281548110620016d257fe5b60009182526020808320909101546001600160a01b0390811680845260059092526040909220548651919350909116908590849081106200170f57fe5b6001600160a01b039283166020918202929092018101919091526001549183166000908152600690915260409020546200174f9163ffffffff620028a216565b8383815181106200175c57fe5b602090810291909101015250600101620016b9565b509093509150509091565b600381815481106200178a57fe5b6000918252602090912001546001600160a01b0316905081565b336000908152600460205260408120546001600160a01b03161562001809576040805162461bcd60e51b815260206004820152601660248201527556616c646961746f72206f776e65722065786973747360501b604482015290519081900360640190fd5b670de0b6b3a7640000831115620018525760405162461bcd60e51b815260040180806020018281038252602c815260200180620073d1602c913960400191505060405180910390fd5b82821115620018935760405162461bcd60e51b815260040180806020018281038252603c81526020018062007470603c913960400191505060405180910390fd5b82841115620018d45760405162461bcd60e51b8152600401808060200182810382526030815260200180620074406030913960400191505060405180910390fd5b601060009054906101000a90046001600160a01b03166001600160a01b03166365062c5c6040518163ffffffff1660e01b815260040160206040518083038186803b1580156200192357600080fd5b505afa15801562001938573d6000803e3d6000fd5b505050506040513d60208110156200194f57600080fd5b5051341015620019a6576040805162461bcd60e51b815260206004820152601d60248201527f73656c662064656c65676174696f6e2062656c6f77206d696e696d756d000000604482015290519081900360640190fd5b606060405180602001620019ba90620031b5565b601f1982820381018352601f90910116604081815260208281018a905281830189905260608084018990526080840188905233901b60a08401528151609481850301815260b4909301909152815191810191909120825192935091829184016000f560408051634a762d6760e01b8152600481018a905233602482015260448101899052606481018890526084810187905290519194506001600160a01b03851691634a762d679160a48082019260009290919082900301818387803b15801562001a8457600080fd5b505af115801562001a99573d6000803e3d6000fd5b5050604080518a81523360208201528082018a9052606081018990526080810188905290517f284b409b88bf362bdd757e26f36b871e6e248eac7cfcec812a2b13208ce8595f93509081900360a0019150a160038054600181019091557fc2575a0e9e593c00f959f8c92f12db2869c3395a3b0502d05e2516446f71f85b0180546001600160a01b038086166001600160a01b0319928316811790935533600081815260046020818152604080842080548816891790558784526005909152808320805490961690931790945560105482516313926b2b60e21b815293169383019390935251634e49acac9260248084019391929182900301818387803b15801562001ba457600080fd5b505af115801562001bb9573d6000803e3d6000fd5b50506040805163cd55d58b60e01b815233600482015234602482015290516001600160a01b038716935063cd55d58b9250604480830192600092919082900301818387803b15801562001c0b57600080fd5b505af115801562001c20573d6000803e3d6000fd5b505050505050949350505050565b336000908152600560205260409020546001600160a01b031662001c845760405162461bcd60e51b8152600401808060200182810382526024815260200180620074ac6024913960400191505060405180910390fd5b6200129f3382620028e6565b60076020526000908152604090205460ff1681565b60066020526000908152604090205481565b336000908152600560205260409020546001600160a01b031662001d0d5760405162461bcd60e51b8152600401808060200182810382526024815260200180620074ac6024913960400191505060405180910390fd5b6001600160a01b0381166000908152600e6020526040902062001d37903363ffffffff6200294916565b5050565b6000546001600160a01b0316158062001d5e57506000546001600160a01b031633145b62001d9f576040805162461bcd60e51b81526020600482018190526024820152600080516020620073fd833981519152604482015290519081900360640190fd5b600080546040516001600160a01b03909116907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908390a3600080546001600160a01b0319169055565b600a5481565b6000546001600160a01b0316158062001e1257506000546001600160a01b031633145b62001e53576040805162461bcd60e51b81526020600482018190526024820152600080516020620073fd833981519152604482015290519081900360640190fd5b600a55565b60035490565b6000546001600160a01b031690565b600c5481565b336000908152600560205260409020546001600160a01b031662001ec95760405162461bcd60e51b8152600401808060200182810382526024815260200180620074ac6024913960400191505060405180910390fd5b6200129f338262002960565b600d81815481106200178a57fe5b336000908152600560205260409020546001600160a01b031662001f395760405162461bcd60e51b8152600401808060200182810382526024815260200180620074ac6024913960400191505060405180910390fd5b6001600160a01b03818116600090815260046020526040902054161562001f9d576040805162461bcd60e51b81526020600482015260136024820152727573657220616c72656164792065786973747360681b604482015290519081900360640190fd5b33600081815260056020908152604080832080546001600160a01b039687166001600160a01b031980831682179093559616845260049092528083208054831690559382529290208054909216179055565b336000908152600560205260409020546001600160a01b0316620020455760405162461bcd60e51b8152600401808060200182810382526024815260200180620074ac6024913960400191505060405180910390fd5b600c80548301905562001d37338383620029a3565b600b5481565b6200206b3362002a60565b1515600114620020b5576040805162461bcd60e51b815260206004820152601060248201526f2737ba103a343290383937b837b9b2b960811b604482015290519081900360640190fd5b3360009081526007602052604090205460ff16156200210c576040805162461bcd60e51b815260206004820152600e60248201526d566f7465206f6e6c79206f6e636560901b604482015290519081900360640190fd5b336000908152600760205260409020805460ff19166001179055565b6000546001600160a01b031615806200214b57506000546001600160a01b031633145b6200218c576040805162461bcd60e51b81526020600482018190526024820152600080516020620073fd833981519152604482015290519081900360640190fd5b600080805b85811015620021ee57868682818110620021a757fe5b9050602002013583019250848482818110620021bf57fe5b9050602002013515620021e557868682818110620021d957fe5b90506020020135820191505b60010162002191565b5060014311156200226a576200226a81838a8a8080602002602001604051908101604052809392919081815260200183836020028082843760009201919091525050604080516020808e0282810182019093528d82529093508d92508c91829185019084908082843760009201919091525062002ada92505050565b600280546001600160a01b0319164117905560005b85811015620022e257620022d98989838181106200229957fe5b905060200201356001600160a01b0316888884818110620022b657fe5b90506020020135878785818110620022ca57fe5b90506020020135151562002d77565b6001016200227f565b505050505050505050565b336000908152600560205260409020546001600160a01b0316620023435760405162461bcd60e51b8152600401808060200182810382526024815260200180620074ac6024913960400191505060405180910390fd5b60005b600d548110156200129f57336001600160a01b0316600d82815481106200236957fe5b6000918252602090912001546001600160a01b031614156200241c57600d805460001981019081106200239857fe5b600091825260209091200154600d80546001600160a01b039092169183908110620023bf57fe5b9060005260206000200160006101000a8154816001600160a01b0302191690836001600160a01b03160217905550600d805480620023f957fe5b600082815260209020810160001990810180546001600160a01b03191690550190555b60010162002346565b6010546001600160a01b031681565b336000908152600560205260409020546001600160a01b03166200248a5760405162461bcd60e51b8152600401808060200182810382526024815260200180620074ac6024913960400191505060405180910390fd5b6040516001600160a01b0383169082156108fc029083906000818181858888f19350505050158015620024c1573d6000803e3d6000fd5b505050565b6000546001600160a01b03161580620024e957506000546001600160a01b031633145b6200252a576040805162461bcd60e51b81526020600482018190526024820152600080516020620073fd833981519152604482015290519081900360640190fd5b6010546040805163eec73abf60e01b8152600481018890526024810187905260448101869052606481018590526084810184905290516001600160a01b039092169163eec73abf9160a48082019260009290919082900301818387803b1580156200259457600080fd5b505af1158015620022e2573d6000803e3d6000fd5b336000908152600560205260409020546001600160a01b0316620025ff5760405162461bcd60e51b8152600401808060200182810382526024815260200180620074ac6024913960400191505060405180910390fd5b6001600160a01b0381166000908152600e6020526040902062001d37903363ffffffff62002df716565b6000546001600160a01b031615806200264c57506000546001600160a01b031633145b6200268d576040805162461bcd60e51b81526020600482018190526024820152600080516020620073fd833981519152604482015290519081900360640190fd5b6001600160a01b038116620026d45760405162461bcd60e51b8152600401808060200182810382526026815260200180620073ab6026913960400191505060405180910390fd5b600080546040516001600160a01b03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a3600080546001600160a01b0319166001600160a01b0392909216919091179055565b600d81815481106200273d57fe5b6000918252602082200154604080516307da68f560e01b815290516001600160a01b03909216926307da68f59260048084019382900301818387803b1580156200278657600080fd5b505af11580156200279b573d6000803e3d6000fd5b5050505050565b600082820183811015620027fd576040805162461bcd60e51b815260206004820152601b60248201527f536166654d6174683a206164646974696f6e206f766572666c6f770000000000604482015290519081900360640190fd5b90505b92915050565b60005b600d548110156200287f5760006007600060056000600d86815481106200282c57fe5b6000918252602080832091909101546001600160a01b03908116845283820194909452604092830182205490931684529183019390935291019020805460ff191691151591909117905560010162002809565b506000600b55565b6000620028008262002e0e565b6000620027fd838362002e12565b6000620027fd83836040518060400160405280601a81526020017f536166654d6174683a206469766973696f6e206279207a65726f00000000000081525062002e79565b600954620028fb908263ffffffff62002f2016565b6009556001600160a01b03821660009081526006602052604090205462002929908263ffffffff62002f2016565b6001600160a01b0390921660009081526006602052604090209190915550565b6000620027fd836001600160a01b03841662002f64565b60095462002975908263ffffffff620027a216565b6009556001600160a01b03821660009081526006602052604090205462002929908263ffffffff620027a216565b600954620029b8908363ffffffff62002f2016565b600955600854620029d0908363ffffffff62002f2016565b6008556001600160a01b038316600090815260066020526040902054620029fe908363ffffffff62002f2016565b6001600160a01b03841660008181526006602090815260409182902093909355805191825291810184905280820183905290517f49995e5dd6158cf69ad3e9777c46755a1a826a446c6416992167462dad033b2a9181900360600190a1505050565b6000805b600d5481101562002ad157826001600160a01b031660056000600d848154811062002a8b57fe5b60009182526020808320909101546001600160a01b03908116845290830193909352604090910190205416141562002ac857600191505062001364565b60010162002a64565b50600092915050565b600062002aee858563ffffffff62002fb316565b9050600062002c0f62002b8583601060009054906101000a90046001600160a01b03166001600160a01b031663705e724c6040518163ffffffff1660e01b815260040160206040518083038186803b15801562002b4a57600080fd5b505afa15801562002b5f573d6000803e3d6000fd5b505050506040513d602081101562002b7657600080fd5b50519063ffffffff62002fea16565b601060009054906101000a90046001600160a01b03166001600160a01b03166391add0d76040518163ffffffff1660e01b815260040160206040518083038186803b15801562002bd457600080fd5b505afa15801562002be9573d6000803e3d6000fd5b505050506040513d602081101562002c0057600080fd5b50519063ffffffff620027a216565b90506000600f60009054906101000a90046001600160a01b03166001600160a01b031663f071db5a6040518163ffffffff1660e01b815260040160206040518083038186803b15801562002c6257600080fd5b505afa15801562002c77573d6000803e3d6000fd5b505050506040513d602081101562002c8e57600080fd5b50519050600062002ca6828463ffffffff62002fea16565b60025490915062002cc1906001600160a01b03168262002ffe565b670de0b6b3a764000062002cdc818563ffffffff62002f2016565b905060005b875181101562002d6b57600062002d168a89848151811062002cff57fe5b602002602001015162002fb390919063ffffffff16565b9050600062002d3e8262002d31888763ffffffff62002fea16565b9063ffffffff62002fea16565b905062002d608a848151811062002d5157fe5b60200260200101518262002ffe565b505060010162002ce1565b50505050505050505050565b6001600160a01b038084166000908152600460208190526040808320548151631a0e4dd360e31b815292830187905285151560248401529051931692839263d0726e98926044808201939182900301818387803b15801562002dd857600080fd5b505af115801562002ded573d6000803e3d6000fd5b5050505050505050565b6000620027fd836001600160a01b03841662003074565b5490565b8154600090821062002e565760405162461bcd60e51b8152600401808060200182810382526022815260200180620073896022913960400191505060405180910390fd5b82600001828154811062002e6657fe5b9060005260206000200154905092915050565b6000818362002f095760405162461bcd60e51b81526004018080602001828103825283818151815260200191508051906020019080838360005b8381101562002ecd57818101518382015260200162002eb3565b50505050905090810190601f16801562002efb5780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b50600083858162002f1657fe5b0495945050505050565b6000620027fd83836040518060400160405280601e81526020017f536166654d6174683a207375627472616374696f6e206f766572666c6f77000081525062003140565b600062002f7283836200319d565b62002faa5750815460018181018455600084815260208082209093018490558454848252828601909352604090209190915562002800565b50600062002800565b6000670de0b6b3a7640000826ec097ce7bc90715b34b9f100000000085028162002fd957fe5b048162002fe257fe5b049392505050565b6000670de0b6b3a764000083830262002fe2565b6001600160a01b03808316600090815260046020819052604080832054815163ca36a30760e01b8152928301869052905193169263ca36a3079260248084019391929182900301818387803b1580156200305757600080fd5b505af11580156200306c573d6000803e3d6000fd5b505050505050565b60008181526001830160205260408120548015620031355783546000198083019190810190600090879083908110620030a957fe5b9060005260206000200154905080876000018481548110620030c757fe5b600091825260208083209091019290925582815260018981019092526040902090840190558654879080620030f857fe5b6001900381819060005260206000200160009055905586600101600087815260200190815260200160002060009055600194505050505062002800565b600091505062002800565b60008184841115620031955760405162461bcd60e51b815260206004820181815283516024840152835190928392604490910191908501908083836000831562002ecd57818101518382015260200162002eb3565b505050900390565b60009081526001919091016020526040902054151590565b6141c580620031c48339019056fe6080604052670de0b6b3a76400006001556402540be4006002553480156200002657600080fd5b506200003b336001600160e01b036200005316565b602380546001600160a01b031916331790556200019e565b6000546001600160a01b031615806200007657506000546001600160a01b031633145b620000e257604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b6001600160a01b03811662000143576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260268152602001806200419f6026913960400191505060405180910390fd5b600080546040516001600160a01b03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a3600080546001600160a01b0319166001600160a01b0392909216919091179055565b613ff180620001ae6000396000f3fe6080604052600436106101f85760003560e01c806392ab89bb1161010d578063cd55d58b116100a0578063e14891911161006f578063e148919114610774578063e5457f8d14610789578063f2fde38b146107f0578063f679d30514610823578063f756d6dc14610838576101f8565b8063cd55d58b146106b4578063cff0ab96146106ed578063d0726e9814610702578063db23f20d14610734576101f8565b8063be9a6555116100dc578063be9a655514610658578063c7b8981c1461066d578063c89e436114610682578063ca36a3071461068a576101f8565b806392ab89bb146105c2578063a589bec4146105d7578063a7d102be14610610578063a7ecd37e14610625576101f8565b8063478d80ed11610190578063703a619f1161015f578063703a619f146104da578063715018a61461051f578063819465161461053457806383fe1d1e1461057c5780638da5cb5b14610591576101f8565b8063478d80ed146103f95780634a762d671461042c5780634e49acac1461047757806361d33880146104aa576101f8565b8063299a37bc116101cc578063299a37bc146102f75780633ccfd60b146103a55780633e25e837146103ba57806341443a39146103cf576101f8565b8062fa3d50146101fd57806307da68f5146102295780630dc9da021461023e5780631ae97bd9146102da575b600080fd5b34801561020957600080fd5b506102276004803603602081101561022057600080fd5b503561089d565b005b34801561023557600080fd5b50610227610925565b34801561024a57600080fd5b50610253610990565b604051808d81526020018c6001600160a01b03166001600160a01b031681526020018b81526020018a1515151581526020018981526020018881526020018781526020018681526020018581526020018460028111156102af57fe5b60ff1681526020018381526020018281526020019c5050505050505050505050505060405180910390f35b610227600480360360208110156102f057600080fd5b50356109cd565b34801561030357600080fd5b5061030c610b8e565b604051808060200180602001838103835285818151815260200191508051906020019060200280838360005b83811015610350578181015183820152602001610338565b50505050905001838103825284818151815260200191508051906020019060200280838360005b8381101561038f578181015183820152602001610377565b5050505090500194505050505060405180910390f35b3480156103b157600080fd5b50610227610c9e565b3480156103c657600080fd5b50610227610e11565b3480156103db57600080fd5b50610227600480360360208110156103f257600080fd5b5035610f3f565b34801561040557600080fd5b5061030c6004803603602081101561041c57600080fd5b50356001600160a01b031661109e565b34801561043857600080fd5b50610227600480360360a081101561044f57600080fd5b508035906001600160a01b0360208201351690604081013590606081013590608001356111e1565b34801561048357600080fd5b506102276004803603602081101561049a57600080fd5b50356001600160a01b03166112a2565b3480156104b657600080fd5b50610227600480360360408110156104cd57600080fd5b50803590602001356112c4565b3480156104e657600080fd5b5061050d600480360360208110156104fd57600080fd5b50356001600160a01b03166113fd565b60408051918252519081900360200190f35b34801561052b57600080fd5b5061022761151a565b34801561054057600080fd5b5061055e6004803603602081101561055757600080fd5b50356115c5565b60408051938452602084019290925282820152519081900360600190f35b34801561058857600080fd5b5061050d6115f5565b34801561059d57600080fd5b506105a66115fb565b604080516001600160a01b039092168252519081900360200190f35b3480156105ce57600080fd5b5061022761160a565b3480156105e357600080fd5b5061055e600480360360408110156105fa57600080fd5b506001600160a01b0381351690602001356116f8565b34801561061c57600080fd5b5061050d611737565b34801561063157600080fd5b506102276004803603602081101561064857600080fd5b50356001600160a01b031661173d565b34801561066457600080fd5b50610227611847565b34801561067957600080fd5b50610227611af1565b610227611b5c565b34801561069657600080fd5b50610227600480360360208110156106ad57600080fd5b5035611c30565b3480156106c057600080fd5b50610227600480360360408110156106d757600080fd5b506001600160a01b038135169060200135611cd3565b3480156106f957600080fd5b506105a6611df1565b34801561070e57600080fd5b506102276004803603604081101561072557600080fd5b50803590602001351515611e00565b34801561074057600080fd5b506107496122eb565b6040805195865260208601949094529115158484015260608401526080830152519081900360a00190f35b34801561078057600080fd5b5061055e612303565b34801561079557600080fd5b506107bc600480360360208110156107ac57600080fd5b50356001600160a01b031661230f565b6040805195865260208601949094528484019290925260608401526001600160a01b03166080830152519081900360a00190f35b3480156107fc57600080fd5b506102276004803603602081101561081357600080fd5b50356001600160a01b0316612347565b34801561082f57600080fd5b50610227612448565b34801561084457600080fd5b5061084d6125f2565b60408051602080825283518183015283519192839290830191858101910280838360005b83811015610889578181015183820152602001610871565b505050509050019250505060405180910390f35b6009546001600160a01b031633146108e65760405162461bcd60e51b8152600401808060200182810382526024815260200180613f996024913960400191505060405180910390fd5b6108ef81612760565b6040805182815290517f5c54b9d57498011551db9636dd261716b929d2048c01336dd3ce8aa9f96751b59181900360200190a150565b6000546001600160a01b0316158061094757506000546001600160a01b031633145b610986576040805162461bcd60e51b81526020600482018190526024820152600080516020613ed7833981519152604482015290519081900360640190fd5b61098e612868565b565b600854600954600a54600b54600c54600d54600e54600f546010546011546012546013546001600160a01b03909a169960ff98891698909216918c565b6009546001600160a01b03163314610a165760405162461bcd60e51b8152600401808060200182810382526024815260200180613f996024913960400191505060405180910390fd5b602260009054906101000a90046001600160a01b03166001600160a01b031663476d41ec6040518163ffffffff1660e01b815260040160206040518083038186803b158015610a6457600080fd5b505afa158015610a78573d6000803e3d6000fd5b505050506040513d6020811015610a8e57600080fd5b5051341015610ae4576040805162461bcd60e51b815260206004820152601760248201527f4d696e20616d6f756e74206973203130303030204b4149000000000000000000604482015290519081900360640190fd5b610aed816128ea565b6040805182815290517fa11b41711fa833ea6f66ad691002e268b2e1f806a85f732095f80f57be067abf9181900360200190a16023546040805163b390c0ab60e01b81523460048201526001602482015290516001600160a01b039092169163b390c0ab9160448082019260009290919082900301818387803b158015610b7357600080fd5b505af1158015610b87573d6000803e3d6000fd5b5050505050565b6060806000610b9d60036128ef565b9050606081604051908082528060200260200182016040528015610bcb578160200160208202803883390190505b509050606082604051908082528060200260200182016040528015610bfa578160200160208202803883390190505b50905060005b83811015610c93576000610c1b60038363ffffffff61290016565b905080848381518110610c2a57fe5b60200260200101906001600160a01b031690816001600160a01b03168152505060056000826001600160a01b03166001600160a01b0316815260200190815260200160002060030154838381518110610c7f57fe5b602090810291909101015250600101610c00565b509093509150509091565b610caf60033363ffffffff61291316565b610cf7576040805162461bcd60e51b815260206004820152601460248201527319195b1959d85d1a5bdb881b9bdd08199bdd5b9960621b604482015290519081900360640190fd5b33600090815260076020526040812090805b8254811015610e025742838281548110610d1f57fe5b9060005260206000209060030201600201541015610dfa57610d64838281548110610d4657fe5b6000918252602090912060039091020154839063ffffffff61292816565b835490925083906000198101908110610d7957fe5b9060005260206000209060030201838281548110610d9357fe5b600091825260209091208254600390920201908155600180830154908201556002918201549101558254839080610dc657fe5b600082815260208120600019928301600381029091018281556001810183905560020191909155909155600e805482019055015b600101610d09565b50610e0d3382612982565b5050565b6009546001600160a01b03163314610e5a5760405162461bcd60e51b8152600401808060200182810382526024815260200180613f996024913960400191505060405180910390fd5b600d5480610e995760405162461bcd60e51b8152600401808060200182810382526021815260200180613e476021913960400191505060405180910390fd5b60235460408051630d6ef7af60e41b81523360048201526024810184905290516001600160a01b039092169163d6ef7af09160448082019260009290919082900301818387803b158015610eec57600080fd5b505af1158015610f00573d6000803e3d6000fd5b50506000600d5550506040805182815290517f84126ec1d9ba36225ae6cda8310406e5fa8c79d74799c5b49df74d3986629ea99181900360200190a150565b610f5060033363ffffffff61291316565b610f98576040805162461bcd60e51b815260206004820152601460248201527319195b1959d85d1a5bdb881b9bdd08199bdd5b9960621b604482015290519081900360640190fd5b610fa23382612aa6565b1515600114610ff8576040805162461bcd60e51b815260206004820152601960248201527f556e64656c656761746520616d6f756e7420696e76616c696400000000000000604482015290519081900360640190fd5b33600090815260076020819052604090912054106110475760405162461bcd60e51b8152600401808060200182810382526025815260200180613f746025913960400191505060405180910390fd5b6110513382612b83565b60235460408051636c68c0e160e01b81526004810184905290516001600160a01b0390921691636c68c0e19160248082019260009290919082900301818387803b158015610b7357600080fd5b6001600160a01b0381166000908152600760209081526040918290205482518181528183028101909201909252606091829182908280156110e9578160200160208202803883390190505b509050606082604051908082528060200260200182016040528015611118578160200160208202803883390190505b50905060005b838110156111d5576001600160a01b038716600090815260076020526040902080548290811061114a57fe5b90600052602060002090600302016002015482828151811061116857fe5b60200260200101818152505060076000886001600160a01b03166001600160a01b0316815260200190815260200160002081815481106111a457fe5b9060005260206000209060030201600001548382815181106111c257fe5b602090810291909101015260010161111e565b50909350915050915091565b6000546001600160a01b0316158061120357506000546001600160a01b031633145b611242576040805162461bcd60e51b81526020600482018190526024820152600080516020613ed7833981519152604482015290519081900360640190fd5b6008859055600980546001600160a01b0319166001600160a01b03861617905542600f556011805460ff19166001179055604080516060810182528481526020810184905201819052601483905560158290556016819055610b87612d30565b602280546001600160a01b0319166001600160a01b0392909216919091179055565b6000546001600160a01b031615806112e657506000546001600160a01b031633145b611325576040805162461bcd60e51b81526020600482018190526024820152600080516020613ed7833981519152604482015290519081900360640190fd5b6113ae61133982600163ffffffff612d4116565b60225460408051630699b3d960e21b8152905186926001600160a01b031691631a66cf64916004808301926020929190829003018186803b15801561137d57600080fd5b505afa158015611391573d6000803e3d6000fd5b505050506040513d60208110156113a757600080fd5b5051612d83565b6113be643afff4417f6001612fb5565b604080518381526002602082015281517f4f5f38ee30b01a960b4dfdcd520a3ca59c1a664a32dcfe5418ca79b0de6b7236929181900390910190a15050565b600061141060038363ffffffff61291316565b611458576040805162461bcd60e51b815260206004820152601460248201527319195b1959d85d1a5bdb881b9bdd08199bdd5b9960621b604482015290519081900360640190fd5b611460613d16565b506001600160a01b038083166000908152600560209081526040808320815160a08101835281548152600182015493810193909352600281015491830191909152600381015460608301526004015490921660808301526017546114c99085906000190161303d565b60185490915080156115125760006114e48460600151613199565b600a5490915061150c906114ff90849063ffffffff6131c316565b829063ffffffff6131f816565b83019250505b509392505050565b6000546001600160a01b0316158061153c57506000546001600160a01b031633145b61157b576040805162461bcd60e51b81526020600482018190526024820152600080516020613ed7833981519152604482015290519081900360640190fd5b600080546040516001600160a01b03909116907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908390a3600080546001600160a01b0319169055565b601b81815481106115d257fe5b600091825260209091206003909102018054600182015460029092015490925083565b600d5490565b6000546001600160a01b031690565b61161b60033363ffffffff61291316565b611663576040805162461bcd60e51b815260206004820152601460248201527319195b1959d85d1a5bdb881b9bdd08199bdd5b9960621b604482015290519081900360640190fd5b336000908152600560205260408120600381015490919061168390613199565b905061168f3382612b83565b60235460408051636c68c0e160e01b81526004810184905290516001600160a01b0390921691636c68c0e19160248082019260009290919082900301818387803b1580156116dc57600080fd5b505af11580156116f0573d6000803e3d6000fd5b505050505050565b6007602052816000526040600020818154811061171157fe5b600091825260209091206003909102018054600182015460029092015490935090915083565b601b5490565b6009546001600160a01b031633146117865760405162461bcd60e51b8152600401808060200182810382526024815260200180613f996024913960400191505060405180910390fd5b6001600160a01b03811633141561179c57600080fd5b600954604080516001600160a01b039283168152918316602083015280517f40111b5f6d98fc2660fc1cd3935c495115f77fd3c8a9856a00f23136fe2159bc9281900390910190a1600980546001600160a01b0319166001600160a01b03838116918217909255602354604080516353f669bf60e11b815260048101939093525192169163a7ecd37e9160248082019260009290919082900301818387803b158015610b7357600080fd5b6009546001600160a01b031633146118905760405162461bcd60e51b8152600401808060200182810382526024815260200180613f996024913960400191505060405180910390fd5b600260115460ff1660028111156118a357fe5b14156118e9576040805162461bcd60e51b815260206004820152601060248201526f1d985b1a59185d1bdc88189bdb99195960821b604482015290519081900360640190fd5b600b5460ff1615611934576040805162461bcd60e51b815260206004820152601060248201526f1d985b1a59185d1bdc881a985a5b195960821b604482015290519081900360640190fd5b600254600a5460009161194d919063ffffffff61320b16565b11611993576040805162461bcd60e51b81526020600482015260116024820152703d32b937903b37ba34b733903837bbb2b960791b604482015290519081900360640190fd5b602260009054906101000a90046001600160a01b03166001600160a01b031663d7c1bf596040518163ffffffff1660e01b815260040160206040518083038186803b1580156119e157600080fd5b505afa1580156119f5573d6000803e3d6000fd5b505050506040513d6020811015611a0b57600080fd5b5051600a541015611a4d5760405162461bcd60e51b815260040180806020018281038252603f815260200180613d8a603f913960400191505060405180910390fd5b602360009054906101000a90046001600160a01b03166001600160a01b031663072df4cb6040518163ffffffff1660e01b8152600401600060405180830381600087803b158015611a9d57600080fd5b505af1158015611ab1573d6000803e3d6000fd5b50506011805460ff19166002179055505043601c556040517fd8cea0ecd56872ff072e771658b5682ffe4de16d752947f79597d600ea56f7a990600090a1565b611b0260033363ffffffff61291316565b611b4a576040805162461bcd60e51b815260206004820152601460248201527319195b1959d85d1a5bdb881b9bdd08199bdd5b9960621b604482015290519081900360640190fd5b611b533361324d565b61098e33613306565b611b663334613394565b60235460408051639fa6dd3560e01b815234600482015290516001600160a01b0390921691639fa6dd359160248082019260009290919082900301818387803b158015611bb257600080fd5b505af1158015611bc6573d6000803e3d6000fd5b5050602354604080516370a996a960e01b815233600482015290516001600160a01b0390921693506370a996a9925060248082019260009290919082900301818387803b158015611c1657600080fd5b505af1158015611c2a573d6000803e3d6000fd5b50505050565b6000546001600160a01b03161580611c5257506000546001600160a01b031633145b611c91576040805162461bcd60e51b81526020600482018190526024820152600080516020613ed7833981519152604482015290519081900360640190fd5b601454600090611ca890839063ffffffff6131f816565b90506000611cbc838363ffffffff612d4116565b600d80549093019092555060188054909101905550565b6000546001600160a01b03161580611cf557506000546001600160a01b031633145b611d34576040805162461bcd60e51b81526020600482018190526024820152600080516020613ed7833981519152604482015290519081900360640190fd5b611d3e8282613394565b60235460408051639fa6dd3560e01b81526004810184905290516001600160a01b0390921691639fa6dd359160248082019260009290919082900301818387803b158015611d8b57600080fd5b505af1158015611d9f573d6000803e3d6000fd5b5050602354604080516370a996a960e01b81526001600160a01b03878116600483015291519190921693506370a996a99250602480830192600092919082900301818387803b1580156116dc57600080fd5b6022546001600160a01b031681565b6000546001600160a01b03161580611e2257506000546001600160a01b031633145b611e61576040805162461bcd60e51b81526020600482018190526024820152600080516020613ed7833981519152604482015290519081900360640190fd5b6022546040805163050d3fcd60e21b815290516000926001600160a01b031691631434ff34916004808301926020929190829003018186803b158015611ea657600080fd5b505afa158015611eba573d6000803e3d6000fd5b505050506040513d6020811015611ed057600080fd5b5051601d5481611edc57fe5b601d805460010190550660008181526021602052604090205490915060ff16821581158015611f085750805b15611f3757601f805460019081019091556000848152602160205260409020805460ff19169091179055611f68565b818015611f42575080155b15611f6857601f80546000190190556000838152602160205260409020805460ff191690555b6000611ff6602260009054906101000a90046001600160a01b03166001600160a01b0316631434ff346040518163ffffffff1660e01b815260040160206040518083038186803b158015611fbb57600080fd5b505afa158015611fcf573d6000803e3d6000fd5b505050506040513d6020811015611fe557600080fd5b5051601c549063ffffffff61292816565b905060006120f4602260009054906101000a90046001600160a01b03166001600160a01b031663d58907ec6040518163ffffffff1660e01b815260040160206040518083038186803b15801561204b57600080fd5b505afa15801561205f573d6000803e3d6000fd5b505050506040513d602081101561207557600080fd5b50516022546040805163050d3fcd60e21b815290516001600160a01b0390921691631434ff3491600480820192602092909190829003018186803b1580156120bc57600080fd5b505afa1580156120d0573d6000803e3d6000fd5b505050506040513d60208110156120e657600080fd5b50519063ffffffff6131f816565b9050600061218282602260009054906101000a90046001600160a01b03166001600160a01b0316631434ff346040518163ffffffff1660e01b815260040160206040518083038186803b15801561214a57600080fd5b505afa15801561215e573d6000803e3d6000fd5b505050506040513d602081101561217457600080fd5b50519063ffffffff612d4116565b905082431180156121945750601f5481105b156122e157600b5460ff166122e1576121fb6121b743600263ffffffff612d4116565b6022546040805163e37e526b60e01b815290518c926001600160a01b03169163e37e526b916004808301926020929190829003018186803b15801561137d57600080fd5b61228f612288602260009054906101000a90046001600160a01b03166001600160a01b031663693b6e9a6040518163ffffffff1660e01b815260040160206040518083038186803b15801561224f57600080fd5b505afa158015612263573d6000803e3d6000fd5b505050506040513d602081101561227957600080fd5b5051429063ffffffff61292816565b6000612fb5565b6000601f55601d546122a09061351d565b6000601d55604080518981526001602082015281517f4f5f38ee30b01a960b4dfdcd520a3ca59c1a664a32dcfe5418ca79b0de6b7236929181900390910190a15b5050505050505050565b601c54601d54601e54601f5460205460ff9092169185565b60145460155460165483565b60056020526000908152604090208054600182015460028301546003840154600490940154929391929091906001600160a01b031685565b6000546001600160a01b0316158061236957506000546001600160a01b031633145b6123a8576040805162461bcd60e51b81526020600482018190526024820152600080516020613ed7833981519152604482015290519081900360640190fd5b6001600160a01b0381166123ed5760405162461bcd60e51b8152600401808060200182810382526026815260200180613e216026913960400191505060405180910390fd5b600080546040516001600160a01b03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a3600080546001600160a01b0319166001600160a01b0392909216919091179055565b6009546001600160a01b031633146124915760405162461bcd60e51b8152600401808060200182810382526024815260200180613f996024913960400191505060405180910390fd5b600b5460ff166124df576040805162461bcd60e51b81526020600482015260146024820152731d985b1a59185d1bdc881b9bdd081a985a5b195960621b604482015290519081900360640190fd5b601e5460ff161561252a576040805162461bcd60e51b815260206004820152601060248201526f1d985b1a59185d1bdc881a985a5b195960821b604482015290519081900360640190fd5b6020544211612573576040805162461bcd60e51b815260206004820152601060248201526f1d985b1a59185d1bdc881a985a5b195960821b604482015290519081900360640190fd5b6009546001600160a01b03166000908152600560205260408120600381015490919061259e90613199565b9050600081116125df5760405162461bcd60e51b8152600401808060200182810382526021815260200180613ef76021913960400191505060405180910390fd5b50506000602055600b805460ff19169055565b606080602260009054906101000a90046001600160a01b03166001600160a01b0316631434ff346040518163ffffffff1660e01b815260040160206040518083038186803b15801561264357600080fd5b505afa158015612657573d6000803e3d6000fd5b505050506040513d602081101561266d57600080fd5b5051604080518281526020808402820101909152908015612698578160200160208202803883390190505b50905060005b602260009054906101000a90046001600160a01b03166001600160a01b0316631434ff346040518163ffffffff1660e01b815260040160206040518083038186803b1580156126ec57600080fd5b505afa158015612700573d6000803e3d6000fd5b505050506040513d602081101561271657600080fd5b505181101561275a57600081815260216020526040902054825160ff9091169083908390811061274257fe5b9115156020928302919091019091015260010161269e565b50905090565b801561286557600f54620151809061277f90429063ffffffff612d4116565b10156127bc5760405162461bcd60e51b8152600401808060200182810382526031815260200180613f436031913960400191505060405180910390fd5b6015548111156127fd5760405162461bcd60e51b815260040180806020018281038252602b815260200180613f18602b913960400191505060405180910390fd5b60145481111561285b5760165460145461281e90839063ffffffff612d4116565b111561285b5760405162461bcd60e51b8152600401808060200182810382526036815260200180613deb6036913960400191505060405180910390fd5b601481905542600f555b50565b6011805460ff191690554360135560225460408051633f1f5e7f60e01b815290516128bc926001600160a01b031691633f1f5e7f916004808301926020929190829003018186803b15801561224f57600080fd5b6012556040517f7acc84e34091ae817647a4c49116f5cc07f319078ba80f8f5fde37ea7e25cbd690600090a1565b600855565b60006128fa82613546565b92915050565b600061290c838361354a565b9392505050565b600061290c836001600160a01b0384166135ae565b60008282018381101561290c576040805162461bcd60e51b815260206004820152601b60248201527f536166654d6174683a206164646974696f6e206f766572666c6f770000000000604482015290519081900360640190fd5b600081116129d7576040805162461bcd60e51b815260206004820152601f60248201527f6e6f20756e626f6e64696e6720616d6f756e7420746f20776974686472617700604482015290519081900360640190fd5b6001600160a01b038216600090815260056020526040902060030154606410801590612a1957506001600160a01b038216600090815260076020526040902054155b15612a2757612a27826135c6565b6040516001600160a01b0383169082156108fc029083906000818181858888f19350505050158015612a5d573d6000803e3d6000fd5b50604080516001600160a01b03841681526020810183905281517f884edad9ce6fa2440d8a54cc123490eb96d2768479d49ff9c7366125a9424364929181900390910190a15050565b6001600160a01b03821660009081526005602052604081208054612ad0908463ffffffff612d4116565b612ade5760019150506128fa565b602260009054906101000a90046001600160a01b03166001600160a01b03166356a3b5fa6040518163ffffffff1660e01b815260040160206040518083038186803b158015612b2c57600080fd5b505afa158015612b40573d6000803e3d6000fd5b505050506040513d6020811015612b5657600080fd5b50518154612b6a908563ffffffff612d4116565b10612b795760019150506128fa565b5060009392505050565b612b8c8261324d565b6001600160a01b038216600090815260056020526040812090612bae8361365c565b90508160030154811115612bc3575060038101545b6003820154612bd8908263ffffffff612d4116565b6003830155612be684613306565b6000612bf182613679565b9050612bfb6136d5565b8015612c0a5750612c0a6136f0565b15612c1e57612c198582612982565b612d28565b600e8054600101905560225460408051633f1f5e7f60e01b81529051600092612c73926001600160a01b0390911691633f1f5e7f91600480820192602092909190829003018186803b15801561224f57600080fd5b9050612c7d6136d5565b15612c8757506012545b6001600160a01b03861660008181526007602090815260408083208151606080820184528882524382860190815282850189815284546001818101875595895297879020935160039098029093019687555192860192909255516002909401939093558051938452908301859052828101849052517f0fb944dfb6f905f4df9591c2ec2e59e3e68658aae7ec51aa5015409406457e809281900390910190a1505b610b876136f8565b600160175560006018819055600d55565b600061290c83836040518060400160405280601e81526020017f536166654d6174683a207375627472616374696f6e206f766572666c6f7700008152506137ec565b43831115612dc25760405162461bcd60e51b8152600401808060200182810382526025815260200180613e916025913960400191505060405180910390fd5b6000612de982612ddd6002548661388390919063ffffffff16565b9063ffffffff6131f816565b905043841015612ef0576000612dff60036128ef565b905060005b81811015612eed576000612e1f60038363ffffffff61290016565b6001600160a01b03811660009081526007602052604081209192505b8154811015612ee2576000828281548110612e5257fe5b90600052602060002090600302019050806000015460001415612e755750612eda565b8981600101541015612e875750612eda565b4281600201541015612e995750612eda565b8054600090612eae908a63ffffffff6131f816565b8254909150612ec3908263ffffffff612d4116565b8255612ed5888263ffffffff612d4116565b975050505b600101612e3b565b505050600101612e04565b50505b600a548190811115612f015750600a545b600a5415612f2d57600a54600090612f2090839063ffffffff6131c316565b9050612f2b816138dc565b505b600a54612f40908263ffffffff612d4116565b600a556023546040805163b390c0ab60e01b81526004810184905260006024820181905291516001600160a01b039093169263b390c0ab9260448084019391929182900301818387803b158015612f9657600080fd5b505af1158015612faa573d6000803e3d6000fd5b505050505050505050565b600b8054600160ff19918216179091556020839055601e80549091168215151790556023546040805163bd3bb1c760e01b815290516001600160a01b039092169163bd3bb1c79160048082019260009290919082900301818387803b15801561301d57600080fd5b505af1158015613031573d6000803e3d6000fd5b50505050610e0d612868565b6000613047613d16565b506001600160a01b038084166000908152600560209081526040808320815160a0810183528154815260018201549381019390935260028101549183019190915260038101546060830152600401549092166080830152805b601b5481101561317c576130b2613d4e565b601b82815481106130bf57fe5b906000526020600020906003020160405180606001604052908160008201548152602001600182015481526020016002820154815250509050836040015181604001511180156131125750438160400151105b15613173578051602085015181111561317157602085015182518651613139929190613997565b840193506131676131598360200151600154612d4190919063ffffffff16565b86519063ffffffff6131f816565b8552602085018190525b505b506001016130a0565b506131908260200151858460000151613997565b01949350505050565b600c54600a546000916128fa916131b790859063ffffffff61388316565b9063ffffffff61320b16565b6000670de0b6b3a7640000826ec097ce7bc90715b34b9f10000000008502816131e857fe5b04816131f057fe5b049392505050565b6000670de0b6b3a76400008383026131f0565b600061290c83836040518060400160405280601a81526020017f536166654d6174683a206469766973696f6e206279207a65726f000000000000815250613a05565b6000613257613a6a565b90506000613265838361303d565b6001600160a01b03841660009081526005602052604090206001015490915061328d90613b1d565b80156133015760235460408051630d6ef7af60e41b81526001600160a01b038681166004830152602482018590529151919092169163d6ef7af091604480830192600092919082900301818387803b1580156132e857600080fd5b505af11580156132fc573d6000803e3d6000fd5b505050505b505050565b6001600160a01b038116600090815260056020526040812060175490919061333590600163ffffffff612d4116565b905061334081613b53565b6001600160a01b0383166000908152600560205260408120436002820155600101829055600383015461337290613199565b6001600160a01b03909416600090815260056020526040902093909355505050565b602260009054906101000a90046001600160a01b03166001600160a01b03166356a3b5fa6040518163ffffffff1660e01b815260040160206040518083038186803b1580156133e257600080fd5b505afa1580156133f6573d6000803e3d6000fd5b505050506040513d602081101561340c57600080fd5b505181101561344c5760405162461bcd60e51b8152600401808060200182810382526029815260200180613e686029913960400191505060405180910390fd5b61345d60038363ffffffff61291316565b6134805761347260038363ffffffff613b6f16565b5061347b613b84565b613489565b61348982613b8c565b600061349482613b95565b6001600160a01b03841660009081526005602052604090206003810154919250906134c5908363ffffffff61292816565b60038201556134d384613306565b604080516001600160a01b03861681526020810185905281517fb0d234274aef7a61aa5a2eb44c23881ebf46a068cccbd413c978bcbd555fe17f929181900390910190a150505050565b60005b81811015610e0d576000818152602160205260409020805460ff19169055600101613520565b5490565b8154600090821061358c5760405162461bcd60e51b8152600401808060200182810382526022815260200180613dc96022913960400191505060405180910390fd5b82600001828154811061359b57fe5b9060005260206000200154905092915050565b60009081526001919091016020526040902054151590565b6135d760038263ffffffff613be816565b506001600160a01b03808216600081815260056020526040808220828155600181018390556002810183905560038101839055600490810180546001600160a01b0319169055602354825163f0466c7360e01b8152918201949094529051929093169263f0466c73926024808301939282900301818387803b158015610b7357600080fd5b600a54600c546000916128fa916131b7908563ffffffff61388316565b600c5460009081613690828563ffffffff612d4116565b9150816136a65750600a805460009091556136c9565b6136af84613199565b600a549091506136c5908263ffffffff612d4116565b600a555b600c9190915592915050565b6000805b60115460ff1660028111156136ea57fe5b14905090565b601254421190565b613700613bfd565b6137095761098e565b6022546040805163d7c1bf5960e01b815290516000926001600160a01b03169163d7c1bf59916004808301926020929190829003018186803b15801561374e57600080fd5b505afa158015613762573d6000803e3d6000fd5b505050506040513d602081101561377857600080fd5b5051600b5490915060ff168061378f5750600a5481115b156128655761379c612868565b602360009054906101000a90046001600160a01b03166001600160a01b031663bd3bb1c76040518163ffffffff1660e01b8152600401600060405180830381600087803b158015610b7357600080fd5b6000818484111561387b5760405162461bcd60e51b81526004018080602001828103825283818151815260200191508051906020019080838360005b83811015613840578181015183820152602001613828565b50505050905090810190601f16801561386d5780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b505050900390565b600082613892575060006128fa565b8282028284828161389f57fe5b041461290c5760405162461bcd60e51b8152600401808060200182810382526021815260200180613eb66021913960400191505060405180910390fd5b60006138e6613a6a565b90506138f181613b53565b604080516060810182529182526020820192835243908201908152601b805460018101825560009190915291517f3ad8aa4f87544323a9d1e5dd902f40c356527a7955687113db5f9a85ad579dc160039093029283015591517f3ad8aa4f87544323a9d1e5dd902f40c356527a7955687113db5f9a85ad579dc282015590517f3ad8aa4f87544323a9d1e5dd902f40c356527a7955687113db5f9a85ad579dc390910155565b60006139a1613d6f565b50600084815260066020818152604080842081518083018352815481526001909101548184015287855292909152822081518154929391926139e89163ffffffff612d4116565b90506139fa858263ffffffff6131f816565b979650505050505050565b60008183613a545760405162461bcd60e51b8152602060048201818152835160248401528351909283926044909101919085019080838360008315613840578181015183820152602001613828565b506000838581613a6057fe5b0495945050505050565b6017546000908190613a8390600163ffffffff612d4116565b60185490915060009015613aa957600a54601854613aa69163ffffffff6131c316565b90505b600082815260066020526040902054613ac183613b1d565b613ad1818363ffffffff61292816565b601780546000908152600660205260408082209390935581548152918220600190810181905581548101909155601891909155613b1590849063ffffffff61292816565b935050505090565b60008181526006602052604090206001018054600019019081905561286557600090815260066020526040812081815560010155565b6000908152600660205260409020600190810180549091019055565b600061290c836001600160a01b038416613c06565b612865613a6a565b6128658161324d565b600a546000908190613baa5750600154613bb6565b613bb38361365c565b90505b600a54613bc9908463ffffffff61292816565b600a55600c54613bdf908263ffffffff61292816565b600c5592915050565b600061290c836001600160a01b038416613c50565b600060026136d9565b6000613c1283836135ae565b613c48575081546001818101845560008481526020808220909301849055845484825282860190935260409020919091556128fa565b5060006128fa565b60008181526001830160205260408120548015613d0c5783546000198083019190810190600090879083908110613c8357fe5b9060005260206000200154905080876000018481548110613ca057fe5b600091825260208083209091019290925582815260018981019092526040902090840190558654879080613cd057fe5b600190038181906000526020600020016000905590558660010160008781526020019081526020016000206000905560019450505050506128fa565b60009150506128fa565b6040518060a001604052806000815260200160008152602001600081526020016000815260200160006001600160a01b031681525090565b60405180606001604052806000815260200160008152602001600081525090565b60405180604001604052806000815260200160008152509056fe416464726573732062616c616e6365206d7573742067726561746572206f7220657175616c206d696e696d756d2076616c696461746f722062616c616e6365456e756d657261626c655365743a20696e646578206f7574206f6620626f756e6473636f6d6d697373696f6e2063616e6e6f74206265206368616e676564206d6f7265207468616e206d6178206368616e676520726174654f776e61626c653a206e6577206f776e657220697320746865207a65726f20616464726573736e6f2076616c696461746f7220636f6d6d697373696f6e20746f20726577617264416d6f756e74206d7573742067726561746572207468616e206d696e207374616b6520616d6f756e7463616e6e6f7420736c61736820696e66726174696f6e7320696e2074686520667574757265536166654d6174683a206d756c7469706c69636174696f6e206f766572666c6f774f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657273656c662064656c65676174696f6e20746f6f206c6f7720746f20756e6a61696c636f6d6d697373696f6e2063616e6e6f74206265206d6f7265207468616e20746865206d61782072617465636f6d6d697373696f6e2063616e6e6f74206265206368616e676564206d6f7265207468616e206f6e6520696e20323468746f6f206d616e7920756e626f6e64696e672064656c65676174696f6e20656e74726965734f776e61626c653a2063616c6c6572206973206e6f74207468652076616c696461746f72a265627a7a72315820837b29d2368157cf880c200d09855526aa057c231fe34e2fade95b03e9163b9f64736f6c634300050b00324f776e61626c653a206e6577206f776e657220697320746865207a65726f2061646472657373456e756d657261626c655365743a20696e646578206f7574206f6620626f756e64734f776e61626c653a206e6577206f776e657220697320746865207a65726f2061646472657373636f6d6d697373696f6e206d617820726174652063616e6e6f74206265206d6f7265207468616e20313030254f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572416d6f756e74206d7573742067726561746572207468616e206d696e20616d6f756e74636f6d6d697373696f6e20726174652063616e6e6f74206265206d6f7265207468616e20746865206d61782072617465636f6d6d697373696f6e206d6178206368616e676520726174652063616e206e6f74206265206d6f7265207468616e20746865206d617820726174654f776e61626c653a2063616c6c6572206973206e6f74207468652076616c696461746f72a265627a7a723158203f94148f576ae5aee165fe6012e942bf61b0363db195a60119024951b3a940ac64736f6c634300050b00326080604052670de0b6b3a764000060015534801561001c57600080fd5b5061002f336001600160e01b0361016316565b600280546001600160a01b031916331790556040805160608082018352662386f26fc10000808352668e1bc9bf04000060208085018290526014948601859052600383905560049190915560059390935583516101208101855261012c80825266b1a2bc2ec500008286018190528287018290526703782dace9d9000083860181905261271060808086018290526706f05b59d3b2000060a080880182905260c0880189905267016345785d8a000060e089018190526101009890980188905260068790556007869055600896909655600993909355600a91909155600b829055600c869055600d859055600e949094558751928301885284835295820186905262603d8096820187905293810184905201819052600f8190556010929092556011929092556012919091556013556102aa565b6000546001600160a01b0316158061018557506000546001600160a01b031633145b6101f057604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b6001600160a01b03811661024f576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526026815260200180610bd96026913960400191505060405180910390fd5b600080546040516001600160a01b03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a3600080546001600160a01b0319166001600160a01b0392909216919091179055565b610920806102b96000396000f3fe608060405234801561001057600080fd5b50600436106101a95760003560e01c8063715018a6116100f9578063b0c9569a11610097578063d7c1bf5911610071578063d7c1bf591461039d578063e37e526b146103a5578063eec73abf146103ad578063f2fde38b146103e2576101a9565b8063b0c9569a14610385578063c19e19b11461038d578063d58907ec14610395576101a9565b80638da5cb5b116100d35780638da5cb5b1461034957806391add0d71461036d5780639902f44e146103755780639cf974f01461037d576101a9565b8063715018a61461031c578063741de1481461032457806381eb12901461032c576101a9565b8063476d41ec1161016657806357acc3021161014057806357acc3021461026e5780635dc3f1ee146102bd578063693b6e9a1461030c578063705e724c14610314576101a9565b8063476d41ec1461025657806356a3b5fa1461025e578063578116a314610266576101a9565b80631434ff34146101ae578063150cf4bf146101c85780631a66cf64146101fb5780631dd113a7146102035780633cf6a32c146102295780633f1f5e7f1461024e575b600080fd5b6101b6610408565b60408051918252519081900360200190f35b6101d061040e565b6040805195865260208601949094528484019290925260608401526080830152519081900360a00190f35b6101b6610420565b61020b610426565b60408051938452602084019290925282820152519081900360600190f35b61024c6004803603604081101561023f57600080fd5b5080359060200135610432565b005b6101b661049e565b6101b66104a4565b6101b66104aa565b6101b66104b0565b6102766104b6565b60408051998a5260208a0198909852888801969096526060880194909452608087019290925260a086015260c085015260e084015261010083015251908190036101200190f35b61024c60048036036101208110156102d457600080fd5b5080359060208101359060408101359060608101359060808101359060a08101359060c08101359060e08101359061010001356104d4565b6101b66105a3565b6101b66105a9565b61024c6105af565b6101b661065a565b61024c6004803603602081101561034257600080fd5b5035610660565b6103516106c6565b604080516001600160a01b039092168252519081900360200190f35b6101b66106d5565b6101b66106db565b6101b66106e1565b6101b66106e7565b6101b66106ed565b6101b66106f3565b6101b66106f9565b6101b66106ff565b61024c600480360360a08110156103c357600080fd5b5080359060208101359060408101359060608101359060800135610705565b61024c600480360360208110156103f857600080fd5b50356001600160a01b03166107a4565b600a5490565b600f5460105460115460125460135485565b60095490565b60035460045460055483565b6000546001600160a01b0316158061045457506000546001600160a01b031633145b610493576040805162461bcd60e51b815260206004820181905260248201526000805160206108cc833981519152604482015290519081900360640190fd5b600391909155600455565b60085490565b600e5490565b600c5490565b60135490565b600654600754600854600954600a54600b54600c54600d54600e5489565b6000546001600160a01b031615806104f657506000546001600160a01b031633145b610535576040805162461bcd60e51b815260206004820181905260248201526000805160206108cc833981519152604482015290519081900360640190fd5b60408051610120810182528a8152602081018a9052908101889052606081018790526080810186905260a0810185905260c0810184905260e0810183905261010001819052600698909855600796909655600894909455600992909255600a55600b55600c55600d55600e55565b60065490565b60045490565b6000546001600160a01b031615806105d157506000546001600160a01b031633145b610610576040805162461bcd60e51b815260206004820181905260248201526000805160206108cc833981519152604482015290519081900360640190fd5b600080546040516001600160a01b03909116907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908390a3600080546001600160a01b0319169055565b60115490565b6000546001600160a01b0316158061068257506000546001600160a01b031633145b6106c1576040805162461bcd60e51b815260206004820181905260248201526000805160206108cc833981519152604482015290519081900360640190fd5b600555565b6000546001600160a01b031690565b60035490565b60105490565b60125490565b60055490565b600f5490565b600b5490565b600d5490565b60075490565b6000546001600160a01b0316158061072757506000546001600160a01b031633145b610766576040805162461bcd60e51b815260206004820181905260248201526000805160206108cc833981519152604482015290519081900360640190fd5b6040805160a0810182528681526020810186905290810184905260608101839052608001819052600f94909455601092909255601155601255601355565b6000546001600160a01b031615806107c657506000546001600160a01b031633145b610805576040805162461bcd60e51b815260206004820181905260248201526000805160206108cc833981519152604482015290519081900360640190fd5b6001600160a01b03811661084a5760405162461bcd60e51b81526004018080602001828103825260268152602001806108a66026913960400191505060405180910390fd5b600080546040516001600160a01b03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a3600080546001600160a01b0319166001600160a01b039290921691909117905556fe4f776e61626c653a206e6577206f776e657220697320746865207a65726f20616464726573734f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572a265627a7a72315820151b6dde91ae309caa275ff65ccd2e06a0a697e866742649885f494068bbee1e64736f6c634300050b00324f776e61626c653a206e6577206f776e657220697320746865207a65726f20616464726573736080604052670de0b6b3a764000060015534801561001c57600080fd5b506040516111583803806111588339818101604052602081101561003f57600080fd5b5051600680546001600160a01b0319166001600160a01b0383161790556100653361007d565b50600580546001600160a01b031916331790556101c4565b6000546001600160a01b0316158061009f57506000546001600160a01b031633145b61010a57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b6001600160a01b038116610169576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260268152602001806111326026913960400191505060405180910390fd5b600080546040516001600160a01b03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a3600080546001600160a01b0319166001600160a01b0392909216919091179055565b610f5f806101d36000396000f3fe608060405234801561001057600080fd5b50600436106100b45760003560e01c8063be0522e011610071578063be0522e01461012e578063cff0ab9614610136578063e0a8ed521461013e578063f071db5a1461015b578063f2fde38b14610163578063fac8332114610189576100b4565b80631249c58b146100b957806318824ab3146100d35780634cef9e6f146100f2578063715018a6146100fa5780638da5cb5b14610102578063adffefe314610126575b600080fd5b6100c1610191565b60408051918252519081900360200190f35b6100f0600480360360208110156100e957600080fd5b503561021b565b005b6100c1610281565b6100f0610287565b61010a610332565b604080516001600160a01b039092168252519081900360200190f35b6100c1610341565b6100c16103d4565b61010a6103da565b6100f06004803603602081101561015457600080fd5b50356103e9565b6100c161044f565b6100f06004803603602081101561017957600080fd5b50356001600160a01b0316610455565b6100c1610556565b600080546001600160a01b031615806101b457506000546001600160a01b031633145b6101f3576040805162461bcd60e51b81526020600482018190526024820152600080516020610f0b833981519152604482015290519081900360640190fd5b6101fb6105ef565b600255610206610556565b600355610211610341565b6004819055905090565b6000546001600160a01b0316158061023d57506000546001600160a01b031633145b61027c576040805162461bcd60e51b81526020600482018190526024820152600080516020610f0b833981519152604482015290519081900360640190fd5b600355565b60035481565b6000546001600160a01b031615806102a957506000546001600160a01b031633145b6102e8576040805162461bcd60e51b81526020600482018190526024820152600080516020610f0b833981519152604482015290519081900360640190fd5b600080546040516001600160a01b03909116907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908390a3600080546001600160a01b0319169055565b6000546001600160a01b031690565b60006103cf600660009054906101000a90046001600160a01b03166001600160a01b031663741de1486040518163ffffffff1660e01b815260040160206040518083038186803b15801561039457600080fd5b505afa1580156103a8573d6000803e3d6000fd5b505050506040513d60208110156103be57600080fd5b50516003549063ffffffff610cbf16565b905090565b60025481565b6006546001600160a01b031681565b6000546001600160a01b0316158061040b57506000546001600160a01b031633145b61044a576040805162461bcd60e51b81526020600482018190526024820152600080516020610f0b833981519152604482015290519081900360640190fd5b600255565b60045481565b6000546001600160a01b0316158061047757506000546001600160a01b031633145b6104b6576040805162461bcd60e51b81526020600482018190526024820152600080516020610f0b833981519152604482015290519081900360640190fd5b6001600160a01b0381166104fb5760405162461bcd60e51b8152600401808060200182810382526026815260200180610ee56026913960400191505060405180910390fd5b600080546040516001600160a01b03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a3600080546001600160a01b0319166001600160a01b0392909216919091179055565b600080600560009054906101000a90046001600160a01b03166001600160a01b03166318160ddd6040518163ffffffff1660e01b815260040160206040518083038186803b1580156105a757600080fd5b505afa1580156105bb573d6000803e3d6000fd5b505050506040513d60208110156105d157600080fd5b50516002549091506105e9908263ffffffff610d0816565b91505090565b600080600560009054906101000a90046001600160a01b03166001600160a01b03166344d96e956040518163ffffffff1660e01b815260040160206040518083038186803b15801561064057600080fd5b505afa158015610654573d6000803e3d6000fd5b505050506040513d602081101561066a57600080fd5b5051600554604080516318160ddd60e01b815290519293506000926001600160a01b03909216916318160ddd91600480820192602092909190829003018186803b1580156106b757600080fd5b505afa1580156106cb573d6000803e3d6000fd5b505050506040513d60208110156106e157600080fd5b5051905060006106f7838363ffffffff610d1f16565b90506000806000600660009054906101000a90046001600160a01b03166001600160a01b0316639902f44e6040518163ffffffff1660e01b815260040160206040518083038186803b15801561074c57600080fd5b505afa158015610760573d6000803e3d6000fd5b505050506040513d602081101561077657600080fd5b505184101561093b576006546040805163c19e19b160e01b81529051610892926001600160a01b03169163c19e19b1916004808301926020929190829003018186803b1580156107c557600080fd5b505afa1580156107d9573d6000803e3d6000fd5b505050506040513d60208110156107ef57600080fd5b505160065460408051634c817a2760e11b8152905161088692610877926001600160a01b0390911691639902f44e91600480820192602092909190829003018186803b15801561083e57600080fd5b505afa158015610852573d6000803e3d6000fd5b505050506040513d602081101561086857600080fd5b5051889063ffffffff610d1f16565b6001549063ffffffff610d4c16565b9063ffffffff610d0816565b925061091e600660009054906101000a90046001600160a01b03166001600160a01b031663741de1486040518163ffffffff1660e01b815260040160206040518083038186803b1580156108e557600080fd5b505afa1580156108f9573d6000803e3d6000fd5b505050506040513d602081101561090f57600080fd5b5051849063ffffffff610cbf16565b600254909250610934908363ffffffff610d8e16565b9050610ab9565b6006546040805163c19e19b160e01b81529051610a43926001600160a01b03169163c19e19b1916004808301926020929190829003018186803b15801561098157600080fd5b505afa158015610995573d6000803e3d6000fd5b505050506040513d60208110156109ab57600080fd5b505160015460065460408051634c817a2760e11b815290516108869392610a37926001600160a01b0390911691639902f44e91600480820192602092909190829003018186803b1580156109fe57600080fd5b505afa158015610a12573d6000803e3d6000fd5b505050506040513d6020811015610a2857600080fd5b5051899063ffffffff610d1f16565b9063ffffffff610d4c16565b9250610a96600660009054906101000a90046001600160a01b03166001600160a01b031663741de1486040518163ffffffff1660e01b815260040160206040518083038186803b1580156108e557600080fd5b9150816002541115610ab557600254610934908363ffffffff610d4c16565b5060005b600660009054906101000a90046001600160a01b03166001600160a01b0316639cf974f06040518163ffffffff1660e01b815260040160206040518083038186803b158015610b0757600080fd5b505afa158015610b1b573d6000803e3d6000fd5b505050506040513d6020811015610b3157600080fd5b5051811115610bb757600660009054906101000a90046001600160a01b03166001600160a01b0316639cf974f06040518163ffffffff1660e01b815260040160206040518083038186803b158015610b8857600080fd5b505afa158015610b9c573d6000803e3d6000fd5b505050506040513d6020811015610bb257600080fd5b505190505b600660009054906101000a90046001600160a01b03166001600160a01b031663578116a36040518163ffffffff1660e01b815260040160206040518083038186803b158015610c0557600080fd5b505afa158015610c19573d6000803e3d6000fd5b505050506040513d6020811015610c2f57600080fd5b5051811015610cb557600660009054906101000a90046001600160a01b03166001600160a01b031663578116a36040518163ffffffff1660e01b815260040160206040518083038186803b158015610c8657600080fd5b505afa158015610c9a573d6000803e3d6000fd5b505050506040513d6020811015610cb057600080fd5b505190505b9550505050505090565b6000610d0183836040518060400160405280601a81526020017f536166654d6174683a206469766973696f6e206279207a65726f000000000000815250610de8565b9392505050565b6000670de0b6b3a76400008383025b049392505050565b6000670de0b6b3a7640000826ec097ce7bc90715b34b9f1000000000850281610d4457fe5b0481610d1757fe5b6000610d0183836040518060400160405280601e81526020017f536166654d6174683a207375627472616374696f6e206f766572666c6f770000815250610e8a565b600082820183811015610d01576040805162461bcd60e51b815260206004820152601b60248201527f536166654d6174683a206164646974696f6e206f766572666c6f770000000000604482015290519081900360640190fd5b60008183610e745760405162461bcd60e51b81526004018080602001828103825283818151815260200191508051906020019080838360005b83811015610e39578181015183820152602001610e21565b50505050905090810190601f168015610e665780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b506000838581610e8057fe5b0495945050505050565b60008184841115610edc5760405162461bcd60e51b8152602060048201818152835160248401528351909283926044909101919085019080838360008315610e39578181015183820152602001610e21565b50505090039056fe4f776e61626c653a206e6577206f776e657220697320746865207a65726f20616464726573734f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572a265627a7a72315820ce655e6d9bfce4a8cb87e18f7f31a05fea07b939c9688acfb3630d08299ebab564736f6c634300050b00324f776e61626c653a206e6577206f776e657220697320746865207a65726f2061646472657373',
  DEFAULT_PARAM: [],
  FUNCTION_TO_TEST: {
    name: 'totalSupply',
    param: [],
  },
  EXPECTED_RESULT: 5e27,
};

export const SMC4 = {
  ABI: [
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'address',
          name: '_delAddr',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: '_amount',
          type: 'uint256',
        },
      ],
      name: 'Delegate',
      type: 'event',
    },
  ],
};

export const DEPLOY_ACCOUNT = {
  address: '0x33e0F2015935f7F784B8D2642061fa16dd1d1056',
  privateKey:
    '0x5b8190400bc1d7381c66b7eae0fad13cc63b03b67f633276afc111a5dd69ac8a',
};

export const TX_TO_GET_EVENTS =
  '0x9df98f6c26e5d1933e28f5ff19176b64b11c2c12a08cacf176f13cc31d4f67c1';
