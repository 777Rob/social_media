//SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./Community.sol";
import "./CustomCommunity.sol";

contract CommunityFactory {
  using Counters for Counters.Counter;
  Counters.Counter private _communityIds;
  mapping(address => uint256) communities;
  address[] public allCommunities;

  // Create a community given nft address
  function createCommunity(address nftAddress)
    external
    returns (address community)
  {
    // require(
    //   communities[nftAddress] > 0,
    //   "CommunityFactory: COMMUNITY_FOR_GIVEN_NFT_EXISTS"
    // );
    // require(nftAddress != address(0), "CommunityFactory: ZERO_ADDRESS");

    bytes memory bytecode = type(Community).creationCode;
    bytes32 salt = keccak256(abi.encodePacked(nftAddress));
    assembly {
      community := create2(0, add(bytecode, 32), mload(bytecode), salt)
    }

    Community(community).initialize(nftAddress);

    communities[community] = _communityIds.current();
    _communityIds.increment();
    allCommunities.push(community);
  }

  // Mint an NFT
  function mintNft(string memory _name, string memory _ticker)
    external
    returns (address community)
  {
    bytes memory _byteCode = abi.encodePacked(
      type(CustomCommunity).creationCode,
      abi.encode(_name, _ticker)
    );
    bytes32 _salt = keccak256(abi.encode(_name, _ticker));
    address _collection;
    assembly {
      _collection := create2(0, add(_byteCode, 32), mload(_byteCode), _salt)
    }
    return _collection;
  }

  // Mint an NFT for user and create a community with specified parameters
  function createCustomCommunity(
    string memory _name,
    string memory _ticker,
    uint256 _memberLimit,
    uint256 _price
  ) external returns (address community) {
    address nft = this.mintNft(_name, _ticker);
    community = this.createCommunity(nft);
    CustomCommunity(nft).initialize(_memberLimit, msg.sender, _price);
  }
}
