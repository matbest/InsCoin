var contractAddress = '0xda6554fdca483b215f0b736930661bc8f335ce46';

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



loadScript("web3.js", ETHinters);
loadScript("ethjs.js", ETHinters);
 ethinwei = 1000000000000000000; // This is 1 ETH

ignoreMetamask = true;

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

function loadContract(contractAddress, contractABI)
{
  var ignoreMetamask = true;



  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (ignoreMetamask == false && typeof web3 !== 'undefined')
	{
    // Use Mist/MetaMask's provider
		 console.log('Web3 Detected! ' + web3.currentProvider.constructor.name);
    web3js = new Web3(web3.currentProvider);
		ethlocal = new Eth(web3js.currentProvider);
  }
	else
	{
    console.log('No web3? You should consider trying MetaMask!')
		console.log("would have been nice to use ", web3.currentProvider);
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    web3js = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
		ethlocal = new Eth(web3js.currentProvider);
  }

  var ethlocal = new Eth(web3js.currentProvider);
	var contractAbi = ethlocal.contract(contractABI);
	var contract = contractAbi.at(contractAddress);
  return contract;
	//myContract.getPoints.call().then(function(a){a,console.log(a[0].words,a,a.toString(),+a.toString(),'Bananas');});

}

function isAvailable(x,y,func)
{

  var plotContract = loadContract(contractAddress, ContractABI);
  var activeAccount = GetAccountAddress();

  var available = false;
  plotContract.LocationAssigned(x,y,function(err, res){
    if (err)
    {
      console.log('Hmm, there was an error' + String(err));
    }
    else
    {
      console.log('Making sending with tx hash: ' + String(res));
      var free = !res[0]
      func(free);
    }
  });
}

function GetPlotPrice(func)
{
  var plotContract = loadContract(contractAddress, ContractABI);
  //var activeAccount = GetAccountAddress();

//  var a =   plotContract.myPlotPrice;


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

  var plotContract = loadContract(contractAddress, ContractABI);
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
