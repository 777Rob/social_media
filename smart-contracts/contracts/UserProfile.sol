//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract UserProfile is ERC721, Ownable {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;

  // Avaialable categories 0 => 256
  enum Categories {
    Technology,
    Science,
    Films,
    Music,
    Psychology,
    Health,
    Travel,
    Books,
    History,
    Cooking,
    Sport,
    Fashion,
    Philosophy,
    Politics,
    Finance,
    Arts,
    Mathematics
  }

  constructor() ERC721("Profile", "PRF") {}

  struct Profile {
    uint256 id;
    address user;
    uint256 reputation;
    uint256[] interestCategories;
    uint256 lensProfileID;
  }

  // NFT ID => ProfileData
  mapping(uint256 => Profile) public profiles;
  //   Address of an user => profile nft id 
  mapping(address => uint256) public userProfile;

  function createProfile(
    uint256[] calldata _interestCategories,
    uint256 _lensProfileID
  ) external returns (uint256) {
    if (balanceOf(msg.sender) == 0) {
      // Get the next token ID
      uint256 newProfileId = _tokenIds.current();
      // Mint the profile nft
      _mint(msg.sender, newProfileId);

      // Link the profile nft to the data
      Profile memory newProfile ;
      newProfile.id = newProfileId;
        newProfile.user = msg.sender;
      newProfile.interestCategories = _interestCategories;
      newProfile.reputation = 0;
      newProfile.lensProfileID = _lensProfileID;
      userProfile[msg.sender] = newProfileId;
        profiles[newProfileId] = newProfile;
     // Increment tokenId counter
      _tokenIds.increment();
      
      return newProfileId;
    }
    return 0;
  }

  function getProfileData(uint256 id) external view returns(Profile memory){
      return profiles[id];
  }

// @Dev
    function setInterestCategories(uint256[] calldata newCategories) external{
        uint256 userProfileId = userProfile[msg.sender];
        profiles[userProfileId].interestCategories = newCategories;
    }
}
