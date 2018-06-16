function consoleLog(thisString)
{
  console.log(thisString);
  var oldcontent = document.getElementById("console").innerHTML;
  var html = thisString + "<br>" + oldcontent;
  document.getElementById("console").innerHTML = html;
}
function consoleErrorLog(thisString)
{
  console.log(thisString);
  var oldcontent = document.getElementById("console").innerHTML;
  var html = thisString + "<br>" + oldcontent;
  document.getElementById("console").innerHTML = html;
}

function GetMintPrice(func)
{
  //var plotContract = loadContract(contractAddress, ContractABI);
  var contract = EthereumConnection.GetContract();

  contract.GetMintPriceInWEI.call().then(function(a)
  {
    //console.log(a.toString(10));
    price = Number(a[0]);
    price /=ethinwei;
    func(price.toString())
  });
}

function myTest()
{

  var contract = EthereumConnection.GetContract("IPFS");
  contract.GetMintPriceInWEI(function(err, res){
    if (err)
    {
        document.getElementById("testbutton").innerHTML = "Not Connected to Ethereum Error!";
    }
    else
    {
      price = Number(res[0]);
      if (price == 10000000000000000)
        document.getElementById("testbutton").innerHTML = "OK!";
        else {
          document.getElementById("testbutton").innerHTML = "C Error!";
        }
    }
  });
}
