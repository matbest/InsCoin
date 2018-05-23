pragma solidity ^0.4.10;

//import 'https://github.com/OpenZeppelin/zeppelin-solidity/contracts/token/ERC721/ERC721BasicToken.sol';
import 'https://github.com/OpenZeppelin/zeppelin-solidity/contracts/ownership/Ownable.sol';
import 'https://github.com/0xcert/ethereum-erc721/contracts/tokens/NFTokenEnumerable.sol';

contract myTest721Token is NFTokenEnumerable, Ownable
{
     // Payment stuff -- //


    uint256 ethinwei = 1000000000000000000; // This is 1 ETH
    mapping(address => uint) public balances;
    uint256 myPlotPrice;

     constructor() public payable
     {
        // constructor needs `payable` keyword.
        myPlotPrice = ethinwei/100;
    }

     function() public payable
     {
    // fallback `payable` function is needed for a contract to
    // accept ETH payments.
     }

    function SetPlotPrice(uint32 price) external  onlyOwner
    {
        myPlotPrice = price;
    }

    function sendEth() payable public returns (bool)
    {
        // Here, the ETH value being sent is available as `msg.value`.
        balances[msg.sender] = balances[msg.sender] + msg.value;
        // This function also takes in a message that is 32 chars max.
        // Also returns a bool as an example.
        return true;
    }

    // -- Payment stuff -- //

    struct Plot
    {
        uint32 x;
        uint32 y;
        address mintedBy;
        uint64 mintedAt;
    }

    /*** STORAGE ***/

    mapping (uint256 => Plot  ) myPlots;


    function ConvertPositionToUint256(uint32 x, uint32 y)  public pure returns (uint256)
    {
        uint256 output = uint256(x);
        output <<= 32;
        output+= uint256(y);
        return output;
    }

    function mint(uint32 x, uint32 y) public payable
    {
        require(msg.value == myPlotPrice);
        bool PlotAssigned = LocationAssigned(x,y) ;
        require (PlotAssigned == false,' sorry - Already assigned');

        uint256 id = ConvertPositionToUint256( x,  y);

        Plot storage plot = myPlots[id];
        plot.x = x;

        return _mint(msg.sender, id);


    }

    function burn(uint32 x, uint32 y) external
    {
        return _burn(msg.sender, ConvertPositionToUint256(x,y));
    }

    function LocationAssigned(uint32 x, uint32 y) public view returns (bool)
    {
        return exists( ConvertPositionToUint256(x,y));
    }

    function ownerOf(uint32 x, uint32 y) public view returns (address)
    {
        return ownerOf( ConvertPositionToUint256(x,y));
    }

    function getToken(uint256 _tokenId) external view returns (address mintedBy, uint64 mintedAt)
    {
        Plot memory plot = myPlots[_tokenId];

        mintedBy = plot.mintedBy;
        mintedAt = plot.mintedAt;
    }


    // -- Payment -- //
     function withdraw() external onlyOwner {
        msg.sender.transfer(address(this).balance);
    }

    function deposit(uint256 amount) payable public {
        require(msg.value == amount);
        // nothing else to do!
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
    // -- End of Payment -- //
}
