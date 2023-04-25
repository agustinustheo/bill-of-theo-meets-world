import * as fs from "fs";
import * as path from "path";
import { ethers } from "hardhat";

async function main() {
  const utf8decoder = new TextDecoder();
  const billOfTheo = utf8decoder.decode(
    fs.readFileSync(
      path.join(__dirname, "./example-theo.html"),
      null
    )
  ) as string;

  const BillOfTheo = await ethers.getContractFactory("BillOfTheo");
  const bill = await BillOfTheo.deploy(billOfTheo);

  await bill.deployed();

  console.log(
    `BillOfTheo deployed to ${bill.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
