function loadScript(url, callback)
{
    // Adding the script tag to the head as suggested before
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;

    // Then bind the event to the callback function.
    // There are several events for cross browser compatibility.
    script.onreadystatechange = callback;
    script.onload = callback;

    // Fire the loading
    head.appendChild(script);
}


loadScript("js/web3.js", ETHinters);
loadScript("js/ethjs.js", ETHinters);



 ethinwei = 1000000000000000000; // This is 1 ETH



function GetAccountAddress()
{
	if (ignoreMetamask == true)
	{
		return '0x7099B34900d2A33AA124fc5bA2a8a90E5dD5EBE1';
	}
	else
	{
		return web3.eth.accounts[0];
	}
}



function isAvailable(x,y,func)
{

  var plotContract =EthereumConnection.GetContract();
//  var activeAccount = GetAccountAddress();
  var available = false;
  plotContract.LocationAssigned(x,y,function(err, res){
    if (err)
    {
      console.log('Hmm, there was an error' + String(err));
    }
    else
    {
      console.log('Making sending with tx hash: ' + String(res));
      var isAvailable = !res[0]
      func(isAvailable);
    }
  });
}

function GetPlotPrice(func)
{
  //var plotContract = loadContract(contractAddress, ContractABI);
  var plotContract = EthereumConnection.GetContract();

  plotContract.GetPlotPrice.call().then(function(a)
  {
    console.log(a.toString(10));
    price = Number(a[0]);
    price /=ethinwei;
    func(price.toString())
  });

}
function MintPlot(x,y)
{
  var message = 'Hello World!';
  var EthinWei = 1000000000000000000; // This is 1 ETH
  var price = 0.01*EthinWei;

  var plotContract = EthereumConnection.GetContract();
  var activeAccount = GetAccountAddress();

  plotContract.mint(x,y, {from: activeAccount, value: price, gas: 1000000},function(err, res){
    if (err)
    {
      console.log('Plot Failed to buy, because:' + String(err));
    }
    else
    {
      console.log('plot Bought! ' + String(res));
    }
  });

}

var ETHinters = function()
{
  console.log("ethinters loaded");
}
