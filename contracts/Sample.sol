// contracts/Box.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Sample {
    address public owner;
    uint256 public fav_num;

    constructor() {
        owner = msg.sender;
        fav_num = 200;
    }

    // Stores a new value in the contract
    function store(uint256 _number) public {
        fav_num = _number;
    }

    // Reads the last stored value
    function retrieve() public view returns (uint256) {
        return (fav_num);
    }

    // event for EVM logging

    // modifier to check if caller is owner
    modifier isOwner() {
        require(msg.sender == owner, "Caller is not the owner");
        _;
    }

    function changeOwner(address newOwner) public isOwner {
        owner = newOwner;
    }

    function fundIn() public payable {
        require(
            msg.value >= 0.01 * 10**18,
            "you need to send at least 0.01 ETH"
        );
    }

    // function withdraw(uint256 _amount) public payable isOwner {
    //     payable(owner).transfer(_amount);
    //     // require(success, "Transfer Failed");
    // }
    function withdraw(uint _amount) public payable {
        // users can only withdraw .1 ETH at a time, feel free to change this!
        require(_amount <= 100000000000000000);
        payable(msg.sender).transfer(_amount);
    }
}
