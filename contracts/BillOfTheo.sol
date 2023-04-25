// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract BillOfTheo {
    string private _bill;

    constructor(string memory bill_) {
        _bill = bill_;
    }

    function readBill() public view virtual returns (string memory) {
        return _bill;
    }
}
