
var assert = function(condition, message) {
    if (!condition)
        throw Error("Assert failed" + (typeof message !== "undefined" ? ": " + message : ""));
};

assert(1===1);



function SetBuyButtonStatus(newButtonStatus)
{

    var buyButton = document.getElementById("BuyButton");
    buyButton.disabled = !newButtonStatus;
    console.log("Setting buy button status to ", newButtonStatus);
    if (newButtonStatus)
    {
      GetPlotPrice(function(a){
        document.getElementById("BuyButton").innerHTML = "Buy (" + a + " Eth)";
      });
    }
    else {
      document.getElementById("BuyButton").innerHTML = "Buy";
    }
}

function SetupBuyButton(x,y)
{
  console.log("Testing to see if location ", x,y, "is free to buy");
  isAvailable(x,y,SetBuyButtonStatus);
}
function isNum(data)
{
  return !isNaN(data);
}

function myBuyFunction( )
{
  var x = MazeWorldCore.player.x;
  var y = MazeWorldCore.player.y;
  if(!isNum(x))
    console.error('X -oops not a number');
  if(!isNum(y))
    console.error('y -oops not a number');

  console.log("Buying ",x ,", ", y );
  isAvailable(x,y,MintPlot(x,y));
  console.log("Buy End!");

}
function GetPriceforNewPlot()
{

}
function GetPriceforSaving()
{

}

function mySaveFunction()
{
    console.log("Save!");
}
