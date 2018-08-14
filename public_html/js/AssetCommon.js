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

        document.getElementById("testbutton").innerHTML = "Contract not working";
        if (!web3.isConnected() )
        {
          consoleErrorLog("**Ethererum Not Conencted**");

        }
        consoleErrorLog(GetNetworkVersion() );
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

function timeConverter(UNIX_timestamp)
{
var a = new Date(UNIX_timestamp * 1000);
var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
var year = a.getFullYear();
var month = months[a.getMonth()];
var date = a.getDate();
var hour = a.getHours();
var min = a.getMinutes();
var sec = a.getSeconds();
var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
return time;
}

function timenow(){
    var now= new Date(),
    ampm= 'am',
    h= now.getHours(),
    m= now.getMinutes(),
    s= now.getSeconds();
    if(h>= 12){
        if(h>12) h -= 12;
        ampm= 'pm';
    }

    if(m<10) m= '0'+m;
    if(s<10) s= '0'+s;
    return now.toLocaleDateString()+ ' ' + h + ':' + m + ':' + s + ' ' + ampm;
}

var myDeedCount = 0;
var myDeeds = [];
var myDependacylist = [];
function whoami()
{
  return GetAccountAddress();
}

function GetDeedCount(refreshcallback)
{
  /// --
  var accaddress = GetAccountAddress();
  var contract = EthereumConnection.GetContract("IPFS");
  contract.balanceOf(accaddress,function(err, res){
    if (err)
    {
      consoleErrorLog("**[Error] Ethereum Contract**" + String(err));
      console.log('error' + String(err));
    }
    else
    {
      var value = res[0];
      myDeedCount =value.toNumber();
      refreshcallback();
    }
  });
}






  function GetDescriptionDataInto(tokenID,descString)
  {
    var contract = EthereumConnection.GetContract("IPFS");
    var accaddress = GetAccountAddress();
    contract.GetTokenDescription( tokenID,function(err, res){

      if (err)
      {
        consoleErrorLog("** [Error] GetDescriptionData ** " + String(err));
        document.getElementById(descString).innerHTML = "Error retrieving description";
      }
      else
      {
        var desc = String(res[0]);
        if (desc == "")
          desc = "[Empty description field]";
        document.getElementById(descString).innerHTML = desc;
      }
    });
  }

  function GetMinterDataInto(tokenID,minterString)
  {

    var contract = EthereumConnection.GetContract("IPFS");
    var accaddress = GetAccountAddress();
    contract.GetTokenMinter( tokenID,function(err, res){
      //var minterString = "minter"+tokenID.toString();
      if (err)
      {
        consoleErrorLog("** [Error] GetDescriptionData ** " + String(err));
        document.getElementById(minterString).innerHTML = "Error retrieving minter";
      }
      else
      {
        document.getElementById(minterString).innerHTML = String(res[0]);
      }
    });

  }

  function GetValueDataInto(tokenID,valueString)
  {

    var contract = EthereumConnection.GetContract("IPFS");
    var accaddress = GetAccountAddress();
    contract.GetTokenValue( tokenID,function(err, res){
      //var minterString = "minter"+tokenID.toString();
      if (err)
      {
        consoleErrorLog("** [Error] GetValueData ** " + String(err));
        document.getElementById(valueString).innerHTML = "Error retrieving value";
      }
      else
      {
        document.getElementById(valueString).innerHTML = String(res[0]);
      }
    });

  }


    function BurnIndex(index)
    {
      var contract = EthereumConnection.GetContract("IPFS");
      var accaddress = GetAccountAddress();
      contract.tokenOfOwnerByIndex(accaddress, index,function(err, res){
        if (err)
        {
          consoleErrorLog("** [Error] BurnIndex ** " + String(err));
        }
        else
        {
          var tokenID = res[0];
          BurnTokenID(tokenID);
        }
      });
    }

    function BurnTokenID(tokenID)
    {
      var contract = EthereumConnection.GetContract("IPFS");
      var accaddress = GetAccountAddress();
      contract.burn(accaddress, tokenID,{from: accaddress, value: 0,  gas: 1000000},function(err, res){
        if (err)
        {
          consoleErrorLog("** [Error] Burn ** " + String(err));
        }
        else
        {
          consoleLog("Deed Burnt");
          UpdateDeedTable();
        }
      });

    }

    function GetDeedData(count,tokenID,deedList,thenCall)
    {
      var contract = EthereumConnection.GetContract("IPFS");
      var accaddress = GetAccountAddress();

      contract.GetTokenData( tokenID,function(err, res)
      {
        if (err)
        {
          consoleErrorLog("** [Error] GetIPFSFromToken ** " + String(err));
        }
        else
        {
          var cnt = count;
          var tknID = tokenID;
          var ipfsdata = String(res[0]);
          var description = String(res[1]);
          var val = res[2].toNumber();
          var creationtime = res[3].toNumber();
          var minter = String(res[4]);
          deedList.push({index: cnt,tokenID:  tknID, tokenValue:val, ipfs: ipfsdata, creationTime: timeConverter(creationtime), description: description, minter: minter});
          thenCall();

        }
      });
    }

    function putOwnersDeedsInTable(count)
    {
      var contract = EthereumConnection.GetContract("IPFS");
      var accaddress = GetAccountAddress();
      contract.tokenOfOwnerByIndex(accaddress, count,function(err, res){
        if (err)
        {
          consoleErrorLog("** [Error] putDeedInTable ** " + String(err));
        }
        else
        {
          var tokenID = res[0];
         GetDeedData(count, tokenID, myDeeds,function(){renderDeedTable("deedbox", myDeeds);});
        }
      });

    }

    function PutAllDeedsInTableAndRender()
    {
      consoleLog("My DeedCount is " + myDeedCount);
      myDeeds = [];
      if (myDeedCount >0)
      {
        for (var i = 0; i <myDeedCount; i++)
          putOwnersDeedsInTable(i);
      }
      renderDeedTable("deedbox",myDeeds);
    }

  function UpdateDeedTable()
  {
    GetDeedCount(PutAllDeedsInTableAndRender);
  }




  function getDependancyString(dlist)
  {
    var output = "<ul>";
    for (var i = 0; i <dlist.length; i++)
      output += "<li>" + dlist[i];
    output += "</ul>";
    return output;
  }
  function renderDeedTable(targethtmlbox, deedtable)
  {
    var intro = "<br>You have " +   deedtable.length.toString() + " Deeds in the list <br>";

    var html = intro + " <br> " + "<table border='1|1'>";
    html+="<tr>";
    html+="<td>"+"Index"+"</td>";
    html+="<td>"+"Description"+"</td>";
    html+="<td>"+"Value"+"</td>";
    html+="<td>"+"TokenID"+"</td>";
    html+="<td>"+"IPFs Link"+"</td>";
    html+="<td>"+"Created at"+"</td>";
    html+="<td>"+"Created by"+"</td>";
    html+="<td>"+"Operations"+"</td>";
    html+="</tr>";

    // loop through the deeds.
    for (var i = 0; i <deedtable.length; i++)
    {
      var elem = deedtable[i];
      var index = elem.index;
      var tokenid = elem.tokenID;
      var tokenvalue = elem.tokenValue;
      var ipfs = elem.ipfs;
      var creationTime = elem.creationTime;
      var mintedBy = elem.minter;
      var desc = elem.description;

      var descString = i.toString()+targethtmlbox+"desc"+tokenid.toString();
      var minterString = i.toString()+targethtmlbox+"minter"+tokenid.toString();
      var valueString = i.toString()+targethtmlbox+"value"+tokenid.toString();


      html+="<tr>";
      html+="<td>"+index.toString();+"</td>";
    //  html+="<td id = \""+ descString+ "\">"+desc+"</td>";
    html+="<td id = \""+ descString+ "\">"+desc.toString()+"</td>";
    html+="<td id = \""+ valueString+ "\">"+tokenvalue.toString()+"</td>";

      html+="<td>"+tokenid+"</td>";

      html+="<td>"+"<a href = "+ipfs+">"+ipfs+"</a></td>";
      html+="<td>"+creationTime+"</td>";
      html+="<td id = \""+ minterString+ "\">"+mintedBy+"</td>";

      html+="<td> <button type=\"button\" onclick=\"BurnIndex("+index+")\">Burn</button> </td>";
      html+="</tr>";

  //    GetDescriptionDataInto(tokenid,descString);
  //    GetMinterDataInto(tokenid,minterString);
  //    GetValueDataInto(tokenid,valueString);

    }
    html+="</table>";
    document.getElementById(targethtmlbox).innerHTML = html;

  }
