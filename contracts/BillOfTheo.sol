// contracts/BillOfTheo.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract BillOfTheo is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("BillOfTheo", "BOT") {}

    function writeBill(address owner, string memory bill)
        public
        returns (uint256)
    {
        uint256 newBill = _tokenIds.current();
        _mint(owner, newBill);
        _setTokenURI(newBill, bill);

        _tokenIds.increment();
        return newBill;
    }
}