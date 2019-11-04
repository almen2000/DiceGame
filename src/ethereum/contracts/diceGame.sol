pragma solidity ^0.5.12;

contract DiceGame {
    address public manager;
    uint public gameId;
    uint public nextGameMinimumBet;
    uint public nextGameMaximumBet;
    uint public prevGameStartTime;
    uint private canBeTransferredToServerMoney;

    struct Player {
        bytes32 userHash;
        uint betValue;
        bool received;
    }

    struct Game {
        mapping(address => Player) players;
        uint8 dice1;
        uint8 dice2;
        uint gameBalance;
        uint minimumBet;
    }

    mapping(uint => Game) games;

    modifier isManager() {
        require(msg.sender == manager, "Only manager can call this function");
        _;
    }

    modifier between1and6(uint8 dice1, uint8 dice2) {
        require(dice1 >= 1 && dice1 <= 6 && dice2 >= 1 && dice2 <= 6, "One of the dices are not between 1 and 6");
        _;
    }

    constructor(uint _minimumBet, uint _maximumBet) public {
        manager = msg.sender;
        _minimumBet = 1;
        _maximumBet = 1;
        gameId = 1;
    }

    function transferMoneyToServer(uint _money) isManager public {
        require(_money <= canBeTransferredToServerMoney, "Money is more than required money");
        msg.sender.transfer(_money);
    }

    function getAllRequiredMoney() isManager public {
        msg.sender.transfer(canBeTransferredToServerMoney);
    }

    function hash(uint8 dice1, uint8 dice2, string memory password) public pure between1and6(dice1, dice2) returns (bytes32) {
        return keccak256('7');
    }

    function hashUserBet(uint8 dice1, uint8 dice2, string memory password) private pure returns (bytes32) {
        bytes memory _password = bytes(password);
        uint length = _password.length;
        bytes memory strToHash = new bytes(length + 2);
        for (uint8 _i = 0; _i < length; _i++) strToHash[_i] = _password[_i];
        strToHash[length] = byte(48 + dice1);
        strToHash[length + 1] = byte(48 + dice2);
        return keccak256(strToHash);
    }

    function f() public view returns (uint) {
        return address(this).balance;
    }

    function transfer() public payable {}

}