//SPDX-License-Identifier: MIT
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "hardhat/console.sol";

pragma solidity ^0.8.0;

contract UserAttentionToken is ERC20 {
  constructor(uint256 initialSupply) ERC20("UserAttentionToken", "UAT") {
    _mint(msg.sender, initialSupply);
  }
}
