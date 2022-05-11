const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Create profile", function () {
  it("It should create a profile", async function () {
    const UserProfile = await ethers.getContractFactory("UserProfile");
    const userProfile = await UserProfile.deploy();
    await userProfile.deployed();

    console.log(`UserProfile contract deployed at address ${userProfile.address}`);

    const interestCategories = [1, 2];
    const lensProfileId = 420;
    await userProfile.createProfile(interestCategories, lensProfileId);
    const profileData = await userProfile.getProfileData(0);

    console.log("User profile created");
    expect(profileData[3][0]).to.equal(ethers.BigNumber.from("1"));
    expect(profileData[4]).to.equal(ethers.BigNumber.from("420"));
  });
});
