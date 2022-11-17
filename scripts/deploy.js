const hre = require("hardhat");

const main = async () => {
  const SampleContract = await hre.ethers.getContractFactory("Sample");
  const Sample = await PersonContract.deploy();

  await Sample.deployed();

  console.log("The Sample contract was deployed to: ", Sample.address);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runMain();

module.exports.tags = ["all", "sample"];
