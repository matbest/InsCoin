pragma solidity ^0.4.10;

import 'https://github.com/OpenZeppelin/zeppelin-solidity/contracts/token/ERC721/ERC721BasicToken.sol';
import 'https://github.com/OpenZeppelin/zeppelin-solidity/contracts/token/ERC721/ERC721.sol';

contract myTest721Token is ERC721BasicToken 
{

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

    function mint(uint32 x, uint32 y) external
    {
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

}
