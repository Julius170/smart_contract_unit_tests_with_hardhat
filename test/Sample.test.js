const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("Sample", async function () {
  let sample;
  let deployer;
  let accounts;
  let addrs2;
  let sendValue = ethers.utils.parseEther("0.0252");
  beforeEach(async function () {
    accounts = await ethers.getSigners();
    deployer = accounts[0];
    addrs2 = accounts[5];
    Sample = await ethers.getContractFactory("Sample");
    sample = await Sample.deploy();
  });

  describe("contructor", async function () {
    it("sets the variable fav_number to 200", async function () {
      const response = await sample.fav_num();
      const result = 200;
      expect(response).to.equal(result);
    });

    it("sets the deployer of the contract to the owner of the contract.", async function () {
      response = await sample.owner();
      const result = deployer.address;
      expect(response).to.equal(result);
    });
  });

  describe("store", async function () {
    it("updates the value of the variable fav_num", async function () {
      await sample.store(3000);
      const response = await sample.retrieve();
      const result = 3000;
      expect(response).to.equal(result);
    });
  });
  describe("changeOwner", async function () {
    it("only allows the owner of the contract to call this function", async function () {
      await expect(
        sample.connect(addrs2).changeOwner(addrs2.address)
      ).to.be.revertedWith("Caller is not the owner");
    });

    it("successfully changes the owner of the contract", async function () {
      await sample.connect(deployer).changeOwner(addrs2.address);
      const response = await sample.owner();
      const result = addrs2.address;
      await expect(response).to.equal(result);
    });
  });
  describe("fundIn", async function () {
    it("fails if anyone to send less than 0.01 ETH to the contract", async function () {
      const response = sample.fundIn();
      await expect(response).to.be.revertedWith(
        "you need to send at least 0.01 ETH"
      );
    });

    it("successfully transfer the right amount into the contract", async function () {
      const balanceBeforeFunding = await deployer.getBalance();
      await sample.fundIn({ value: sendValue });
      // const balanceAfterFunding;
      response = await deployer.getBalance();
      result = response += BigInt(sendValue);
      await expect(response).to.equal(result);
    });
  });
  describe("withdraw", async function () {
    it("fails if the withdrawer is not the owner of the contract", async function () {
      await expect(sample.connect(addrs2).withdraw(BigInt(sendValue))).to.be
        .reverted;
    });

    it("should withdraw the correct amount", async function () {
      withdrawAmount = ethers.utils.parseUnits("1", "ether");
      await expect(sample.withdraw(withdrawAmount)).to.be.reverted;
    });
  });
});
