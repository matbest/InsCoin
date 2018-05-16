ignoreMetamask = true;

/**
 * find out what network we are connected to
 *
 * @return {string}      The name of the network currently attached to this web page via Web3
 */
function GetNetworkVersion()
{
	var network = web3.version.network;
	console.log("Network ID is ", network);
  switch (network)
	{
    case "1":
      console.log('1 Ethereum mainnet');
      return 'mainnet';
      break
    case "2":
      console.log( '2 Ethereum deprecated Morden test network.');
      return 'Morden';
      break
    case "3":
      console.log( '3 Ethereum Ropsten test network.');
      return 'Ropsten';
      break
    case "4":
      console.log( '4 Ethereum Rinkeby test network.');
      return 'Rinkeby';
      break
    case "42":
      console.log( '42 Ethereum Kovan test network.');
      return 'Kovan';
      break
		case "5777":
      console.log( '5777 Local Ethereum Ganache.');
      return 'Ganache';
      break
    default:
      console.log( 'Ethereum unknown network.');
      return 'unknown';
      break;
    }
}
var contractAddresses = {
    'Ganache': '0xbfadb3e0db6e18c19abcabff493e02ebf7e2c772',
    'Ropsten': '0x39d059590ea9defb8574f3f2e2fb2447ea05515a'
};

var EthereumConnection = {
  connected: false,

  init: function()
  {
    var contract = this.GetContract();
    console.log("initiated ethereumcontract");
  },
  GetContractAddress: function(networkName)
  {
    return contractAddresses[networkName];
  },
  GetContract : function()
  {
    var networkName = GetNetworkVersion();
    var contractAddress = this.GetContractAddress(networkName);
    var plotContract = this.loadContract(contractAddress, ContractABI);
    if (plotContract != 'undefined')
      this.connected = true;
    else {
      console.error();
    }
    return plotContract;
  },


  loadContract : function (contractAddress, contractABI)
  {

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

  }


}

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
      var free = !res[0]
      func(free);
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
