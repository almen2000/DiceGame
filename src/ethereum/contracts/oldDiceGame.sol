pragma solidity ^0.5.11;

contract DiceGame {
    address public manager;
    uint public gameId;
    bool public gameStarted;
    
    struct Player {
        bytes32 hashValue;
        uint betValue;
        bool received;
    }
    struct Game {
        mapping(address => Player) players;
        address[] playerAddresses;
        uint8 winningValue;
        uint winnerCount;
        uint allWinnersBalance;
        uint restBalance;
        uint gameBalance;
        uint minimumBet;
    }
    mapping(uint => Game) games;
    
    modifier between1and12(uint value) {
        require(value >= 1 && value <= 12, "The number is not from 1 to 12");
        _;
    }
    
    modifier isManager() {
        require(msg.sender == manager, "Only manager can call this function");
        _;
    }
    
    constructor() public {
        manager = msg.sender;
        gameId = 0;
    }
    
    function setUserBetAndHash(bytes32 hashValue) public payable {
        address senderAddress = msg.sender;
        require(senderAddress != manager, "Manager cannot bet a value");
        require(games[gameId].players[senderAddress].hashValue == 0, "Player already bet number");
        require(msg.value > games[gameId].minimumBet, "You Bet less then minimumBet");
        games[gameId].players[senderAddress].hashValue = hashValue;
        games[gameId].players[senderAddress].betValue = msg.value;
        games[gameId].playerAddresses.push(senderAddress);
        games[gameId].gameBalance += msg.value;
    }
    
    function checkUserValue(uint8 userValue, uint _gameId) private view between1and12(userValue) returns (bool) {
        require(!games[_gameId].players[msg.sender].received, "Player already receive a money");
        require(_gameId >= 0 && _gameId < gameId, "Game is not ended");
        require(userValue == games[_gameId].winningValue, "User input does not match winning value");
        bytes32 userHash = keccak256(abi.encode(userValue));
        require(userHash == games[_gameId].players[msg.sender].hashValue, "User input does not match its hash");
        return true;
    }
    
    function receiveMoney(uint8 userValue, uint _gameId) public payable returns (bool) {
        if (checkUserValue(userValue, _gameId)) {
            uint money = games[_gameId].players[msg.sender].betValue * games[_gameId].gameBalance / games[_gameId].allWinnersBalance;
            msg.sender.transfer(money);
            games[_gameId].restBalance -= money;
            return true;
        } else {
            return false;
        }
    }
    
    function setServerValue(uint8 dice) private between1and12(dice) {
        games[gameId].winningValue = dice;
    }
    
    function setGame() private {
        address[] storage gamePlayerAdresses = games[gameId].playerAddresses;
        uint length = gamePlayerAdresses.length;
        
        for (uint i = 0; i < length; i++) {
            bytes32 playerHash = games[gameId].players[gamePlayerAdresses[i]].hashValue;
            if (playerHash == keccak256(abi.encode(games[gameId].winningValue))) {
                games[gameId].winnerCount++;
                games[gameId].allWinnersBalance += games[gameId].players[gamePlayerAdresses[i]].betValue;
            }
        }
        
        games[gameId].restBalance = games[gameId].gameBalance;
    }
    
    function startGame(uint8 dice, uint _minimumBet) public isManager returns (bool) {
        require(!gameStarted, "It is not start Game");
        gameStarted = true;
        games[0].minimumBet = _minimumBet;
        setServerValue(dice);
        return true;
    }
    
    function newGame(uint8 dice, uint _minimumBet) public isManager returns (bool) {
        require(gameStarted, "The game did not start");
        setGame();
        gameId++;
        games[gameId].minimumBet = _minimumBet;
        setServerValue(dice);
        return true;
    }
    
    function getGameById(uint id) public view returns(uint8 winningValue, uint restBalance, uint gameBalance, uint minimumBet) {
        return (
            games[id].winningValue,
            games[id].restBalance,
            games[id].gameBalance,
            games[id].minimumBet
        );
    }
    
    // function getBalance() public view returns(uint) {
    //     return address(this).balance;
    // }
    
}