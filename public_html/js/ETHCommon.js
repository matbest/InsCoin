// --
// false = connect direct to localhost
// true = connect to web3 through MetaMask
// --
ignoreMetamask = true;

// use remix to deploy.
var contractAddresses = {
    'IPFS-Ganache': '0x1e172369189bdf35d0ab383c980c552c349dfedf',
    'DLand-Ganache': '0xcaf22b02250339642e73e6a3a2d9dc53653a30e8',
    'DLand-Ropsten': '0x39d059590ea9defb8574f3f2e2fb2447ea05515a'
};

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
		case "loading":
      console.log("Web3 hasn't loaded yet");
			//console.error("Web3 hasn't loaded yet");
      return 'loading';
      break
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


var EthereumConnection = {
  connected: false,

  init: function()
  {
    var contract = this.GetContract();
    console.log("initiated ethereumcontract");
  },
  GetContractAddress: function(networkName,scriptname)
  {
		if (networkName == "loading")
		  return contractAddresses['DLand-Ganache']; // if the network is unknown there is probably a bug im working on locally, so I'm most likely on ganache locally.
    var name = scriptname+ "-" + networkName;
    return contractAddresses[name];
  },
  GetContract : function()
  {
    var networkName = GetNetworkVersion();
    var contractAddress = this.GetContractAddress(networkName,"DLand");
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
