//SPDX-License-Identifier: MIT
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
pragma solidity ^0.8.1;

contract Community {
  address public factory;
  address public nftContract;
  using Counters for Counters.Counter;
  Counters.Counter private memberCount;
  Counters.Counter private memberIds;
  IERC721 public collection;

  struct MemberInfo {
    uint256 joined;
    uint256 nftCount;
    string userName;
    bool currentMember;
    uint256 id;
    address _address;
  }

  mapping(uint256 => MemberInfo) public members;
  mapping(address => mapping(uint256 => MemberInfo)) public getMember;

  constructor() public {
    factory = msg.sender;
  }

  // called once by the factory at time of deployment
  function initialize(address _nftContract) external {
    require(msg.sender == factory, "Community: FORBIDDEN");
    nftContract = _nftContract;
    collection = IERC721(_nftContract);
  }

  function getNftBalance(address _user)
    internal
    view
    returns (uint256 balance)
  {
    balance = collection.balanceOf(_user);

    return balance;
  }

  function joinCommunity() external {
    uint256 nftBalance = getNftBalance(msg.sender);
    require(nftBalance > 0, "Community: NOT ELIGIBLE");
    require(members[msg.sender].currentMember != true, "ALREADY MEMBER");

    MemberInfo memory member;
    member.joined = block.timestamp;
    member.nftBalance = nftBalance;
    member.userName = "";
    member.currentMember = true;
    member.id = memberIds;
    member._address = msg.sender;
    members[memberIds.current()] = member;
    getMember[msg.sender] = members[memberIds.current()];
    memberIds.increment();
  }

  function sync() public {
    uint256 _balance;
    for (uint256 i = 0; i < memberIds.current(); i++) {
      _balance = getNftBalance(getMember[i]._address);
      if (_balance > 0) {
        members[i].nftCount = _balance;
        members[i].currentMember = true;
      } else {
        members[i].currentMember = false;
      }
    }
  }
}
