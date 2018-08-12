pragma solidity ^0.4.10;


import 'https://github.com/0xcert/ethereum-erc721/contracts/tokens/NFTokenEnumerable.sol';
import "@0xcert/ethereum-utils/contracts/ownership/Ownable.sol";


contract myInsureToken is NFTokenEnumerable,Ownable
{


    uint256 myEthinwei = 1000000000000000000; // This is 1 ETH
    mapping(address => uint) public balances;
    uint256 myMintPrice;
    mapping (uint256 => NFTObject  ) myNFTObjects;

    struct NFTObject
    {
        string myAddress;
        string myDescription;
        address myMintedBy;
        uint256 myCreationTime;
        uint256[] myDependancies;
        uint myValue;
    }

 constructor ()
    NFTokenEnumerable()
    public payable
  {
      myMintPrice =  0;
  }

  /* Implements a mint function which allows us and only us to
   * issue a new NFToken. NFToken implements only _mint function
   * which does all the heavy work creating the token, but we
   * need to provide a proper wrapper function with desired
   * access permissions.
   * @param _owner NFToken owner address.
   * @param _id Unique NFToken ID.
   */
  function mint(  uint256 _id ,string ipfsAddress, string description, uint256[] _addresses,uint _value) public payable
  {
        require(msg.value == myMintPrice);
        NFTObject storage tmp = myNFTObjects[_id];
        tmp.myAddress = ipfsAddress;
        tmp.myMintedBy = msg.sender;
        tmp.myCreationTime = now;
        tmp.myDescription = description;
        tmp.myDependancies = _addresses;

        uint arrayLength = _addresses.length;
        uint totalValue;
        for (uint i=0; i<arrayLength; i++)
        {
            //totalValue += mappedUsers[addressIndices[i]];
           totalValue += myNFTObjects[_addresses[i]].myValue;
        }
        tmp.myValue = totalValue+=_value;

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

    /* These are the functions to retrieve the content of the tokens */

    function GetTokenData( uint256 tokenID) public view returns (string,string, uint,uint256,address)
    {
        return (myNFTObjects[tokenID].myAddress,
                myNFTObjects[tokenID].myDescription,
                myNFTObjects[tokenID].myValue,
                myNFTObjects[tokenID].myCreationTime,
                myNFTObjects[tokenID].myMintedBy);

    }

    function GetTokenIPFSAddress( uint256 tokenID) public view returns (string)
    {
        return myNFTObjects[tokenID].myAddress;
    }

    function GetTokenDescription( uint256 tokenID) public view returns (string)
    {
        return myNFTObjects[tokenID].myDescription;
    }

     function GetTokenValue( uint256 tokenID) public view returns (uint)
    {
        return myNFTObjects[tokenID].myValue;
    }

    function GetTokenDependencies( uint256 tokenID) public view returns (uint256[])
    {
        return myNFTObjects[tokenID].myDependancies;
    }

    function GetTokenCreationTime( uint256 tokenID) public view returns (uint256)
    {
        return myNFTObjects[tokenID].myCreationTime;
    }
       function GetTokenMinter( uint256 tokenID) public view returns (address)
    {
        return myNFTObjects[tokenID].myMintedBy;
    }

    /*What is the Eth Mint Price*/
    function GetMintPriceInWEI() view external  returns(uint256)
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
