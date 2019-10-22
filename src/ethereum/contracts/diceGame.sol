pragma solidity ^0.5.12;

contract DiceGame {
    address public manager;
    uint public gameId;
    uint public nextGameMinimumBet;
    uint public nextGameMaximumBet;
    uint private canBeTransferredToServerMoney;



    modifier isManager() {
        require(msg.sender == manager, "Only manager can call this function");
        _;
    }

    constructor(uint _minimumBet) public {
        manager = msg.sender;
        _minimumBet = 1;
        gameId = 1;
    }

    function transferMoneyToServer(uint _money) isManager public {
        require(_money <= canBeTransferredToServerMoney, "Money is more than required money");
        msg.sender.transfer(_money);
    }

    function getAllRequiredMoney() isManager public {
        msg.sender.transfer(canBeTransferredToServerMoney);
    }

    function signData(bytes memory dataToSign) pure public returns (bytes32) {
        return sha256(dataToSign);
    }

}