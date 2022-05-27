export const AD_CONTROL_ABI = [
	{
		inputs: [
			{
				internalType: "uint64",
				name: "_subscriptionId",
				type: "uint64",
			},
			{
				internalType: "address",
				name: "_adProfileContract",
				type: "address",
			},
		],
		stateMutability: "nonpayable",
		type: "constructor",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "have",
				type: "address",
			},
			{
				internalType: "address",
				name: "want",
				type: "address",
			},
		],
		name: "OnlyCoordinatorCanFulfill",
		type: "error",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "bytes32",
				name: "role",
				type: "bytes32",
			},
			{
				indexed: true,
				internalType: "bytes32",
				name: "previousAdminRole",
				type: "bytes32",
			},
			{
				indexed: true,
				internalType: "bytes32",
				name: "newAdminRole",
				type: "bytes32",
			},
		],
		name: "RoleAdminChanged",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "bytes32",
				name: "role",
				type: "bytes32",
			},
			{
				indexed: true,
				internalType: "address",
				name: "account",
				type: "address",
			},
			{
				indexed: true,
				internalType: "address",
				name: "sender",
				type: "address",
			},
		],
		name: "RoleGranted",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "bytes32",
				name: "role",
				type: "bytes32",
			},
			{
				indexed: true,
				internalType: "address",
				name: "account",
				type: "address",
			},
			{
				indexed: true,
				internalType: "address",
				name: "sender",
				type: "address",
			},
		],
		name: "RoleRevoked",
		type: "event",
	},
	{
		inputs: [],
		name: "ADVERTISER_ROLE",
		outputs: [
			{
				internalType: "bytes32",
				name: "",
				type: "bytes32",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "ADVERTISER_VALIDATOR",
		outputs: [
			{
				internalType: "bytes32",
				name: "",
				type: "bytes32",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "AD_DISTRIBUTOR",
		outputs: [
			{
				internalType: "bytes32",
				name: "",
				type: "bytes32",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "DEFAULT_ADMIN_ROLE",
		outputs: [
			{
				internalType: "bytes32",
				name: "",
				type: "bytes32",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		name: "activeAdvertisments",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "adCount",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "advertiserCount",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		name: "advertisments",
		outputs: [
			{
				internalType: "address",
				name: "advertiser",
				type: "address",
			},
			{
				internalType: "uint256",
				name: "taskReward",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "rewardBalance",
				type: "uint256",
			},
			{
				internalType: "bool",
				name: "active",
				type: "bool",
			},
			{
				internalType: "uint256",
				name: "viewReward",
				type: "uint256",
			},
			{
				internalType: "string",
				name: "data",
				type: "string",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_advertiser",
				type: "address",
			},
		],
		name: "approveAddvertiser",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_taskReward",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "_rewardBalance",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "_viewReward",
				type: "uint256",
			},
			{
				internalType: "string",
				name: "_data",
				type: "string",
			},
		],
		name: "createAd",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [],
		name: "distributionCooldown",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		name: "eligibleUsers",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_userId",
				type: "uint256",
			},
		],
		name: "getAdvertismentToShow",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "bytes32",
				name: "role",
				type: "bytes32",
			},
		],
		name: "getRoleAdmin",
		outputs: [
			{
				internalType: "bytes32",
				name: "",
				type: "bytes32",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "bytes32",
				name: "role",
				type: "bytes32",
			},
			{
				internalType: "address",
				name: "account",
				type: "address",
			},
		],
		name: "grantRole",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "bytes32",
				name: "role",
				type: "bytes32",
			},
			{
				internalType: "address",
				name: "account",
				type: "address",
			},
		],
		name: "hasRole",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "lastDistribution",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "numDistributionsToCache",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		name: "onlineUsersWithAdBalance",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "requestId",
				type: "uint256",
			},
			{
				internalType: "uint256[]",
				name: "randomWords",
				type: "uint256[]",
			},
		],
		name: "rawFulfillRandomWords",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_advertiser",
				type: "address",
			},
		],
		name: "removeAddvertiser",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "bytes32",
				name: "role",
				type: "bytes32",
			},
			{
				internalType: "address",
				name: "account",
				type: "address",
			},
		],
		name: "renounceRole",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "bytes32",
				name: "role",
				type: "bytes32",
			},
			{
				internalType: "address",
				name: "account",
				type: "address",
			},
		],
		name: "revokeRole",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [],
		name: "s_owner",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		name: "s_randomWords",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "s_requestId",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "selectedPerDistribution",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "bytes4",
				name: "interfaceId",
				type: "bytes4",
			},
		],
		name: "supportsInterface",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256[]",
				name: "_onlineUsers",
				type: "uint256[]",
			},
			{
				internalType: "uint256[]",
				name: "_rewardedUsers",
				type: "uint256[]",
			},
			{
				internalType: "uint256[]",
				name: "_rewardTypes",
				type: "uint256[]",
			},
		],
		name: "updateOnlineUsers",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
];
