//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract AdProfile is ERC721, Ownable {
  using Counters for Counters.Counter;
  Counters.Counter public _profileIds;

  mapping(uint256 => Profile) public profiles;

  constructor() ERC721("AdProfile", "AdProfile") {}

  // Profile
  struct Profile {
    // Address of the user
    address user;
    // Reputation of the user will be used to determine eligibility to see ads
    uint256 reputation;
    // Amount of advertisments the user is eligible to see and earn reward
    uint256 adBalance;
    // Pending reward balance
    uint256 rewardBalance;
  }

  // NFT ID => ProfileData

  // Get profile id of the user of the given address
  function profileFromAddress(address _addr)
    internal
    view
    returns (uint256 profileId)
  {
    for (uint256 i = 0; i < _profileIds.current(); i++) {
      if (profiles[i].user == _addr) {
        return i;
      }
    }
  }

  // Profile Creation
  function createProfile() external returns (uint256) {
    // Check if user already has a profile
    require(balanceOf(msg.sender) == 0, "User already has a profile");
    // Get the next token ID
    uint256 newProfileId = _profileIds.current();

    // Mint the profile nft
    _mint(msg.sender, newProfileId);

    // Link the profile nft to the data
    Profile memory newProfile;
    newProfile.user = msg.sender;
    newProfile.reputation = 0;
    profiles[newProfileId] = newProfile;

    // Increment tokenId counter
    _profileIds.increment();

    return newProfileId;
  }

  // Adds rewards to users changes reward limit
  function updateUsers(
    // Rewarded users
    uint256[] calldata _rewardedUsers,
    // Reward amounts
    uint256[] calldata _rewardAmounts
  ) external {
    // Update user profiles

    for (uint256 i = 0; i < _rewardedUsers.length; i++) {
      profiles[_rewardedUsers[i]].rewardBalance += _rewardAmounts[i];
      profiles[_rewardedUsers[i]].adBalance--;
    }
  }

  // Get users with ad balance greater than 0
  function getUsersWithBalance(
    // User ids
    uint256[] calldata _users
  ) external view returns (uint256[] memory) {
    uint256[] memory usersWithBalance;
    uint256 usersWithBalanceC = 0;

    for (uint256 i = 0; i < _users.length; i++) {
      if (profiles[_users[i]].adBalance > 0) {
        usersWithBalance[usersWithBalanceC] = _users[i];
        usersWithBalanceC++;
      }
    }

    return usersWithBalance;
  }

  function getUserAdBalance(uint256 _userId)
    external
    returns (uint256 adBalance)
  {
    return profiles[_userId].adBalance;
  }

  // Get profile data of the user
  function getProfileData(uint256 id) external view returns (Profile memory) {
    return profiles[id];
  }
}
