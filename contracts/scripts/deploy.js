// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {

  const Request = await hre.ethers.getContractFactory("Request");
  const deployer = await Request.deploy("0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9");

  await deployer.deployed();

  console.log("loanContract deployed to :", deployer.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
