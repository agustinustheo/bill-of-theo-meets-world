import * as fs from "fs";
import * as path from "path";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("BillOfTheo", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployBillOfTheo() {
    const utf8decoder = new TextDecoder();
    const billOfTheo = utf8decoder.decode(
      fs.readFileSync(
        path.join(__dirname, "../scripts/example-theo.html"),
        null
      )
    ) as string;

    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const BillOfTheo = await ethers.getContractFactory("BillOfTheo");
    const bill = await BillOfTheo.deploy();

    return { bill, billOfTheo, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should set the right billOfTheo", async function () {
      const { bill, billOfTheo, owner } = await loadFixture(deployBillOfTheo);

      const tokenId = (await bill.writeBill(owner.address, billOfTheo)).value;

      expect(await bill.tokenURI(tokenId)).to.equal(billOfTheo);
    });
  });
});
