// //SPDX-License-Identifier: MIT
// pragma solidity ^0.8.1;
// import "@openzeppelin/contracts/access/AccessControl.sol";
// import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
// import "./UserAttentionToken.sol";

// contract AdvertismentControl is AccessControl {
//   /**
//    * @dev The token contract address
//    * This contract allows creation of advertisments and tracks activity related to those advertisments
//    */

//   bytes32 public constant ADVERTISER_VALIDATOR =
//     keccak256("ADVERTISER_VALIDATOR");

//   // Users that can create advertisments
//   bytes32 public constant ADVERTISER_ROLE = keccak256("ADVERTISER_ROLE");
//   IERC20 userAttentionToken;

//   constructor(address _userAttentionTokenAddress) {
//     _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);

//     userAttentionToken = IERC20(_userAttentionTokenAddress);
//   }

//   // Advertisment
//   struct Advertisment {
//     // ID
//     uint256 ID;
//     // Advertiser address
//     address advertiser;
//     // Users that reviewd advertisment
//     address[] reviewers;
//     // Total amount of tokens that will be distributed for the users that reviewd advertisment and creators they support
//     uint256 rewardBalance;
//     // Advertisment status
//     bool active;
//     // Users to target with advertisment
//     address[] targets;
//     // Min reward for user per review
//     uint256 rewardPerReview;
//   }

//   // ID => Advertisment
//   mapping(uint256 => Advertisment) public advertisments;

//   // User reward balances
//   mapping(address => uint256) public rewardBalances;

//   uint256 adCount = 0;
//   uint256 activeAdCount = 0;
//   uint256 advertiserCount = 0;

//   // Approve an addvertiser profile
//   function approveAddvertiser(address _advertiser)
//     external
//     onlyRole(ADVERTISER_VALIDATOR)
//   {
//     grantRole(ADVERTISER_ROLE, _advertiser);
//   }

//   // Remove approval for addvertiser profile
//   function removeAddvertiser(address _advertiser)
//     external
//     onlyRole(ADVERTISER_VALIDATOR)
//   {
//     revokeRole(ADVERTISER_ROLE, _advertiser);
//   }

//   // Check if user is supposed to see advertisement
//   function userInTargets(uint256 id, address user) public view returns (bool) {
//     for (uint256 i = 0; i < advertisments[id].targets.length; i++) {
//       if (advertisments[id].targets[i] == user) {
//         return true;
//       }
//     }

//     return false;
//   }

//   // Let advertiser to create advertisment
//   function createAdvertisment(
//     address[] calldata _reviewers,
//     uint256 _rewardBalance,
//     address[] calldata _targets
//   ) public onlyRole(ADVERTISER_ROLE) {
//     require(_rewardBalance > 0, "Reward balance must be greater than 0");
//     userAttentionToken.transferFrom(msg.sender, address(this), _rewardBalance);
//     adCount++;
//     Advertisment memory advertisment = advertisments[adCount];
//     advertisment.advertiser = msg.sender;
//     advertisment.targets = _targets;
//     advertisment.rewardBalance = _rewardBalance;
//     advertisment.active = false;
//   }

//   // Lets user to receive a reward after reading through advertisment
//   function claimAdvertisementReward(uint256 _advertismentID) external {
//     require(
//       advertisments[_advertismentID].active,
//       "Advertisment is not active"
//     );
//     require(
//       userInTargets(_advertismentID, msg.sender),
//       "The user is not in targets"
//     );
//     rewardBalances[msg.sender] += advertisments[_advertismentID]
//       .rewardPerReview;
//     advertisments[_advertismentID].rewardBalance -= advertisments[
//       _advertismentID
//     ].rewardPerReview;
//   }

//   // Getter for advertisment to show
//   function getAdvertismentToShow(address _user)
//     external
//     view
//     returns (uint256)
//   {
//     uint256 advertismentID = 0;
//     uint256 maxRewardPerView = 0;
//     for (uint256 i = 1; i <= adCount; i++) {
//       if (
//         advertisments[i].active &&
//         userInTargets(i, _user) &&
//         advertisments[i].rewardPerReview > maxRewardPerView
//       ) {
//         advertismentID = i;
//         maxRewardPerView = advertisments[i].rewardPerReview;
//         break;
//       }
//     }
//     return advertismentID;
//   }
// }
