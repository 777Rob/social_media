//SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract CustomCommunity is ERC721, Ownable {
  using Counters for Counters.Counter;
  uint256 memberLimit;
  Counters.Counter private _tokenIdCounter;
  address factory;
  uint256 price;

  constructor(string memory _name, string memory _ticker)
    ERC721(_name, _ticker)
  {
    factory = msg.sender;
  }

  function initialize(
    uint256 _memberLimit,
    address _owner,
    uint256 _price
  ) external {
    require(msg.sender == factory, "CUSTOM_COMMUNITY: NOT_FACTORY");
    require(msg.sender == factory, "Community: FORBIDDEN");
    memberLimit = _memberLimit;
    safeMint(_owner);
    price = _price;
    _transferOwnership(_owner);
  }

  function safeMint(address to) public onlyOwner {
    uint256 tokenId = _tokenIdCounter.current();
    _tokenIdCounter.increment();
    _safeMint(to, tokenId);
  }

  function mint() public payable {
    require(msg.value >= price, "CUSTOM_COMMUNITY: NOT_ENOUGH");
    uint256 tokenId = _tokenIdCounter.current();
    require(tokenId < memberLimit, "CUSTOM_COMMUNITY: MEMBER_LIMIT_REACHED");
    _tokenIdCounter.increment();
    _safeMint(msg.sender, tokenId);
  }
}
