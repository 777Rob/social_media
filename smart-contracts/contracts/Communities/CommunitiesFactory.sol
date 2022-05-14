//SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./Community.sol";

contract CommunityFactory {
  using Counters for Counters.Counter;
  Counters.Counter private _communityIds;
  mapping(address => uint256) communities;
  address[] public allCommunities;

  function createCommunity(address nftAddress)
    external
    returns (address community)
  {
    require(
      communities[nftAddress] != address(0),
      "CommunityFactory: COMMUNITY_FOR_GIVEN_NFT_EXISTS"
    );
    require(communities != address(0), "CommunityFactory: ZERO_ADDRESS");

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
}
