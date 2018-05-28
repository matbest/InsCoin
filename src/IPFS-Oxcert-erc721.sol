pragma solidity ^0.4.10;


import 'https://github.com/0xcert/ethereum-erc721/contracts/tokens/NFTokenEnumerable.sol';

contract muyIPFSToken is NFTokenEnumerable
{
     // Payment stuff -- //


    uint256 myEthinwei = 1000000000000000000; // This is 1 ETH
    mapping(address => uint) public balances;
    uint256 myMintPrice;
    mapping (uint256 => Plot  ) myPlots;

 constructor ()
    NFTokenEnumerable()
    public payable
  {
      myMintPrice =  10000000000000000;
  }

  /* Implements a mint function which allows us and only us to
   * issue a new NFToken. NFToken implements only _mint function
   * which does all the heavy work creating the token, but we
   * need to provide a proper wrapper function with desired
   * access permissions.
   * @param _owner NFToken owner address.
   * @param _id Unique NFToken ID.
   */
  function mint(  uint256 _id ,string ipfsAddress) public payable
  {
        require(msg.value == myMintPrice);
        Plot storage plot = myPlots[_id];
        plot.myAddress = ipfsAddress;
        super._mint(msg.sender, _id);


  }

  /* Burns a NFToken. NFToken already implements internal _burn
   * function (the same as for _mint). Here we only provide a wrapper
   * function with proper access permissions.
   * @param _owner NFToken owner address.
   * @param _id Unique NFToken ID.
   */
  function burn(
    address _owner,
    uint256 _tokenId
  )
    onlyOwner
    external
  {
    super._burn(_owner, _tokenId);
  }

    function GetIPFSAddress( uint256 tokenID) public view returns (string)
    {
        return myPlots[tokenID].myAddress;
    }

        function GetMintPrice() view external  returns(uint256)
    {
        return myMintPrice ;
    }



     function() public payable
     {
    // fallback `payable` function is needed for a contract to
    // accept ETH payments.
     }

    function SetMintPrice(uint32 price) external  onlyOwner
    {
        myMintPrice = price;
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
        string myAddress;
        address mintedBy;
    }

    /*** STORAGE ***/


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
