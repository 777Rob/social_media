const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Deploy token", function () {
  it("Deployer should have right balance", async function () {
    const UserAttentionToken = await ethers.getContractFactory("UserAttentionToken");
    const uat = await UserAttentionToken.deploy(420420420);
    await uat.deployed();

    console.log(`Token contract deployed at address ${uat.address}`);
    
    const signer = await ethers.getSigner();
    expect(await uat.balanceOf(signer.address)).to.equal(420420420);
  });
});
