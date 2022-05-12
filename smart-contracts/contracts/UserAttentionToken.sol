//SPDX-License-Identifier: MIT
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
pragma solidity ^0.8.1;

contract UserAttentionToken is ERC20 {
  constructor(uint256 initialSupply) ERC20("UserAttentionToken", "UAT") {
    _mint(msg.sender, initialSupply);
  }
  
}
